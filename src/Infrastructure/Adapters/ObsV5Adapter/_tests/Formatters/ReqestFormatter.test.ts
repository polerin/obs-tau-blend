import { expect } from 'chai';
import { describe } from 'mocha';
import { FrameworkMessageNames, FrameworkMessageSet } from 'Shared/MessageHandling';
import { ObsRequests } from 'Shared/MessageHandling';
import { ObsV4Requests, ObsV4RequestNames} from '../../Definitions/RequestMethodsArgs';
import * as Requests from '../../Formatters/Requests';


describe("ObsV4 SetSourceFilterSettings formatter tests", () => {
    const buildSUT = () : Requests.SetSourceFilterSettings => new Requests.SetSourceFilterSettings();
    const buildTestMessage = () : FrameworkMessageSet[typeof ObsRequests.SetSourceFilterSettings] => { 
        return {
            name : ObsRequests.SetSourceFilterSettings,
            type : "obsRequest",
            sourceName : "TestSource",
            filterName : "Filter Name?",
            settings : {"foo" : "bar"}
        };
    };

    it('should be an configured correctly', () => {
        const subject = buildSUT();

        expect(subject).to.be.a('object');
        expect(subject.adapterRequestType).to.be.equal("SetSourceFilterSettings");
        expect(subject.systemMessageType).to.be.equal("obs.request.source.setFilterSettings");
    });

    // @todo Implement validation tests for empty settings
    it('should reject incorrect messages', () => {
        const subject = buildSUT();

        // empty source name
        let testMessage = buildTestMessage();
        testMessage.sourceName = "";
        expect(() => subject.buildAdapterMessage(testMessage)).to.Throw();

        // empty filter name
        testMessage = buildTestMessage();
        testMessage.filterName = "";
        expect(() => subject.buildAdapterMessage(testMessage)).to.Throw();

    });

    // it('should return a correctly formatted system message', () => {
    //     const subject = buildSUT();
    //     const result = subject.buildSystemMessage();
        
    //     const expected = {
    //         name : 'obs.websocket.authorized',
    //         type : "obsMessage"
    //     } as SystemMessageSet[typeof ObsMessages.WebsocketAuthorized];


    //     expect(result).to.be.an('object');
    //     expect(result).to.be.deep.equal(expected);
    // });
});