
import FantasyPlugin from 'main';
import { Setting } from 'obsidian';
import { Action } from 'src/types/settings/Action';

export class SettingsTable
 {
    public plugin: FantasyPlugin;
    public parentElement: HTMLElement;
    public valueList: any[];
    public headerText: string;
    public buttonText: string;
    public buttonCallbackFn?: any;
    public actions: Action[];

    // default button callback is to remove
    constructor(plugin: FantasyPlugin, parentElement: HTMLElement, valueList: any[], headerText: string, actions?: Action[]) {
        this.plugin = plugin;
        this.parentElement = parentElement;
        this.valueList = valueList;
        this.headerText = headerText;

        if(!actions) {
            const defaultAction: Action = {text: 'Remove', action: this.defaultCallbackFn}
            actions = [defaultAction];
        }
        this.actions = actions;
    }

    defaultCallbackFn(value: any, arr: any[]) {
        arr.remove(value);
        this.valueList = arr;
        this.generate();
    }

    generate() {
        this.parentElement.innerHTML = '';

        const genericFoldDiv = this.parentElement.createEl('details', { cls: "OFCGDetails" });
        const tableHeaderText = this.headerText;
        genericFoldDiv.createEl("summary", { text: tableHeaderText, cls: "OFCGSummary" });
        genericFoldDiv.setAttribute('open', '');

        for (let index = 0; index < this.valueList.length; index++) {
            let settingUnderCreation = new Setting(genericFoldDiv).setName(this.valueList[index]);
            for(const button of this.actions) {
                settingUnderCreation = settingUnderCreation.addButton((btn) => btn
                .setCta()
                .setButtonText(button.text)
                .onClick(async () => {
                    button.action(this.valueList[index], this.valueList);
                }))
            }            
        }
    }
}



