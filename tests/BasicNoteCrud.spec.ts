import {EditorMode} from "../pages/NoteEditorSection";
import {FooterButtonsSelectors} from "../pages/NoteEditorFooter";
import {SidebarSectionsEnum} from "../pages/AppSidebarSection";
import {testNotes} from "../helpers/TestData";
import {test} from '../fixtures/Fixtures';
import {NoteContextMenuActions} from "../pages/NoteSidebarSection";

test.describe('Basic add edit and delete scenario', {tag: '@uiAutomation'}, () => {
    const editedNote = "Edited content";

    test.beforeEach(async ({basePage, page}) => {
        await test.step('Navigate to TakeNote Application', async () => {
            await page.setViewportSize({width: 1440, height: 900});
            await basePage.loadApplication();
        });
    });

    test('Add edit and delete scenario', async ({
                                                    noteEditorSection,
                                                    noteEditorFooter,
                                                    noteSidebarSection,
                                                    appSidebarSection,
                                                    page
                                                }) => {


        await test.step('Add new note and validate content in editor and preview mode', async () => {
            await noteEditorSection.createNewNote(testNotes.exampleNote);
            await noteEditorSection.validateNoteContent(testNotes.exampleNote);
            await noteEditorFooter.selectOptionFromFooter(FooterButtonsSelectors.PREVIEW_MODE);
            await noteEditorSection.validateNoteContent(testNotes.exampleNote, EditorMode.PREVIEW);
        });

        await test.step('Edit content and validate in edit mode', async () => {
            await noteEditorFooter.selectOptionFromFooter(FooterButtonsSelectors.EDIT_NOTE);
            await noteEditorSection.typeTextInEditor(editedNote);
            await noteEditorSection.validateNoteContent(editedNote);
        });
        await test.step('Delete content and validate note moved to trash ', async () => {
            await noteSidebarSection.searchAndSelectNote(editedNote);
            await noteEditorFooter.selectOptionFromFooter(FooterButtonsSelectors.DELETE);
            await appSidebarSection.navigateTo(SidebarSectionsEnum.TRASH);
            await noteSidebarSection.validateNoteInList(editedNote);
        });
    });

    test('Add note to favorites and validate', async ({
                                                               noteEditorSection,
                                                               noteEditorFooter,
                                                               appSidebarSection,
                                                               noteSidebarSection
                                                           }) => {

        await test.step('Edit content and validate in edit mode', async () => {
            await noteEditorSection.createNewNote("Test Note");
        });

        await test.step('Add note to Favorites and validate', async () => {
            await noteEditorFooter.selectOptionFromFooter(FooterButtonsSelectors.ADD_TO_FAVORITES);
            await appSidebarSection.navigateTo(SidebarSectionsEnum.FAVORITES);
            await noteSidebarSection.validateNoteInList("Test Note");
        });

        await test.step('Remove note from Favorites', async () => {
            await noteSidebarSection.chooseNoteContextAction("Test Note",NoteContextMenuActions.FAVORITE)
        });

        await test.step('Validate note is removed from Favorites', async () => {
            await appSidebarSection.navigateTo(SidebarSectionsEnum.FAVORITES);
            await noteSidebarSection.validateNoteCount(0);

        })
    });
});

