import { expect } from 'chai';
import { describe } from 'mocha';
import { SystemMessageSet, SystemMessageNames, CollectedSystemMessageNames } from 'Shared/MessageHandling';
import { isSystemMessage, isSystemMessageName } from 'Shared/Utility/Message';


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


describe("Utility/Messages isSystemMessageName() tests", () => {

    it('reject empty/non string params', () => {
        const resultNull = isSystemMessageName(null);
        const resultUndefined = isSystemMessageName(undefined);
        const resultNumber = isSystemMessageName(4);
        const resultArray = isSystemMessageName(["foo"]);

        expect(resultNull).to.be.false;
        expect(resultUndefined).to.be.false;
        expect(resultNumber).to.be.false;
        expect(resultArray).to.be.false;
    });

    it('reject non-system message objects', () => {
        const result = isSystemMessageName("bar");
        
        expect(result).to.be.false;
    });

    it('accepts all valid names', () => {
        for (const name of CollectedSystemMessageNames) {
            const result = isSystemMessageName(name);
            expect(result).to.be.true;
        }
    })
});