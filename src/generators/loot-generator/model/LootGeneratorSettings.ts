export class LootGeneratorSettings {
    adj: string[];
    items: { item: string, weight: number }[];

    constructor(defaultSettings?: boolean) {
        if(defaultSettings) {
            this.adj = this.DEFAULT_ADJECTIVES;
            this.items = this.DEFAULT_ITEMS;
        }
    }

    private DEFAULT_ADJECTIVES = ["Old", "Tattered", "rotten", "Shiny", "Polished", "rusty", "broken", "Priceless", "Ancient", "Precious", 'Shiny', 'Glowing', 'Mysterious', 'Enchanted', 'Ornate', 'Magical', 'Powerful'];
    private DEFAULT_ITEMS = [
        { item: 'feather', weight: 0.8 },
        { item: 'sword', weight: 0.2 },
        { item: 'bow', weight: 0.2 },
        { item: 'wand', weight: 0.1 },
        { item: 'armor', weight: 0.2 },
        { item: 'shield', weight: 0.1 },
        { item: 'amulet', weight: 0.1 },
        { item: 'ring', weight: 0.1 },
        { item: 'book', weight: 0.2 },
        { item: 'scroll', weight: 0.2 },
        { item: 'potion', weight: 0.3 },
        { item: 'trinket', weight: 0.3 },
        { item: 'gemstone', weight: 0.2 },
        { item: 'wand core', weight: 0.1 },
        { item: 'tome', weight: 0.2 },
        { item: 'relic', weight: 0.1 },
        { item: 'spellbook', weight: 0.2 },
        { item: 'grimoire', weight: 0.2 },
        { item: 'tome', weight: 0.2 },
        { item: 'journal', weight: 0.2 },
        { item: 'ledger', weight: 0.1 },
        { item: 'diary', weight: 0.1 },
        { item: 'healing potion', weight: 0.2 },
        { item: 'mana potion', weight: 0.2 },
        { item: 'invisibility potion', weight: 0.1 },
        { item: 'poison', weight: 0.1 },
        { item: 'love potion', weight: 0.1 },
        { item: 'strength potion', weight: 0.1 },
        { item: 'speed potion', weight: 0.1 },
        { item: 'water breathing potion', weight: 0.1 },
        { item: 'fire resistance potion', weight: 0.1 },
        { item: 'flying potion', weight: 0.1 },
        { item: 'locket', weight: 0.2 },
        { item: 'charm', weight: 0.3 },
        { item: 'statue', weight: 0.2 },
        { item: 'figurine', weight: 0.2 },
        { item: 'music box', weight: 0.1 },
        { item: 'dagger', weight: 0.1 },
        { item: 'pen', weight: 0.1 },
        { item: 'hourglass', weight: 0.1 },
        { item: 'pipe', weight: 0.1 },
        { item: 'goblet', weight: 0.1 },
        { item: 'candle', weight: 0.2 },
    ];
}

export{}