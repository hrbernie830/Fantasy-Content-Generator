import { ButtonComponent } from "obsidian";
import * as service from "src/generators/inn-generator/service/inn-generation-service";
import { Inn } from "src/generators/inn-generator/model/Inn";
import { InnGeneratorSettings } from "src/generators/inn-generator/model/InnGeneratorSettings";

export class InnGeneratorComponent {

    parentDiv: HTMLElement;
    resultsDiv: HTMLElement;
    innGenerationSettings: InnGeneratorSettings;

    currInn: Inn;


    constructor(parentDiv: HTMLElement, innGenerationSettings: InnGeneratorSettings) {
        this.parentDiv = parentDiv;
        this.innGenerationSettings = innGenerationSettings;
    }

    createView() {
        this.parentDiv.empty();
        this.resultsDiv = this.parentDiv.createDiv();
        const actionsDiv = this.parentDiv.createDiv();

        actionsDiv.createEl("h3", { text: "Actions" });
        this.createAndAddOverallActionsDiv(actionsDiv);
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
            service.generateCharacterNoteSheet(this.currInn);
        });
        createPageButtonDiv.hidden = true;

        
        const generateButton = new ButtonComponent(generateDiv);
        generateButton.setButtonText("Generate").setCta().onClick(() => {
            resetButtonDiv.hidden = false;
            createPageButtonDiv.hidden = false;
            this.onGenerateButtonClicked();
        });
    }

    private onGenerateButtonClicked() {
        this.currInn = service.generateInn(this.innGenerationSettings.prefixes, this.innGenerationSettings.innType, this.innGenerationSettings.nouns, this.innGenerationSettings.desc, this.innGenerationSettings.rumors);

        this.resultsDiv.empty();
        this.resultsDiv.createEl("h3", { text: this.currInn.name });

        this.resultsDiv.createEl("h6", { text: "Description"});
        const descDiv = this.resultsDiv.createDiv();
        const descBody = descDiv.createDiv();
        descBody.createEl("div", { text: this.currInn.description });

        this.resultsDiv.createEl("h6", { text: "Rumors"});
        if(this.currInn.rumors) {
            for(const rumor of this.currInn.rumors) {
                const rumorDiv = this.resultsDiv.createDiv({
                    attr: {
                        style: "padding-bottom: 10px;"
                    }
                });
                const rumorBody = rumorDiv.createDiv();
                rumorBody.createEl("div", { text: rumor });
            }
        }

        
    }
}