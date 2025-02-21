import BasePage from "./BasePage";

export enum NoteContextMenuActions {
    COPY_REFERENCE = 'copy-reference-to-note',
    DOWNLOAD = 'note-option-download',
    MOVE_TO_TRASH = 'note-option-trash',
    FAVORITE = 'note-option-favorite',
}

export default class NoteSidebarSection extends BasePage {
    private noteSearchBox = this.page.getByTestId('note-search');
    private noteTitles = '[data-testid*="note-title-"]'

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

}