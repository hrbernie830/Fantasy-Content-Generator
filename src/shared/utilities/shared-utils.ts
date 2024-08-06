
import * as fs from 'fs';
import { Notice } from 'obsidian';

export function importJSON(path: string, callback: (data: object) => void): void {
    console.log('importing')
    console.log(path)
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export function rollDice(diceSideCount: number, modifier: number) {
    return Math.clamp(Math.floor((Math.random() * diceSideCount) + 1) + modifier, 1, diceSideCount);
}
