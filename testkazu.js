// FakeProfileThemesAndEffects.js
/**
 * FakeProfileThemesAndEffects - A BetterDiscord plugin to enable profile theming and effects.
 * Based on Vencord plugin with adaptations for BetterDiscord.
 * 
 * Author: Adapted for BetterDiscord
 * License: GPL-3.0-or-later
 */

const { PluginUtilities, WebpackModules, Patcher } = BdApi;
const { React, ReactDOM } = BdApi;

const ProfileEffectStore = WebpackModules.getByProps("profileEffects");
const UserProfileStore = WebpackModules.getByProps("getUserProfile");

module.exports = class FakeProfileThemesAndEffects {
    constructor() {
        this.name = "FakeProfileThemesAndEffects";
        this.description = "Allows profile theming and the usage of profile effects using invisible, zero-width characters.";
        this.version = "1.0.0";
        this.author = "Adapted for BetterDiscord";
    }

    onStart() {
        // Apply patches on plugin start
        this.patchUserProfile();
        this.patchProfileCustomizationPreview();
        this.patchProfileEffectModal();
        this.patchProfileEffectSelection();
        this.patchProfileEffectPreview();
        PluginUtilities.showToast(`${this.name} has started!`);
    }

    onStop() {
        // Remove all patches on stop
        Patcher.unpatchAll();
        PluginUtilities.showToast(`${this.name} has stopped.`);
    }

    patchUserProfile() {
        // Patch UserProfileStore.getUserProfile to apply decoding
        Patcher.before(UserProfileStore, "getUserProfile", (_, args, result) => {
            this.decodeAboutMeFPTEHook(result);
        });
    }

    patchProfileCustomizationPreview() {
        // Patch ProfileCustomizationPreview for adding profile preview hook
        const ProfileCustomizationPreview = WebpackModules.getModule(m => m.default?.toString().includes("EDIT_PROFILE_BANNER"));
        Patcher.before(ProfileCustomizationPreview, "default", (_, [props]) => {
            this.profilePreviewHook(props);
        });
    }

    patchProfileEffectModal() {
        // Patch ProfileEffectModal for modified profile effect selections
        const ProfileEffectModal = WebpackModules.getModule(m => m.initialSelectedProfileEffectId);
        if (ProfileEffectModal) {
            Patcher.before(ProfileEffectModal, "initialSelectedProfileEffectId", (_, [props]) => {
                props.onApply = (effectId) => this.onApplyEffect(effectId);
            });
        }
    }

    patchProfileEffectSelection() {
        // Patch for ProfileEffectSelection and sections
        const ProfileEffectSelection = WebpackModules.getModule(m => m.presetEffectBackground);
        if (ProfileEffectSelection) {
            Patcher.after(ProfileEffectSelection, "default", (_, [props], returnValue) => {
                this.useProfileEffectSections(returnValue);
            });
        }
    }

    patchProfileEffectPreview() {
        // Patch ProfileEffectPreview to add missing properties
        const ProfileEffectPreview = WebpackModules.getModule(m => m.effectDescriptionContainer);
        if (ProfileEffectPreview) {
            Patcher.before(ProfileEffectPreview, "default", (_, args) => {
                args[0].forProfileEffectModal = true;
            });
        }
    }

    decodeAboutMeFPTEHook(profile) {
        // Hook to decode AboutMe field for FPTE effects
        if (profile?.aboutMe) {
            profile.aboutMe = profile.aboutMe.replace(/<zero-width chars regex>/g, "");
        }
    }

    profilePreviewHook(props) {
        // Profile preview functionality placeholder
        console.log("Profile preview hook applied.");
    }

    onApplyEffect(effectId) {
        // Apply profile effect by ID
        const effect = ProfileEffectStore.getProfileEffectById(effectId);
        if (effect) {
            // Apply the effect (placeholder)
            console.log("Applying effect: ", effect);
        }
    }

    useProfileEffectSections(sections) {
        // Modify profile effect sections for customization
        sections.splice(1); // Example customization
        sections[0].items.splice(1);
        for (const effect of ProfileEffectStore.profileEffects) {
            sections[0].items.push(new ProfileEffectRecord(effect));
        }
        return sections;
    }
};
