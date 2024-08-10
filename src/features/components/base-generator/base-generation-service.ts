import { BaseGeneratedItem } from "../../../types/base/BaseGeneratedItem";

export class BaseGeneratorService {
  GENERATE_NOTE_HIDDEN = true;

  generateItem(settings?: any): any {
    return new BaseGeneratedItem("implementation missing");
  }

  createView(resultsDiv: HTMLElement, item: BaseGeneratedItem) {
    resultsDiv.empty();
    resultsDiv.createEl("h6", { text: item.getName() });
  }


  generateNote(fileLocation: string, item: any) {
    // Do Nothing
  }
}