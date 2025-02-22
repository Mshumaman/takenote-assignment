import {test} from "../fixtures/Fixtures";
import {faker} from "@faker-js/faker/locale/en";
import {testData} from "../helpers/TestData";


test.describe('Sanity categories test', {tag: '@uiAutomation'}, () => {

    let randomCategoryList = [`${faker.commerce.department()}`, `${faker.commerce.department()}`, `${faker.commerce.department()}`];
    const editedCategoryName = testData.editedCategoryName;
    const noteTitle = testData.noteTitle;

    test.beforeEach(async ({appSidebarSection}) => {
        await appSidebarSection.loadApplication();

        await test.step('Add category and validate', async () => {
            await appSidebarSection.addCategory(randomCategoryList[0]);
            await appSidebarSection.validateCategoryInList(randomCategoryList[0]);
        });
    });

    test('Add edit and delete categories', async ({appSidebarSection}) => {


        await test.step('Edit category and validate', async () => {
            await appSidebarSection.editCategory(randomCategoryList[0], editedCategoryName);
            await appSidebarSection.validateCategoryInList(editedCategoryName);
        });

        await test.step('Delete category and validate', async () => {
            await appSidebarSection.deleteCategory(editedCategoryName);
            await appSidebarSection.validateCategoryCount(editedCategoryName, 0);
        });
    });

    test('Negative scenario: Add the 2 categories with the same name', async ({appSidebarSection}) => {

        await test.step('Add second category with the same name and validate', async () => {
            await appSidebarSection.addCategory(randomCategoryList[0]);
            await appSidebarSection.validateCategoryCount(randomCategoryList[0], 1);
        });
    });
    test('Add note to category by drag and drop', async ({appSidebarSection, noteEditorSection, noteSidebarSection}) => {

        await test.step('Create new note', async () => {
            await noteEditorSection.createNewNote(noteTitle);
        });

        await test.step('Drag note to category and validate', async () => {
            await appSidebarSection.dragNoteToCategory(noteTitle, randomCategoryList[0]);
        });

        await test.step(`Validate note is in Category: ${randomCategoryList[0]}`, async () => {
            await appSidebarSection.navigateToCategory(randomCategoryList[0]);
            await noteSidebarSection.validateNoteInList(noteTitle);
        });

    });
    test('Sort categories by drag and drop', async ({appSidebarSection}) => {

        await test.step('Add categories and validate', async () => {
            await appSidebarSection.addCategory(randomCategoryList[1]);
            await appSidebarSection.addCategory(randomCategoryList[2]);
            await appSidebarSection.validateOrderOfCategories([randomCategoryList[0], randomCategoryList[1], randomCategoryList[2]]);
        });

        await test.step('Drag and drop last category to top of categories and validate', async () => {
            await appSidebarSection.sortCategoriesByDragAndDrop(randomCategoryList[2].toString(), randomCategoryList[0].toString());
            await appSidebarSection.validateOrderOfCategories([randomCategoryList[2], randomCategoryList[0], randomCategoryList[1]]);
        });
    });

});