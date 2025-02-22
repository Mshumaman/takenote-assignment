import {test} from "../fixtures/Fixtures";
import {testData} from "../helpers/TestData";
import {SidebarSectionsEnum} from "../types/UiEnums";

test.describe('Keyboard Shortcuts Functionality', { tag: ['@regression'] }, () => {

    test.beforeEach(async ({basePage}) => {
        await basePage.loadApplication();
    });

    test('should create and delete a note using keyboard shortcuts', async ({basePage, noteSidebarSection, appSidebarSection, noteEditorSection }) => {
        await test.step('create note using keyboard shortcut', async () => {
            await appSidebarSection.chooseSection(SidebarSectionsEnum.FAVORITES);
            await basePage.pressShortcut('N');
            await noteEditorSection.typeTextInEditor(testData.noteTestTitle);
            await noteEditorSection.validateNoteContent(testData.noteTestTitle);
        });

        await test.step('delete note using keyboard shortcut', async () => {
            await basePage.pressShortcut('U');
            await appSidebarSection.chooseSection(SidebarSectionsEnum.TRASH);
            await noteSidebarSection.validateNoteInList(testData.noteTestTitle);
        });
    });

    test('should create a category using keyboard shortcut', async ({basePage, appSidebarSection}) => {
        await test.step('create category using keyboard shortcut and validate', async () => {
            await basePage.pressShortcut('C');
            await appSidebarSection.addCategory(testData.category);
            await appSidebarSection.validateCategoryInList(testData.category);
        });
    });

    test('should sync a note using keyboard shortcut', async ({basePage, noteEditorFooter}) => {
        await test.step('sync note using keyboard shortcut and validate sync timestamp', async () => {
            await basePage.pressShortcut('L');
            await noteEditorFooter.validateSyncTimestampDisplayed();
        });
    });

    test('should search for a note using keyboard shortcut', async ({basePage, noteSidebarSection, noteEditorSection }) => {
        await test.step('create note using keyboard shortcut', async () => {
            await basePage.pressShortcut('N');
            await noteEditorSection.typeTextInEditor(testData.noteTestTitle)
        });
        await test.step('search note using keyboard shortcut and validate', async () => {
            await basePage.pressShortcut('F');
            await noteSidebarSection.searchAndSelectNote(testData.defaultWelcomeNoteTitle);
            await noteSidebarSection.validateNoteInList(testData.defaultWelcomeNoteTitle);
        });
    });

    test('should toggle theme using keyboard shortcut', async ({basePage, noteEditorFooter}) => {
        await test.step('switch to dark mode using keyboard shortcut and validate', async () => {
            await basePage.pressShortcut('K');
            await noteEditorFooter.validateTheme(true);
        });
        await test.step('switch to light mode using keyboard shortcut and validate', async () => {
            await basePage.pressShortcut('K');
            await noteEditorFooter.validateTheme(false);
        });
    });
});