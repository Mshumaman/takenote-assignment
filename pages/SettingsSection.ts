import BasePage from "./BasePage";

export enum SettingsTabs {
    SETTINGS = 'Settings',
    PREFERENCES = 'Preferences',
    KEYBOARD_SHORTCUTS = 'Keyboard shortcuts',
    DATA_MANAGEMENTS = 'Data management',
    ABOUT_TAKENOTE = 'About TakeNote'
}

export enum SortByOptions {
    TITLE = 'Title',
    DATE_CREATED = 'Date Created',
    LAST_UPDATED = 'Last Updated'
}

export default class SettingsSection extends BasePage {
    private darkModeToggle = this.page.getByTestId('dark-mode-toggle');
    private markdownPreviewToggle = this.page.getByTestId('markdown-preview-toggle');
    private closeSettingsButton = this.page.locator('.close-button');
    private sortBySelect = this.page.getByTestId('sort-by-dropdown');
    private importBackupButton = '[aria-label="Import backup"]';


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
        await this.page.getByRole('button', {name: tab}).click()
    }

    public async selectSortByOption(option: SortByOptions) {
        await this.sortBySelect.selectOption(option);
    }

    public async importNotes(filePath: string) {
        await this.uploadFile(this.importBackupButton, filePath);
    }
}