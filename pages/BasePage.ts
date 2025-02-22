import {expect, Locator, Page, test} from "@playwright/test";

export default class BasePage {

    constructor(public page: Page) {
    }

    public async loadApplication(url: string = "https://takenote.dev/app") {
        await test.step('Navigate to app and wait for load', async () => {
            await this.page.goto(url);
            await this.page.waitForLoadState('networkidle');
        });

    }

    public async clearFieldAndTypeText(locator: Locator, text: string) {
        try {
            await locator.waitFor();
            await locator.press('ControlOrMeta+a');
            await locator.press('Delete');
            await locator.pressSequentially(text, {delay: 50});
        } catch (error) {
            throw new Error(`Failed to clear and type text into the field: ${error}`);
        }

    }

    public async selectFromMultipleChoice(element: string, value: string, rightClick: boolean = false) {
        try {
            const options = await this.page.locator(element).all();
            if (options.length === 0) {
                throw new Error(`No options found for selector: '${element}'`);
            }
            for (let option of options) {
                const optionText = await option.innerText();
                if (optionText.trim() === value) {
                    if (rightClick) {
                        await option.click({button: 'right'});
                    } else {
                        await option.click();
                    }
                    return;
                }
            }
            throw new Error(`Option '${value}' not found in element: '${element}'`);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to select option '${value}' from '${element}': ${error.message}`);
            }

        }
    }


    public async validateTextContent(element: Locator, expectedText: string) {
        await expect(element).toContainText(expectedText);
    }

    public async validateItemExist(selector: string, item: string) {
        const options = await this.page.locator(selector).all();

        if (options.length === 0) {
            throw new Error(`No elements found for selector: '${selector}'`);
        }

        for (let option of options) {
            const rowText = await option.innerText();

            if (rowText.includes(item)) {
                expect(rowText).toContain(item); // Only validate if the item is found
                return;
            }
        }

        throw new Error(`Item '${item}' not found in selector: '${selector}'`);
    }

    public async validateItemCount(element: Locator, expectedCount: number) {
        const itemCount = await element.count();
        expect(itemCount).toBe(expectedCount);
    }

    public async validateFormattedContent(element: Locator, expectedText: string) {
        const actualText = await element.innerText();

        const normalizedActualText = this.normalizeText(actualText);
        const normalizedExpectedText = this.normalizeText(expectedText);

        expect(normalizedActualText).toBe(normalizedExpectedText);
    }

    public async uploadFile(uploadButton: string, resourceFileToUpload: string) {
        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            this.page.click(uploadButton)
        ]);
        await fileChooser.setFiles(resourceFileToUpload);
    }

    private normalizeText(text: string): string {
        return text
            .replace(/[\u200b\xa0]/g, '') // Remove zero-width & non-breaking spaces
            .replace(/\r\n|\r/g, '\n') // Normalize all line breaks to '\n'
            .replace(/\n+/g, ' ') // Replace multiple newlines with a single space
            .replace(/\s*-\s*/g, '- ') // Ensure proper spacing for list items
            .replace(/\s+/g, ' ') // Convert multiple spaces to a single space
            .trim(); // Trim extra spaces
    }


}