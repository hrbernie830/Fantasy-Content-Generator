import FantasyPlugin from "main";
import { PluginSettingTab, App, Setting, Platform } from "obsidian";
import { currency, exportJSON, FileWithPath, importJSON } from "./Datatypes";
import { DEFAULT_SETTINGS } from "./DefaultSetting";
import { InnGeneratorSettings } from "src/generators/inn-generator/model/InnGeneratorSettings";
import { DrinkGeneratorSettings } from "src/generators/drink-generator/model/DrinkGeneratorSettings";
import { LootGeneratorSettings } from "src/generators/loot-generator/model/LootGeneratorSettings";
import { NPCRaceSettings } from "src/generators/npc-generator/model/NPCRaceSettings";
import { NPCGeneratorSettings } from "src/generators/npc-generator/model/NPCGeneratorSettings";

export class SettingTab extends PluginSettingTab {
    plugin: FantasyPlugin;

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
    createSettingsBlock(containerEl: HTMLElement, textA: string, arr: any[], type: string, weights: boolean): void {
        new Setting(containerEl).setName(type + " being used").setDesc("Click 'remove' for any item you want removed from the Array");
        this.createTableBlock(containerEl, arr, weights, undefined, textA);
        
    }

    createTableBlock(containerEl: HTMLElement, arr: any[], weights: boolean, usedArr?: any[], textA?: string) {
        let preText = textA ? textA : '';
        new Setting(containerEl)
        .setName("New Addition:")
        .addTextArea((text) => {
            text.onChange((value) => {
                preText = value;
            })
        })
        .addButton((btn) => {
            btn.setCta().setButtonText("Add")
                .onClick(async () => {
                    this.convertStringToArray(preText, arr);
                    this.display();
                    await this.plugin.saveSettings();
                })
        })

        // const foldDiv = containerEl.createEl('details', { cls: "OFCGDetails" });
        // const prefix = usedArr ? 'Unused ' : '';
        // foldDiv.createEl("summary", { text: prefix + 'Options Included in Generator', cls: "OFCGSummary" });
        // for (let index = 0; index < arr.length; index++) {
        //     const foldDivSetting = new Setting(foldDiv)
        //         .setName(weights ? JSON.stringify(arr[index]) : arr[index]);
        //     if(usedArr) {
        //         foldDivSetting.addButton((btn) => btn
        //                 .setCta()
        //                 .setButtonText("Mark as Used")
        //                 .onClick(async () => {
        //                     usedArr.push(arr.splice(index, 1)[0]);
        //                     //this.display();
        //                     await this.plugin.saveSettings();
        //                 })
        //             )
        //     }
                
        //     foldDivSetting.addButton((btn) => btn
        //             .setCta()
        //             .setButtonText("Remove")
        //             .onClick(async () => {
        //                 arr.splice(index, 1);
        //                 this.display();
        //                 await this.plugin.saveSettings();
        //             })
        //         )
        // }

        const tableDiv = containerEl.createDiv();
        this.createTableDiv(tableDiv, arr, weights, usedArr);

        

        containerEl.createEl('hr');
    }

    createTableDiv(containerEl: HTMLElement, arr: any[], weights: boolean, usedArr?: any[]) {
        containerEl.innerHTML = '';
        const tableDiv = containerEl.createDiv();

        this.createUnusedArrTable(containerEl, tableDiv, arr, weights, usedArr);
        this.createUsedArrTable(containerEl, tableDiv, arr, weights, usedArr);
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

        containerEl.createEl('h1', { text: 'Fantasy Content Generator' });
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
            })

        new Setting(generalSettings).setName("Names List File Location").setDesc("Location of the name list file")
            .addText((text) => {
                text.setValue(String(this.plugin.settings.nameFileLocation));
                text.onChange(async (value) => {
                    this.plugin.settings.nameFileLocation = value;
                    await this.plugin.saveSettings();
                })
            })

        new Setting(generalSettings).setName("Fun Fact List File Location").setDesc("Location of the fun fact list file")
            .addText((text) => {
                text.setValue(String(this.plugin.settings.funFactFileLocation));
                text.onChange(async (value) => {
                    this.plugin.settings.funFactFileLocation = value;
                    await this.plugin.saveSettings();
                })
            })

        // CURRENCEY SETTINGS //

        const currencyEl = containerEl.createDiv("currencyDiv");

        new Setting(currencyEl).setHeading().setName("Currency Settings");

        new Setting(currencyEl)
            .setName('Enable Currency for Loot Generation.')
            .setDesc('If you have Currency in your World or game consider Activating this')
            .addToggle((toggle) => {
                toggle.setValue(this.plugin.settings.enableCurrency);
                toggle.onChange(async (value) => {
                    this.plugin.settings.enableCurrency = value;
                    this.display();
                    await this.plugin.saveSettings();
                })
            });

        if (this.plugin.settings.enableCurrency) {

            new Setting(currencyEl).setName("Occurance Rate:").setDesc("Set How Frequently Loot generates currency as a percentage of 100")
                .addText((text) => {
                    text.setValue(String(this.plugin.settings.currencyFrequency));
                    text.onChange(async (value) => {
                        if (!(isNaN(+value))) {
                            this.plugin.settings.currencyFrequency = Number(value);
                            await this.plugin.saveSettings();
                        }

                    })
                })

            if (Platform.isDesktopApp) {
                const importExportFile = new Setting(currencyEl)
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
                        importJSON(file.path, async (data) => {
                            this.plugin.settings.currencyTypes = data as currency[];
                            this.display();
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
                            exportJSON(this.plugin.settings.currencyTypes);
                        })
                });
            }

            const ctext = {
                name: '',
                rarity: 'common'
            }
            new Setting(currencyEl)
                .setName("Currency Name:")
                .addText((text) => {
                    text.onChange((value) => {
                        ctext.name = value;
                    })
                }).addDropdown((drop) => {
                    drop.addOption("common", "Common");
                    drop.addOption("uncommon", "Uncommon");
                    drop.addOption("rare", "Rare");
                    drop.addOption("rarest", "Rarest");
                    drop.onChange((value) => {
                        ctext.rarity = value;
                    })
                })
                .addButton((btn) => {
                    btn.setCta().setButtonText("Add")
                        .onClick(async () => {
                            this.plugin.settings.currencyTypes.push(ctext);
                            this.display();
                            await this.plugin.saveSettings();
                        })
                })

            new Setting(currencyEl).setName("Added currency").setDesc("Click Remove on a Currency you would like to Remove");

            const foldDiv = currencyEl.createEl('details', { cls: "OFCGDetails" });
            foldDiv.createEl("summary", { text: "Currency", cls: "OFCGSummary" });

            for (let index = 0; index < this.plugin.settings.currencyTypes.length; index++) {
                new Setting(foldDiv)
                    .setName(this.plugin.settings.currencyTypes[index].name)
                    .addButton((btn) => btn
                        .setCta()
                        .setButtonText("Remove")
                        .onClick(async () => {
                            this.plugin.settings.currencyTypes.splice(index, 1);
                            this.display();
                            await this.plugin.saveSettings();
                        })
                    )

            }

        }

        // END CURRENCY SETTINGS //
        currencyEl.createEl('hr');

        this.generateNpcSettingsBlock(containerEl);

        // INN'S / TAVERN SETTINGS //
        const innDiv = containerEl.createDiv("innDiv");
        new Setting(innDiv).setHeading().setName("Inn Settings");
        innDiv.createEl('br');

        if (Platform.isDesktopApp) {
            const importExportFile = new Setting(innDiv)
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
                        this.display();
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

        const innPreText = "";
        const innTypeText = "";
        const innNounText = "";
        const innDescText = "";
        const innRumorText = "";

        this.createSettingsBlock(innDiv, innPreText, this.plugin.settings.innSettings.prefixes, "Prefixes", false);
        this.createSettingsBlock(innDiv, innTypeText, this.plugin.settings.innSettings.innType, "Type's", false);
        this.createSettingsBlock(innDiv, innNounText, this.plugin.settings.innSettings.nouns, "Nouns", false);
        this.createSettingsBlock(innDiv, innDescText, this.plugin.settings.innSettings.desc, "Description's", false);
        this.createSettingsBlock(innDiv, innRumorText, this.plugin.settings.innSettings.rumors, "Rumors", false);

        // END INN'S / TAVERN SETTINGS //

        // DRINK SETTINGS //

        const drinkDiv = containerEl.createDiv("drinkDiv");
        new Setting(drinkDiv).setHeading().setName("Drink Settings");
        drinkDiv.createEl('br');

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
                        this.display();
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

        const drinkNounText = "";
        const drinkAdjText = "";

        this.createSettingsBlock(drinkDiv, drinkAdjText, this.plugin.settings.drinkSettings.adj, "Adjectives", false);
        this.createSettingsBlock(drinkDiv, drinkNounText, this.plugin.settings.drinkSettings.nouns, "Nouns", false);

        // LOOT SETTINGS //

        const lootDiv = containerEl.createDiv("lootDiv");
        new Setting(lootDiv).setHeading().setName("Loot Settings");
        lootDiv.createEl('br');

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
                        this.plugin.settings.lootSettings = data as LootGeneratorSettings;
                        this.display();
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
                        exportJSON(this.plugin.settings.lootSettings);
                    })
            });
        }
    }


    generateNpcSettingsBlock(containerEl: HTMLElement) {
        // INN'S / TAVERN SETTINGS //
        const npcDiv = containerEl.createDiv();
        const header = npcDiv.createEl("h5", { text: "NPC Settings (tap to expand)" });

        const npcSettingsExpandedDiv = npcDiv.createDiv();


        header.onclick = function() {
            if(header.innerHTML.contains("expand")) {
                header.innerHTML = 'NPC Settings (tap to collapse)';
                npcSettingsExpandedDiv.hidden = false;
            } else {
                header.innerHTML = 'NPC Settings (tap to expand)';
                npcSettingsExpandedDiv.hidden = true;
            }
            
        };
        

        this.generateNPCRaceSettingsBlock(npcSettingsExpandedDiv, this.plugin.settings.npcSettings.human, this.plugin.settings.usedNpcSettings.human);
        this.generateNPCRaceSettingsBlock(npcSettingsExpandedDiv, this.plugin.settings.npcSettings.elf, this.plugin.settings.usedNpcSettings.elf);
        this.generateNPCRaceSettingsBlock(npcSettingsExpandedDiv, this.plugin.settings.npcSettings.dwarf, this.plugin.settings.usedNpcSettings.dwarf);
        this.generateNPCRaceSettingsBlock(npcSettingsExpandedDiv, this.plugin.settings.npcSettings.halfling, this.plugin.settings.usedNpcSettings.halfling);
        this.generateNPCRaceSettingsBlock(npcSettingsExpandedDiv, this.plugin.settings.npcSettings.goblin, this.plugin.settings.usedNpcSettings.goblin);
        this.generateNPCFunFactSettingsBlock(npcSettingsExpandedDiv, this.plugin.settings.npcSettings, this.plugin.settings.usedNpcSettings);

        npcSettingsExpandedDiv.hidden = true;

    
        // if (Platform.isDesktopApp) {
        //     const importExportFile = new Setting(npcDiv)
        //         .setName("Import | Export")
        //         .setDesc("Import A Json File With Supported information");
    
        //     const inputAppfile = createEl("input", {
        //         attr: {
        //             type: "file",
        //             name: "inn",
        //             accept: ".json",
        //             multiple: false
        //         }
        //     });
    
        //     inputAppfile.onchange = async () => {
        //         const { files } = inputAppfile;
        //         if (files === null || !files.length) return;
        //         try {
        //             const file = files[0] as FileWithPath;
        //             importJSON(file.path, async (data) => {
        //                 this.plugin.settings.innSettings = data as InnGeneratorSettings;
        //                 this.display();
        //                 await this.plugin.saveSettings();
        //             });
    
        //         } catch (e) { /* empty */ }
        //     }
    
        //     importExportFile.addButton((b) => {
        //         b.setButtonText("Choose Import File").setTooltip(
        //             "Import Json File for the Generator"
        //         ).buttonEl.appendChild(inputAppfile)
        //         b.buttonEl.addClass("FCGInput");
        //         b.onClick(() => inputAppfile.click());
        //     }).addButton((b) => {
        //         b.setButtonText("Export Section To File").setCta()
        //             .onClick(() => {
        //                 exportJSON(this.plugin.settings.innSettings);
        //             })
        //     });
        // }
    
        
    
        // END INN'S / TAVERN SETTINGS //
    }

    generateNPCFunFactSettingsBlock(containerDiv: HTMLElement, settingBlock: NPCGeneratorSettings, usedSettingsBlock: NPCGeneratorSettings) {
        const funFactDiv = containerDiv.createDiv({
            attr: {
                style: "padding-left: 10px;"
            }
        });
        const funFactHeader = funFactDiv.createEl("h6", { text: "Fun Fact Settings (tap to expand)" });

        const funFactSettingsExpandedDiv = funFactDiv.createDiv();

        funFactHeader.onclick = function() {
            if(funFactHeader.innerHTML.contains("expand")) {
                funFactHeader.innerHTML = "Fun Fact Settings (tap to collapse)";
                funFactSettingsExpandedDiv.hidden = false;
            } else {
                funFactHeader.innerHTML = "Fun Fact Settings (tap to expand)";
                funFactSettingsExpandedDiv.hidden = true;
            }
        };

        this.createSettingsTableSection(funFactSettingsExpandedDiv, settingBlock.funFactList, "Personality/Archetypes", usedSettingsBlock.funFactList);
        funFactSettingsExpandedDiv.hidden = true;
    }

    generateNPCRaceSettingsBlock(containerDiv: HTMLElement, settingBlock: NPCRaceSettings, usedSettingsBlock: NPCRaceSettings) {
        const raceDiv = containerDiv.createDiv({
            attr: {
                style: "padding-left: 10px;"
            }
        });
        const raceHeader = raceDiv.createEl("h6", { text: settingBlock.raceName + " Race Settings (tap to expand)" });

        const raceSettingsExpandedDiv = raceDiv.createDiv();

        raceHeader.onclick = function() {
            if(raceHeader.innerHTML.contains("expand")) {
                raceHeader.innerHTML = settingBlock.raceName + " Race Settings (tap to collapse)";
                raceSettingsExpandedDiv.hidden = false;
            } else {
                raceHeader.innerHTML = settingBlock.raceName + " Race Settings (tap to expand)";
                raceSettingsExpandedDiv.hidden = true;
            }
        };

        this.createSettingsTableSection(raceSettingsExpandedDiv, settingBlock.masculineFirst, "Masculine First Names", usedSettingsBlock.masculineFirst);
        this.createSettingsTableSection(raceSettingsExpandedDiv, settingBlock.feminineFirst, "Feminine First Names", usedSettingsBlock.feminineFirst);
        this.createSettingsTableSection(raceSettingsExpandedDiv, settingBlock.neutralFirst, "Neutral First Names", usedSettingsBlock.neutralFirst);
        this.createSettingsTableSection(raceSettingsExpandedDiv, settingBlock.family, "Family/Last Names", usedSettingsBlock.family);
        raceSettingsExpandedDiv.hidden = true;
    }

    createSettingsTableSection(overallRaceDiv: HTMLElement, stringList: string[], tableHeader: string, usedList?: any[]) {
        const tableHeaderDiv = overallRaceDiv.createDiv({
            attr: {
                style: "padding-left: 10px;"
            }
        })
        const tableHeaderEl = tableHeaderDiv.createEl("b", { text: tableHeader + " (tap to expand)" });


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

        
        this.createTableBlock(tableSectionDiv, stringList, false, usedList);
        tableSectionDiv.hidden = true;
    }

}
