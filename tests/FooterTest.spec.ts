import {test} from "../fixtures/Fixtures";

import {FooterButtonsSelectors} from "../pages/NoteEditorFooter";
import {testData} from "../helpers/TestData";

test.describe('Footer Buttons Functionality Tests', { tag: ['@sanity', '@regression'] }, () => {

    const fileName = testData.fileName;

    test.beforeEach(async ({noteEditorFooter}) => {
        await noteEditorFooter.loadApplication();

    });

    test('should switch to dark mode and validate theme', async ({ noteEditorFooter }) => {
        await test.step('switch to dark mode and verify using CSS class', async () => {
            await noteEditorFooter.selectOptionFromFooter(FooterButtonsSelectors.THEMES);
            await noteEditorFooter.validateTheme(true);
        });

        await test.step('verify dark mode via screenshot comparison', async () => {
            await noteEditorFooter.validateDarkThemeByScreenshot();
        });
    });

    test('should download note and validate file', async ({ noteEditorFooter }) => {
        await test.step('download note and verify file download', async () => {
            await noteEditorFooter.downloadNoteAndValidate(fileName);
        });
    });
});