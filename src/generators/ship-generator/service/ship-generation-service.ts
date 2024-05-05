import { BaseGeneratorService } from "src/generators/base-generator/service/base-generation-service";
import { Ship } from "../model/Ship";


export class ShipGeneratorService extends BaseGeneratorService {
    GENERATE_NOTE_HIDDEN = true;

    generateItem(settings?: any): Ship {
        const adjective = this.randomItemFromArray(adjectives);
        const prefix = this.randomItemFromArray(prefixes);
        const noun = this.randomItemFromArray(nouns);
        let generatedName = '';
        const numSyllables = Math.floor(Math.random() * 2) + 2;
        for (let i = 0; i < numSyllables; i++) {
            const syllableIndex = Math.floor(Math.random() * syllables.length);
            generatedName += syllables[syllableIndex];
            if (i < numSyllables - 1) {
                const vowelIndex = Math.floor(Math.random() * vowels.length);
                generatedName += vowels[vowelIndex];
            }
        }
        generatedName = this.capitalizeFirstLetter(generatedName);
        return new Ship(Math.random() < 0.5 ? `${adjective} ${noun} of ${generatedName}` : `${prefix} ${adjective} ${generatedName}`);
    }

    private randomItemFromArray(array:string[]): string {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    private capitalizeFirstLetter(str:string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
  


const adjectives = ["Mighty", "Grand", "Brave", "Fearless", "Majestic", "Mighty", "Powerful", "Glorious", "Magnificent", "Majestic"];
const nouns = ["Wind", "Wave", "Storm", "Thunder", "Sea", "Ocean", "Voyager", "Adventurer", "Explorer", "Navigator"];

const prefixes = ["AE", "AFS", "AHT", "AHTS", "AO","AE",
"AFS",
"AHT",
"AHTS",
"AO",
"AOG",
"AOR",
"AOT",
"ASDS",
"ATB",
"CRV",
"C/F",
"CS",
"DB",
"DEPV",
"DLB",
"DCV",
"DSV",
"DV",
"ERRV",
"EV",
"FPSO",
"FPV",
"FPV",
"FT",
"FV",
"GTS",
"HLV",
"HMT",
"HMHS",
"HSC",
"HSF",
"HTV",
"IRV",
"ITB",
"LB",
    "LNG",
"LPG",
"MF",
"MFV",
"MS",
"MSV",
"MSY",
"MT",
"MTS",
"MV",
"MY",
"NB",
"NRV",
"NS",
"OSV",
"PS",
"PSV",
"QSMV",
"QTEV",
"RMS",
"RNLB",
"RRS",
    "RV",
    "RSV",
"SB",
"SL",
"SS",
"SSCV",
"SSS",
"SSV",
"ST",
"STS",
"STV",
"SV",
"SY",
"TB",
"TIV",
"TEV",
"TRSS",
"TS",
    "TRS",
"TSMV",
"TSS",
"TST",
"TT",
"TV",
"ULCC",
"VLCC",
"YD",
"YT",
"YMT",
"YTB",
"YTL",
"YTM",
"YW",
"YWN",
"YOS",
]

const vowels = ['a', 'e', 'i', 'o', 'u'];
const syllables = ["an", "ar", "ast", "at", "cal", "chi", "cy", "dan", "eir","ba","th","tho","tri","tr", "el", "end",
"ent", "est", "ian", "ic", "il", "in", "ir", "it", "kil", "kor", "ler", "lor",
"man", "mar", "mei", "mon", "ner", "or", "ore", "rak", "ri", "ris", "ry", "se",
    "ser", "tor", "tos", "um", "ys", "zor","ka","ra","go","shi","ma","to","zo","ro","lo"];
