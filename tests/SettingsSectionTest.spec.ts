import {test} from "../fixtures/Fixtures";
import {FooterButtonsSelectors} from "../pages/NoteEditorFooter";
import {testData} from "../helpers/TestData";
import {SettingsTabs, SortByOptions} from "../types/UiEnums";

test.use({storageState: './assets/predefined-test-data.json'});
test.describe('Settings Section Functional Tests', { tag: ['@sanity', '@regression'] }, () => {

    const notes = testData.notes
    const importedNoteTitle = testData.importedNoteTitle;
    const notesBackupPath = './assets/importNote.json'

    test.beforeEach(async ({basePage, page}) => {
        await test.step('Load TakeNote Application and navigate to settings', async () => {
            await basePage.loadApplication();
        });
    });


    test('should toggle theme via settings and validate changes', async ({ settingsSection, noteEditorFooter }) => {

        await test.step('switch to light mode and verify theme update', async () => {
            await noteEditorFooter.selectOptionFromFooter(FooterButtonsSelectors.SETTINGS);
            await settingsSection.toggleDarkMode();
            await noteEditorFooter.validateTheme(false);
        });

        await test.step('toggle back to dark mode and confirm change', async () => {
            await settingsSection.toggleDarkMode();
            await noteEditorFooter.validateTheme(true);
        });
    });

    test('should update editor mode using markdown preview setting', async ({ settingsSection, noteEditorFooter }) => {

        await test.step('set editor to preview mode via footer and verify', async () => {
            await noteEditorFooter.selectOptionFromFooter(FooterButtonsSelectors.PREVIEW_MODE);
            await noteEditorFooter.validateEditorMode(FooterButtonsSelectors.PREVIEW_MODE);
        });

        await test.step('set editor to edit mode via footer and verify', async () => {
            await noteEditorFooter.selectOptionFromFooter(FooterButtonsSelectors.EDIT_NOTE);
            await noteEditorFooter.validateEditorMode(FooterButtonsSelectors.EDIT_NOTE);
        });

        await test.step('open settings, enable markdown preview, and verify preview mode', async () => {
            await noteEditorFooter.selectOptionFromFooter(FooterButtonsSelectors.SETTINGS);
            await settingsSection.toggleMarkdownPreview();
            await settingsSection.closeSettings();
            await noteEditorFooter.validateEditorMode(FooterButtonsSelectors.PREVIEW_MODE);
        });

        await test.step('open settings, disable markdown preview, and verify edit mode', async () => {
            await noteEditorFooter.selectOptionFromFooter(FooterButtonsSelectors.SETTINGS);
            await settingsSection.toggleMarkdownPreview();
            await settingsSection.closeSettings();
            await noteEditorFooter.validateEditorMode(FooterButtonsSelectors.EDIT_NOTE);
        });
    });

    test('should sort notes by title using settings', async ({ settingsSection, noteEditorFooter, noteSidebarSection }) => {

        await test.step('verify initial order of notes', async () => {
            await noteSidebarSection.validateOrderOfNotes(notes);
        });

        await test.step('open settings, sort notes by title, and verify new order', async () => {
            await noteEditorFooter.selectOptionFromFooter(FooterButtonsSelectors.SETTINGS);
            await settingsSection.selectSortByOption(SortByOptions.TITLE);
            await noteSidebarSection.validateOrderOfNotes([notes[0], notes[2], notes[1]]);
        });
    });

    test('should import a backup and display the imported note', async ({ settingsSection, noteEditorFooter, noteSidebarSection }) => {

        await test.step('open settings and navigate to Data Management tab', async () => {
            await noteEditorFooter.selectOptionFromFooter(FooterButtonsSelectors.SETTINGS);
            await settingsSection.selectTab(SettingsTabs.DATA_MANAGEMENTS);
        });

        await test.step('import backup data and close settings', async () => {
            await settingsSection.importNotes(notesBackupPath);
            await settingsSection.closeSettings();
        });

        await test.step('confirm the imported note is displayed in the list', async () => {
            await noteSidebarSection.validateNoteInList(importedNoteTitle);
        });
    });
});