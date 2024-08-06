import { ButtonComponent } from "obsidian";
import { BaseGeneratorService } from "../service/base-generation-service";

export class BaseGeneratorComponent {

    parentDiv: HTMLElement;

    generateClickSettings?: any;
    generatorService: BaseGeneratorService;

    currentItem: any;

    centered = true;

    constructor(parentDiv: HTMLElement, generatorService: BaseGeneratorService, generateClickSettings?: any) {
        this.parentDiv = parentDiv;
        this.generateClickSettings = generateClickSettings;
        this.generatorService = generatorService;
        this.createActionsSection();
    }

    setLeftAligned() {
        this.centered = false;
        this.createActionsSection();
    }

    createActionsSection() {
        this.parentDiv.empty();
        const styleString = "padding-bottom: 6px; padding-top: 18px;" + (this.centered ? " text-align: center;" : "");
        const resultsDiv = this.parentDiv.createDiv({attr: {
            style: styleString
        } });
        const actionsDiv = this.parentDiv.createDiv();

        actionsDiv.createEl("h3", { text: "Actions" });
        this.createAndAddOverallActionsDiv(actionsDiv, resultsDiv);
    }

    private createAndAddOverallActionsDiv(actionsDiv: HTMLElement, resultsDiv: HTMLElement) {
        const overallActionsDiv = actionsDiv.createDiv();
        overallActionsDiv.createEl("h5", { text: "General Options" },);

        const overallActionButtonsDiv = overallActionsDiv.createDiv({
            attr: {
                style: "display: flex; justify-content: center; padding-bottom: 10px; padding-top: 10px;"
            }
        });

        const resetButtonDiv = overallActionButtonsDiv.createDiv();
        const resetButton = new ButtonComponent(resetButtonDiv);
        resetButton.setButtonText("Reset").setCta().onClick(() => {
            this.createActionsSection();
        });
        resetButtonDiv.hidden = true;

        const generateDiv = overallActionButtonsDiv.createDiv({
            attr: {
                style: "padding-left: 10px; padding-right: 10px;"
            }
        });

        const createPageButtonDiv = overallActionButtonsDiv.createDiv();
        if(this.generatorService && !this.generatorService.GENERATE_NOTE_HIDDEN) {
            const createPageButton = new ButtonComponent(createPageButtonDiv);
            createPageButton.setButtonText("Save to Files").setCta().onClick(() => {
                this.generatorService.generateNote(this.currentItem);
            });
            createPageButtonDiv.hidden = true;
        }
        
        const generateButton = new ButtonComponent(generateDiv);
        generateButton.setButtonText("Generate").setCta().onClick(() => {
            resetButtonDiv.hidden = false;
            createPageButtonDiv.hidden = false;
            this.currentItem = this.generatorService.generateItem(this.generateClickSettings);
            this.generatorService.createView(resultsDiv, this.currentItem);
        });
    }
}