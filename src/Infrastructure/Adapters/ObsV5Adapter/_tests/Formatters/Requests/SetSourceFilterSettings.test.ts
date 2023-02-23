import { expect } from 'chai';
import { describe } from 'mocha';
import { ObsRequest, ObsRequestMessage, ObsResponse, SystemMessageByName } from '#shared';
import * as Requests from '#adapters/ObsV5Adapter/Formatters/Requests/index';
import { OBSRequestTypes } from 'obs-websocket-js';


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
        expect(subject.adapterResponseName).to.be.equal("SetSourceFilterSettings");
        expect(subject.systemRequestName).to.be.equal("obs.request.source.filter.settings.set");
        expect(subject.systemResponseName).to.be.equal("obs.response.source.filter.settings.set");
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

    it('should return a correctly formatted request', () => {
        const subject = buildSUT();
        const result = subject.buildRequestMessage(buildTestMessage());
        
        const expected: OBSRequestTypes['SetSourceFilterSettings'] = {
            sourceName: "TestSource",
            filterName: "Filter Name?",
            filterSettings: { "foo": "bar" },
        };


        expect(result).to.be.an('object');
        expect(result).to.be.deep.equal(expected);
    });

    it('should return a correctly formatted System response message'), () => {
        const subject = buildSUT();

        // response is `undefined` coming back from obs
        const result = subject.buildResponseMessage(undefined);
        
        const expected: SystemMessageByName<typeof ObsResponse.SetSourceFilterSettings> = {
            name: 'obs.response.source.filter.settings.set', 
            type: 'obsResponse',
        };


        expect(result).to.be.an('object');
        expect(result).to.be.deep.equal(expected);
    }
});