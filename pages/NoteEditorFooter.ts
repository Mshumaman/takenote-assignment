import BasePage from "./BasePage";
import {expect, Page} from "@playwright/test";

export enum FooterButtonsSelectors {
    PREVIEW_MODE = 'Preview note',
    EDIT_NOTE = 'Edit note',
    ADD_TO_FAVORITES = 'Add note to favorites',
    DELETE = 'Delete note',
    DOWNLOAD = 'Download note',
    COPY = 'Copy note',
    SYNC = 'Sync notes',
    THEMES = 'Themes',
    SETTINGS = 'Settings',
}

export default class NoteEditorFooter extends BasePage {

    private footerButton = '[class*="note-menu-bar-button"]'
    private previewButton = this.page.getByTestId('preview-mode');
    private lastSyncDate = this.page.getByTestId('last-synced-notification-date')
    private darkMode = this.page.locator('.dark')
    private previewModeLayout = this.page.locator('[class="previewer previewer_direction-ltr"]')
    private editorModeLayout = this.page.locator('[class="react-codemirror2 editor mousetrap"]')


    constructor(protected page: Page) {
        super(page);
    }

    public async selectOptionFromFooter(option: FooterButtonsSelectors) {
        await this.selectFromMultipleChoice(this.footerButton, option);
    }

    public async clickPreviewButton() {
        await this.previewButton.click();
    }

    public async validateTheme(isDarkMode: boolean) {
        if (isDarkMode) {
            await expect(this.darkMode).toHaveCount(1);
        } else {
            await expect(this.darkMode).toHaveCount(0);
        }
    }

    public async validateDarkThemeByScreenshot() {
        // await this.darkMode.screenshot({ animations: 'disabled', path: 'assets/darkMode.png' , mask:[this.lastSyncDate]});
        await expect(this.darkMode).toHaveScreenshot('assets/darkMode.png', {maxDiffPixelRatio: 0.03});
    }

    public async downloadNoteAndValidate(expectedFileName: string) {

        const downloadPromise = this.page.waitForEvent('download');
        await this.selectOptionFromFooter(FooterButtonsSelectors.DOWNLOAD);
        const download = await downloadPromise;
        const downloadedFileName = download.suggestedFilename();
        expect(downloadedFileName).toEqual(expectedFileName);
    }

    public async validateEditorMode(mode: FooterButtonsSelectors) {
        if (mode == FooterButtonsSelectors.PREVIEW_MODE) {
            await this.validateItemCount(this.previewModeLayout, 1);
        }
        if (mode == FooterButtonsSelectors.EDIT_NOTE) {
            await this.validateItemCount(this.editorModeLayout, 1);
        }
    }
}