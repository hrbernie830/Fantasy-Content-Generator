import { GeneratorModal } from 'src/core/main-modal';
import { MarkdownView, Notice, Plugin, Editor } from 'obsidian';
import { FantasyPluginSettings } from 'src/types/settings/FantasyPluginSettings';
import { SettingsTab } from 'src/features/components/settings/SettingsTab';
import { generateDefaultSettings } from 'src/shared/utilities/shared-utils';

export default class FantasyPlugin extends Plugin {
	settings: FantasyPluginSettings;
	currentEditor: Editor | null = null;

	async onload() {  
		await this.loadSettings();

		this.app.workspace.on('active-leaf-change', (leaf) => {
			if (leaf) {
				const view = leaf.view;
				if (view instanceof MarkdownView) {
					this.currentEditor = view.editor;
				} else {
					this.currentEditor = null;
				}
			} else {
				this.currentEditor = null;
			}
		});

		// This creates an icon in the left ribbon to access the modal for the Fantasy Content Generator.
		this.addRibbonIcon('blocks', 'Fantasy Generators', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new GeneratorModal(this.app, (result) => {
				const copyContent = async () => {
					//Try to see if any generators spit out an Error or if copying the string fails.
					try {
						if (result instanceof Error) {
							new Notice(`${result}`);
						} else {
							await navigator.clipboard.writeText(result);
							new Notice(`${result} was copied to the clipboard.`);
						}
					} catch (err) {
						console.error('Failed to copy: ', err);
						new Notice("Failed to copy, Check error in console.");
					}
				}
				
				copyContent();

			}, this).open();
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SettingsTab(this.app, this));

		console.log("loaded Fantasy Content Generator");
	}

	onunload() {
	}

	async loadSettings() {
		this.settings = Object.assign({}, generateDefaultSettings(), await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

