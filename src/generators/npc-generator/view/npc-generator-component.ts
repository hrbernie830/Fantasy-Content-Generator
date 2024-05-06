import { Setting, ButtonComponent  } from "obsidian";
import * as npcGenerationService from "src/generators/npc-generator/service/npc-generation-service";
import { NPC } from "src/generators/npc-generator/model/NPC";
import FantasyPlugin from "main";

export class NPCGeneratorComponent {

    parentDiv: HTMLElement;
    settingsDiv: HTMLElement;
    resultsDiv: HTMLElement;
    actionsDiv: HTMLElement;
    npcActionsDiv: HTMLElement;

    firstNameLockButton: ButtonComponent;
    familyNameLockButton: ButtonComponent;
    funFactLockButton: ButtonComponent;

    genSettings = { race: "", gender: "" };

    lockedNPC = new NPC();
    currentNPC = new NPC();

    nameFileLocation: string;
    funFactFileLocation: string;

    plugin: FantasyPlugin;

    constructor(parentDiv: HTMLElement, nameFileLocation: string, funFactFileLocation: string, plugin: FantasyPlugin) {
        this.parentDiv = parentDiv;
        this.nameFileLocation = nameFileLocation;
        this.funFactFileLocation = funFactFileLocation;
        this.plugin = plugin;

        this.createView();
    }

    createView() {
        this.parentDiv.innerHTML = "";

        this.genSettings = {
            race: "Human",
            gender: "Any"
        }
        
        this.settingsDiv = this.parentDiv.createDiv();
        this.createAndAddGeneratorSettings(this.settingsDiv);
        this.resultsDiv = this.parentDiv.createDiv();
        this.actionsDiv = this.parentDiv.createDiv();

        this.actionsDiv.createEl("h3", { text: "Actions" });
        this.createAndAddNPCSpecificActions(this.actionsDiv);
        this.createAndAddOverallActionsDiv(this.actionsDiv);

        this.npcActionsDiv.hidden = true;

        this.currentNPC = new NPC();
        this.lockedNPC = new NPC();
    }

    private createAndAddGeneratorSettings(settingsDiv: HTMLElement) {
        const choicesDiv = this.settingsDiv.createDiv();
        choicesDiv.createEl("h3", { text: "Settings" });
        new Setting(choicesDiv)
        .setName("Race")
        .addDropdown((drop) => {
            NPC.RACE_OPTIONS.forEach((race,index) => {
                drop.addOption(race, race);
            })
            drop.onChange((value) => {
                this.genSettings.race = value;
            })
        });

        new Setting(choicesDiv)
            .setName("Male or Female?")
            .addDropdown((drop) => {
                drop.addOption("Any", "Any");
                drop.addOption("Male", "Male");
                drop.addOption("Female", "Female");
                drop.onChange((value) => {
                    this.genSettings.gender = value;
                })
            });
    }

    private createAndAddNPCSpecificActions(actionsDiv: HTMLElement) {
        this.npcActionsDiv = actionsDiv.createDiv();
        this.npcActionsDiv.createEl("h5", { text: "Current NPC Options" });

        const npcActionButtonsDiv = this.npcActionsDiv.createDiv({
            attr: {
                style: "display: flex; justify-content: center; padding-bottom: 10px; padding-top: 10px;"
            }
        });

        this.firstNameLockButton = new ButtonComponent(npcActionButtonsDiv);
        this.firstNameLockButton.setButtonText("Lock First Name").setCta().setDisabled(true).onClick(() => {
            this.onFirstNameLockButtonClicked();
        });

        const familyNameLockDiv = npcActionButtonsDiv.createDiv({
            attr: {
                style: "padding-left: 10px; padding-right: 10px;"
            }
        });
        
        this.familyNameLockButton = new ButtonComponent(familyNameLockDiv);
        this.familyNameLockButton.setButtonText("Lock Family Name").setCta().setDisabled(true).onClick(() => {
            this.onFamilyNameLockButtonClicked();
        });

        
        this.funFactLockButton = new ButtonComponent(npcActionButtonsDiv);
        this.funFactLockButton.setButtonText("Lock Fun Fact").setCta().setDisabled(true).onClick(() => {
            this.onFunFactLockButtonClicked();
        });
    }

    private onFirstNameLockButtonClicked() {
        npcGenerationService.markNameAsUsed(this.currentNPC.firstName, this.plugin, this.lockedNPC.getRaceOrDefault('Human'));
        this.lockedNPC.firstName = this.currentNPC.firstName;
        this.firstNameLockButton.setDisabled(true);
        this.firstNameLockButton.removeCta();
    }

    private onFamilyNameLockButtonClicked() {
        npcGenerationService.markNameAsUsed(this.currentNPC.familyName, this.plugin, this.lockedNPC.getRaceOrDefault('Human'), true);
        this.lockedNPC.familyName = this.currentNPC.familyName;
        this.familyNameLockButton.setDisabled(true);
        this.familyNameLockButton.removeCta();
    }

    private onFunFactLockButtonClicked() {
        npcGenerationService.markFunFactAsUsed(this.currentNPC.funFact, this.funFactFileLocation);
        this.lockedNPC.funFact = this.currentNPC.funFact;
        this.funFactLockButton.setDisabled(true);
        this.funFactLockButton.removeCta();
    }

    private createAndAddOverallActionsDiv(actionsDiv: HTMLElement) {
        const overallActionsDiv = actionsDiv.createDiv();
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
            npcGenerationService.generateCharacterNoteSheet(this.currentNPC);
        });
        createPageButtonDiv.hidden = true;

        const generateButton = new ButtonComponent(generateDiv);
        generateButton.setButtonText("Generate").setCta().onClick(() => {
            if(!this.lockedNPC.race || !this.lockedNPC.gender) {
                this.lockSettings(resetButtonDiv, createPageButtonDiv);
            }
            this.onGenerateButtonClicked();
        });
    }

    private onGenerateButtonClicked() {
        this.currentNPC = npcGenerationService.generate(this.lockedNPC, this.nameFileLocation, this.funFactFileLocation, this.plugin.settings.npcSettings, this.plugin.settings.usedNpcSettings);

        this.genSettings.gender = this.currentNPC.getGenderOrDefault('');
        this.genSettings.race = this.currentNPC.getRaceOrDefault('');

        this.resultsDiv.empty();

        this.resultsDiv.createEl("h3", { text: this.currentNPC.firstName + " " + this.currentNPC.familyName });
        this.resultsDiv.createEl("h6", { text: this.currentNPC.race + " " + this.currentNPC.gender});
        const personalityDiv = this.resultsDiv.createDiv();
        const personalityBody = personalityDiv.createDiv();
        personalityBody.createEl("div", { text: this.currentNPC.funFact });

        this.firstNameLockButton.setDisabled(!!this.lockedNPC.firstName);
        this.familyNameLockButton.setDisabled(!!this.lockedNPC.familyName);
        this.funFactLockButton.setDisabled(!!this.lockedNPC.funFact);
    }

    private lockSettings(resetButtonDiv: HTMLElement, createPageButtonDiv: HTMLElement) {
        this.npcActionsDiv.hidden = false;
        this.settingsDiv.hidden = true;
        this.lockedNPC.race = this.genSettings.race;
        this.lockedNPC.gender = this.genSettings.gender;
        resetButtonDiv.hidden = false;
        createPageButtonDiv.hidden = false;
    }
}