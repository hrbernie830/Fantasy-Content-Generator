import { Drink } from "../model/Drink";
import { DrinkGeneratorSettings } from "../model/DrinkGeneratorSettings";

export function generateDrink(settings: DrinkGeneratorSettings): Drink {
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