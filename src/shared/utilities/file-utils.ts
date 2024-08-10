/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from 'fs';
import { FileSystemAdapter, Notice } from 'obsidian';

export function importJSON(path: string, callback: (data: object) => void): void {
    fs.readFile(path, 'utf8', (error, data) => {
        if (error) {
            new Notice("Error Importing: " + error);
            return;
        }
        const jsonData = JSON.parse(data);
        new Notice("Data Successfully Imported!");
        callback(jsonData);
    });
}

export function exportJSON(data: any) {
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.download = 'data.json';
    a.href = url;
    a.click();

    new Notice("Data Exporting!");
}

export function getVaultLocation() {
    const adapter = app.vault.adapter;
    if (adapter instanceof FileSystemAdapter) {
        return adapter.getBasePath();
    }
    return '';
}

export function saveDataToFile(folderPath: string, fileName: string, fileContents: any) {
    if (!fs.existsSync(folderPath)){
        fs.mkdirSync(folderPath, { recursive: true });
    }

    fs.writeFile(folderPath + "\\" + fileName, fileContents, err => {
      if (err) {
        console.error(err);
      } else {
        // file written successfully
      }
    });
}