import { Setting, ButtonComponent  } from "obsidian";
import { LootGeneratorService } from "./loot-generation-service";
import { NPC } from "src/types/npc/NPC";
import FantasyPlugin from "main";
import { Loot } from "../../../types/loot/Loot";

export class LootGeneratorComponent {

    parentDiv: HTMLElement;
    settingsDiv: HTMLElement;
    resultsDiv: HTMLElement;
    actionsDiv: HTMLElement;
    npcActionsDiv: HTMLElement;

    firstNameLockButton: ButtonComponent;
    familyNameLockButton: ButtonComponent;
    funFactLockButton: ButtonComponent;

    service: LootGeneratorService;

    genSettings = { cr: ""};

    lockedNPC = new NPC();
    currentNPC = new NPC();

    plugin: FantasyPlugin;

    createLootLists: Loot = new Loot('LOOT VALUE');

    constructor(parentDiv: HTMLElement, plugin: FantasyPlugin) {
        this.parentDiv = parentDiv;
        this.plugin = plugin;

        this.service = new LootGeneratorService();

        this.createView();
    }

    createView() {
        this.parentDiv.innerHTML = "";

        this.genSettings = {
            cr: "0"
        }
        
        this.settingsDiv = this.parentDiv.createDiv();
        this.createAndAddGeneratorSettings(this.settingsDiv);
        this.resultsDiv = this.parentDiv.createDiv();
        this.actionsDiv = this.parentDiv.createDiv();
        const overallActionsDiv = this.actionsDiv.createDiv();
        overallActionsDiv.createEl("h5", { text: "General Options" });
        const overallActionButtonsDiv = overallActionsDiv.createDiv({
            attr: {
                style: "display: flex; justify-content: center; padding-bottom: 10px; padding-top: 10px;"
            }
        });
        const resetButtonDiv = overallActionButtonsDiv.createDiv();
        const resetButton = new ButtonComponent(resetButtonDiv);
        resetButton.setButtonText("Reset").setCta().onClick(() => {
            this.createView();
        });
        resetButtonDiv.hidden = true;

        const generateDiv = overallActionButtonsDiv.createDiv({
            attr: {
                style: "padding-left: 10px; padding-right: 10px;"
            }
        });

        const createPageButtonDiv = overallActionButtonsDiv.createDiv();
        const createPageButton = new ButtonComponent(createPageButtonDiv);
        createPageButton.setButtonText("Save to Files").setCta().onClick(() => {
            this.service.generateLootNoteSheet(this.plugin.settings.saveToFileLocation, this.createLootLists);
        });
        createPageButtonDiv.hidden = true;


        

        const generateButton = new ButtonComponent(generateDiv);
        generateButton.setButtonText("Generate").setCta().onClick(() => {
            if(this.genSettings.cr) {
                const loot = this.service.generateItem(this.plugin.settings.lootSettings, this.genSettings);
                this.createLootLists = loot;

                this.resultsDiv.empty()
                this.resultsDiv.createEl("h3", { text: 'Results'});
                //const mapping = loot.getMapping();
                const mapping = loot.getItemMapping();
                let rarity: keyof typeof mapping;
                for (rarity in mapping) {
                    this.resultsDiv.createEl("h6", { text: rarity});
                    for(const item of mapping[rarity]) {
                        this.resultsDiv.createEl("p", { text: item})
                    }
                }
                this.resultsDiv.createEl("h6", { text: "Remaining GP"});
                this.resultsDiv.createEl("p", { text: '' + loot.getMapping()["Remaining GP"]})
                resetButtonDiv.hidden = false;
                createPageButtonDiv.hidden = false;
            }
            
        });
    }

    private createAndAddGeneratorSettings(settingsDiv: HTMLElement) {
        const choicesDiv = this.settingsDiv.createDiv();
        choicesDiv.createEl("h3", { text: "Settings" });
        new Setting(choicesDiv)
        .setName("CR")
        .addText((text) => {
            text.setValue("1");
            text.onChange((value) => {
                this.genSettings.cr = value;
            })
        });
    }

}