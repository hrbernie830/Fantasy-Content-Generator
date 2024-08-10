
import { Setting } from 'obsidian';

export class SettingTextEntry
 {
    public parentElement: HTMLElement;

    // default button callback is to remove
    constructor(parentElement: HTMLElement) {
        this.parentElement = parentElement;
    }

    generate(addFunction: (text: string) => void) {
        let preText = '';
        new Setting(this.parentElement)
        .setName("New Addition:")
        .addTextArea((text) => {
            text.onChange((value) => {
                preText = value;
            })
        }).addButton((btn) => {
            btn.setCta().setButtonText("Add")
                .onClick(async () => {
                    addFunction(preText);
                })
        });
    }
}



