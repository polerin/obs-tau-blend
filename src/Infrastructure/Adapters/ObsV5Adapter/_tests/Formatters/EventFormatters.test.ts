import { expect } from 'chai';
import { describe } from 'mocha';
import { SystemMessageByName, ObsEvent } from '#shared';

import { EventSceneSwitch, } from '#adapters/ObsV5Adapter/Formatters/Events/index';
import { ObsV5Events } from '#adapters/ObsV5Adapter/Types';


describe("ObsV5 EventSceneSwitch formatter tests", () => {
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
        expect(() => subject.buildEventMessage()).to.Throw();

    });

    it('should return a correctly formatted system message', () => {
        const subject = buildSUT();

        let testInput: ObsV5Events['CurrentProgramSceneChanged'] = {
            'sceneName' : "testScene",
        };

        const expected: SystemMessageByName<typeof ObsEvent.SceneSwitched> = {
            name: "obs.scene.switched",
            type: "obsEvent",
            sceneName : "testScene"
        };

        const result = subject.buildEventMessage(testInput);

        expect(result).to.be.an('object');
        expect(result).to.be.deep.equal(expected, "without source data");
    });
});