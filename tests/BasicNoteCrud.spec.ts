import {EditorMode} from "../pages/NoteEditorSection";
import {FooterButtonsSelectors} from "../pages/NoteEditorFooter";
import {SidebarSectionsEnum} from "../pages/AppSidebarSection";
import {testData} from "../helpers/TestData";
import {test} from '../fixtures/Fixtures';
import {NoteContextMenuActions} from "../pages/NoteSidebarSection";

test.describe('Basic add edit and delete scenario', {tag: '@uiAutomation'}, () => {
    const editedNote = testData.editedNoteName;

    test.beforeEach(async ({basePage}) => {
        await test.step('Navigate to TakeNote Application', async () => {
            await basePage.loadApplication();
        });
    });

    test('Add edit and delete scenario', async ({noteEditorSection, noteEditorFooter, noteSidebarSection, appSidebarSection}) => {

        await test.step('Add new note and validate content in editor and preview mode', async () => {
            await noteEditorSection.createNewNote(testData.exampleNote);
            await noteEditorSection.validateNoteContent(testData.exampleNote);
            await noteEditorFooter.selectOptionFromFooter(FooterButtonsSelectors.PREVIEW_MODE);
            await noteEditorSection.validateNoteContent(testData.exampleNote, EditorMode.PREVIEW);
        });

        await test.step('Edit content and validate in edit mode', async () => {
            await noteEditorFooter.selectOptionFromFooter(FooterButtonsSelectors.EDIT_NOTE);
            await noteEditorSection.typeTextInEditor(editedNote);
            await noteEditorSection.validateNoteContent(editedNote);
        });
        await test.step('Delete content and validate note moved to trash', async () => {
            await noteSidebarSection.searchAndSelectNote(editedNote);
            await noteEditorFooter.selectOptionFromFooter(FooterButtonsSelectors.DELETE);
            await appSidebarSection.chooseSection(SidebarSectionsEnum.TRASH);
            await noteSidebarSection.validateNoteInList(editedNote);
        });
    });

    test('Add note to favorites and validate', async ({noteEditorSection, noteEditorFooter, appSidebarSection, noteSidebarSection}) => {

        await test.step('Edit content and validate in edit mode', async () => {
            await noteEditorSection.createNewNote("Test Note");
        });

        await test.step('Add note to Favorites and validate', async () => {
            await noteEditorFooter.selectOptionFromFooter(FooterButtonsSelectors.ADD_TO_FAVORITES);
            await appSidebarSection.chooseSection(SidebarSectionsEnum.FAVORITES);
            await noteSidebarSection.validateNoteInList("Test Note");
        });

        await test.step('Remove note from Favorites', async () => {
            await noteSidebarSection.chooseNoteContextAction("Test Note",NoteContextMenuActions.FAVORITE)
        });

        await test.step('Validate note is removed from Favorites', async () => {
            await appSidebarSection.chooseSection(SidebarSectionsEnum.FAVORITES);
            await noteSidebarSection.validateNoteCount(0);
        })
    });
});

