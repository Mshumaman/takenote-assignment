import BasePage from "./BasePage";
import {Page} from "@playwright/test";

export enum EditorMode {
    EDIT = 'Edit',
    PREVIEW = 'Preview'
}

export class NoteEditorSection extends BasePage {
    private newNoteButton = this.page.locator('[data-testid="sidebar-action-create-new-note"]');
    private textEditorBody = this.page.locator('.CodeMirror');
    private previewer = this.page.locator('.previewer');


    constructor(protected page: Page) {
        super(page);
    }

    public async createNewNote(text: string) {
        await this.newNoteButton.click();
        await this.typeTextInEditor(text);
    }

    public async typeTextInEditor(text: string) {
        await this.clearFieldAndTypeText(this.textEditorBody,text);
    }

    public async validateNoteContent(expectedContent: string, mode: EditorMode = EditorMode.EDIT) {
        const locator = mode === EditorMode.EDIT ? this.textEditorBody : this.previewer;
        if (mode === EditorMode.PREVIEW) {
            expectedContent = expectedContent.replace(/-\s/g, ''); // Remove dashes for preview mode
        }
        await this.validateFormattedContent(locator, expectedContent);

    }


}