import {test} from "../fixtures/Fixtures";

import {FooterButtonsSelectors} from "../pages/NoteEditorFooter";

test.describe('Functional tests of footers buttons', {tag: '@uiAutomation'}, () => {

    const fileName = 'Welcome to Takenote!.md'

    test.beforeEach(async ({noteEditorFooter}) => {
        await noteEditorFooter.loadApplication()

    });

    test('Add edit and delete categories', async ({noteEditorFooter}) => {
        await test.step('change to dark mode and validate by class', async () => {
            await noteEditorFooter.selectOptionFromFooter(FooterButtonsSelectors.THEMES);
            await noteEditorFooter.validateDarkThemeByClass();
        });
        await test.step('Validate dark mode be screenshot', async () => {
            await noteEditorFooter.validateDarkThemeByScreenshot()
        });
    });
    test('Download note and validate', async ({noteEditorFooter}) => {
        await test.step('Validate dark mode be screenshot', async () => {
            await noteEditorFooter.downloadNoteAndValidate(fileName)
        });
    });
});