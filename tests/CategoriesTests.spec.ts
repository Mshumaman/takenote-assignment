import {test} from "../fixtures/Fixtures";
import {faker} from "@faker-js/faker/locale/en";
import {testData} from "../helpers/TestData";


test.describe('Category Sanity Tests', { tag: ['@sanity', '@regression'] }, () => {

    let randomCategoryList = [`${faker.commerce.department()}`, `${faker.commerce.department()}`, `${faker.commerce.department()}`];
    const editedCategoryName = testData.editedCategoryName;
    const noteTitle = testData.noteTitle;

    test.beforeEach(async ({appSidebarSection}) => {
        await test.step('Open the TakeNote application', async () => {
            await appSidebarSection.loadApplication();
        });

        await test.step('Add initial category and verify it exists', async () => {
            await appSidebarSection.addCategory(randomCategoryList[0]);
            await appSidebarSection.validateCategoryInList(randomCategoryList[0]);
        });
    });

    test('should update and remove a category', async ({ appSidebarSection }) => {

        await test.step('Update category name and verify change', async () => {
            await appSidebarSection.editCategory(randomCategoryList[0], editedCategoryName);
            await appSidebarSection.validateCategoryInList(editedCategoryName);
        });

        await test.step('Delete category and confirm removal', async () => {
            await appSidebarSection.deleteCategory(editedCategoryName);
            await appSidebarSection.validateCategoryCount(editedCategoryName, 0);
        });
    });

    test('should prevent adding duplicate categories', async ({ appSidebarSection }) => {

        await test.step('Attempt to add a duplicate category and verify count remains 1', async () => {
            await appSidebarSection.addCategory(randomCategoryList[0]);
            await appSidebarSection.validateCategoryCount(randomCategoryList[0], 1);
        });
    });

    test('should assign a note to a category via drag and drop', async ({ appSidebarSection, noteEditorSection, noteSidebarSection }) => {

        await test.step('Create a new note', async () => {
            await noteEditorSection.createNewNote(noteTitle);
        });

        await test.step('Drag the note into the category', async () => {
            await appSidebarSection.dragNoteToCategory(noteTitle, randomCategoryList[0]);
        });

        await test.step(`Confirm the note appears under the category: ${randomCategoryList[0]}`, async () => {
            await appSidebarSection.navigateToCategory(randomCategoryList[0]);
            await noteSidebarSection.validateNoteInList(noteTitle);
        });
    });

    test('should sort categories using drag and drop', async ({ appSidebarSection }) => {

        await test.step('Add additional categories and verify their order', async () => {
            await appSidebarSection.addCategory(randomCategoryList[1]);
            await appSidebarSection.addCategory(randomCategoryList[2]);
            await appSidebarSection.validateOrderOfCategories([randomCategoryList[0], randomCategoryList[1], randomCategoryList[2]]);
        });

        await test.step('Drag the last category to the top and confirm the new order', async () => {
            await appSidebarSection.sortCategoriesByDragAndDrop(randomCategoryList[2].toString(), randomCategoryList[0].toString());
            await appSidebarSection.validateOrderOfCategories([randomCategoryList[2], randomCategoryList[0], randomCategoryList[1]]);
        });
    });
});