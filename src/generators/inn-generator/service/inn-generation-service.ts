import * as fs from "fs";
import { Inn } from "src/generators/inn-generator/model/Inn";
import { InnGeneratorSettings } from "../model/InnGeneratorSettings";
import { GeneratorService } from "src/generators/generator/service/generation-service";


export class InnGeneratorService extends GeneratorService {
  GENERATE_NOTE_HIDDEN = false;

  private generateInn(prefixes: string[], innType: string[], nouns: string[], descriptions: string[], rumors: string[]): Inn {
    const prefixIndex = Math.floor(Math.random() * prefixes.length);
    const innTypeIndex = Math.floor(Math.random() * innType.length);
    const nounIndex = Math.floor(Math.random() * nouns.length);
    const descriptionIndex = Math.floor(Math.random() * descriptions.length);
    const rumorsIndexes = this.generateUniqueNumbers(0, rumors.length);
  
    return new Inn(prefixes[prefixIndex] + " " + nouns[nounIndex] + " " + innType[innTypeIndex], descriptions[descriptionIndex], [rumors[rumorsIndexes[0]], rumors[rumorsIndexes[1]], rumors[rumorsIndexes[2]]]);
  }
  
  private generateUniqueNumbers(min: number, max:number) {
    const numbers: number[] = [];
    while (numbers.length < 3) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
    return numbers;
  }

  onGenerateButtonClicked(resultsDiv: HTMLElement, innGenerationSettings: InnGeneratorSettings): Inn {
    const currInn = this.generateInn(innGenerationSettings.prefixes, innGenerationSettings.innType, innGenerationSettings.nouns, innGenerationSettings.desc, innGenerationSettings.rumors);

    resultsDiv.empty();
    resultsDiv.createEl("h3", { text: currInn.name });

    resultsDiv.createEl("h6", { text: "Description"});
    const descDiv = resultsDiv.createDiv();
    const descBody = descDiv.createDiv();
    descBody.createEl("div", { text: currInn.description });

    resultsDiv.createEl("h6", { text: "Rumors"});
    if(currInn.rumors) {
        for(const rumor of currInn.rumors) {
            const rumorDiv = resultsDiv.createDiv({
                attr: {
                    style: "padding-bottom: 10px;"
                }
            });
            const rumorBody = rumorDiv.createDiv();
            rumorBody.createEl("div", { text: rumor });
        }
    }

    return currInn;
  }


  generateNote(item: Inn) {
    const generatedInnFolder = "C:\\Users\\bernh\\iCloudDrive\\iCloud~md~obsidian\\Campaign Notes\\z_Generated\\Inns\\" + item.name + ".md";
    
    const overviewContent = '## Overview\r\n\r\n**Location**: \r\n\r\n\r\n';
    const descriptionContent = "## Description\r\n\r\n" + item.description + "\r\n\r\n\r\n";
    let rumorsContent = "## Rumors\r\n\r\n";
    if(item.rumors) {
        for(const rumor of item.rumors) {
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
}

