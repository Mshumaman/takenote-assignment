import BasePage from "./BasePage";
import {expect} from "@playwright/test";

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

export default class NoteEditorFooter extends BasePage{

    private footerButton = 'span.sr-only'
    private previewButton = this.page.getByTestId('preview-mode');
    private lastSyncDate = this.page.locator('last-synced-notification-date')
    private darkMode = this.page.locator('.dark')


    public async selectOptionFromFooter(option: FooterButtonsSelectors) {
        await this.selectFromMultipleChoice(this.footerButton, option);
    }

    public async clickPreviewButton() {
        await this.previewButton.click();
    }

    public async validateDarkThemeByClass(){
        await expect(this.darkMode).toHaveCount(1);
    }

    public async validateDarkThemeByScreenshot(){
        // await this.darkMode.screenshot({ animations: 'disabled', path: 'assets/darkMode.png' , mask:[this.lastSyncDate]});
        await expect(this.darkMode).toHaveScreenshot('assets/darkMode.png', {maxDiffPixelRatio: 0.03});
    }

    public async downloadNoteAndValidate(expectedFileName: string){

        const downloadPromise = this.page.waitForEvent('download');
        await this.selectOptionFromFooter(FooterButtonsSelectors.DOWNLOAD);
        const download = await downloadPromise;

        const downloadedFileName= download.suggestedFilename();
        expect(downloadedFileName).toEqual(expectedFileName);
    }
}