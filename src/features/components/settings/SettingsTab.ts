import FantasyPlugin from "main";
import { PluginSettingTab, App, Setting, Platform } from "obsidian";
import { exportJSON, importJSON } from "../../../shared/utilities/shared-utils";
import { FileWithPath } from "src/types/settings/FileWithPath";
import { DEFAULT_SETTINGS } from "../../../shared/default-settings/DefaultSetting";
import { InnGeneratorSettings } from "src/types/inn/InnGeneratorSettings";
import { DrinkGeneratorSettings } from "src/types/drink/DrinkGeneratorSettings";
import { LootGeneratorSettings } from "src/types/loot/LootGeneratorSettings";
import { NPCRaceSettings } from "src/types/npc/NPCRaceSettings";
import { NPCGeneratorSettings } from "src/types/npc/NPCGeneratorSettings";
import { ITEM_LIST } from "../../../shared/default-settings/DefaultSetting";

export class SettingsTab extends PluginSettingTab {
    plugin: FantasyPlugin;

    private npcDiv: HTMLDivElement;
    private innDiv: HTMLDivElement;
    private drinkDiv: HTMLDivElement;
    private lootDiv: HTMLDivElement;

    constructor(app: App, plugin: FantasyPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    convertStringToArray(string: string, arr: string[]): void {
        //const newString = string.replace(/\s/g, '');
        const array = string.split(',');
        array.forEach((el) => {
            arr.push(el);
        })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createSettingsBlock(hasGenericTable: boolean, containerEl: HTMLElement, textA: string, arr: any[], type: string, weights: boolean): void {
        new Setting(containerEl).setName(type + " being used").setDesc("Click 'remove' for any item you want removed from the Array");
        this.createTableBlock(hasGenericTable, containerEl, arr, weights, undefined, textA, type);
        
    }

    createTableBlock(genericTable: boolean, containerEl: HTMLElement, arr: any[], weights: boolean, usedArr?: any[], placeholderText?: string,  tableHeader?: string) {
        let preText = placeholderText ? placeholderText : '';
        const newAdditionSetting = new Setting(containerEl)
        .setName("New Addition:")
        .addTextArea((text) => {
            text.onChange((value) => {
                preText = value;
            })
        });

        const tableDiv = containerEl.createDiv();
        if(genericTable) {
            this.createGenericArrTable(tableDiv, arr, weights, tableHeader);
        } else {
            this.createTableDiv(tableDiv, arr, weights, usedArr);
        }

        newAdditionSetting.addButton((btn) => {
            btn.setCta().setButtonText("Add")
                .onClick(async () => {
                    this.convertStringToArray(preText, arr);
                    if(genericTable) {
                        this.createGenericArrTable(tableDiv, arr, weights, tableHeader);
                    } else {
                        this.createTableDiv(tableDiv, arr, weights, usedArr);
                    }
                    
                    await this.plugin.saveSettings();
                })
        })

        containerEl.createEl('hr');
    }

    createTableDiv(containerEl: HTMLElement, arr: any[], weights: boolean, usedArr?: any[]) {
        containerEl.innerHTML = '';
        const tableDiv = containerEl.createDiv();
        this.createUnusedArrTable(containerEl, tableDiv, arr, weights, usedArr);
        this.createUsedArrTable(containerEl, tableDiv, arr, weights, usedArr);
    }

    createGenericArrTable(containerEl: HTMLElement, arr: any[], weights: boolean, textA?: string, removeCallbackFn?: any) {
        containerEl.innerHTML = '';
        const genericFoldDiv = containerEl.createEl('details', { cls: "OFCGDetails" });
        const tableHeaderText = textA ? textA + ' Included in Generator' : 'Options Included in Generator';
        genericFoldDiv.createEl("summary", { text: tableHeaderText, cls: "OFCGSummary" });
        genericFoldDiv.setAttribute('open', '');
        for (let index = 0; index < arr.length; index++) {
            new Setting(genericFoldDiv)
                .setName(weights ? JSON.stringify(arr[index]) : arr[index])
                .addButton((btn) => btn
                    .setCta()
                    .setButtonText("Remove")
                    .onClick(async () => {
                        if(!removeCallbackFn) {
                            arr.splice(index, 1);
                            this.createTableDiv(containerEl, arr, weights);
                            await this.plugin.saveSettings();
                        } else {
                            removeCallbackFn(arr[index]);
                        }
                        
                    })
                )
        }
    }

    createUsedArrTable(parentEl: HTMLElement, containerEl: HTMLElement, arr: any[], weights: boolean, usedArr?: any[]) {
        if(usedArr) {
            const usedFoldDiv = containerEl.createEl('details', { cls: "OFCGDetails" });
            usedFoldDiv.createEl("summary", { text: 'Used Options Not Included in Generator', cls: "OFCGSummary" });
            usedFoldDiv.setAttribute('open', '');
            for (let index = 0; index < usedArr.length; index++) {
                new Setting(usedFoldDiv)
                    .setName(weights ? JSON.stringify(usedArr[index]) : usedArr[index])
                    .addButton((btn) => btn
                        .setCta()
                        .setButtonText("Mark as Unused")
                        .onClick(async () => {
                            arr.push(usedArr.splice(index, 1)[0]);
                            this.createTableDiv(parentEl, arr, weights, usedArr);
                            await this.plugin.saveSettings();
                        })
                    )
                    .addButton((btn) => btn
                        .setCta()
                        .setButtonText("Remove")
                        .onClick(async () => {
                            usedArr.splice(index, 1);
                            this.createTableDiv(parentEl, arr, weights, usedArr);
                            await this.plugin.saveSettings();
                        })
                    )
            }
        }
    }

    createUnusedArrTable(parentEl: HTMLElement, containerEl: HTMLElement, arr: any[], weights: boolean, usedArr?: any[]) {
        const foldDiv = containerEl.createEl('details', { cls: "OFCGDetails" });
        const prefix = usedArr ? 'Unused ' : '';
        foldDiv.createEl("summary", { text: prefix + 'Options Included in Generator', cls: "OFCGSummary" });
        foldDiv.setAttribute('open', '');
        for (let index = 0; index < arr.length; index++) {
            const foldDivSetting = new Setting(foldDiv)
                .setName(weights ? JSON.stringify(arr[index]) : arr[index]);
            if(usedArr) {
                foldDivSetting.addButton((btn) => btn
                        .setCta()
                        .setButtonText("Mark as Used")
                        .onClick(async () => {
                            usedArr.push(arr.splice(index, 1)[0]);
                            this.createTableDiv(parentEl, arr, weights, usedArr);
                            await this.plugin.saveSettings();
                        })
                    )
            }
                
            foldDivSetting.addButton((btn) => btn
                    .setCta()
                    .setButtonText("Remove")
                    .onClick(async () => {
                        arr.splice(index, 1);
                        containerEl.removeChild(foldDiv);
                        this.createTableDiv(parentEl, arr, weights, usedArr);
                        await this.plugin.saveSettings();
                    })
                )
        }
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        containerEl.createEl('h1', { text: 'Fantasy Content Generator',  });
        const generalSettings = containerEl.createDiv("general")
        new Setting(generalSettings)
            .setName('Reset To Defaults')
            .setDesc('Click if you would like to use the default settings again')
            .addButton((btn) => {
                btn.setCta()
                    .setButtonText("Reset")
                    .onClick(async () => {
                        this.plugin.settings = DEFAULT_SETTINGS;
                        this.display();
                        await this.plugin.saveSettings();
                    })
            });

        this.npcDiv = this.containerEl.createDiv({attr: {
            style: "padding-left: 15px;"
        }});
        this.generateNpcSettingsBlock(this.npcDiv);

        this.innDiv = this.containerEl.createDiv({attr: {
            style: "padding-left: 15px;"
        }});
        this.generateInnSettingsBlock(this.innDiv);

        this.drinkDiv = this.containerEl.createDiv({attr: {
            style: "padding-left: 15px;"
        }});
        this.generateDrinkSettingsBlock(this.drinkDiv);
        
        this.lootDiv = this.containerEl.createDiv({attr: {
            style: "padding-left: 15px;"
        }});
        this.generateLootSettingsBlock(this.lootDiv);
    }

    createTapToExpandDiv(parentDiv: HTMLElement, settingName: string, startExpanded?: boolean, headerKind?: string): HTMLElement {
        const outerDiv = parentDiv.createDiv({
            attr: {
                style: "padding-top: 10px;"
            }
        });
        const header = outerDiv.createEl(headerKind === "h1" ? "h1" : (headerKind === "h2" ? "h2" : (headerKind === "h3" ? "h3" : (headerKind === "h4" ? "h4" : "h5"))), { text: settingName + " (tap to expand)" });

        const expandedDiv = outerDiv.createDiv();

        header.onclick = function() {
            if(header.innerHTML.contains("expand")) {
                header.innerHTML = settingName + " (tap to collapse)";
                expandedDiv.hidden = false;
            } else {
                header.innerHTML = settingName + " (tap to expand)";
                expandedDiv.hidden = true;
            }
        };

        if(startExpanded) {
            header.click();
        } else {
            expandedDiv.hidden = true;
        }

        return expandedDiv;
    }

    generateLootSettingsBlock(lootDiv: HTMLElement, startExpanded?: boolean) {
        this.lootDiv.innerHTML = '';
        const lootSettingsExpandedDiv = this.createTapToExpandDiv(lootDiv, "Loot Settings", startExpanded, "h3");

        this.generateLootImportExportOption(lootSettingsExpandedDiv);

        const lootSettings: LootGeneratorSettings = this.plugin.settings.lootSettings;

        const excludedSourceList = lootSettings.excludedSources;

        const includedSourceList = LootGeneratorSettings.getIncludedSources(lootSettings.fullSourceList, lootSettings.excludedSources);

        const includedListDiv = lootSettingsExpandedDiv.createDiv();
        const excludedListDiv = lootSettingsExpandedDiv.createDiv();

        this.createGenericArrTable(includedListDiv, includedSourceList, false, "Sources", (async (item: string) => {
            // removing from the incliuded source list
            console.log(item);
            this.plugin.settings.lootSettings.excludedSources.push(item);
            await this.plugin.saveSettings();
            this.generateLootSettingsBlock(lootDiv, true)
        }));
        this.createGenericArrTable(excludedListDiv, excludedSourceList, false, "Sources Not", (async (item: string) => {
            // removing from the excliuded source list
            this.plugin.settings.lootSettings.excludedSources.remove(item);
            await this.plugin.saveSettings();
            this.generateLootSettingsBlock(lootDiv, true)
        }));
    }

    generateDrinkSettingsBlock(drinkDiv: HTMLElement, startExpanded?: boolean) {
        const drinkSettingsExpandedDiv = this.createTapToExpandDiv(drinkDiv, "Drink Settings", startExpanded, "h3");

        const drinkNounText = "";
        const drinkAdjText = "";

        this.generateDrinkImportExportOption(drinkSettingsExpandedDiv);
        this.createSettingsBlock(true, drinkSettingsExpandedDiv, drinkAdjText, this.plugin.settings.drinkSettings.adj, "Adjectives", false);
        this.createSettingsBlock(true, drinkSettingsExpandedDiv, drinkNounText, this.plugin.settings.drinkSettings.nouns, "Nouns", false);
    }

    generateInnSettingsBlock(innDiv: HTMLElement, startExpanded?: boolean) {
        const innSettingsExpandedDiv = this.createTapToExpandDiv(innDiv, "Inn Settings", startExpanded, "h3");

        const innPreText = "";
        const innTypeText = "";
        const innNounText = "";
        const innDescText = "";
        const innRumorText = "";

        this.generateInnImportExportOption(innSettingsExpandedDiv);
        this.createSettingsBlock(true, innSettingsExpandedDiv, innPreText, this.plugin.settings.innSettings.prefixes, "Prefixes", false);
        this.createSettingsBlock(true, innSettingsExpandedDiv, innTypeText, this.plugin.settings.innSettings.innType, "Types", false);
        this.createSettingsBlock(true, innSettingsExpandedDiv, innNounText, this.plugin.settings.innSettings.nouns, "Nouns", false);
        this.createSettingsBlock(true, innSettingsExpandedDiv, innDescText, this.plugin.settings.innSettings.desc, "Descriptions", false);
        this.createSettingsBlock(true, innSettingsExpandedDiv, innRumorText, this.plugin.settings.innSettings.rumors, "Rumors", false);
    }

    generateNpcSettingsBlock(npcDiv: HTMLElement, startExpanded?: boolean) {
        const npcSettingsExpandedDiv = this.createTapToExpandDiv(npcDiv, "NPC Settings", startExpanded, "h3");
        
        this.generateNPCImportExportOption(npcSettingsExpandedDiv);
        this.generateNPCRaceSettingsBlock(npcSettingsExpandedDiv, this.plugin.settings.npcSettings.human, this.plugin.settings.usedNpcSettings.human);
        this.generateNPCRaceSettingsBlock(npcSettingsExpandedDiv, this.plugin.settings.npcSettings.elf, this.plugin.settings.usedNpcSettings.elf);
        this.generateNPCRaceSettingsBlock(npcSettingsExpandedDiv, this.plugin.settings.npcSettings.dwarf, this.plugin.settings.usedNpcSettings.dwarf);
        this.generateNPCRaceSettingsBlock(npcSettingsExpandedDiv, this.plugin.settings.npcSettings.halfling, this.plugin.settings.usedNpcSettings.halfling);
        this.generateNPCRaceSettingsBlock(npcSettingsExpandedDiv, this.plugin.settings.npcSettings.goblin, this.plugin.settings.usedNpcSettings.goblin);
        this.generateNPCFunFactSettingsBlock(npcSettingsExpandedDiv, this.plugin.settings.npcSettings, this.plugin.settings.usedNpcSettings);
    }

    generateNPCFunFactSettingsBlock(containerDiv: HTMLElement, settingBlock: NPCGeneratorSettings, usedSettingsBlock: NPCGeneratorSettings) {
        const funFactDiv = containerDiv.createDiv({
            attr: {
                style: "padding-left: 20px;"
            }
        });

        const funFactSettingsExpandedDiv = this.createTapToExpandDiv(funFactDiv, "Fun Fact Settings", false, "h4");

        this.createSettingsTableSection(funFactSettingsExpandedDiv, settingBlock.funFactList, "Personality/Archetypes", usedSettingsBlock.funFactList);
    }

    generateNPCRaceSettingsBlock(containerDiv: HTMLElement, settingBlock: NPCRaceSettings, usedSettingsBlock: NPCRaceSettings) {
        const raceDiv = containerDiv.createDiv({
            attr: {
                style: "padding-left: 20px;"
            }
        });

        const raceSettingsExpandedDiv = this.createTapToExpandDiv(raceDiv, settingBlock.raceName + " Race Settings", false, "h4");

        this.createSettingsTableSection(raceSettingsExpandedDiv, settingBlock.masculineFirst, "Masculine First Names", usedSettingsBlock.masculineFirst);
        this.createSettingsTableSection(raceSettingsExpandedDiv, settingBlock.feminineFirst, "Feminine First Names", usedSettingsBlock.feminineFirst);
        this.createSettingsTableSection(raceSettingsExpandedDiv, settingBlock.neutralFirst, "Neutral First Names", usedSettingsBlock.neutralFirst);
        this.createSettingsTableSection(raceSettingsExpandedDiv, settingBlock.family, "Family/Last Names", usedSettingsBlock.family);
    }

    createSettingsTableSection(overallRaceDiv: HTMLElement, stringList: string[], tableHeader: string, usedList?: any[]) {
        const tableHeaderDiv = overallRaceDiv.createDiv({
            attr: {
                style: "padding-left: 20px; padding-top: 5px;"
            }
        })
        const tableHeaderEl = tableHeaderDiv.createEl("h5", { text: tableHeader + " (tap to expand)" });


        const tableSectionDiv = tableHeaderDiv.createDiv();

        tableHeaderEl.onclick = function() {
            if(tableHeaderEl.innerHTML.contains("expand")) {
                tableHeaderEl.innerHTML = tableHeader + " (tap to collapse)";
                tableSectionDiv.hidden = false;
            } else {
                tableHeaderEl.innerHTML = tableHeader + " (tap to expand)";
                tableSectionDiv.hidden = true;
            }
        };

        
        this.createTableBlock(false, tableSectionDiv, stringList, false, usedList);
        tableSectionDiv.hidden = true;
    }


    private generateLootImportExportOption(lootDiv: HTMLElement) {
        if (Platform.isDesktopApp) {
            const importExportFile = new Setting(lootDiv)
                .setName("Import | Export")
                .setDesc("Import A Json File With Supported information");

            const inputAppfile = createEl("input", {
                attr: {
                    type: "file",
                    name: "loot",
                    accept: ".json",
                    multiple: false
                }
            });

            inputAppfile.onchange = async () => {
                const { files } = inputAppfile;
                if (files === null || !files.length) return;
                try {
                    const file = files[0] as FileWithPath;
                    importJSON(file.path, async (data) => {
                        LootGeneratorSettings.setItemList(this.plugin.settings.lootSettings, data)
                        this.generateLootSettingsBlock(this.lootDiv, true);
                        await this.plugin.saveSettings();
                    });

                } catch (e) { /* empty */ }
            }

            importExportFile.addButton((b) => {
                b.setButtonText("Choose Import File").setTooltip(
                    "Import Json File for the Generator"
                ).buttonEl.appendChild(inputAppfile)
                b.buttonEl.addClass("FCGInput");
                b.onClick(() => inputAppfile.click());
            }).addButton((b) => {
                b.setButtonText("Export Section To File").setCta()
                    .onClick(() => {
                        exportJSON(ITEM_LIST);
                    })
            });
        }
    }

    private generateDrinkImportExportOption(drinkDiv: HTMLElement) {
        if (Platform.isDesktopApp) {
            const importExportFile = new Setting(drinkDiv)
                .setName("Import | Export")
                .setDesc("Import A Json File With Supported information");

            const inputAppfile = createEl("input", {
                attr: {
                    type: "file",
                    name: "drink",
                    accept: ".json",
                    multiple: false
                }
            });

            inputAppfile.onchange = async () => {
                const { files } = inputAppfile;
                if (files === null || !files.length) return;
                try {
                    const file = files[0] as FileWithPath;
                    importJSON(file.path, async (data) => {
                        this.plugin.settings.drinkSettings = data as DrinkGeneratorSettings;
                        this.generateDrinkSettingsBlock(this.drinkDiv, true);
                        await this.plugin.saveSettings();
                    });

                } catch (e) { /* empty */ }
            }

            importExportFile.addButton((b) => {
                b.setButtonText("Choose Import File").setTooltip(
                    "Import Json File for the Generator"
                ).buttonEl.appendChild(inputAppfile)
                b.buttonEl.addClass("FCGInput");
                b.onClick(() => inputAppfile.click());
            }).addButton((b) => {
                b.setButtonText("Export Section To File").setCta()
                    .onClick(() => {
                        exportJSON(this.plugin.settings.drinkSettings);
                    })
            });
        }
    }

    private generateInnImportExportOption(containerDiv: HTMLElement) {
        if (Platform.isDesktopApp) {
            const importExportFile = new Setting(containerDiv)
                .setName("Import | Export")
                .setDesc("Import A Json File With Supported information");

            const inputAppfile = createEl("input", {
                attr: {
                    type: "file",
                    name: "inn",
                    accept: ".json",
                    multiple: false
                }
            });

            inputAppfile.onchange = async () => {
                const { files } = inputAppfile;
                if (files === null || !files.length) return;
                try {
                    const file = files[0] as FileWithPath;
                    importJSON(file.path, async (data) => {
                        this.plugin.settings.innSettings = data as InnGeneratorSettings;
                        this.generateInnSettingsBlock(this.innDiv, true);
                        await this.plugin.saveSettings();
                    });

                } catch (e) { /* empty */ }
            }

            importExportFile.addButton((b) => {
                b.setButtonText("Choose Import File").setTooltip(
                    "Import Json File for the Generator"
                ).buttonEl.appendChild(inputAppfile)
                b.buttonEl.addClass("FCGInput");
                b.onClick(() => inputAppfile.click());
            }).addButton((b) => {
                b.setButtonText("Export Section To File").setCta()
                    .onClick(() => {
                        exportJSON(this.plugin.settings.innSettings);
                    })
            });
        }
    }

    private generateNPCImportExportOption(containerDiv: HTMLElement) {
        if (Platform.isDesktopApp) {
            const importExportFile = new Setting(containerDiv)
                .setName("Import | Export")
                .setDesc("Import A Json File With Supported information");

            const inputAppfile = createEl("input", {
                attr: {
                    type: "file",
                    name: "currency",
                    accept: ".json",
                    multiple: false
                }
            });

            inputAppfile.onchange = async () => {
                const { files } = inputAppfile;
                if (files === null || !files.length) return;
                try {
                    const file = files[0] as FileWithPath;
                    importJSON(file.path, async (data: {'Used': NPCGeneratorSettings, 'Unused': NPCGeneratorSettings}) => {
                        const usedData = data['Used'] as NPCGeneratorSettings;
                        const unusedData = data['Unused'] as NPCGeneratorSettings;
                        
                        if(data && usedData && unusedData) {
                            this.plugin.settings.usedNpcSettings = usedData;
                            this.plugin.settings.npcSettings = unusedData;
                            await this.plugin.saveSettings();
                        }
                        
                        this.npcDiv.innerHTML = '';
                        this.generateNpcSettingsBlock(this.npcDiv, true);
                    });

                } catch (e) { /* empty */ }
            }

            importExportFile.addButton((b) => {
                b.setButtonText("Choose Import File").setTooltip(
                    "Import Json File for the Generator"
                ).buttonEl.appendChild(inputAppfile)
                b.buttonEl.addClass("FCGInput");
                b.onClick(() => inputAppfile.click());
            }).addButton((b) => {
                b.setButtonText("Export Section To File").setCta()
                    .onClick(() => {
                        exportJSON({ 'Used': this.plugin.settings.usedNpcSettings, 'Unused': this.plugin.settings.npcSettings });
                    })
            });
        }
    }

}
