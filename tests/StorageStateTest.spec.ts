import {test} from "../fixtures/Fixtures";
import {SidebarSectionsEnum} from "../pages/AppSidebarSection";
import {testData} from "../helpers/TestData";

test.use({storageState: './assets/predefined-test-data.json'});
test.describe('Testing predefined data using storageState', {tag: '@uiAutomation'}, () => {

    const notes = testData.notes
    const category = testData.category

    test('Validate predefined data', async ({noteSidebarSection, appSidebarSection, page}) => {

        await test.step('Navigate to TakeNote Application', async () => {
            await noteSidebarSection.loadApplication();
        });

        await test.step('Validate predefined notes exist in note side panel', async () => {
            await noteSidebarSection.validateNoteInList(notes[0]);
            await noteSidebarSection.validateNoteInList(notes[1]);
            await noteSidebarSection.validateNoteInList(notes[2]);
        });

        await test.step('Validate predefined Category exist and it\' content', async () => {
            await appSidebarSection.validateCategoryInList(category);
            await appSidebarSection.selectCategory(category)
            await noteSidebarSection.validateNoteInList(notes[2]);
        });

        await test.step('Validate predefined notes exist in Favorites', async () => {
            await appSidebarSection.chooseSection(SidebarSectionsEnum.FAVORITES);
            await noteSidebarSection.validateNoteInList(notes[0]);
        });
    });
});