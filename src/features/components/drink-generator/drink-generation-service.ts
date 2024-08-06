import { BaseGeneratorService } from "src/features/components/base-generator/base-generation-service";
import { Drink } from "../../../types/drink/Drink";


export class DrinkGeneratorService extends BaseGeneratorService {
    GENERATE_NOTE_HIDDEN = true;
  
    generateItem(settings?: any): Drink {
        const adjectives = settings.adj;
        const nouns = settings.nouns;
        
        let adjectivetotal = "";
        const numAdjectives = Math.random() < 0.5 ? 1 : 2;
        for (let i = 0; i < numAdjectives; i++) {
            const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
            adjectivetotal += randomAdjective + " ";
        }
        const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
        
        return new Drink(`${adjectivetotal} ${randomNoun}`);
    }
}

