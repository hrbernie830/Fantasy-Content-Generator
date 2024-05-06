
import * as fs from 'fs';
import { Notice } from 'obsidian';
import { DrinkGeneratorSettings } from 'src/generators/drink-generator/model/DrinkGeneratorSettings';
import { InnGeneratorSettings } from "src/generators/inn-generator/model/InnGeneratorSettings";
import { LootGeneratorSettings } from 'src/generators/loot-generator/model/LootGeneratorSettings';
import { NPCGeneratorSettings } from 'src/generators/npc-generator/model/NPCGeneratorSettings';

// currency Datatype for defining custom currency
export type currency = {
    name: string,
    rarity: string
}

export interface FileWithPath extends File {
    path: string
}

// the interface that uses all 
export interface FantasyPluginSettings {
    enableCurrency: boolean;
    currencyTypes: currency[];
    currencyFrequency: number;
    innSettings: InnGeneratorSettings;
    drinkSettings: DrinkGeneratorSettings;
    lootSettings: LootGeneratorSettings;
    npcSettings: NPCGeneratorSettings;
    nameFileLocation: string;
    funFactFileLocation: string;
    usedNpcSettings: NPCGeneratorSettings;
}

export function importJSON(path: string, callback: (data: object) => void): void {
    fs.readFile(path, 'utf8', (error, data) => {
        if (error) {
            new Notice("Error Importing: " + error);
            return;
        }
        const jsonData = JSON.parse(data);
        new Notice("Data Successfully Imported!");
        callback(jsonData);
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function exportJSON(data: any) {
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.download = 'data.json';
    a.href = url;
    a.click();

    new Notice("Data Exporting!");
}

export function weightedRandomItem(table: { string: string, range: number[] }[], roll: number) {

    // Find the object in the table that corresponds to the roll
    const item = table.find(({ range }) => range[0] <= roll && roll <= range[1]);

    // Return the item
    return item?.string;
}



export function rollD20(modifier: number) {
    return Math.clamp(Math.floor((Math.random() * 20) + 1) + modifier, 1, 20);
}

export function rollD100(modifier: number) {
    return Math.clamp(Math.floor((Math.random() * 100) + 1) + modifier, 1, 100);
}