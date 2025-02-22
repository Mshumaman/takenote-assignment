import BasePage from "./BasePage";
import {expect, Page} from "@playwright/test";
import {NoteContextMenuActions} from "../types/UiEnums";


export default class NoteSidebarSection extends BasePage {
    private noteSearchBox = this.page.getByTestId('note-search');
    private noteTitles = '[data-testid*="note-title-"]'
    private notesTruncateText = '[class="truncate-text"]'

    constructor(protected page: Page) {
        super(page);
    }

    public async searchAndSelectNote(noteTitle: string) {
        await this.noteSearchBox.fill(noteTitle);
        await this.selectFromMultipleChoice(this.noteTitles, noteTitle);
    }

    public async chooseNoteContextAction(noteTitle: string, action: NoteContextMenuActions) {
        await this.selectFromMultipleChoice(`${this.noteTitles} [class="truncate-text"]`, noteTitle, true)
        await this.page.getByTestId(action).click()
        ;
    }

    public async validateNoteInList(noteTitle: string) {
        await this.validateItemExist(this.noteTitles, noteTitle);
    }

    public async validateNoteCount(expectedCount: number) {
        let noteTilesLocator = this.page.locator(this.noteTitles);
        await this.validateItemCount(noteTilesLocator, expectedCount);
    }

    public async validateOrderOfNotes(notes: string[]) {
        const categoriesLength = notes.length;
        await this.page.locator(this.notesTruncateText).nth(categoriesLength - 1).waitFor()
        const categoryElements = await this.page.locator(this.notesTruncateText).all();

        const extractedNotes = await Promise.all(
            categoryElements.map(async (element) => {
                const text = await element.textContent();
                return text ? text.trim() : '';
            })
        );
        expect(extractedNotes).toEqual(notes);
    }

}