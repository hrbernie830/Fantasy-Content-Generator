export class GeneratorService {
  GENERATE_NOTE_HIDDEN = true;

  onGenerateButtonClicked(resultsDiv: HTMLElement, settings?: any): any {
    resultsDiv.empty();
    resultsDiv.createEl("h3", { text: 'Missing'});

    return null;
  }


  generateNote(item: any) {
    // Do Nothing
  }
}


