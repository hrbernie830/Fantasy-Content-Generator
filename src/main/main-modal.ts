import { App, DropdownComponent, Modal, Setting } from "obsidian";
import FantasyPlugin from "main";
import { NPCGeneratorComponent } from "src/generators/npc-generator/view/npc-generator-component";
import { InnGeneratorComponent } from "src/generators/inn-generator/view/inn-generator-component";
import { generateDrink } from "src/generators/drink-generator/service/drink-generation-service";
import { generateLoot } from "src/generators/loot-generator/service/loot-generation-service";
import { LootGeneratorSettings } from "src/generators/loot-generator/model/LootGeneratorSettings";
import { generateMetal } from "src/generators/metal-generator/service/metal-generation-service";
import { Loot } from "src/generators/loot-generator/model/Loot";
import { generateReligion } from "src/generators/religion-generator/service/religion-generation-service";
import { generateShipName } from "src/generators/ship-generator/service/ship-generation-service";

const generatorDisplayTypes: string[] = ["NPC", "Inn", "Drink", "Religion", "Metal", "Ship"]

export class GeneratorModal extends Modal {
    result: string | Error;
    onSubmit: (result: string | Error) => void;
    plugin: FantasyPlugin;
    constructor(app: App, onSubmit: (result: string | Error) => void, plugin: FantasyPlugin) {
        super(app);
        this.onSubmit = onSubmit;
        this.plugin = plugin;

  }

  mainDiv: HTMLElement;
  optionsDiv: HTMLElement;
  contentDiv: HTMLElement;
  generatorSelectDiv: HTMLElement;

    onOpen() {
        this.createGeneratorSelectionDropdown();
    }

    createGeneratorSelectionDropdown() {
        const { contentEl } = this;
        const amountToGen = 1;

        contentEl.innerHTML = "";
  
        this.mainDiv = contentEl.createDiv();
        this.mainDiv.createEl("h1", { text: "DND Generator" });
        this.generatorSelectDiv = this.mainDiv.createDiv();
        const select = new DropdownComponent(this.generatorSelectDiv);
        generatorDisplayTypes.forEach((generatorType,index) => {
            select.addOption(generatorType.toLowerCase(), generatorType);
        });

        this.contentDiv = this.mainDiv.createDiv();
  
        this.optionsDiv = contentEl.createDiv();
        // default
        const npcGeneratorComponent = new NPCGeneratorComponent(this.contentDiv, this.plugin.settings.nameFileLocation, this.plugin.settings.funFactFileLocation);
        const innGenerationComponent = new InnGeneratorComponent(this.contentDiv, this.plugin.settings.innSettings);
        
        select.onChange((typeSelected) => {
            this.contentDiv.innerHTML = "";
            this.optionsDiv.innerHTML = "";
            switch (typeSelected) {
                case "npc":
                    npcGeneratorComponent.createView();
                    break;
                case "inn":
                    innGenerationComponent.createView();
                    break;
                case "ship":
                    this.generatorCustomSettings(this.optionsDiv, generateShipName);
                    break;
                case "religion":
                    this.generatorCustomSettings(this.optionsDiv, generateReligion);
                    break;
                case "drink":
                    this.generatorCustomSettings(this.optionsDiv, generateDrink, this.plugin.settings.drinkSettings);
                    break;
                case "metal":
                    this.generatorCustomSettings(this.optionsDiv, generateMetal);
                    break;
                case "loot":
                    this.generatorLootSettings(this.optionsDiv, amountToGen, generateLoot, this.plugin.settings.enableCurrency, this.plugin.settings.currencyFrequency, this.plugin.settings.currencyTypes);
                    break;
                default:
                    this.optionsDiv.innerHTML = "";
                    break;
           } 
        });
    }
    
    generatorLootSettings(settingsdiv: HTMLElement, genAmount: number, generatorFunction: (enableCurrency:boolean, currencyFrequency: number, currencyTypes: object[], lootTable: LootGeneratorSettings) => Loot, enableCurrency:boolean, currencyFrequency: number, currencyTypes: object[]) {
        settingsdiv.empty();
        settingsdiv.createEl("h3", { text: "Settings" });
        genAmount = 1;
        let list = '';
        new Setting(settingsdiv)
        .setName("Amount to Generate")
        .addText((text) => {
        text.onChange((value) => genAmount = Number(value));
        })
            .addButton((btn) =>
                btn
                    .setButtonText("Generate")
                    .setCta()
                    .onClick(() => {
                    for (let index = 0; index < genAmount; index++) {
                    
                    const shipName: Loot = generatorFunction(enableCurrency, currencyFrequency, currencyTypes, this.plugin.settings.lootSettings);
                    
                    new Setting(settingsdiv).addToggle((toggle) => {
                        toggle.onChange((value) => {
                            if (value === true) {    
                                list += shipName + "\n";
                            } else {
                                const fullCIndex = list.indexOf(shipName.getName());
                                list = fullCIndex === -1 ? list : list.slice(0, fullCIndex) + list.slice(fullCIndex + shipName.getName().length);
                            }
                        })
                            .setValue(true);
                    }).setName(shipName.getName());
                
                }
                })).addButton((btn) =>
                btn
                    .setButtonText("Copy")
                    .setCta()
                        .onClick(() => {
                        if (list === '') {
                            this.result = new Error("Nothing Was Selected to Copy.");
                        } else {
                            this.result = list;
                        }     
                        this.close();
                        this.onSubmit(this.result);
                    }));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    generatorCustomSettings(settingsdiv: HTMLElement, generatorFunction: (settings ?: any) => any, settings ?: any) {
        settingsdiv.empty();
        settingsdiv.createEl("h3", { text: "Settings" });
        let list = "";
        new Setting(settingsdiv).addButton((btn) =>
            btn
              .setButtonText("Generate")
              .setCta()
              .onClick(() => {
                let shipName = '';
                if (settings !== undefined) {
                    shipName = generatorFunction(settings).name;
                } else {
                    shipName = generatorFunction().name;
                }
                new Setting(settingsdiv).addToggle((toggle) => {
                    toggle.onChange((value) => {
                        if (value === true) {    
                            list += shipName + "\n\n";
                        } else {
                            const fullCIndex = list.indexOf(shipName);
                            list = fullCIndex === -1 ? list : list.slice(0, fullCIndex) + list.slice(fullCIndex + shipName.length);
                        }
                    })
                        .setValue(true);
                }).setName(shipName);
            }))
  }
    
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}