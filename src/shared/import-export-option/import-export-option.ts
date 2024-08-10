import { Platform, Setting } from 'obsidian';
import { FileWithPath } from 'src/types/settings/FileWithPath';
import * as FileUtils from '../utilities/file-utils';

export class ImportExportOption
 {
    public parentElement: HTMLElement;
    public importFn: (data: object) => void
    public exportFn: () => void;

    // default button callback is to remove
    constructor(parentElement: HTMLElement, importFn: (data: object) => void, exportFn: () => void) {
        this.parentElement = parentElement;
        this.importFn = importFn;
        this.exportFn = exportFn;
    }

    public generate() {
        if (Platform.isDesktopApp) {
            const importExportFile = new Setting(this.parentElement)
                .setName("Import | Export")
                .setDesc("Import A Json File With Supported information");

            const inputAppfile = createEl("input", {
                attr: {
                    type: "file",
                    name: "file",
                    accept: ".json",
                    multiple: false
                }
            });

            inputAppfile.onchange = async () => {
                const { files } = inputAppfile;
                if (files === null || !files.length) return;
                try {
                    const file = files[0] as FileWithPath;
                    FileUtils.importJSON(file.path, this.importFn);
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
                    .onClick(this.exportFn)
            });
        }
    }

}



