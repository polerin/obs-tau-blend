import { expect } from 'chai';
import { describe } from 'mocha';
import { FrameworkMessageSet } from 'Shared/MessageHandling';
import { ObsEvents } from 'Shared/MessageHandling';
import { ObsV4EventHandlersData } from '../../Definitions/EventSchemas';
import { EventSceneSwitch, EventWebsocketConnected, EventWebsocketAuthorized } from '../../Formatters/Events';


describe("ObsV4 EventWebsocketAuthorized formatter tests", () => {
    const buildSUT = () : EventWebsocketAuthorized => new EventWebsocketAuthorized();

    it('should be an configured correctly', () => {
        const subject = buildSUT();

        expect(subject).to.be.a('object');
        expect(subject.adapterEventType).to.be.equal("AuthenticationSuccess");
        expect(subject.systemMessageType).to.be.equal("obs.websocket.authorized");
    });

    it('should reject incorrect messages', () => {
        const subject = buildSUT();

        // not a system message
        expect(({}) => subject.buildSystemMessage()).to.Throw();
    });

    it('should return a correctly formatted system message', () => {
        const subject = buildSUT();
        const result = subject.buildSystemMessage();
        
        const expected = {
            name : 'obs.websocket.authorized',
            type : "obsMessage"
        } as FrameworkMessageSet[typeof ObsEvents.WebsocketAuthorized];


        expect(result).to.be.an('object');
        expect(result).to.be.deep.equal(expected);
    });
});


describe("ObsV4 EventWebsocketConnected formatter tests", () => {
    const buildSUT = () : EventWebsocketConnected => new EventWebsocketConnected();

    it('should be an configured correctly', () => {
        const subject = buildSUT();

        expect(subject).to.be.a('object');
        expect(subject.adapterEventType).to.be.equal("ConnectionOpened");
        expect(subject.systemMessageType).to.be.equal("obs.websocket.connected");
    });

    it('should reject incorrect messages', () => {
        const subject = buildSUT();

        // not a system message
        expect(({}) => subject.buildSystemMessage()).to.Throw();
    });

    it('should return a correctly formatted system message', () => {
        const subject = buildSUT();
        const result = subject.buildSystemMessage();
        
        const expected = {
            name : 'obs.websocket.connected',
            type : 'obsEvent'
        } as FrameworkMessageSet[typeof ObsEvents.WebsocketConnected];

        expect(result).to.be.an('object');
        expect(result).to.be.deep.equal(expected);
    });
});


describe("ObsV4 EventWebsocketConnected formatter tests", () => {
    const buildSUT = () : EventSceneSwitch => new EventSceneSwitch();

    it('should be an configured correctly', () => {
        const subject = buildSUT();

        expect(subject).to.be.a('object');
        expect(subject.adapterEventName).to.be.equal("SwitchScenes");
        expect(subject.systemEventName).to.be.equal("obs.scene.switched");
    });

    it('should reject incorrect messages', () => {
        const subject = buildSUT();

        // not a system message
        expect(() => subject.buildSystemMessage()).to.Throw();

    });

    it('should return a correctly formatted system message', () => {
        const subject = buildSUT();

        let testInput = {
            'scene-name' : "testScene",
            "sources" : [
                {
                    cy: 100,
                    cx: 1,
                    alignment: 4,
                    name: "a source?",
                    id: 30,
                    render: true,
                    muted: false,
                    locked: true,
                    source_cx: 3,
                    source_cy: 3,
                    type: "scene",
                    volume: 30,
                    x: 10,
                    y: 40
                }
            ]
        } as ObsV4EventHandlersData["SwitchScenes"];

        const withSourceResult = subject.buildSystemMessage(testInput);
        
        const expected = {
            name: "obs.scene.switched",
            type: "obsEvent",
            sceneName : "testScene"
        } as FrameworkMessageSet[typeof ObsEvents.SwitchScenes];

        expect(withSourceResult).to.be.an('object');
        expect(withSourceResult).to.be.deep.equal(expected, "with source data");


        testInput.sources = [];
        const withoutSourceResult = subject.buildSystemMessage(testInput);

        expect(withoutSourceResult).to.be.an('object');
        expect(withoutSourceResult).to.be.deep.equal(expected, "without source data");
    });
});