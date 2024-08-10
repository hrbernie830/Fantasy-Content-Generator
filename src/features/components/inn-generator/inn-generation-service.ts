import { Inn } from "src/types/inn/Inn";
import { InnGeneratorSettings } from "../../../types/inn/InnGeneratorSettings";
import { BaseGeneratorService } from "src/features/components/base-generator/base-generation-service";
import * as FileUtils from '../../../shared/utilities/file-utils';

export class InnGeneratorService extends BaseGeneratorService {
  GENERATE_NOTE_HIDDEN = false;
  
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

  createView(resultsDiv: HTMLElement, currInn: Inn) {
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
  }

  generateItem(innGenerationSettings: InnGeneratorSettings): Inn {
    const prefixIndex = Math.floor(Math.random() * innGenerationSettings.prefixes.length);
    const innTypeIndex = Math.floor(Math.random() * innGenerationSettings.innType.length);
    const nounIndex = Math.floor(Math.random() * innGenerationSettings.nouns.length);
    const descriptionIndex = Math.floor(Math.random() * innGenerationSettings.desc.length);
    const rumorsIndexes = this.generateUniqueNumbers(0, innGenerationSettings.rumors.length);
  
    return new Inn(innGenerationSettings.prefixes[prefixIndex] + " " + innGenerationSettings.nouns[nounIndex] + " " + innGenerationSettings.innType[innTypeIndex], innGenerationSettings.desc[descriptionIndex], [innGenerationSettings.rumors[rumorsIndexes[0]], innGenerationSettings.rumors[rumorsIndexes[1]], innGenerationSettings.rumors[rumorsIndexes[2]]]);
  }

  generateNote(fileLocation: string, item: Inn) {
    const generatedInnFolder = fileLocation + "\\Inns";
    const fileName = item.name + ".md";
    
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
    FileUtils.saveDataToFile(generatedInnFolder, fileName, fullContent)
  }
}

