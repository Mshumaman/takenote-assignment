import {test} from "../fixtures/Fixtures";
import {FooterButtonsSelectors} from "../pages/NoteEditorFooter";
import {SettingsTabs, SortByOptions} from "../pages/SettingsSection";
import {testData} from "../helpers/TestData";

test.use({storageState: './assets/predefined-test-data.json'});
test.describe('Test suite of settings section', {tag: '@uiAutomation'}, () => {

    const notes = testData.notes
    const importedNoteTitle = testData.importedNoteTitle;
    const notesBackupPath = './assets/importNote.json'

    test.beforeEach(async ({basePage, page}) => {
        await test.step('Load TakeNote Application and navigate to settings', async () => {
            await basePage.loadApplication();
        });
    });


    test('Change to dark mode from settings and validate', async ({settingsSection, noteEditorFooter}) => {

        await test.step('Change theme to light mode validate', async () => {
            await noteEditorFooter.selectOptionFromFooter(FooterButtonsSelectors.SETTINGS);
            await settingsSection.toggleDarkMode();
            await noteEditorFooter.validateTheme(false);
        });

        await test.step('Change theme to dark mode toggle and validate', async () => {
            await settingsSection.toggleDarkMode();
            await noteEditorFooter.validateTheme(true);
        });
    });

    test('Markdown preview setting test', async ({settingsSection, noteEditorFooter}) => {

        await test.step('From footer: Change note editor to preview mode and validate', async () => {
            await noteEditorFooter.selectOptionFromFooter(FooterButtonsSelectors.PREVIEW_MODE);
            await noteEditorFooter.validateEditorMode(FooterButtonsSelectors.PREVIEW_MODE);
        });

        await test.step('From footer: Change note editor to Edit Note mode and validate', async () => {
            await noteEditorFooter.selectOptionFromFooter(FooterButtonsSelectors.EDIT_NOTE);
            await noteEditorFooter.validateEditorMode(FooterButtonsSelectors.EDIT_NOTE);
        });

        await test.step('From settings: Change note editor to Preview mode and validate', async () => {
            await noteEditorFooter.selectOptionFromFooter(FooterButtonsSelectors.SETTINGS);
            await settingsSection.toggleMarkdownPreview();
            await settingsSection.closeSettings();
            await noteEditorFooter.validateEditorMode(FooterButtonsSelectors.PREVIEW_MODE);
        });

        await test.step('From settings: Change note editor to Edit Note mode and validate', async () => {
            await noteEditorFooter.selectOptionFromFooter(FooterButtonsSelectors.SETTINGS);
            await settingsSection.toggleMarkdownPreview();
            await settingsSection.closeSettings();
            await noteEditorFooter.validateEditorMode(FooterButtonsSelectors.EDIT_NOTE);
        });
    });

    test('Sort by functionality in settings', async ({settingsSection, noteEditorFooter, noteSidebarSection}) => {

        await test.step('Validate order of notes before changing the sorting in settings', async () => {
            await noteSidebarSection.validateOrderOfNotes(notes);
        });

        await test.step('Open settings, sort by title and validate', async () => {
            await noteEditorFooter.selectOptionFromFooter(FooterButtonsSelectors.SETTINGS);
            await settingsSection.selectSortByOption(SortByOptions.TITLE);
            await noteSidebarSection.validateOrderOfNotes([notes[0], notes[2], notes[1]]);
        });
    });

    test('Import takeNote backup and validate', async ({settingsSection, noteEditorFooter, noteSidebarSection}) => {

        await test.step('Navigate to settings > Data Managements', async () => {
            await noteEditorFooter.selectOptionFromFooter(FooterButtonsSelectors.SETTINGS);
            await settingsSection.selectTab(SettingsTabs.DATA_MANAGEMENTS);
        });

        await test.step('Import TakeNote backup', async () => {
            await settingsSection.importNotes(notesBackupPath);
            await settingsSection.closeSettings();
        });

        await test.step('Validate imported note displayed in list', async () => {
            await noteSidebarSection.validateNoteInList(importedNoteTitle);
        });
    });
});