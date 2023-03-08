import { assert, expect } from 'chai';
import sinon from 'sinon';
import { describe } from 'mocha';
import { SystemMessageByName, ObsEvent, ObsResponse, ObsRequest } from '#shared';

import { ObsV5Adapter } from '#adapters/ObsV5Adapter/index';
import SetCurrentScene from '#adapters/ObsV5Adapter/Formatters/Requests/SetCurrentScene';
import EventSceneSwitch from '#adapters/ObsV5Adapter/Formatters/Events/EventSceneSwitch';

import OBSWebSocket from 'obs-websocket-js';
import { ServiceAdapterTransformerSet, TypedPubSubBus } from '#root/index';


/**
 * below imports and type are a hackaround for OBS websocket not exposing the hello message type
 */
import { Merge } from 'type-fest';
import { IncomingMessageTypes, WebSocketOpCode } from 'obs-websocket-js'
type HelloIdentifiedMerged = Merge<Exclude<IncomingMessageTypes[WebSocketOpCode.Hello], 'authenticate'>, IncomingMessageTypes[WebSocketOpCode.Identified]>;

const buildWebsocketStub = (): sinon.SinonStubbedInstance<OBSWebSocket> => sinon.createStubInstance(OBSWebSocket);
const buildTransformerSet = (): ServiceAdapterTransformerSet => {
    const setSceneTransformer = new SetCurrentScene();
    const eventSceneSwitch = new EventSceneSwitch();
    return {
        request: {
            [setSceneTransformer.systemRequestName]: setSceneTransformer,
        },
        event: {
            [eventSceneSwitch.adapterEventName]: eventSceneSwitch,
        }
    };
};

const buildEventBus = (): sinon.SinonStubbedInstance<TypedPubSubBus> => {
    
    const bus = sinon.createStubInstance(TypedPubSubBus);

    return bus;
};

const buildSUT = () : ObsV5Adapter => new ObsV5Adapter(
    buildWebsocketStub(),
    buildTransformerSet(),
    buildEventBus()
    // options?
);

describe("ObsV5Adapter tests", () => {

    it('allows setting a system message callback', () => {
        const subject = buildSUT();
        const spy = sinon.spy();

        subject.callback = spy;
    });

    it('correctly initializes websocket connection and notifies listener', async () => {
        const websocket = buildWebsocketStub();
        const subject = new ObsV5Adapter(
            websocket,
            buildTransformerSet(),
            buildEventBus()
            // options?
        );

        websocket.connect.returns(new Promise<HelloIdentifiedMerged>((resolve) => {
            setTimeout(() => resolve({
                authentication: {challenge: "string", salt: "anotherString"},
                negotiatedRpcVersion: 1,
                obsWebSocketVersion: "5",
                rpcVersion: 1,
            }), 10);
        }));

        const spy = sinon.spy();
        subject.callback = spy;

        const connected = await subject.connect();

        const notificationArgs = spy.getCall(0).args

        expect(connected).to.be.true;
        expect(subject.status.status).to.equal("connected");
        expect(websocket.connect.callCount).to.equal(1);
        expect(notificationArgs.length).to.equal(2);
        
        expect(notificationArgs).to.deep.equal([
            ObsResponse.WebsocketAuthorized,
            { type: "obsResponse", name: ObsResponse.WebsocketAuthorized, }
        ]);
    });

    it('correctly notifies of failed websocket connection', async () => {
        const websocket = buildWebsocketStub();
        const subject = new ObsV5Adapter(
            websocket,
            buildTransformerSet(),
            buildEventBus()
            // options?
        ); 

        websocket.connect.returns(new Promise<HelloIdentifiedMerged>((_, reject) => {
            setTimeout(() => reject("an error message"), 10);
        }));

        const spy = sinon.spy();
        subject.callback = spy;

        const connected = await subject.connect();

        expect(connected).to.be.false;
       
        expect(spy.callCount).to.equal(0);
    })

    it('correctly refuses to send messages prior to connection', async () => {
        const subject = buildSUT();
        const testMessage: SystemMessageByName<typeof ObsRequest.SetCurrentScene> = {
            name: 'obs.request.scene.switch',
            type: 'obsRequest',
            sceneName: 'Test name',
        };

        let error;
        
        try {
            await subject.sendMessage(ObsResponse.SetCurrentScene, testMessage);
        } catch (e) { 
            error = (<Error>e).message;
        }

        expect(subject.status.status).to.equal('disconnected');
        expect(error).to.equal('OBS v5: Attempted to send message before websocket connection');
    });

    it('registers all transformers in the transformer set', () => {
        const websocket = buildWebsocketStub();
        const transformers = buildTransformerSet();
        const bus = buildEventBus();

        const subject = new ObsV5Adapter(
            websocket,
            transformers,
            bus,
            // options?
        );

        const registeredEvents = websocket.on.getCalls().map((call) => call.firstArg);
        const registeredRequests = bus.subscribe.getCalls().map((call) => call.firstArg);

        const expectedEvents = transformers.event ? Object.keys(transformers.event) : [];
        const expectedRequests = transformers.request ? Object.keys(transformers.request) : [];

        // Adapter self-registers for ConnectionClosed
        expectedEvents.push("ConnectionClosed");

        expect(registeredEvents).to.deep.equal(expectedEvents);
        expect(registeredRequests).to.deep.equal(expectedRequests);
    })
});