import { Browser, BrowserContext, Page } from 'playwright';

const step = async (description: string, action: () => Promise<void>) => {
    console.log(`Step: ${description}`);
    await action();
};

module.exports = {
    createAndFavoriteNote: async (page: Page, context: BrowserContext, browser: Browser) => {
        await step('Navigate to Takenote App', async () => {
            await page.goto('https://takenote.dev/app');
        });

        await step('Create a new note', async () => {
            await page.getByTestId('sidebar-action-create-new-note').click();
        });

        await step('Fill the note with text', async () => {
            await page.locator('.CodeMirror').click();
            await page.getByRole('textbox').fill('test note');
        });

        await step('Add a category', async () => {
            await page.locator('div').filter({ hasText: /^Categories$/ }).click();
            await page.getByTestId('add-category-button').click();
            await page.getByTestId('new-category-label').fill('test category');
            await page.getByText('ScratchpadNotesFavoritesTrashCategories').click();
        });

        await step('Favorite the note', async () => {
            await page.getByTestId('note-options-div-0').locator('svg').click();
            await page.getByTestId('note-option-favorite').click();
        });
    },
};
