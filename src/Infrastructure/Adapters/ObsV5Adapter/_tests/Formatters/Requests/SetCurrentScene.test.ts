import { expect } from 'chai';
import { describe } from 'mocha';
import { ObsRequest, ObsResponse, SystemMessageByName } from '#shared';
import * as Requests from '#adapters/ObsV5Adapter/Formatters/Requests/index';
import { OBSRequestTypes } from 'obs-websocket-js';


describe("ObsV5 SetCurrentScene formatter tests", () => {
    const buildSUT = () : Requests.SetCurrentScene => new Requests.SetCurrentScene();
    const buildTestMessage = () : SystemMessageByName<typeof ObsRequest.SetCurrentScene> => { 
        return {
            name : ObsRequest.SetCurrentScene,
            type : "obsRequest",
            sceneName: "The Scene",
        };
    };

    it('should be an configured correctly', () => {
        const subject = buildSUT();

        expect(subject).to.be.a('object');
        expect(subject.adapterRequestName).to.be.equal("SetCurrentProgramScene");
        expect(subject.systemRequestName).to.be.equal("obs.request.scene.switch");
    });

    // @todo Implement validation tests for empty settings
    it('should reject incorrect messages', () => {
        const subject = buildSUT();

        // empty source name
        let testMessage = buildTestMessage();
        testMessage.sceneName = "";
        expect(() => subject.buildRequestMessage(testMessage)).to.Throw();

    });

    it('should return a correctly formatted Adapter Request message', () => {
        const subject = buildSUT();
        const result = subject.buildRequestMessage(buildTestMessage());
        
        const expected: OBSRequestTypes['SetCurrentProgramScene'] = {
            sceneName : 'The Scene',
        };


        expect(result).to.be.an('object');
        expect(result).to.be.deep.equal(expected);
    });

    it('should return a correctly formatted System response message'), () => {
        const subject = buildSUT();

        // response is `undefined` coming back from obs
        const result = subject.buildResponseMessage(undefined);
        
        const expected: SystemMessageByName<typeof ObsResponse.SetCurrentScene> = {
            name: 'obs.response.scene.setCurrent', 
            type: 'obsResponse',
        };


        expect(result).to.be.an('object');
        expect(result).to.be.deep.equal(expected);
    }
});