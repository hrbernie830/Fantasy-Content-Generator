import { NPC } from "src/generators/npc-generator/model/NPC";
import * as fs from "fs";

export const genderKeyList = ["Male", "Female"];
export const genderValueList = ["Masculine First", "Feminine First", "Neutral First", "Family"];

export const npcNameFilePath = "C:/Users/bernh/Downloads/NPCNames.txt";
export const funFactFilePath1 = "C:/Users/bernh/Downloads/NPCFunFactList.txt";

export function generate(lockedNPC: NPC, nameFilePath: string, funFactFilePath: string): NPC {
    let npcFirstName = '';
    let npcLastName = '';
    let npcFunFact = '';

    const openMap = new Map<string, Map<string, string[]>>;
    const deletedMap = new Map<string, Map<string, string[]>>;

    fillMaps(openMap, deletedMap, nameFilePath);
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
        list = []; //Array.from(openMap.keys()); //[];
    }
    let neutralList = openMap.get(raceKey)?.get(genderValueList[2]);
    if(!neutralList) {
        neutralList = [];
    }

    if(list.length > 0 || neutralList.length > 0) {
        const firstNameIndex = Math.floor(Math.random() * list.length + neutralList.length);

        if(firstNameIndex < list.length) {
            npcFirstName = list.splice(firstNameIndex, 1)[0];
            openMap.get(raceKey)?.set(genderKey, list);
            deletedMap.get(raceKey)?.get(genderKey)?.push(npcFirstName);
        } else {
            npcFirstName = neutralList.splice(firstNameIndex - list.length, 1)[0];
            openMap.get(raceKey)?.set(genderValueList[2], neutralList);
            deletedMap.get(raceKey)?.get(genderValueList[2])?.push(npcFirstName);
        }
    }

    const familyNameList = openMap.get(raceKey)?.get(genderValueList[3]);
    if(familyNameList && familyNameList.length > 0) {
        const lastNameIndex = Math.floor(Math.random() * familyNameList.length);
        npcLastName = familyNameList.splice(lastNameIndex, 1)[0];
        openMap.get(raceKey)?.set(genderValueList[3], familyNameList);
        deletedMap.get(raceKey)?.get(genderValueList[3])?.push(npcLastName);
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

export function markNameAsUsed(name: string | undefined, nameFilePath: string) {
    if(name !== undefined) {
        const openMap = new Map<string, Map<string, string[]>>;
        const deletedMap = new Map<string, Map<string, string[]>>;
    
        fillMaps(openMap, deletedMap, nameFilePath, name);
        reprintFile(openMap, deletedMap, nameFilePath);
    }
}

export function fillMaps(openMap: Map<string, Map<string, string[]>>, deletedMap: Map<string, Map<string, string[]>>, nameFilePath: string, nameToAddToDeleted?: string) {
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
