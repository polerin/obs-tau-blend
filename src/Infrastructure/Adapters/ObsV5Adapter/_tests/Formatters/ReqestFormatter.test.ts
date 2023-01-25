import { expect } from 'chai';
import { describe } from 'mocha';
import { ObsRequest, SystemMessageByName } from '#shared';
import * as Requests from '#adapters/ObsV5Adapter/Formatters/Requests/index';


describe("ObsV5 SetSourceFilterSettings formatter tests", () => {
    const buildSUT = () : Requests.SetSourceFilterSettings => new Requests.SetSourceFilterSettings();
    const buildTestMessage = () : SystemMessageByName<typeof ObsRequest.SetSourceFilterSettings> => { 
        return {
            name : ObsRequest.SetSourceFilterSettings,
            type : "obsRequest",
            sourceName : "TestSource",
            filterName : "Filter Name?",
            settings : {"foo" : "bar"}
        };
    };

    it('should be an configured correctly', () => {
        const subject = buildSUT();

        expect(subject).to.be.a('object');
        expect(subject.adapterRequestName).to.be.equal("SetSourceFilterSettings");
        expect(subject.systemRequestName).to.be.equal("obs.request.source.setFilterSettings");
    });

    // @todo Implement validation tests for empty settings
    it('should reject incorrect messages', () => {
        const subject = buildSUT();

        // empty source name
        let testMessage = buildTestMessage();
        testMessage.sourceName = "";
        expect(() => subject.buildRequestMessage(testMessage)).to.Throw();

        // empty filter name
        testMessage = buildTestMessage();
        testMessage.filterName = "";
        expect(() => subject.buildRequestMessage(testMessage)).to.Throw();

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