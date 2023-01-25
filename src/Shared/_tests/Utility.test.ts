import { expect } from 'chai';
import { describe } from 'mocha';
import { isSystemMessage } from '#shared/Utility/Message';


describe("Utility/Messages isSystemMessage() tests", () => {

    it('reject non-system message objects', () => {
        const result = isSystemMessage({foo : "bar"});
        
        expect(result).to.be.false;
    });

    it('reject non-system message objects with an invalid name property', () => {
        const result = isSystemMessage({name: "not.actually.a.system.message"});
    });

    it('reject non-system message objects that have a valid name property', () => {
        const result = isSystemMessage({name: "app.system.status"});

        expect(result).to.be.false;
    });

    it('accept system messages with valid name and format', () => {
        const result = isSystemMessage({
            name: "obs.scene.switched",
            type: "obsMessage",
            sceneName : "Some Scene"
        });

        expect(result).to.be.true;
    });
});
