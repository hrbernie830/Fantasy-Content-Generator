import { BaseGeneratedItem } from "src/types/base/BaseGeneratedItem";

export class Loot extends BaseGeneratedItem {
    public mapping = {'Common': 0, 'Uncommon': 0, 'Rare': 0, 'Very Rare': 0, 'Legendary': 0,  'Remaining GP': 0};
    public itemMapping: {'Common': string[], 'Uncommon': string[], 'Rare': string[], 'Very Rare': string[], 'Legendary': string[]} = {'Common': [], 'Uncommon': [], 'Rare': [], 'Very Rare': [], 'Legendary': []};

    getMapping() {
        return this.mapping;
    }

    getItemMapping() {
        return this.itemMapping;
    }

    getListAsString(spacer: string, skipEmpty: boolean): string {
        let listString = '';
        for(const rarity in this.itemMapping) {
            const rarityItemList = this.itemMapping[rarity as keyof typeof this.itemMapping];
            if(rarityItemList.length > 0 || !skipEmpty) {
                listString = listString + "\r\n##### " + rarity.toUpperCase() + this.getRarityListAsString(rarity, spacer, '', skipEmpty) + "\r\n";
            }
            
        }
        return listString;
    }

    private getRarityListAsString(rarity: string, spacer: string, prefix: string, skipEmpty: boolean): string {
        let retVal = '';
        const rarityItemList = this.itemMapping[rarity as keyof typeof this.itemMapping];
        if(rarityItemList.length > 0 || !skipEmpty) {
            for(const item of rarityItemList) {
                console.log(item);
                let unmodifiedItemName = item.substring(0, item.indexOf(' ['));
                let itemModification = '';
                let source = item.substring(item.indexOf(' [') + 2, item.indexOf(']'));
                if(item.contains(',')) {
                    unmodifiedItemName = item.substring(0, item.indexOf(','));
                    itemModification = ', ' + item.substring(item.indexOf(',') + 2, item.indexOf(' ['));
                    source = item.substring(item.indexOf(' [') + 2, item.indexOf(']'));
                } else if(item.contains('(')) {
                    unmodifiedItemName = item.substring(0, item.indexOf('('));
                    itemModification = '(' + item.substring(item.indexOf('(') + 1, item.indexOf(' [') - 1) + ')';
                    source = item.substring(item.indexOf(' [') + 2, item.indexOf(']'));
                }
                
                console.log(unmodifiedItemName)
                console.log(itemModification)
                console.log(source)
                const fullItemToPrint = '[[' + unmodifiedItemName + '|' + unmodifiedItemName + itemModification + ']] ([[' + source + ']])';
                console.log(fullItemToPrint);
                retVal = retVal + spacer + fullItemToPrint;
            }
        }
        
        return retVal;
    }
}

export{}