import { currency } from "src/settings/Datatypes";
import { Loot } from "../model/Loot";
import { BaseGeneratorService } from "src/generators/base-generator/service/base-generation-service";

export class LootGeneratorService extends BaseGeneratorService {
    GENERATE_NOTE_HIDDEN = true;

    generateItem(settings?: any): Loot {
        const enableCurrency = settings.enableCurrency;
        const currencyFrequency = settings.currencyFrequency;
        const currencyTypes: currency[] = settings.currencyTypes;
        const adj: string[] = settings.lootSettings.adj;
        const items: { item: string, weight: number }[]  = settings.lootSettings.items;
        const itemAmount = Math.floor(Math.random() * 5) + 1;
    
        let loot = '';
        for (let index = 0; index < itemAmount; index++) {
            const randomAdjective = adj[Math.floor(Math.random() * adj.length)];
            const amount = this.generateRareHighNumber(50, 0.1);
            const randomNoun = this.getRandomElement(items);
            const article = /^[aeiou]/i.test(randomAdjective) ? 'an' : 'a';
            const plural = randomNoun?.endsWith('s') ? `${randomNoun}'` : `${randomNoun}s`;
    
            loot += `${amount > 1 ? `${amount} ${randomAdjective} ${plural}` : `${article} ${randomAdjective} ${randomNoun}`}, `;
        }
    
        if (enableCurrency) {
            const shouldGenCurrency = Math.random() * 100;
            const currencyLoot = currencyTypes
                .map((element) => {
                    const randomCurrencyAmount = this.generateRareHighNumberByRarity(element.rarity);
                    return randomCurrencyAmount > 0 ? `${randomCurrencyAmount} ${element.name}, ` : '';
                })
                .join('');
    
            if (shouldGenCurrency < currencyFrequency) {
                loot += currencyLoot;
            }
        }

        return new Loot(loot.slice(0, -2));
      }
    
    private generateRareHighNumber(maxNumber: number, rarityFactor: number) {
        const randomNumber = Math.random();
        const rarity = randomNumber < rarityFactor ? rarityFactor : rarityFactor / 10;
    
        return Math.floor(Math.random() * maxNumber * rarity);
    }

    private generateRareHighNumberByRarity(rarity: string) {
        const rarityFactors: { [key: string]: number } = { common: 0.7, uncommon: 0.5, rare: 0.2, rarest: 0.02 };
        const maxNumbers: { [key: string]: number } = { common: 300, uncommon: 150, rare: 30, rarest: 10 };
        const randomNumber = Math.random();
    
        if (randomNumber > rarityFactors[rarity] || rarityFactors[rarity] === undefined) {
            return 0;
        }
    
        return Math.floor(Math.random() * maxNumbers[rarity]);
    }

    private getRandomElement(arr: { item: string, weight: number }[]): string | undefined {
        const totalWeight: number = arr.reduce((acc, cur) => acc + cur.weight, 0);
        let randomWeight: number = Math.random() * totalWeight;
        for (const { item, weight } of arr) {
            if (randomWeight < weight) {
                return item;
            }
            randomWeight -= weight;
        }
        return undefined;
    }
    
  }
