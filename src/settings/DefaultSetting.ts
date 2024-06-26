import { InnGeneratorSettings } from "src/generators/inn-generator/model/InnGeneratorSettings";
import { FantasyPluginSettings } from "./Datatypes";
import { DrinkGeneratorSettings } from "src/generators/drink-generator/model/DrinkGeneratorSettings";
import { LootGeneratorSettings } from "src/generators/loot-generator/model/LootGeneratorSettings";

//The Default Settings for the Plugin.
export const DEFAULT_SETTINGS: FantasyPluginSettings = {
    enableCurrency: false,
    innSettings: new InnGeneratorSettings(true),
    currencyTypes: [{
        "name": "GP",
        "rarity": "rare"
    },
    {
        "name": "CP",
        "rarity": "common"
    },
    {
        "name": "SP",
        "rarity": "common"
    },
    {
        "name": "PP",
        "rarity": "rarest"
    }],
    currencyFrequency: 50,
    drinkSettings: new DrinkGeneratorSettings(true),
    lootSettings: new LootGeneratorSettings(true),
    nameFileLocation: "",
    funFactFileLocation: ""
}