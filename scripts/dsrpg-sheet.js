import CONSTANTS from "./constants.js";

// ========================================================================
// Description: Function is used to deterimine if a player is able to edit aspects of the sheet'
// Params: - app: the current game?
//         - html: the character sheet
//         - actorData: data in the sheet?
// ========================================================================
export function applyLocksCharacterSheet(app, html, actorData)
{
    if (!app.actor?.getFlag(CONSTANTS.MODULE_ID, "allow-edit")) {
		if (game.settings.get(CONSTANTS.MODULE_ID, "editTotalLockEnabled")) {
			html.find(".skill input").prop("disabled", true);
			html.find(".skill .config-button").remove();
			html.find(".skill .proficiency-toggle").remove();
			html.find(".ability-score").prop("disabled", true);
			html.find(".ac-display input").prop("disabled", true);
			html.find(".initiative input").prop("disabled", true);
			html.find(".hp-max").prop("disabled", true);
			html.find(".resource-name input").prop("disabled", true);
			html.find(".res-max").prop("disabled", true);
			html.find(".res-options").remove();
			html.find(".ability-modifiers .proficiency-toggle").remove();
			html.find(".ability .config-button").remove();
			html.find(".traits .config-button,.traits .trait-selector,.traits .proficiency-selector").remove();
			html.find("[contenteditable]").prop("contenteditable", false);
			html.find(".caster-level input").prop("disabled", true);
			html.find(".spellcasting-attribute select").prop("disabled", true);
		}
	}
	if (game.user.isGM) {
		return;
	}
	if (game.settings.get(CONSTANTS.MODULE_ID, "lockMoneyChanges")) {
		for (const elem of html.find("input[name^='system.currency']")) {
			elem.setAttribute("readonly", true);
		}
	}
	if (game.settings.get(CONSTANTS.MODULE_ID, "lockExpChanges")) {
		for (const elem of html.find("input[name^='system.details.xp.value']")) {
			elem.setAttribute("readonly", true);
		}
		for (const elem of html.find("input[name^='system.details.xp.max']")) {
			elem.setAttribute("readonly", true);
		}
	}
	if (game.settings.get(CONSTANTS.MODULE_ID, "lockHpMaxChanges")) {
		for (const elem of html.find("input[name^='system.attributes.hp.max']")) {
			elem.setAttribute("readonly", true);
		}
	}
	if (game.settings.get(CONSTANTS.MODULE_ID, "lockLevelSelector")) {
		for (const elem of html.find("select[class^='level-selector']")) {
			elem.setAttribute("disabled", true);
		}
	}
	if (game.settings.get(CONSTANTS.MODULE_ID, "lockConfigureSheet")) {
		for (const elem of html.find("a[class$='configure-sheet']")) {
			elem.style.pointerEvents = "none";
			elem.style.cursor = "default";
			elem.style.display = "none";
		}
	}
	if (game.settings.get(CONSTANTS.MODULE_ID, "lockItemQuantity")) {
		// for (const elem of html.find("input[data-path^='system.quantity']")) {
		// 	elem.setAttribute("readonly", true);
		// }
		for (const elem of html.find("input[name^='system.quantity']")) {
			elem.setAttribute("readonly", true);
		}
	}
}