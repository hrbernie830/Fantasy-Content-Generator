import { NPC } from "src/generators/npc-generator/model/NPC";
import * as fs from "fs";
import { NPCGeneratorSettings } from "../model/NPCGeneratorSettings";
import { NPCRaceSettings } from "../model/NPCRaceSettings";
import FantasyPlugin from "main";

export const genderKeyList = ["Male", "Female"];
export const genderValueList = ["Masculine First", "Feminine First", "Neutral First", "Family"];

export const npcNameFilePath = "C:/Users/bernh/Downloads/NPCNames.txt";
export const funFactFilePath1 = "C:/Users/bernh/Downloads/NPCFunFactList.txt";

export function generate(lockedNPC: NPC, nameFilePath: string, funFactFilePath: string, npcGeneratorSettings: NPCGeneratorSettings, usedNpcGeneratorSettings: NPCGeneratorSettings): NPC {
    let npcFirstName = '';
    let npcLastName = '';
    let npcFunFact = '';

    const openMap = new Map<string, Map<string, string[]>>;
    const deletedMap = new Map<string, Map<string, string[]>>;

    fillMaps(openMap, deletedMap, npcGeneratorSettings, usedNpcGeneratorSettings);
    const funFactList = getFunFactOptions(funFactFilePath);

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

    const retVal = new NPC();
    retVal.firstName = lockedNPC.getFirstNameOrDefault(npcFirstName);
    retVal.familyName = lockedNPC.getFamilyNameOrDefault(npcLastName);
    retVal.race = lockedNPC.getRaceOrDefault('npcRace');
    retVal.gender = lockedNPC.getGenderOrDefault('npcGender');
    retVal.funFact = lockedNPC.getFunFactOrDefault(npcFunFact);

    return retVal;
}

export function getFunFactOptions(funFactFilePath: string): Map<string, string[]> {
    const funFactMap = new Map<string, string[]>;
    funFactMap.set("open", []);
    funFactMap.set("deleted", []);
    const allFileContents = fs.readFileSync(funFactFilePath, 'utf-8');
    allFileContents.split(/\r?\n/).forEach(line =>  {
        if(line.startsWith("+")) {
            funFactMap.get("deleted")?.push(line.substring(1));
        } else if(line.trim().length > 0) {
            funFactMap.get("open")?.push(line);
        }
        
    });
    return funFactMap;
}

export function markFunFactAsUsed(funFact: string | undefined, funFactFilePath: string) {
    if(funFact !== undefined) {
        let newFileText = "";
        const funFactMap = getFunFactOptions(funFactFilePath);
        if(funFactMap.get("open")?.contains(funFact)) {
            funFactMap.get("open")?.remove(funFact);
            funFactMap.get("deleted")?.push(funFact);
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        newFileText += createPrintStringForList(funFactMap.get("open")!, "");
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        newFileText += createPrintStringForList(funFactMap.get("deleted")!, "+");
        writeFile(funFactFilePath, newFileText);
    }
}

export function markNameAsUsedOld(name: string | undefined, nameFilePath: string) {
    if(name !== undefined) {
        const openMap = new Map<string, Map<string, string[]>>;
        const deletedMap = new Map<string, Map<string, string[]>>;
    
        fillMapsFileVersion(openMap, deletedMap, nameFilePath, name);
        reprintFile(openMap, deletedMap, nameFilePath);
    }
}

export async function markNameAsUsed(name: string | undefined, plugin: FantasyPlugin, race: string, isFamilyName?: boolean) {
    if(name !== undefined) {
        const raceSettingsToRemoveFrom = getRaceBasedGeneratorSettings(plugin.settings.npcSettings, race);
        const raceSettingsAddTo = getRaceBasedGeneratorSettings(plugin.settings.usedNpcSettings, race);

        if(isFamilyName) {
            const index = raceSettingsToRemoveFrom.family.indexOf(name);
            if(index > 0) {
                const removedFrom = raceSettingsToRemoveFrom.family.splice(index, 1);
                raceSettingsAddTo.family.push(removedFrom[0]);
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
            return new NPCRaceSettings('missing');
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

export function fillMapsFileVersion(openMap: Map<string, Map<string, string[]>>, deletedMap: Map<string, Map<string, string[]>>, nameFilePath: string, nameToAddToDeleted?: string) {
    let currOuter: string;
    let currInner: string;

    const allFileContents = fs.readFileSync(nameFilePath, 'utf-8');
    allFileContents.split(/\r?\n/).forEach(line =>  {
        if(line.startsWith("**")) {
            const currLine = line.substring(2, line.length-2);

            if(!genderValueList.contains(currLine)) {
                currOuter = currLine;
                openMap.set(currOuter, createKeyMap());
                deletedMap.set(currOuter, createKeyMap());
                currInner = "";
            } else if (currOuter) {
                currInner = currLine;
            }
        } else if(currOuter && currInner && currInner.length > 0) {
            if(line.startsWith("+")) {
                const raceMap = deletedMap.get(currOuter);
                if(raceMap) {
                    const nameList = raceMap.get(currInner);
                    if(nameList) {
                        nameList.push(line.substring(1));
                    }
                }
            } else if (line.trim().length > 0) {
                let raceMap;
                if(nameToAddToDeleted && nameToAddToDeleted === line.trim()) {
                    raceMap = deletedMap.get(currOuter);
                } else {
                    raceMap = openMap.get(currOuter);
                }

                if(raceMap) {
                    const nameList = raceMap.get(currInner);
                    if(nameList) {
                        nameList.push(line.trim());
                    }
                }
            }
        }
    });
}

export function createKeyMap(): Map<string, string[]> {
    const keyMap = new Map<string, string[]>;
    for(const value of genderValueList) {
        keyMap.set(value, []);
    }
    return keyMap;
}


export function reprintFile(openMap: Map<string, Map<string, string[]>>, deletedMap: Map<string, Map<string, string[]>>, filePath: string) {
    let newFileText = "";

    for(const entry of openMap.entries()) {
        const race = entry[0];
        const raceMap = entry[1];
        newFileText += "**" + race + "**\r\n";
        for(const interiorEntry of raceMap.entries()) {
            const key = interiorEntry[0];
            newFileText += "**" + key + "**\r\n";
            if(raceMap) {
                const nameList = raceMap.get(key);
                if(nameList) {
                    newFileText += createPrintStringForList(nameList, "");
                }
            }

            const deletedRaceMap = deletedMap.get(race);
            if(deletedRaceMap) {
                const deletedNameList = deletedRaceMap.get(key);
                if(deletedNameList) {
                    newFileText += createPrintStringForList(deletedNameList, "+");
                }
            }
            newFileText += "\r\n";
        }
    }
    writeFile(filePath, newFileText);
}

export function writeFile(filePath: string, fileText: string) {
    fs.writeFileSync(filePath, fileText);
}

export function createPrintStringForList(list: string[], prefix: string): string {
    let fileText = "";
    for(const string of list) {
        fileText += prefix + string + "\r\n";
    }
    return fileText;
}


export function generateCharacterNoteSheet(npc: NPC) {
    const generatedNpcFolder = "C:\\Users\\bernh\\iCloudDrive\\iCloud~md~obsidian\\Campaign Notes\\z_Generated\\NPCs\\" + npc.firstName + " " + npc.familyName + ".md";
    
    const overviewContent = '## Overview\r\n\r\n**Race**: !RACE\r\n\r\n**Gender**: !GENDER\r\n\r\n**Age**: \r\n\r\n**Alignment**: \r\n\r\n**Character Role**: \r\n\r\n**Current Location**: \r\n\r\n**Condition**: Alive\r\n\r\n\r\n';
    const profileContent = "## Profile\r\n\r\n**Appearance**: \r\n\r\n**Social Traits/Archetype**: !SOCIAL_TRAITS\r\n\r\n**Philosophies**: \r\n\r\n\r\n";
    const involvementContent = "## Involvement\r\n\r\n\r\n";
    const historyContent = "## History\r\n\r\n\r\n";
    const characterSheetContent = "## Character Sheet\r\n\r\n\r\n";
    const otherContent = "## Other\r\n\r\n\r\n";

    let fullContent = overviewContent + profileContent + involvementContent + historyContent + characterSheetContent + otherContent;
    fullContent = fullContent.replace("!RACE", npc.race ? npc.race : "placeholder_race").replace("!GENDER", npc.gender ? npc.gender : "placeholder_gender").replace("!SOCIAL_TRAITS", npc.funFact ? npc.funFact : "placeholder_fun_fact");


    fs.writeFile(generatedNpcFolder, fullContent, err => {
      if (err) {
        console.error(err);
      } else {
        // file written successfully
      }
    });
}
