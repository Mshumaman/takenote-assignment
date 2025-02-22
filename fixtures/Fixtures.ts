import {test as base} from '@playwright/test';
import BasePage from "../pages/BasePage";
import {NoteEditorSection} from "../pages/NoteEditorSection";
import NoteEditorFooter from "../pages/NoteEditorFooter";
import NoteSidebarSection from "../pages/NoteSidebarSection";
import AppSidebarSection from "../pages/AppSidebarSection";
import SettingsSection from "../pages/SettingsSection";

type Fixtures = {
    basePage: BasePage;
    noteEditorSection: NoteEditorSection;
    noteEditorFooter: NoteEditorFooter;
    noteSidebarSection: NoteSidebarSection
    appSidebarSection: AppSidebarSection
    settingsSection: SettingsSection
}

export const test = base.extend<Fixtures>({
    basePage: async ({page}, use) => {
        await use(new BasePage(page));
    },
    noteEditorSection: async ({page}, use) => {
        await use(new NoteEditorSection(page));
    },
    noteEditorFooter: async ({page}, use) => {
        await use(new NoteEditorFooter(page));
    },
    noteSidebarSection: async ({page}, use) => {
        await use(new NoteSidebarSection(page));
    },
    appSidebarSection: async ({page}, use) => {
        await use(new AppSidebarSection(page));
    },
    settingsSection: async ({page}, use) => {
        await use(new SettingsSection(page));
    }
});