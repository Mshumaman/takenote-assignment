import BasePage from "./BasePage";
import {expect, Page} from "@playwright/test";
import {NoteContextMenuActions} from "../types/UiEnums";


export default class NoteSidebarSection extends BasePage {
    private noteSearchBox = this.page.getByTestId('note-search');
    private noteTitles = this.page.locator('[data-testid*="note-title-"]')
    private notesTruncateText = '[class="truncate-text"]'

    constructor(protected page: Page) {
        super(page);
    }

    public async searchAndSelectNote(noteTitle: string) {
        await this.noteSearchBox.fill(noteTitle);
        await this.selectFromMultipleChoice(this.noteTitles, noteTitle);
    }

    public async chooseNoteContextAction(noteTitle: string, action: NoteContextMenuActions) {
        await this.selectFromMultipleChoice(this.noteTitles.locator(this.notesTruncateText), noteTitle, true)
        await this.page.getByTestId(action).click()
        ;
    }

    public async validateNoteInList(noteTitle: string) {
        await this.validateItemExist(this.noteTitles, noteTitle);
    }

    public async validateNoteCount(expectedCount: number) {
        await this.validateItemCount(this.noteTitles, expectedCount);
    }

    public async validateOrderOfNotes(notes: string[]) {
        const categoriesLength = notes.length;
        await this.page.locator(this.notesTruncateText).nth(categoriesLength - 1).waitFor()
        await expect.poll(async () => {
            const categoryElements = await this.page.locator(this.notesTruncateText).all();
            return Promise.all(
                categoryElements.map(async (element) => (await element.textContent() || '').trim())
            );
        }).toEqual(notes);
    }
}