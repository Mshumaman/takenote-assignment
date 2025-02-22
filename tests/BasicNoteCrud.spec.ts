
import {FooterButtonsSelectors} from "../pages/NoteEditorFooter";

import {testData} from "../helpers/TestData";
import {test} from '../fixtures/Fixtures';
import {EditorMode, NoteContextMenuActions, SidebarSectionsEnum} from "../types/UiEnums";


test.describe('Note CRUD operations', { tag: ['@sanity', '@regression'] }, () => {
    const editedNote = testData.editedNoteName;

    test.beforeEach(async ({basePage}) => {
        await test.step('Open the TakeNote application', async () => {
            await basePage.loadApplication();
        });
    });

    test('should create, edit, and delete a note', async ({noteEditorSection, noteEditorFooter, noteSidebarSection, appSidebarSection}) => {

        await test.step('Create a new note and verify content in editor and preview modes', async () => {
            await noteEditorSection.createNewNote(testData.exampleNote);
            await noteEditorSection.validateNoteContent(testData.exampleNote);
            await noteEditorFooter.selectOptionFromFooter(FooterButtonsSelectors.PREVIEW_MODE);
            await noteEditorSection.validateNoteContent(testData.exampleNote, EditorMode.PREVIEW);
        });

        await test.step('Edit the note and verify updated content in edit mode', async () => {
            await noteEditorFooter.selectOptionFromFooter(FooterButtonsSelectors.EDIT_NOTE);
            await noteEditorSection.typeTextInEditor(editedNote);
            await noteEditorSection.validateNoteContent(editedNote);
        });
        await test.step('Delete the note and confirm it appears in trash', async () => {
            await noteSidebarSection.searchAndSelectNote(editedNote);
            await noteEditorFooter.selectOptionFromFooter(FooterButtonsSelectors.DELETE);
            await appSidebarSection.chooseSection(SidebarSectionsEnum.TRASH);
            await noteSidebarSection.validateNoteInList(editedNote);
        });
    });

    test('should mark a note as favorite and then remove it', async ({noteEditorSection, noteEditorFooter, appSidebarSection, noteSidebarSection}) => {

        await test.step('Create a note for favorites testing', async () => {
            await noteEditorSection.createNewNote("Test Note");
        });

        await test.step('Mark the note as favorite and verify it in the favorites section', async () => {
            await noteEditorFooter.selectOptionFromFooter(FooterButtonsSelectors.ADD_TO_FAVORITES);
            await appSidebarSection.chooseSection(SidebarSectionsEnum.FAVORITES);
            await noteSidebarSection.validateNoteInList("Test Note");
        });

        await test.step('Unmark the note as favorite', async () => {
            await noteSidebarSection.chooseNoteContextAction("Test Note",NoteContextMenuActions.FAVORITE)
        });

        await test.step('Verify the note is no longer in favorites', async () => {
            await appSidebarSection.chooseSection(SidebarSectionsEnum.FAVORITES);
            await noteSidebarSection.validateNoteCount(0);
        })
    });
});

