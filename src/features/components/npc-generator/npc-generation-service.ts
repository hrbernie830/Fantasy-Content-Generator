/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NPC } from "src/types/npc/NPC";
import { NPCGeneratorSettings } from "../../../types/npc/NPCGeneratorSettings";
import { NPCRaceSettings } from "../../../types/npc/NPCRaceSettings";
import FantasyPlugin from "main";
import * as FileUtils from '../../../shared/utilities/file-utils';

export const genderKeyList = ["Male", "Female"];
export const genderValueList = ["Masculine First", "Feminine First", "Neutral First", "Family"];

export function generate(lockedNPC: NPC, npcGeneratorSettings: NPCGeneratorSettings, usedNpcGeneratorSettings: NPCGeneratorSettings): NPC {
    let npcFirstName = '';
    let npcLastName = '';
    let npcFunFact = '';

    const openMap = new Map<string, Map<string, string[]>>;
    const deletedMap = new Map<string, Map<string, string[]>>;

    fillMaps(openMap, deletedMap, npcGeneratorSettings, usedNpcGeneratorSettings);
    const funFactList = getFunFactOptions( npcGeneratorSettings, usedNpcGeneratorSettings);

    let raceKey = lockedNPC.getRaceOrDefault("RANDOM").toUpperCase()
    if(raceKey.toUpperCase() === "RANDOM") {
        const raceIndex = Math.floor(Math.random() * NPC.RACE_OPTIONS.length - 1);
        lockedNPC.race = NPC.RACE_OPTIONS[raceIndex];
        raceKey = lockedNPC.race.toUpperCase();
    }

    let genderKey = lockedNPC.gender;
    if(lockedNPC.gender === genderKeyList[0]) {
        genderKey = genderValueList[0];
    } else if(lockedNPC.gender === genderKeyList[1]) {
        genderKey = genderValueList[1];
    } else {
        const genderIndex = Math.floor(Math.random() * genderKeyList.length);
        lockedNPC.gender = genderKeyList[genderIndex];
        genderKey = genderValueList[genderIndex];
    }

    let list = openMap.get(raceKey)?.get(genderKey);
    if(!list) {
        list = [];
    }
    let neutralList = openMap.get(raceKey)?.get(genderValueList[2]);
    if(!neutralList) {
        neutralList = [];
    }

    if(list.length > 0 || neutralList.length > 0) {
        const firstNameIndex = Math.floor(Math.random() * list.length + neutralList.length);

        if(firstNameIndex < list.length) {
            npcFirstName = list.at(firstNameIndex)!;
        } else {
            npcFirstName = neutralList.at(firstNameIndex - list.length)!;
        }
    }

    const familyNameList = openMap.get(raceKey)?.get(genderValueList[3]);
    if(familyNameList && familyNameList.length > 0) {
        const lastNameIndex = Math.floor(Math.random() * familyNameList.length);
        npcLastName = familyNameList.at(lastNameIndex)!;
    }

    let npcFunFactList: string[] = [];
    if(funFactList.get("open")) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        npcFunFactList = funFactList.get("open")!;
    }

    const funFactIndex = Math.floor(Math.random() * npcFunFactList.length);
    npcFunFact = npcFunFactList[funFactIndex];

    return new NPC(lockedNPC.getGenderOrDefault('npcGender'), lockedNPC.getRaceOrDefault('npcRace'), lockedNPC.getFirstNameOrDefault(npcFirstName), lockedNPC.getFamilyNameOrDefault(npcLastName), lockedNPC.getFunFactOrDefault(npcFunFact));
}


export function getFunFactOptions(npcGeneratorSettings: NPCGeneratorSettings, usedNpcGeneratorSettings: NPCGeneratorSettings, excludingItem?: string): Map<string, string[]> {
    const funFactMap = new Map<string, string[]>;
    const funFactList: string[] = getListExcludingItem(npcGeneratorSettings.funFactList, excludingItem);
    const usedFunFactList: string[] = getListExcludingItem(usedNpcGeneratorSettings.funFactList, excludingItem);


    funFactMap.set("open", funFactList);
    funFactMap.set("deleted", usedFunFactList);

    return funFactMap;
}

export async function moveFunFactToUsedSetting(funFact: string | undefined, plugin: FantasyPlugin) {
    if(funFact !== undefined) {
        const index = plugin.settings.npcSettings.available.funFactList.indexOf(funFact);
        if(index > -1) {
            const removedFrom = plugin.settings.npcSettings.available.funFactList.splice(index, 1);
            plugin.settings.npcSettings.used.funFactList.push(removedFrom[0]);
        }

    }
}

export async function moveNameToUsedSetting(name: string | undefined, plugin: FantasyPlugin, race: string, isFamilyName?: boolean) {
    if(name !== undefined) {
        const raceSettingsToRemoveFrom = getRaceBasedGeneratorSettings(plugin.settings.npcSettings.available, race);
        const raceSettingsAddTo = getRaceBasedGeneratorSettings(plugin.settings.npcSettings.used, race);

        if(isFamilyName) {
            const index = raceSettingsToRemoveFrom.family.indexOf(name);
            if(index > -1) {
                const removedFrom = raceSettingsToRemoveFrom.family.splice(index, 1);
                raceSettingsAddTo.family.push(removedFrom[0]);
            }
        } else {
            let index = raceSettingsToRemoveFrom.masculineFirst.indexOf(name);
            if(index > -1) {
                const removedFrom = raceSettingsToRemoveFrom.masculineFirst.splice(index, 1);
                raceSettingsAddTo.masculineFirst.push(removedFrom[0]);
            }

            index = raceSettingsToRemoveFrom.feminineFirst.indexOf(name);
            if(index > -1) {
                const removedFrom = raceSettingsToRemoveFrom.feminineFirst.splice(index, 1);
                raceSettingsAddTo.feminineFirst.push(removedFrom[0]);
            }

            index = raceSettingsToRemoveFrom.neutralFirst.indexOf(name);
            if(index > -1) {
                const removedFrom = raceSettingsToRemoveFrom.neutralFirst.splice(index, 1);
                raceSettingsAddTo.neutralFirst.push(removedFrom[0]);
            }
        }

        await plugin.saveSettings();
    }
}


export function getRaceBasedGeneratorSettings(npcGeneratorSettings: NPCGeneratorSettings, race: string): NPCRaceSettings{
    switch (race.toLowerCase()) {
        case "human":
            return npcGeneratorSettings.human;
        case "elf":
            return npcGeneratorSettings.elf;
        case "dwarf":
            return npcGeneratorSettings.dwarf;
        case "halfling":
            return npcGeneratorSettings.halfling;
        case "goblin":
            return npcGeneratorSettings.goblin;
        default:
            return new NPCRaceSettings(true, 'missing');
   } 
}

export function getListExcludingItem(names: string[], excludingName?: string) {
    const retVal = [];

    for(const name of names) {
        if(!excludingName || excludingName !== name.trim()) {
            retVal.push(name);
        }
    }

    return retVal;
}

export function createRaceMapFromSettings(openMap: Map<string, Map<string, string[]>>, npcRaceSettings: NPCRaceSettings, excludingName?: string) {
    const masculineNames: string[] = getListExcludingItem(npcRaceSettings.masculineFirst, excludingName);
    const feminineNames: string[] = getListExcludingItem(npcRaceSettings.feminineFirst, excludingName);
    const neutralNames: string[] = getListExcludingItem(npcRaceSettings.neutralFirst, excludingName);
    const familyNames: string[] = getListExcludingItem(npcRaceSettings.family, excludingName);

    const raceMap = new Map<string, string[]>;
    raceMap.set("Masculine First", masculineNames);
    raceMap.set("Feminine First", feminineNames);
    raceMap.set("Neutral First", neutralNames);
    raceMap.set("Family", familyNames);

    openMap.set(npcRaceSettings.raceName.toUpperCase(), raceMap);
}

export function fillMaps(openMap: Map<string, Map<string, string[]>>, deletedMap: Map<string, Map<string, string[]>>, npcGeneratorSettings: NPCGeneratorSettings, usedNpcGeneratorSettings: NPCGeneratorSettings, excludingName?: string) {
    createRaceMapFromSettings(openMap, npcGeneratorSettings.human, excludingName);
    createRaceMapFromSettings(openMap, npcGeneratorSettings.elf, excludingName);
    createRaceMapFromSettings(openMap, npcGeneratorSettings.dwarf, excludingName);
    createRaceMapFromSettings(openMap, npcGeneratorSettings.halfling, excludingName);
    createRaceMapFromSettings(openMap, npcGeneratorSettings.goblin, excludingName);


    createRaceMapFromSettings(deletedMap, usedNpcGeneratorSettings.human, excludingName);
    createRaceMapFromSettings(deletedMap, usedNpcGeneratorSettings.elf, excludingName);
    createRaceMapFromSettings(deletedMap, usedNpcGeneratorSettings.dwarf, excludingName);
    createRaceMapFromSettings(deletedMap, usedNpcGeneratorSettings.halfling, excludingName);
    createRaceMapFromSettings(deletedMap, usedNpcGeneratorSettings.goblin, excludingName);
}

export function generateCharacterNoteSheet(fileLocation: string, npc: NPC) {
    const generatedNpcFolder = fileLocation + "\\NPCs"
    const fileName = npc.firstName + " " + npc.familyName + ".md";
    
    const overviewContent = '## Overview\r\n\r\n**Race**: !RACE\r\n\r\n**Gender**: !GENDER\r\n\r\n**Age**: \r\n\r\n**Alignment**: \r\n\r\n**Character Role**: \r\n\r\n**Current Location**: \r\n\r\n**Condition**: Alive\r\n\r\n\r\n';
    const profileContent = "## Profile\r\n\r\n**Appearance**: \r\n\r\n**Social Traits/Archetype**: !SOCIAL_TRAITS\r\n\r\n**Philosophies**: \r\n\r\n\r\n";
    const involvementContent = "## Involvement\r\n\r\n\r\n";
    const historyContent = "## History\r\n\r\n\r\n";
    const characterSheetContent = "## Character Sheet\r\n\r\n\r\n";
    const otherContent = "## Other\r\n\r\n\r\n";

    let fullContent = overviewContent + profileContent + involvementContent + historyContent + characterSheetContent + otherContent;
    fullContent = fullContent.replace("!RACE", npc.race ? npc.race : "placeholder_race").replace("!GENDER", npc.gender ? npc.gender : "placeholder_gender").replace("!SOCIAL_TRAITS", npc.funFact ? npc.funFact : "placeholder_fun_fact");


    FileUtils.saveDataToFile(generatedNpcFolder, fileName, fullContent);
}
