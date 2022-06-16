import { expect } from 'chai';
import { describe } from 'mocha';
import { AppMessageSet } from 'Shared/MessageHandling';
import { EventWebsocketAuthorized } from "../../Formatters/EventWebsocketAuthorized";


function buildSUT() : EventWebsocketAuthorized {
    return new EventWebsocketAuthorized();
}


describe("ObsV4 EventWebsocketAuthorized formatter tests", () => {
    
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
        } as AppMessageSet["obs.websocket.authorized"];


        expect(result).to.be.an('object');
        expect(result).to.be.deep.equal(expected);
    });
});