import FantasyPlugin from "main";
import { PluginSettingTab, App, Setting } from "obsidian";
import * as FileUtils from '../../../shared/utilities/file-utils';
import * as SharedUtils from '../../../shared/utilities/shared-utils';
import { InnGeneratorSettings } from "src/types/inn/InnGeneratorSettings";
import { DrinkGeneratorSettings } from "src/types/drink/DrinkGeneratorSettings";
import { LootGeneratorSettings } from "src/types/loot/LootGeneratorSettings";
import { NPCRaceSettings } from "src/types/npc/NPCRaceSettings";
import { NPCGeneratorSettings } from "src/types/npc/NPCGeneratorSettings";
import { SettingsTable } from "src/shared/settings-table/settings-table";
import { Action } from "src/types/settings/Action";
import { SettingTextEntry } from "src/shared/setting-text-entry/setting-text-entry";
import { SettingGenericTable } from "src/shared/setting-generic-table/setting-generic-table";
import { ExpandableDiv } from "src/shared/expandable-div/expandable-div";
import { ImportExportOption } from "src/shared/import-export-option/import-export-option";
import { FantasyPluginSettings } from "src/types/settings/FantasyPluginSettings";

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

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        containerEl.createEl('h1', { text: 'Fantasy Content Generator',  });
        const generalSettings = containerEl.createDiv("general");

        const importFn = async (data: FantasyPluginSettings) => {
            this.plugin.settings = data;
            await this.plugin.saveSettings();
            this.display();
        }
        const exportFn = () => {FileUtils.exportJSON(this.plugin.settings)};
        new ImportExportOption(generalSettings, importFn, exportFn).generate();


        let preText = '';
        new Setting(generalSettings)
            .setName("'Save to Files' Folder")
            .setDesc("The file location where you want the 'Save to Files' buttons on some generators to create the note. Under this file specific folders will be created including 'Inns', 'Loot' and 'NPCs'")
            .addText((text) => {
                text.setValue(this.plugin.settings.saveToFileLocation)
                text.onChange((value) => {
                    preText = value;
                })
            }).addButton((btn) => {
                btn.setCta().setButtonText("Save")
                    .onClick(async () => {
                        this.plugin.settings.saveToFileLocation = preText;
                        this.plugin.saveSettings();
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

        new Setting(this.containerEl.createDiv({attr: {
            style: "padding-top: 15px;"
        }}))
        .setName('Reset All Settings To Defaults')
        .setDesc('Click if you would like to use the default settings again')
        .addButton((btn) => {
            btn.setCta()
                .setButtonText("Reset")
                .onClick(async () => {
                    this.plugin.settings = SharedUtils.generateDefaultSettings();
                    await this.plugin.saveSettings();
                    this.display();
                })
        });
    }

    generateLootSettingsBlock(lootDiv: HTMLElement, startExpanded?: boolean) {
        this.lootDiv.innerHTML = '';
        const lootSettingsExpandedDiv = new ExpandableDiv(lootDiv, "Loot Settings", "h3").generate(startExpanded);

        const importFn = async (data: any) => {
            LootGeneratorSettings.setItemList(this.plugin.settings.lootSettings, data)
            this.generateLootSettingsBlock(this.lootDiv, true);
            await this.plugin.saveSettings();
        }
        const exportFn = () => {FileUtils.exportJSON(this.plugin.settings.lootSettings)};
        new ImportExportOption(lootSettingsExpandedDiv, importFn, exportFn).generate();

        const lootSettings: LootGeneratorSettings = this.plugin.settings.lootSettings;

        const excludedSourceList = lootSettings.excludedSources;

        const includedSourceList = LootGeneratorSettings.getIncludedSources(lootSettings.fullSourceList, lootSettings.excludedSources);

        const includedListDiv = lootSettingsExpandedDiv.createDiv();
        const excludedListDiv = lootSettingsExpandedDiv.createDiv();
        

        const removeAction: Action = {text: 'Remove', action: (async (item: string, arr: string[]) => {
            this.plugin.settings.lootSettings.excludedSources.push(item);
            await this.plugin.saveSettings();
            this.generateLootSettingsBlock(lootDiv, true)
        })};

        const reIncludeAction: Action = {text: 'Re-Include', action: (async (item: string, arr: string[]) => {
            this.plugin.settings.lootSettings.excludedSources.remove(item);
            await this.plugin.saveSettings();
            this.generateLootSettingsBlock(lootDiv, true)
        })};

        new SettingsTable(this.plugin, includedListDiv, includedSourceList, "Sources Included", [removeAction]).generate();
        new SettingsTable(this.plugin, excludedListDiv, excludedSourceList, "Sources Not Included", [reIncludeAction]).generate();

    }

    generateDrinkSettingsBlock(drinkDiv: HTMLElement, startExpanded?: boolean) {
        const drinkSettingsExpandedDiv = new ExpandableDiv(drinkDiv, "Drink Settings", "h3").generate(startExpanded);

        const importFn = async (data: any) => {
            this.plugin.settings.drinkSettings = data as DrinkGeneratorSettings;
            this.generateDrinkSettingsBlock(this.drinkDiv, true);
            await this.plugin.saveSettings();
        }
        const exportFn = () => {FileUtils.exportJSON(this.plugin.settings.drinkSettings)};
        new ImportExportOption(drinkSettingsExpandedDiv, importFn, exportFn).generate();

        new SettingGenericTable(this.plugin, drinkSettingsExpandedDiv.createDiv(), "Adjectives being used", "Click 'remove' for any item you want removed from the Array", this.plugin.settings.drinkSettings.adj).generate();
        new SettingGenericTable(this.plugin, drinkSettingsExpandedDiv.createDiv(), "Nouns being used", "Click 'remove' for any item you want removed from the Array", this.plugin.settings.drinkSettings.nouns).generate();
    }

    generateInnSettingsBlock(innDiv: HTMLElement, startExpanded?: boolean) {
        const innSettingsExpandedDiv = new ExpandableDiv(innDiv, "Inn Settings", "h3").generate(startExpanded);

        const importFn = async (data: any) => {
            this.plugin.settings.innSettings = data as InnGeneratorSettings;
            this.generateInnSettingsBlock(this.innDiv, true);
            await this.plugin.saveSettings();
        }
        const exportFn = () => {FileUtils.exportJSON(this.plugin.settings.innSettings)};
        new ImportExportOption(innSettingsExpandedDiv, importFn, exportFn).generate();

        new SettingGenericTable(this.plugin, innSettingsExpandedDiv.createDiv(), "Prefixes being used", "Click 'remove' for any item you want removed from the Array", this.plugin.settings.innSettings.prefixes).generate();
        new SettingGenericTable(this.plugin, innSettingsExpandedDiv.createDiv(), "Types being used", "Click 'remove' for any item you want removed from the Array", this.plugin.settings.innSettings.innType).generate();
        new SettingGenericTable(this.plugin, innSettingsExpandedDiv.createDiv(), "Nouns being used", "Click 'remove' for any item you want removed from the Array", this.plugin.settings.innSettings.nouns).generate();
        new SettingGenericTable(this.plugin, innSettingsExpandedDiv.createDiv(), "Descriptions being used", "Click 'remove' for any item you want removed from the Array", this.plugin.settings.innSettings.desc).generate();
        new SettingGenericTable(this.plugin, innSettingsExpandedDiv.createDiv(), "Rumors being used", "Click 'remove' for any item you want removed from the Array", this.plugin.settings.innSettings.rumors).generate();
    }

    generateNpcSettingsBlock(npcDiv: HTMLElement, startExpanded?: boolean) {
        const npcSettingsExpandedDiv = new ExpandableDiv(npcDiv, "NPC Settings", "h3").generate(startExpanded);

        const importFn = async (data: {'Used': NPCGeneratorSettings, 'Unused': NPCGeneratorSettings}) => {
            const usedData = data['Used'] as NPCGeneratorSettings;
            const unusedData = data['Unused'] as NPCGeneratorSettings;
            
            if(data && usedData && unusedData) {
                this.plugin.settings.usedNpcSettings = usedData;
                this.plugin.settings.npcSettings = unusedData;
                await this.plugin.saveSettings();
            }
            
            this.npcDiv.innerHTML = '';
            this.generateNpcSettingsBlock(this.npcDiv, true);
        }
        const exportFn = () => {FileUtils.exportJSON({ 'Used': this.plugin.settings.usedNpcSettings, 'Unused': this.plugin.settings.npcSettings })};
        new ImportExportOption(npcSettingsExpandedDiv, importFn, exportFn).generate();
        
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

        const funFactSettingsExpandedDiv = new ExpandableDiv(funFactDiv, "Fun Fact Settings", "h4").generate(false);

        this.createSettingsBlockForNPCFeature(funFactSettingsExpandedDiv, settingBlock.funFactList, "Personality/Archetypes", usedSettingsBlock.funFactList);
    }

    generateNPCRaceSettingsBlock(containerDiv: HTMLElement, settingBlock: NPCRaceSettings, usedSettingsBlock: NPCRaceSettings) {
        const raceDiv = containerDiv.createDiv({
            attr: {
                style: "padding-left: 20px;"
            }
        });

        const raceSettingsExpandedDiv = new ExpandableDiv(raceDiv, settingBlock.raceName + " Race Settings", "h4").generate(false);

        this.createSettingsBlockForNPCFeature(raceSettingsExpandedDiv, settingBlock.masculineFirst, "Masculine First Names", usedSettingsBlock.masculineFirst);
        this.createSettingsBlockForNPCFeature(raceSettingsExpandedDiv, settingBlock.feminineFirst, "Feminine First Names", usedSettingsBlock.feminineFirst);
        this.createSettingsBlockForNPCFeature(raceSettingsExpandedDiv, settingBlock.neutralFirst, "Neutral First Names", usedSettingsBlock.neutralFirst);
        this.createSettingsBlockForNPCFeature(raceSettingsExpandedDiv, settingBlock.family, "Family/Last Names", usedSettingsBlock.family);
    }

    createSettingsBlockForNPCFeature(overallRaceDiv: HTMLElement, stringList: string[], tableHeader: string, usedList: any[]) {
        const tableHeaderDiv = overallRaceDiv.createDiv({
            attr: {
                style: "padding-left: 20px; padding-top: 5px;"
            }
        })

        const tableSectionDiv = new ExpandableDiv(tableHeaderDiv, tableHeader, "h5").generate(false);

        this.generateNPCNameTables(tableSectionDiv.createDiv(), stringList, usedList)
        
        tableSectionDiv.hidden = true;
    }

    generateNPCNameTables(containerEl: HTMLElement, unusedList: any[], usedList: any[]) {
        containerEl.innerHTML = '';
        const tableDiv = containerEl.createDiv();
 
        const addNewNameFn = (async (item: string) => {
            this.updateNPCNameTables(containerEl, item, unusedList, usedList, 'ADD_TO_UNUSED');
        });
        const markAsUsedFn = (async (item: string, itemArr: string[]) => {
            this.updateNPCNameTables(containerEl, item, unusedList, usedList, 'SHIFT_TO_USED');
        });
        const markAsUnusedFn = (async (item: string, itemArr: string[]) => {
            this.updateNPCNameTables(containerEl, item, unusedList, usedList, 'SHIFT_TO_UNUSED');
        });
        const removeFromUnusedFn = (async (item: string, itemArr: string[]) => {
            this.updateNPCNameTables(containerEl, item, unusedList, usedList, 'REMOVE_FROM_UNUSED');
        });
        const removeFromUsedFn = (async (item: string, itemArr: string[]) => {
            this.updateNPCNameTables(containerEl, item, unusedList, usedList, 'REMOVE_FROM_USED');
        });

        new SettingTextEntry(tableDiv.createDiv()).generate(addNewNameFn);
        const markAsUsedAction: Action = {text: 'Mark as Used', action: markAsUsedFn};
        const removeFromUnusedAction: Action = {text: 'Remove', action: removeFromUnusedFn};
        new SettingsTable(this.plugin, tableDiv.createDiv(), unusedList, "Unsed Options Included in Generator", [markAsUsedAction, removeFromUnusedAction]).generate();

        const markAsUnusedAction: Action = {text: 'Mark as Unused', action: markAsUnusedFn};
        const removeFromUsedAction: Action = {text: 'Remove', action: removeFromUsedFn};
        new SettingsTable(this.plugin, tableDiv.createDiv(), usedList, "Used Options Not Included in Generator", [markAsUnusedAction, removeFromUsedAction]).generate();
    }

    async updateNPCNameTables(containerEl: HTMLElement, item: string, unusedArr: string[], usedArr: string[], action: string) {
        if(action === 'ADD_TO_UNUSED') {
            unusedArr.push(item);
        } else if(action === 'SHIFT_TO_USED') {
            usedArr.push(item);
            unusedArr.remove(item);
        } else if(action === 'SHIFT_TO_UNUSED') {
            usedArr.remove(item);
            unusedArr.push(item);
        } else if(action === 'REMOVE_FROM_UNUSED') {
            unusedArr.remove(item);
        } else if (action === 'REMOVE_FROM_USED') {
            usedArr.remove(item);
        }

        this.generateNPCNameTables(containerEl, unusedArr, usedArr);
        await this.plugin.saveSettings();
    }
}
