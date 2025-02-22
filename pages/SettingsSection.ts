import BasePage from "./BasePage";
import {Page} from "@playwright/test";
import {SettingsTabs, SortByOptions} from "../types/UiEnums";


export default class SettingsSection extends BasePage {
    private darkModeToggle = this.page.getByTestId('dark-mode-toggle');
    private markdownPreviewToggle = this.page.getByTestId('markdown-preview-toggle');
    private closeSettingsButton = this.page.locator('.close-button');
    private sortBySelect = this.page.getByTestId('sort-by-dropdown');
    private importBackupButton = '[aria-label="Import backup"]';
    private settingsPopup = this.page.locator('.settings-modal');


    constructor(protected page: Page) {
        super(page);
    }

    public async toggleDarkMode() {
        await this.darkModeToggle.click();
    }

    public async toggleMarkdownPreview() {
        await this.markdownPreviewToggle.click();
    }

    public async closeSettings() {
        await this.closeSettingsButton.click();
    }

    public async selectTab(tab: SettingsTabs) {
        await this.settingsPopup.getByRole('button', {name: tab}).click()
    }

    public async selectSortByOption(option: SortByOptions) {
        await this.sortBySelect.selectOption(option);
    }

    public async importNotes(filePath: string) {
        await this.uploadFile(this.importBackupButton, filePath);
    }
}