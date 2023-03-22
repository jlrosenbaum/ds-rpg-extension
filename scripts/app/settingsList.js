import { RGBAToHexAFromColor } from "./color-picker.js";
import CONSTANTS from "./constants.js";
import { log } from "./logger-util.js";
import { Tidy5eUserSettings } from "./settings.js";

export function settingsList() {
	// General Settings
	game.settings.registerMenu(CONSTANTS.MODULE_ID, "userMenu", {
		name: `DSRPG.Settings.SheetMenu.name`,
		label: "DSRPG.Settings.SheetMenu.label",
		hint: `DSRPG.Settings.SheetMenu.hint`,
		icon: "fas fa-cog",
		type: Tidy5eUserSettings,
		restricted: false
	});

	game.settings.registerMenu(CONSTANTS.MODULE_ID, "resetAllSettings", {
		name: `DSRPG.Settings.Reset.name`,
		hint: `DSRPG.Settings.Reset.hint`,
		icon: "fas fa-database",
		type: ResetSettingsDialog,
		restricted: true
	});

	// ========================================================================

	// Color Theme
	game.settings.register(CONSTANTS.MODULE_ID, "colorScheme", {
		name: `${game.i18n.localize("DSRPG.Settings.SheetTheme.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.SheetTheme.hint"),
		scope: "client",
		config: true,
		type: String,
		choices: {
			default: game.i18n.localize("DSRPG.Settings.SheetTheme.default"),
			dark: game.i18n.localize("DSRPG.Settings.SheetTheme.dark")
		},
		default: "default",
		onChange: (data) => {
			data === "dark"
				? document.querySelector("html").classList.add("dsrpgDark")
				: document.querySelector("html").classList.remove("dsrpgDark");
		}
	});

	const colorScheme = game.settings.get(CONSTANTS.MODULE_ID, "colorScheme");
	if (colorScheme === "dark") {
		document.querySelector("html").classList.add("dsrpgDark");
	}

	// Disable Right Click
	game.settings.register(CONSTANTS.MODULE_ID, "rightClickDisabled", {
		name: `${game.i18n.localize("DSRPG.Settings.RightClickDisabled.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.RightClickDisabled.hint"),
		scope: "client",
		config: false,
		default: false,
		type: Boolean
	});

	// Classic Item Controls
	game.settings.register(CONSTANTS.MODULE_ID, "classicControlsEnabled", {
		name: `${game.i18n.localize("DSRPG.Settings.ClassicControls.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.ClassicControls.hint"),
		scope: "client",
		config: false,
		default: true,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "hideIconsNextToTheItemName", {
		name: `${game.i18n.localize("DSRPG.Settings.HideIconsNextToTheItemName.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.HideIconsNextToTheItemName.hint"),
		scope: "client",
		config: false,
		default: false,
		type: Boolean
	});

	// Item Info Cards
	game.settings.register(CONSTANTS.MODULE_ID, "itemCardsForAllItems", {
		name: `${game.i18n.localize("DSRPG.Settings.ItemCardsForAllItems.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.ItemCardsForAllItems.hint"),
		scope: "client",
		config: true,
		default: true,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "itemCardsForNpcs", {
		name: `${game.i18n.localize("DSRPG.Settings.ItemCardsForNpcs.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.ItemCardsForNpcs.hint"),
		scope: "world",
		config: true,
		default: true,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "itemCardsAreFloating", {
		name: `${game.i18n.localize("DSRPG.Settings.ItemCardsAreFloating.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.ItemCardsAreFloating.hint"),
		scope: "client",
		config: true,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "itemCardsDelay", {
		name: `${game.i18n.localize("DSRPG.Settings.ItemCardsDelay.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.ItemCardsDelay.hint"),
		scope: "client",
		config: true,
		default: 300,
		type: Number
	});

	game.settings.register(CONSTANTS.MODULE_ID, "itemCardsFixKey", {
		name: `${game.i18n.localize("DSRPG.Settings.ItemCardsFixKey.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.ItemCardsFixKey.hint"),
		scope: "world",
		config: false,
		default: "x",
		type: String
	});

	// Show Roll buttons in context Menu
	game.settings.register(CONSTANTS.MODULE_ID, "contextRollButtons", {
		name: `${game.i18n.localize("DSRPG.Settings.RollButtonsToCard.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.RollButtonsToCard.hint"),
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	//Show trait labels
	game.settings.register(CONSTANTS.MODULE_ID, "traitLabelsEnabled", {
		name: `${game.i18n.localize("DSRPG.Settings.TraitLabels.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.TraitLabels.hint"),
		scope: "world",
		config: false,
		default: true,
		type: Boolean
	});

	// Settings Menu

	// PC Sheet Settings
	game.settings.register(CONSTANTS.MODULE_ID, "journalTabDisabled", {
		name: `${game.i18n.localize("DSRPG.Settings.JournalTab.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.JournalTab.hint"),
		scope: "client",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "journalTabNPCDisabled", {
		name: `${game.i18n.localize("DSRPG.Settings.JournalTabNPCDisabled.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.JournalTabNPCDisabled.hint"),
		scope: "client",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "classListDisabled", {
		name: `${game.i18n.localize("DSRPG.Settings.ClassList.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.ClassList.hint"),
		scope: "client",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "inspirationAnimationDisabled", {
		name: `${game.i18n.localize("DSRPG.Settings.InspirationAnimation.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.InspirationAnimation.hint"),
		scope: "client",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "hideIfZero", {
		name: `${game.i18n.localize("DSRPG.Settings.HideIfZero.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.HideIfZero.hint"),
		scope: "client",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "inspirationOnHover", {
		name: `${game.i18n.localize("DSRPG.Settings.InspirationOnHover.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.InspirationOnHover.hint"),
		scope: "client",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "exhaustionOnHover", {
		name: `${game.i18n.localize("DSRPG.Settings.ExhaustionOnHover.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.ExhaustionOnHover.hint"),
		scope: "client",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "hpBarDisabled", {
		name: `${game.i18n.localize("DSRPG.Settings.HpBar.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.HpBar.hint"),
		scope: "client",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "hpOverlayDisabled", {
		name: `${game.i18n.localize("DSRPG.Settings.HpOverlay.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.HpOverlay.hint"),
		scope: "client",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "traitsTogglePc", {
		name: `${game.i18n.localize("DSRPG.Settings.TraitsTogglePc.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.TraitsTogglePc.hint"),
		scope: "client",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "traitsMovedBelowResource", {
		name: `${game.i18n.localize("DSRPG.Settings.TraitsMovedBelowResource.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.TraitsMovedBelowResource.hint"),
		scope: "client",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "ammoEquippedOnly", {
		name: `${game.i18n.localize("DSRPG.Settings.AmmoEquippedOnly.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.AmmoEquippedOnly.hint"),
		scope: "client",
		config: false,
		default: false,
		type: Boolean
	});

	// NPC Sheet Settings

	game.settings.register(CONSTANTS.MODULE_ID, "traitsMovedBelowResourceNpc", {
		name: `${game.i18n.localize("DSRPG.Settings.TraitsMovedBelowResource.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.TraitsMovedBelowResource.hint"),
		scope: "client",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "hpBarDisabledNpc", {
		name: `${game.i18n.localize("DSRPG.Settings.HpBar.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.HpBar.hint"),
		scope: "client",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "hpOverlayDisabledNpc", {
		name: `${game.i18n.localize("DSRPG.Settings.HpOverlay.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.HpOverlay.hint"),
		scope: "client",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "traitsAlwaysShownNpc", {
		name: `${game.i18n.localize("DSRPG.Settings.TraitsAlwaysShown.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.TraitsAlwaysShown.hint"),
		scope: "client",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "skillsAlwaysShownNpc", {
		name: `${game.i18n.localize("DSRPG.Settings.SkillsAlwaysShown.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.SkillsAlwaysShown.hint"),
		scope: "client",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "hideSpellbookTabNpc", {
		name: `${game.i18n.localize("DSRPG.Settings.SkillsAlwaysShown.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.SkillsAlwaysShown.hint"),
		scope: "client",
		config: false,
		default: false,
		type: Boolean
	});

	// Vehicle Sheet Settings

	game.settings.register(CONSTANTS.MODULE_ID, "hpBarDisabledVehicle", {
		name: `${game.i18n.localize("DSRPG.Settings.HpBar.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.HpBar.hint"),
		scope: "client",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "hpOverlayDisabledVehicle", {
		name: `${game.i18n.localize("DSRPG.Settings.HpOverlay.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.HpOverlay.hint"),
		scope: "client",
		config: false,
		default: false,
		type: Boolean
	});

	//
	// GM Options
	//
	// Show Player Name
	game.settings.register(CONSTANTS.MODULE_ID, "playerNameEnabled", {
		name: `${game.i18n.localize("DSRPG.Settings.PlayerName.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.PlayerName.hint"),
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	// Expanded Sheet
	game.settings.register(CONSTANTS.MODULE_ID, "expandedSheetEnabled", {
		name: `${game.i18n.localize("DSRPG.Settings.ExpandedSheet.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.ExpandedSheet.hint"),
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	// Portrait Settings
	// Portrait Style
	game.settings.register(CONSTANTS.MODULE_ID, "portraitStyle", {
		name: `${game.i18n.localize("DSRPG.Settings.PortraitStyle.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.PortraitStyle.hint"),
		scope: "world",
		config: false,
		type: String,
		choices: {
			default: game.i18n.localize("DSRPG.Settings.PortraitStyle.default"),
			pc: game.i18n.localize("DSRPG.Settings.PortraitStyle.pc"),
			npc: game.i18n.localize("DSRPG.Settings.PortraitStyle.npc"),
			all: game.i18n.localize("DSRPG.Settings.PortraitStyle.all")
		},
		default: "all",
		onChange: (data) => {
			if (data == "npc" || data == "all") {
				$(".ds-rpg-extension.dsrpg-npc .profile").addClass("roundPortrait");
				$(".ds-rpg-extension.dsrpg-vehicle .profile").addClass("roundPortrait");
			}
			if (data == "pc" || data == "all") {
				$(".ds-rpg-extension .profile").addClass("roundPortrait");
				$(".ds-rpg-extension.dsrpg-npc .profile").removeClass("roundPortrait");
				$(".ds-rpg-extension.dsrpg-vehicle .profile").removeClass("roundPortrait");
			}
			if (data == "default") {
				$(".ds-rpg-extension .profile").removeClass("roundPortrait");
				$(".ds-rpg-extension.dsrpg-npc .profile").removeClass("roundPortrait");
				$(".ds-rpg-extension.dsrpg-vehicle .profile").removeClass("roundPortrait");
			}
		}
	});

	game.settings.register(CONSTANTS.MODULE_ID, "hpOverlayBorder", {
		name: `${game.i18n.localize("DSRPG.Settings.HpOverlayBorder.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.HpOverlayBorder.hint"),
		scope: "world",
		config: false,
		default: 0,
		type: Number,
		onChange: (data) => {
			$(".system-dnd5e")
				.get(0)
				.style.setProperty("--pc-border", game.settings.get(CONSTANTS.MODULE_ID, "hpOverlayBorder") + "px");
		}
	});

	game.settings.register(CONSTANTS.MODULE_ID, "hpOverlayBorderNpc", {
		name: `${game.i18n.localize("DSRPG.Settings.HpOverlayBorder.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.HpOverlayBorder.hint"),
		scope: "world",
		config: false,
		default: 0,
		type: Number,
		onChange: (data) => {
			$(".system-dnd5e")
				.get(0)
				.style.setProperty("--npc-border", game.settings.get(CONSTANTS.MODULE_ID, "hpOverlayBorderNpc") + "px");
		}
	});

	game.settings.register(CONSTANTS.MODULE_ID, "hpOverlayBorderVehicle", {
		name: `${game.i18n.localize("DSRPG.Settings.HpOverlayBorder.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.HpOverlayBorder.hint"),
		scope: "world",
		config: false,
		default: 0,
		type: Number,
		onChange: (data) => {
			$(".system-dnd5e")
				.get(0)
				.style.setProperty(
					"--vehicle-border",
					game.settings.get(CONSTANTS.MODULE_ID, "hpOverlayBorderVehicle") + "px"
				);
		}
	});

	// Total Edit Lock
	game.settings.register(CONSTANTS.MODULE_ID, "editTotalLockEnabled", {
		name: `${game.i18n.localize("DSRPG.Settings.EditTotalLock.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.EditTotalLock.hint"),
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "editGmAlwaysEnabled", {
		name: `${game.i18n.localize("DSRPG.Settings.EditGmAlways.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.EditGmAlways.hint"),
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "editEffectsGmOnlyEnabled", {
		name: `${game.i18n.localize("DSRPG.Settings.EditEffectsGmOnly.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.EditEffectsGmOnly.hint"),
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	// Hidden Death Saves
	game.settings.register(CONSTANTS.MODULE_ID, "hiddenDeathSavesEnabled", {
		name: `${game.i18n.localize("DSRPG.Settings.HiddenDeathSaves.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.HiddenDeathSaves.hint"),
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	// Hide marker spell slot
	game.settings.register(CONSTANTS.MODULE_ID, "hideSpellSlotMarker", {
		name: `${game.i18n.localize("DSRPG.Settings.HideSpellSlotMarker.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.HideSpellSlotMarker.hint"),
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	// Enable Spell Level Buttons
	game.settings.register(CONSTANTS.MODULE_ID, "enableSpellLevelButtons", {
		name: `${game.i18n.localize("DSRPG.Settings.EnableSpellLevelButtons.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.EnableSpellLevelButtons.hint")}`,
		scope: "world",
		config: false,
		default: true,
		type: Boolean
	});

	// Hide Standard Encumbrance Bar
	game.settings.register(CONSTANTS.MODULE_ID, "hideStandardEncumbranceBar", {
		name: `${game.i18n.localize("DSRPG.Settings.HideStandardEncumbranceBar.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.HideStandardEncumbranceBar.hint")}`,
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	// Item quantity
	game.settings.register(CONSTANTS.MODULE_ID, "quantityAlwaysShownEnabled", {
		name: `${game.i18n.localize("DSRPG.Settings.QuantityAlwaysShown.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.QuantityAlwaysShown.hint"),
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	// Tracker Settings
	game.settings.register(CONSTANTS.MODULE_ID, "exhaustionEffectsEnabled", {
		name: `${game.i18n.localize("DSRPG.Settings.ExhaustionEffects.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.ExhaustionEffects.hint"),
		scope: "world",
		config: false,
		choices: {
			default: game.i18n.localize("DSRPG.Settings.ExhaustionEffects.default"),
			dsrpg: game.i18n.localize("DSRPG.Settings.ExhaustionEffects.default"),
			dfredce: game.i18n.localize("DSRPG.Settings.ExhaustionEffects.dfredce"),
			cub: game.i18n.localize("DSRPG.Settings.ExhaustionEffects.cub")
		},
		type: String,
		default: "default"
	});

	game.settings.register(CONSTANTS.MODULE_ID, "exhaustionEffectIcon", {
		name: `${game.i18n.localize("DSRPG.Settings.CustomExhaustionIcon.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.CustomExhaustionIcon.hint"),
		scope: "world",
		config: false,
		type: String,
		default: "modules/ds-rpg-extension/images/exhaustion.svg"
	});

	game.settings.register(CONSTANTS.MODULE_ID, "exhaustionEffectCustom", {
		name: `${game.i18n.localize("DSRPG.Settings.CustomExhaustionEffect.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.CustomExhaustionEffect.hint"),
		scope: "world",
		config: false,
		default: "Exhaustion",
		type: String
	});

	game.settings.register(CONSTANTS.MODULE_ID, "exhaustionEffectCustomTiers", {
		name: `${game.i18n.localize("DSRPG.Settings.CustomExhaustionEffect.tiers")}`,
		hint: game.i18n.localize("DSRPG.Settings.CustomExhaustionEffect.hint"),
		scope: "world",
		config: false,
		default: 5,
		type: Number
	});

	game.settings.register(CONSTANTS.MODULE_ID, "exhaustionDisabled", {
		name: `${game.i18n.localize("DSRPG.Settings.ExhaustionDisabled.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.ExhaustionDisabled.hint"),
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "inspirationDisabled", {
		name: `${game.i18n.localize("DSRPG.Settings.InspirationDisabled.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.InspirationDisabled.hint"),
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	// NPC Resting
	game.settings.register(CONSTANTS.MODULE_ID, "restingForNpcsEnabled", {
		name: `${game.i18n.localize("DSRPG.Settings.RestingForNpcs.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.RestingForNpcs.hint"),
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "restingForNpcsChatDisabled", {
		name: `${game.i18n.localize("DSRPG.Settings.RestingForNpcsChat.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.RestingForNpcsChat.hint"),
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	// Link Marker
	game.settings.register(CONSTANTS.MODULE_ID, "linkMarkerNpc", {
		name: `${game.i18n.localize("DSRPG.Settings.LinkMarker.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.LinkMarker.hint"),
		scope: "world",
		config: false,
		type: String,
		choices: {
			default: game.i18n.localize("DSRPG.Settings.LinkMarker.default"),
			unlinked: game.i18n.localize("DSRPG.Settings.LinkMarker.unlinked"),
			both: game.i18n.localize("DSRPG.Settings.LinkMarker.both")
		},
		default: "default"
	});

	// Show if item has active effects
	game.settings.register(CONSTANTS.MODULE_ID, "activeEffectsMarker", {
		name: `${game.i18n.localize("DSRPG.Settings.ActiveEffectsMarker.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.ActiveEffectsMarker.hint"),
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	// Set default Tab for character actions list

	game.settings.register(CONSTANTS.MODULE_ID, "defaultActionsTab", {
		name: `${game.i18n.localize("DSRPG.Settings.defaultActionsTab.name")}`,
		hint: game.i18n.localize("DSRPG.Settings.defaultActionsTab.hint"),
		scope: "world",
		config: false,
		type: String,
		choices: {
			default: game.i18n.localize("DSRPG.Settings.defaultActionsTab.default"),
			attributes: game.i18n.localize("DSRPG.Settings.defaultActionsTab.attributes"),
			inventory: game.i18n.localize("DSRPG.Settings.defaultActionsTab.inventory"),
			spellbook: game.i18n.localize("DSRPG.Settings.defaultActionsTab.spellbook"),
			features: game.i18n.localize("DSRPG.Settings.defaultActionsTab.features"),
			effects: game.i18n.localize("DSRPG.Settings.defaultActionsTab.effects"),
			biography: game.i18n.localize("DSRPG.Settings.defaultActionsTab.biography"),
			journal: game.i18n.localize("DSRPG.Settings.defaultActionsTab.journal"),
			actions: game.i18n.localize("DSRPG.Settings.defaultActionsTab.actions")
		},
		default: "default"
	});

	// Default width for player sheet

	game.settings.register(CONSTANTS.MODULE_ID, "playerSheetWidth", {
		name: `${game.i18n.localize("DSRPG.Settings.playerSheetWidth")}`,
		scope: "client",
		config: false,
		type: Number,
		default: 740
	});

	// Default width for NPC sheet

	game.settings.register(CONSTANTS.MODULE_ID, "npsSheetWidth", {
		name: `${game.i18n.localize("DSRPG.Settings.npsSheetWidth")}`,
		scope: "client",
		config: false,
		type: Number,
		default: 740
	});

	// Default width for vehicle sheet

	game.settings.register(CONSTANTS.MODULE_ID, "vehicleSheetWidth", {
		name: `${game.i18n.localize("DSRPG.Settings.vehicleSheetWidth")}`,
		scope: "client",
		config: false,
		type: Number,
		default: 740
	});

	// Lazy HP and Exp

	game.settings.register(CONSTANTS.MODULE_ID, "lazyHpAndExpEnable", {
		name: `${game.i18n.localize("DSRPG.Settings.LazyHpAndExpEnable.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.LazyHpAndExpEnable.hint")}`,
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "lazyHpForceHpValueLimit1", {
		name: `${game.i18n.localize("DSRPG.Settings.LazyHpForceHpValueLimit1.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.LazyHpForceHpValueLimit1.hint")}`,
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "lazyHpForceHpValueLimit2", {
		name: `${game.i18n.localize("DSRPG.Settings.LazyHpForceHpValueLimit2.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.LazyHpForceHpValueLimit2.hint")}`,
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	// Lazy Money

	game.settings.register(CONSTANTS.MODULE_ID, "lazyMoneyEnable", {
		name: `${game.i18n.localize("DSRPG.Settings.LazyMoneyEnable.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.LazyMoneyEnable.hint")}`,
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "lazyMoneyAddConvert", {
		name: `${game.i18n.localize("DSRPG.Settings.LazyMoneyAddConvert.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.LazyMoneyAddConvert.hint")}`,
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "lazyMoneyIgnoreElectrum", {
		name: `${game.i18n.localize("DSRPG.Settings.LazyMoneyIgnoreElectrum.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.LazyMoneyIgnoreElectrum.hint")}`,
		scope: "world",
		config: false,
		default: true,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "lazyMoneyChatLog", {
		name: `${game.i18n.localize("DSRPG.Settings.LazyMoneyChatLog.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.LazyMoneyChatLog.hint")}`,
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	// Favorites

	game.settings.register(CONSTANTS.MODULE_ID, "enableSortFavoritesItemsAlphabetically", {
		name: `${game.i18n.localize("DSRPG.Settings.EnableSortFavoritesItemsAlphabetically.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.EnableSortFavoritesItemsAlphabetically.hint")}`,
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	// Locks

	game.settings.register(CONSTANTS.MODULE_ID, "lockMoneyChanges", {
		name: `${game.i18n.localize("DSRPG.Settings.LockMoneyChanges.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.LockMoneyChanges.hint")}`,
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "lockExpChanges", {
		name: `${game.i18n.localize("DSRPG.Settings.LockExpChanges.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.LockExpChanges.hint")}`,
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "lockHpMaxChanges", {
		name: `${game.i18n.localize("DSRPG.Settings.LockHpMaxChanges.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.LockHpMaxChanges.hint")}`,
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "lockLevelSelector", {
		name: `${game.i18n.localize("DSRPG.Settings.LockLevelSelector.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.LockLevelSelector.hint")}`,
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "lockConfigureSheet", {
		name: `${game.i18n.localize("DSRPG.Settings.LockConfigureSheet.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.LockConfigureSheet.hint")}`,
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "lockItemQuantity", {
		name: `${game.i18n.localize("DSRPG.Settings.LockItemQuantity.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.LockItemQuantity.hint")}`,
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	// Other

	game.settings.register(CONSTANTS.MODULE_ID, "allowCantripToBePreparedOnContext", {
		name: `${game.i18n.localize("DSRPG.Settings.AllowCantripToBePreparedOnContext.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.AllowCantripToBePreparedOnContext.hint")}`,
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "spellClassFilterSelect", {
		name: `${game.i18n.localize("DSRPG.Settings.SpellClassFilterSelect.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.SpellClassFilterSelect.hint")}`,
		scope: "client",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "spellClassFilterIconReplace", {
		name: `${game.i18n.localize("DSRPG.Settings.SpellClassFilterIconReplace.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.SpellClassFilterIconReplace.hint")}`,
		scope: "client",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "allowHpMaxOverride", {
		name: `${game.i18n.localize("DSRPG.Settings.AllowHpMaxOverride.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.AllowHpMaxOverride.hint")}`,
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "allowHpConfigOverride", {
		name: `${game.i18n.localize("DSRPG.Settings.AllowHpConfigOverride.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.AllowHpConfigOverride.hint")}`,
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "betterAttackDialog", {
		name: `${game.i18n.localize("DSRPG.Settings.BetterAttackDialog.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.BetterAttackDialog.hint")}`,
		scope: "world",
		config: false,
		default: true,
		type: Boolean,
		onChange: (newValue) => {
			const style = `<style id="dsrpg-better-attack">
			.dialog-button.default.advantage {
			border: 2px groove green !important;
			}
			.dialog-button.default.disadvantage {
			border: 2px groove red !important;
			}
			</style>`;
			const styleElement = $("#ds-rpg-extension-better-attack");
			if (styleElement.length == 0 && newValue) {
				$("body").append(style);
			}
			else if (styleElement.length != 0 && !newValue) {
				styleElement.remove();
			}
		}
	});
	
	// Color customization

	game.settings.register(CONSTANTS.MODULE_ID, "colorPickerEnabled", {
		name: `${game.i18n.localize("DSRPG.Settings.ColorPickerEnabled.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.ColorPickerEnabled.hint")}`,
		scope: "client",
		type: Boolean,
		default: false,
		config: false
	});

	// --dsrpg-equipped: 					rgba(50, 205, 50, 0.3);
	// --dsrpg-equipped-outline: 			rgba(50, 205, 50, 1);
	// --dsrpg-equipped-accent: 			rgba(173, 255, 47, 1);

	game.settings.register(CONSTANTS.MODULE_ID, "colorPickerEquipped", {
		name: `${game.i18n.localize("DSRPG.Settings.ColorPickerEquipped.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.ColorPickerEquipped.hint")}`,
		scope: "client",
		type: String,
		default: RGBAToHexAFromColor(50, 205, 50, 0.3),
		config: false
	});
	game.settings.register(CONSTANTS.MODULE_ID, "colorPickerEquippedOutline", {
		name: `${game.i18n.localize("DSRPG.Settings.ColorPickerEquippedOutline.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.ColorPickerEquippedOutline.hint")}`,
		scope: "client",
		type: String,
		default: RGBAToHexAFromColor(50, 205, 50, 1),
		config: false
	});
	game.settings.register(CONSTANTS.MODULE_ID, "colorPickerEquippedAccent", {
		name: `${game.i18n.localize("DSRPG.Settings.ColorPickerEquippedAccent.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.ColorPickerEquippedAccent.hint")}`,
		scope: "client",
		type: String,
		default: RGBAToHexAFromColor(173, 255, 47, 1),
		config: false
	});

	// --dsrpg-prepared: 					rgba(50, 205, 50, 0.3);
	// --dsrpg-prepared-outline: 			rgba(50, 205, 50, 1);
	// --dsrpg-prepared-accent: 			rgba(173, 255, 47, 1);

	game.settings.register(CONSTANTS.MODULE_ID, "colorPickerPrepared", {
		name: `${game.i18n.localize("DSRPG.Settings.ColorPickerPrepared.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.ColorPickerPrepared.hint")}`,
		scope: "client",
		type: String,
		default: RGBAToHexAFromColor(50, 205, 50, 0.3),
		config: false
	});
	game.settings.register(CONSTANTS.MODULE_ID, "colorPickerPreparedOutline", {
		name: `${game.i18n.localize("DSRPG.Settings.ColorPickerPreparedOutline.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.ColorPickerPreparedOutline.hint")}`,
		scope: "client",
		type: String,
		default: RGBAToHexAFromColor(50, 205, 50, 1),
		config: false
	});
	game.settings.register(CONSTANTS.MODULE_ID, "colorPickerPreparedAccent", {
		name: `${game.i18n.localize("DSRPG.Settings.ColorPickerPreparedAccent.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.ColorPickerPreparedAccent.hint")}`,
		scope: "client",
		type: String,
		default: RGBAToHexAFromColor(173, 255, 47, 1),
		config: false
	});

	// --dsrpg-pact:					    rgba(250, 0, 180, 0.3);
	// --dsrpg-pact-outline: 			    rgba(250, 50, 213, 1);
	// --dsrpg-pact-accent: 				rgba(198, 119, 193, 1);

	game.settings.register(CONSTANTS.MODULE_ID, "colorPickerPact", {
		name: `${game.i18n.localize("DSRPG.Settings.ColorPickerPact.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.ColorPickerPact.hint")}`,
		scope: "client",
		type: String,
		default: RGBAToHexAFromColor(250, 0, 180, 0.3),
		config: false
	});
	game.settings.register(CONSTANTS.MODULE_ID, "colorPickerPactOutline", {
		name: `${game.i18n.localize("DSRPG.Settings.ColorPickerPactOutline.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.ColorPickerPactOutline.hint")}`,
		scope: "client",
		type: String,
		default: RGBAToHexAFromColor(250, 50, 213, 1),
		config: false
	});
	game.settings.register(CONSTANTS.MODULE_ID, "colorPickerPactAccent", {
		name: `${game.i18n.localize("DSRPG.Settings.ColorPickerPactAccent.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.ColorPickerPactAccent.hint")}`,
		scope: "client",
		type: String,
		default: RGBAToHexAFromColor(198, 119, 193, 1),
		config: false
	});

	// --dsrpg-atwill: 					rgba(226, 246, 4, 0.3);
	// --dsrpg-atwill-outline: 			rgba(163, 165, 50, 1);
	// --dsrpg-atwill-accent: 		    rgba(255, 242, 0, 1);

	game.settings.register(CONSTANTS.MODULE_ID, "colorPickerAtWill", {
		name: `${game.i18n.localize("DSRPG.Settings.ColorPickerAtWill.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.ColorPickerAtWill.hint")}`,
		scope: "client",
		type: String,
		default: RGBAToHexAFromColor(226, 246, 4, 0.3),
		config: false
	});
	game.settings.register(CONSTANTS.MODULE_ID, "colorPickerAtWillOutline", {
		name: `${game.i18n.localize("DSRPG.Settings.ColorPickerAtWillOutline.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.ColorPickerAtWillOutline.hint")}`,
		scope: "client",
		type: String,
		default: RGBAToHexAFromColor(163, 165, 50, 1),
		config: false
	});
	game.settings.register(CONSTANTS.MODULE_ID, "colorPickerAtWillAccent", {
		name: `${game.i18n.localize("DSRPG.Settings.ColorPickerAtWillAccent.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.ColorPickerAtWillAccent.hint")}`,
		scope: "client",
		type: String,
		default: RGBAToHexAFromColor(255, 242, 0, 1),
		config: false
	});

	// --dsrpg-innate: 					rgba(255, 0, 0, 0.3);
	// --dsrpg-innate-outline: 			rgba(231, 23, 23, 1);
	// --dsrpg-innate-accent: 			rgba(195, 69, 69, 1);

	game.settings.register(CONSTANTS.MODULE_ID, "colorPickerInnate", {
		name: `${game.i18n.localize("DSRPG.Settings.ColorPickerInnate.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.ColorPickerInnate.hint")}`,
		scope: "client",
		type: String,
		default: RGBAToHexAFromColor(255, 0, 0, 0.3),
		config: false
	});
	game.settings.register(CONSTANTS.MODULE_ID, "colorPickerInnateOutline", {
		name: `${game.i18n.localize("DSRPG.Settings.ColorPickerInnateOutline.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.ColorPickerInnateOutline.hint")}`,
		scope: "client",
		type: String,
		default: RGBAToHexAFromColor(231, 23, 23, 1),
		config: false
	});
	game.settings.register(CONSTANTS.MODULE_ID, "colorPickerInnateAccent", {
		name: `${game.i18n.localize("DSRPG.Settings.ColorPickerInnateAccent.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.ColorPickerInnateAccent.hint")}`,
		scope: "client",
		type: String,
		default: RGBAToHexAFromColor(195, 69, 69, 1),
		config: false
	});

	// --dsrpg-alwaysprepared: 			rgba(0, 0, 255, 0.15);
	// --dsrpg-alwaysprepared-outline: 	rgba(65, 105, 225, 1);
	// --dsrpg-alwaysprepared-accent: 	rgba(0, 191, 255, 1);

	game.settings.register(CONSTANTS.MODULE_ID, "colorPickerAlwaysPrepared", {
		name: `${game.i18n.localize("DSRPG.Settings.ColorPickerAlwaysPrepared.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.ColorPickerAlwaysPrepared.hint")}`,
		scope: "client",
		type: String,
		default: RGBAToHexAFromColor(0, 0, 255, 0.15),
		config: false
	});
	game.settings.register(CONSTANTS.MODULE_ID, "colorPickerAlwaysPreparedOutline", {
		name: `${game.i18n.localize("DSRPG.Settings.ColorPickerAlwaysPreparedOutline.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.ColorPickerAlwaysPreparedOutline.hint")}`,
		scope: "client",
		type: String,
		default: RGBAToHexAFromColor(65, 105, 225, 1),
		config: false
	});
	game.settings.register(CONSTANTS.MODULE_ID, "colorPickerAlwaysPreparedAccent", {
		name: `${game.i18n.localize("DSRPG.Settings.ColorPickerAlwaysPreparedAccent.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.ColorPickerAlwaysPreparedAccent.hint")}`,
		scope: "client",
		type: String,
		default: RGBAToHexAFromColor(0, 191, 255, 1),
		config: false
	});

	// ===============================
	// Homebrew Rules
	// ===============================

	game.settings.register(CONSTANTS.MODULE_ID, "hbEnableUpcastFreeSpell", {
		name: `${game.i18n.localize("DSRPG.Settings.HBEnableUpcastFreeSpell.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.HBEnableUpcastFreeSpell.hint")}`,
		scope: "world",
		config: false,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "hbSetFeaturesForUpcastFreeSpell", {
		name: `${game.i18n.localize("DSRPG.Settings.HBSetFeaturesForUpcastFreeSpell.name")}`,
		hint: `${game.i18n.localize("DSRPG.Settings.HBSetFeaturesForUpcastFreeSpell.hint")}`,
		scope: "world",
		config: false,
		default: "",
		type: String
	});

	// ========================================================================
	game.settings.register(CONSTANTS.MODULE_ID, "debug", {
		name: `DSRPG.Settings.Debug.name`,
		hint: `DSRPG.Settings.Debug.hint`,
		scope: "client",
		config: true,
		default: false,
		type: Boolean
	});
}

class ResetSettingsDialog extends FormApplication {
	constructor(...args) {
		//@ts-ignore
		super(...args);
		//@ts-ignore
		return new Dialog({
			title: game.i18n.localize(`DSRPG.Settings.Reset.dialogs.title`),
			content:
				'<p style="margin-bottom:1rem;">' +
				game.i18n.localize(`DSRPG.Settings.Reset.dialogs.content`) +
				"</p>",
			buttons: {
				confirm: {
					icon: '<i class="fas fa-check"></i>',
					label: game.i18n.localize(`DSRPG.Settings.Reset.dialogs.confirm`),
					callback: async () => {
						for (let setting of game.settings.storage
							.get("world")
							.filter((setting) => setting.key.startsWith(`${CONSTANTS.MODULE_ID}.`))) {
							log(`Reset setting '${setting.key}'`);
							await setting.delete();
						}
						//window.location.reload();
					}
				},
				cancel: {
					icon: '<i class="fas fa-times"></i>',
					label: game.i18n.localize(`DSRPG.Settings.Reset.dialogs.cancel`)
				}
			},
			default: "cancel"
		});
	}

	async _updateObject(event, formData) {
		// do nothing
	}
}
