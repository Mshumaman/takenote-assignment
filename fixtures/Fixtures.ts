import {test as base} from '@playwright/test';
import BasePage from "../pages/BasePage";
import {NoteEditorSection} from "../pages/NoteEditorSection";
import NoteEditorFooter from "../pages/NoteEditorFooter";
import NoteSidebarSection from "../pages/NoteSidebarSection";
import AppSidebarSection from "../pages/AppSidebarSection";
import SettingsSection from "../pages/SettingsSection";

type Fixtures = {
    appSidebarSection: AppSidebarSection;
    basePage: BasePage;
    noteEditorFooter: NoteEditorFooter;
    noteEditorSection: NoteEditorSection;
    noteSidebarSection: NoteSidebarSection;
    settingsSection: SettingsSection;
}

export const test = base.extend<Fixtures>({
    appSidebarSection: async ({page}, use) => {
        await use(new AppSidebarSection(page));
    },
    basePage: async ({page}, use) => {
        await use(new BasePage(page));
    },
    noteEditorFooter: async ({page}, use) => {
        await use(new NoteEditorFooter(page));
    },
    noteEditorSection: async ({page}, use) => {
        await use(new NoteEditorSection(page));
    },
    noteSidebarSection: async ({page}, use) => {
        await use(new NoteSidebarSection(page));
    },
    settingsSection: async ({page}, use) => {
        await use(new SettingsSection(page));
    }
});
