import * as fs from "fs";
import { Inn } from "src/generators/inn-generator/model/Inn";

export function generateInn(prefixes: string[], innType: string[], nouns: string[], descriptions: string[], rumors: string[]): Inn {
  
    const prefixIndex = Math.floor(Math.random() * prefixes.length);
    const innTypeIndex = Math.floor(Math.random() * innType.length);
    const nounIndex = Math.floor(Math.random() * nouns.length);
    const descriptionIndex = Math.floor(Math.random() * descriptions.length);
    const rumorsIndexes = generateUniqueNumbers(0, rumors.length);
  
    return new Inn(prefixes[prefixIndex] + " " + nouns[nounIndex] + " " + innType[innTypeIndex], descriptions[descriptionIndex], [rumors[rumorsIndexes[0]], rumors[rumorsIndexes[1]], rumors[rumorsIndexes[2]]]);
}
  
function generateUniqueNumbers(min: number, max:number) {
    const numbers: number[] = [];
    while (numbers.length < 3) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
    return numbers;
}


export function generateCharacterNoteSheet(inn: Inn) {
    const generatedInnFolder = "C:\\Users\\bernh\\iCloudDrive\\iCloud~md~obsidian\\Campaign Notes\\z_Generated\\Inns\\" + inn.name + ".md";
    
    const overviewContent = '## Overview\r\n\r\n**Location**: \r\n\r\n\r\n';
    const descriptionContent = "## Description\r\n\r\n" + inn.description + "\r\n\r\n\r\n";
    let rumorsContent = "## Rumors\r\n\r\n";
    if(inn.rumors) {
        for(const rumor of inn.rumors) {
            rumorsContent += "- " + rumor + "\r\n";
        }
    }
    rumorsContent += "\r\n\r\n\r\n";
    const importantPeopleContent = "## Important People\r\n\r\n\r\n";


    const fullContent = overviewContent + descriptionContent + rumorsContent + importantPeopleContent;

    fs.writeFile(generatedInnFolder, fullContent, err => {
      if (err) {
        console.error(err);
      } else {
        // file written successfully
      }
    });
}
