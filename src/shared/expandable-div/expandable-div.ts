export class ExpandableDiv
 {
    public parentElement: HTMLElement;
    private headerKind: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    private title: string;

    // default button callback is to remove
    constructor(parentElement: HTMLElement, title: string, headerKind: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
        this.parentElement = parentElement;
        this.title = title;
        this.headerKind = headerKind ? headerKind : "h1";
    }
    
    generate(startExpanded?: boolean, ): HTMLElement {
        const outerDiv = this.parentElement.createDiv({
            attr: {
                style: "padding-top: 3px;"
            }
        });
        const header = outerDiv.createEl(this.headerKind, { text: this.title + " (tap to expand)" });

        const expandedDiv = outerDiv.createDiv();

        const title = this.title;
        header.onclick = function() {
            if(header.innerHTML.contains("expand")) {
                header.innerHTML = title + " (tap to collapse)";
                expandedDiv.hidden = false;
            } else {
                header.innerHTML = title + " (tap to expand)";
                expandedDiv.hidden = true;
            }
        };

        if(startExpanded) {
            header.click();
        } else {
            expandedDiv.hidden = true;
        }

        return expandedDiv;
    }
}



