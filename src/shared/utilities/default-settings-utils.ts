/* eslint-disable @typescript-eslint/no-explicit-any */
import * as DEFAULT_INN_SETTINGS from "src/types/inn/InnDefaultSettings";
import * as DEFAULT_DRINK_SETTINGS from "src/types/drink/DrinkDefaultSettings";
import * as DEFAULT_ITEM_SETTINGS from "src/types/loot/LootDefaultSettings";
import * as DEFAULT_NAME_SETTINGS from "src/types/npc/NPCDefaultSettings";

export function generateDefaultInnSettings(): any { 
    return {
        prefixes: JSON.parse(JSON.stringify(DEFAULT_INN_SETTINGS.PREFIXES)),
        innType: JSON.parse(JSON.stringify(DEFAULT_INN_SETTINGS.TYPES)),
        nouns: JSON.parse(JSON.stringify(DEFAULT_INN_SETTINGS.NOUNS)),
        desc: JSON.parse(JSON.stringify(DEFAULT_INN_SETTINGS.DESC)),
        rumors: JSON.parse(JSON.stringify(DEFAULT_INN_SETTINGS.RUMORS))
    }
}

export function generateDefaultDrinkSettings(): any {

    return {
        adj: JSON.parse(JSON.stringify(DEFAULT_DRINK_SETTINGS.ADJECTIVES)),
        nouns: JSON.parse(JSON.stringify(DEFAULT_DRINK_SETTINGS.NOUNS))
    }
}

export function generateDefaultItemList(): any {
    return {
      "Common": JSON.parse(JSON.stringify(DEFAULT_ITEM_SETTINGS.COMMON_ITEMS)),
      "Uncommon": JSON.parse(JSON.stringify(DEFAULT_ITEM_SETTINGS.UNCOMMON_ITEMS)),
      "Rare": JSON.parse(JSON.stringify(DEFAULT_ITEM_SETTINGS.RARE_ITEMS)),
      "Very Rare": JSON.parse(JSON.stringify(DEFAULT_ITEM_SETTINGS.VERY_RARE_ITEMS)),
      "Legendary": JSON.parse(JSON.stringify(DEFAULT_ITEM_SETTINGS.LEGENDARY_ITEMS)),
      "Other": JSON.parse(JSON.stringify(DEFAULT_ITEM_SETTINGS.OTHER_ITEMS))
    }
  }


  export function generateDefaultNPCNameSettings(race: string): any {

    const humanSettings = {
        "raceName": "Human",
        "masculineFirst": DEFAULT_NAME_SETTINGS.HUMAN_MASCULINE_FIRST,
        "feminineFirst": DEFAULT_NAME_SETTINGS.HUMAN_FEMININE_FIRST,
        "neutralFirst": DEFAULT_NAME_SETTINGS.HUMAN_NEUTRAL_FIRST,
        "family": DEFAULT_NAME_SETTINGS.HUMAN_FAMILY
    }
    const elfSettings = {
        "raceName": "Elf",
        "masculineFirst": DEFAULT_NAME_SETTINGS.ELF_MASCULINE_FIRST,
        "feminineFirst": DEFAULT_NAME_SETTINGS.ELF_FEMININE_FIRST,
        "neutralFirst": DEFAULT_NAME_SETTINGS.ELF_NEUTRAL_FIRST,
        "family": DEFAULT_NAME_SETTINGS.ELF_FAMILY
    }

    const dwarfSettings = {
        "raceName": "Dwarf",
        "masculineFirst": DEFAULT_NAME_SETTINGS.DWARF_MASCULINE_FIRST,
        "feminineFirst": DEFAULT_NAME_SETTINGS.DWARF_FEMININE_FIRST,
        "neutralFirst": DEFAULT_NAME_SETTINGS.DWARF_NEUTRAL_FIRST,
        "family": DEFAULT_NAME_SETTINGS.DWARF_FAMILY
    }

    const halflingSettings = {
        "raceName": "Halfling",
        "masculineFirst": DEFAULT_NAME_SETTINGS.HALFLING_MASCULINE_FIRST,
        "feminineFirst": DEFAULT_NAME_SETTINGS.HALFLING_FEMININE_FIRST,
        "neutralFirst": DEFAULT_NAME_SETTINGS.HALFLING_NEUTRAL_FIRST,
        "family": DEFAULT_NAME_SETTINGS.HALFLING_FAMILY
    }

    const goblinSettings = {
        "raceName": "Goblin",
        "masculineFirst": DEFAULT_NAME_SETTINGS.GOBLIN_MASCULINE_FIRST,
        "feminineFirst": DEFAULT_NAME_SETTINGS.GOBLIN_FEMININE_FIRST,
        "neutralFirst": DEFAULT_NAME_SETTINGS.GOBLIN_NEUTRAL_FIRST,
        "family": DEFAULT_NAME_SETTINGS.GOBLIN_FAMILY
    }


    const overallSettings = {
        "human": humanSettings,
        "elf": elfSettings,
        "dwarf": dwarfSettings,
        "halfling": halflingSettings,
        "goblin": goblinSettings
    }


    return JSON.parse(JSON.stringify(overallSettings[race.toLowerCase() as keyof typeof overallSettings]));
}

export function generateDefaultNPCFunFactSettings() {
    return JSON.parse(JSON.stringify(DEFAULT_NAME_SETTINGS.FUN_FACT_LIST));
}