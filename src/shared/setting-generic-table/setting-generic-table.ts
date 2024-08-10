
import FantasyPlugin from 'main';
import { Setting } from 'obsidian';
import * as SharedUtils from '../utilities/shared-utils';
import { SettingsTable } from '../settings-table/settings-table';
import { SettingTextEntry } from '../setting-text-entry/setting-text-entry';

export class SettingGenericTable
 {
    private plugin: FantasyPlugin;
    private parentElement: HTMLElement;
    private textEntryDiv: HTMLElement;
    private tableDiv: HTMLElement;
    private title: string;
    private arr: any[];
    private desc: string;

    private addFunction: ((text: string) => void);

    // default button callback is to remove
    constructor(plugin: FantasyPlugin, parentElement: HTMLElement, title: string, desc: string, arr: any[]) {
        this.plugin = plugin;
        this.parentElement = parentElement;
        this.title = title;
        this.desc = desc;
        this.arr = arr;
    }

    private resetStructure() {
        this.parentElement.innerHTML = '';

        this.textEntryDiv = this.parentElement.createDiv();
        this.tableDiv = this.parentElement.createDiv();

        this.addFunction = (async (text: string) => {
            SharedUtils.convertStringToArray(text, this.arr);
            await this.plugin.saveSettings();
            this.generate();
        });
    }

    generate(): void {
        this.resetStructure();
        
        new Setting(this.textEntryDiv).setName(this.title).setDesc(this.desc);
        new SettingTextEntry(this.textEntryDiv).generate(this.addFunction);

        
        new SettingsTable(this.plugin, this.tableDiv, this.arr, this.title, [{text: 'Remove', action: async (item: string, itemList: string[]) => {
            this.arr.remove(item);
            await this.plugin.saveSettings();
            this.generate();
        }}]).generate();
    }


}



