export class NPCRaceSettings {
    raceName: string;
    masculineFirst: string[];
    feminineFirst: string[];
    neutralFirst: string[];
    family: string[];

    constructor(notEmpty: boolean, raceName: string, defaultSettings?: boolean) {
        this.raceName = raceName;
        if(!notEmpty) {
            this.masculineFirst = [];
            this.feminineFirst = [];
            this.neutralFirst = [];
            this.family = [];
        } else if(defaultSettings) {
            this.masculineFirst = this.DEFAULT_MASCULINE_FIRST;
            this.feminineFirst = this.DEFAULT_FEMININE_FIRST;
            this.neutralFirst = this.DEFAULT_NEUTRAL_FIRST;
            this.family = this.DEFAULT_FAMILY;
        }
    }


    private DEFAULT_MASCULINE_FIRST = ["Tom!", "Jerry!"];
    private DEFAULT_FEMININE_FIRST = ["Jane!"];
    private DEFAULT_NEUTRAL_FIRST = ["Neutral Tom!"];
    private DEFAULT_FAMILY = ["Smith!"];
}


export{}
