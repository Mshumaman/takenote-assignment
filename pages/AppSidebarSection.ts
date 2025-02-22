import BasePage from "./BasePage";
import {expect, Page} from "@playwright/test";
import {SidebarSectionsEnum} from "../types/UiEnums";


export default class AppSidebarSection extends BasePage {

    private addCategoryButton = this.page.getByTestId('add-category-button');
    private newCategoryTextField = this.page.getByTestId('new-category-label');
    private editCategoryTextField = this.page.getByTestId('category-edit');
    private renameCategory = this.page.getByTestId('category-options-rename');
    private deleteCategoryLocator = this.page.getByTestId('category-option-delete-permanently');
    private noteList = this.page.locator('[data-testid*="note-list-item-"]')
    private categoryList = this.page.locator('[class="category-list-name"]');
    private categories = this.page.getByTestId('category-list-div');
    private appSidebar = this.page.locator('.app-sidebar');


    constructor(protected page: Page) {
        super(page);
    }

    public async chooseSection(option: SidebarSectionsEnum) {
        await this.appSidebar.getByTestId(option).click();
    }

    public async addCategory(categoryName: string, shouldClick: boolean = true) {
        if (shouldClick) {
            await this.addCategoryButton.click();
        }
        await this.newCategoryTextField.fill(categoryName);
        await this.page.keyboard.press('Enter');
    }

    public async editCategory(oldCategoryName: string, newCategoryName: string) {
        await this.selectFromMultipleChoice(this.categoryList, oldCategoryName, true);
        await this.renameCategory.click();
        await this.editCategoryTextField.fill(newCategoryName);
        await this.page.keyboard.press('Enter');
    }

    public async deleteCategory(categoryName: string) {
        await this.selectFromMultipleChoice(this.categoryList, categoryName, true);
        await this.deleteCategoryLocator.click();
    }

    public async validateCategoryInList(categoryName: string) {
        await this.validateItemExist(this.categoryList, categoryName);
    }

    public async validateCategoryCount(categoryName: string, expectedCount: number) {
        // const categoryCount = await this.page.locator(this.categoryList, {hasText: categoryName}).count();
        const categoryCount = await this.categoryList.filter({hasText: categoryName}).count();
        expect(categoryCount).toBe(expectedCount);
    }

    public async selectCategory(categoryName: string) {
        await this.categories.filter({hasText: categoryName}).click();
    }

    public async dragNoteToCategory(noteTitle: string, categoryName: string) {
        const note = this.noteList.filter({hasText: noteTitle});
        const category = this.categoryList.filter({hasText: categoryName});
        await note.dragTo(category);
    }

    public async sortCategoriesByDragAndDrop(fromCategory: string, toCategory: string) {
        const originCategory = this.categoryList.filter({hasText: fromCategory});
        const targetCategory = this.categoryList.filter({hasText: toCategory});

        const box = (await targetCategory.boundingBox())!;
        await originCategory.hover();

        await this.page.mouse.down();
        await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, {
            steps: 5,
        });
        await this.page.mouse.up();
        await originCategory.hover();
    }

    public async navigateToCategory(categoryName: string) {
        await this.categoryList.filter({hasText: categoryName}).click();
    }

    public async validateOrderOfCategories(expectedCategories: string[]) {
        const categoriesLength = expectedCategories.length;
        await this.categoryList.nth(categoriesLength - 1).waitFor()
        const categoryElements = await this.categoryList.all();

        const extractedCategories = await Promise.all(
            categoryElements.map(async (element) => {
                const text = await element.textContent();
                return text ? text.trim() : '';
            })
        );
        expect(extractedCategories).toEqual(expectedCategories);
    }
}