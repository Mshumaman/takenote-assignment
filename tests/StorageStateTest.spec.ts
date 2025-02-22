import {test} from "../fixtures/Fixtures";
import {testData} from "../helpers/TestData";
import {SidebarSectionsEnum} from "../types/UiEnums";

test.use({storageState: './assets/predefined-test-data.json'});
test.describe('Predefined Data Verification with StorageState', { tag: ['@sanity', '@regression'] }, () => {

    const notes = testData.notes
    const category = testData.category

    test('should display and validate predefined notes, categories, and favorites', async ({ noteSidebarSection, appSidebarSection, page }) => {

        await test.step('open the TakeNote application', async () => {
            await noteSidebarSection.loadApplication();
        });

        await test.step('verify predefined notes are present in the sidebar', async () => {
            await noteSidebarSection.validateNoteInList(notes[0]);
            await noteSidebarSection.validateNoteInList(notes[1]);
            await noteSidebarSection.validateNoteInList(notes[2]);
        });

        await test.step('verify predefined category exists and displays the corresponding note', async () => {
            await appSidebarSection.validateCategoryInList(category);
            await appSidebarSection.selectCategory(category)
            await noteSidebarSection.validateNoteInList(notes[2]);
        });

        await test.step('verify predefined note is displayed in the Favorites section', async () => {
            await appSidebarSection.chooseSection(SidebarSectionsEnum.FAVORITES);
            await noteSidebarSection.validateNoteInList(notes[0]);
        });
    });
});