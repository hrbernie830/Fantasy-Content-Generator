/* eslint-disable @typescript-eslint/no-explicit-any */
import { DrinkGeneratorSettings } from "src/types/drink/DrinkGeneratorSettings";
import { InnGeneratorSettings } from "src/types/inn/InnGeneratorSettings";
import { LootGeneratorSettings } from "src/types/loot/LootGeneratorSettings";
import { NPCGeneratorSettings } from "src/types/npc/NPCGeneratorSettings";
import { FantasyPluginSettings } from "src/types/settings/FantasyPluginSettings";
import * as FileUtils from '../utilities/file-utils';

export function rollDice(diceSideCount: number, modifier: number) {
    return Math.clamp(Math.floor((Math.random() * diceSideCount) + 1) + modifier, 1, diceSideCount);
}

export function convertStringToArray(value: string, arr: string[]): void {
    //const newString = string.replace(/\s/g, '');
    const array = value.split(',');
    array.forEach((el) => {
        arr.push(el);
    })
}

export function fetchRandomElementFromList(list: any[]): any {
    return list[Math.floor(Math.random() * list.length)];
}

export function generateDefaultSettings(): FantasyPluginSettings {
    return {
      saveToFileLocation: FileUtils.getVaultLocation() + '\\z_Generated',
      innSettings: new InnGeneratorSettings(true),
      drinkSettings: new DrinkGeneratorSettings(true),
      lootSettings: new LootGeneratorSettings(true),
      npcSettings: {
        available: new NPCGeneratorSettings(true, true),
        used: new NPCGeneratorSettings(false, false) // TODO - switch to True,
      }
    };
  }