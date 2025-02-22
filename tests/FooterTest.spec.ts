import {test} from "../fixtures/Fixtures";

import {FooterButtonsSelectors} from "../pages/NoteEditorFooter";
import {testData} from "../helpers/TestData";

test.describe('Functional tests of footers buttons', {tag: '@uiAutomation'}, () => {

    const fileName = testData.fileName;

    test.beforeEach(async ({noteEditorFooter}) => {
        await noteEditorFooter.loadApplication();

    });

    test('Change Theme to dark mode and validate', async ({noteEditorFooter}) => {
        await test.step('change to dark mode and validate by class', async () => {
            await noteEditorFooter.selectOptionFromFooter(FooterButtonsSelectors.THEMES);
            await noteEditorFooter.validateTheme(true);
        });
        await test.step('Validate dark mode be screenshot', async () => {
            await noteEditorFooter.validateDarkThemeByScreenshot();
        });
    });
    test('Download note and validate', async ({noteEditorFooter}) => {
        await test.step('Validate dark mode be screenshot', async () => {
            await noteEditorFooter.downloadNoteAndValidate(fileName);
        });
    });
});