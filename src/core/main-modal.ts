import { App, DropdownComponent, Modal, Setting } from "obsidian";
import FantasyPlugin from "main";
import { NPCGeneratorComponent } from "src/features/components/npc-generator/npc-generator-component";
import { DrinkGeneratorService } from "src/features/components/drink-generator/drink-generation-service";
import { MetalGeneratorService } from "src/features/components/metal-generator/metal-generation-service";
import { ShipGeneratorService } from "src/features/components/ship-generator/ship-generation-service";
import { BaseGeneratorComponent } from "src/features/components/base-generator/base-generator-component";
import { InnGeneratorService } from "src/features/components/inn-generator/inn-generation-service";
import { ReligionGeneratorService } from "src/features/components/religion-generator/religion-generation-service";
import { LootGeneratorComponent } from "src/features/components/loot-generator/loot-generator-component";



const generatorDisplayTypes: string[] = ["NPC", "Inn", "Drink", "Religion", "Metal", "Ship", "Loot (experimental)"]

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
        
        const npcGeneratorComponent = new NPCGeneratorComponent(this.contentDiv, this.plugin);
        select.onChange((typeSelected) => {
            this.contentDiv.innerHTML = "";
            this.optionsDiv.innerHTML = "";
            switch (typeSelected.toLowerCase()) {
                case "npc":
                    npcGeneratorComponent.createView();
                    break;
                case "inn":
                    new BaseGeneratorComponent(this.contentDiv, new InnGeneratorService(), this.plugin.settings.innSettings).setLeftAligned();
                    break;
                case "ship":
                    new BaseGeneratorComponent(this.contentDiv, new ShipGeneratorService());
                    break;
                case "religion":
                    new BaseGeneratorComponent(this.contentDiv, new ReligionGeneratorService());
                    break;
                case "drink":
                    new BaseGeneratorComponent(this.contentDiv, new DrinkGeneratorService(), this.plugin.settings.drinkSettings);
                    break;
                case "metal":
                    new BaseGeneratorComponent(this.contentDiv, new MetalGeneratorService());
                    break;
                case "loot (experimental)":
                    //new BaseGeneratorComponent(this.contentDiv, new LootGeneratorService(), this.plugin.settings);
                    new LootGeneratorComponent(this.contentDiv, this.plugin).createView();
                    break;
                default:
                    this.optionsDiv.innerHTML = "";
                    break;
           } 
        });
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