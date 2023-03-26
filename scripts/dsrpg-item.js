import {applyLocksItemSheet} from "./app/lockers.js";
import { debug } from "./app/logger-util.js";
import { dsrpgShowItemArt } from "./app/show-item-art.js";
import { applySpellClassFilterItemSheet } from "./app/spellClassFilter.js";

export class DSRPGItemSheet extends dnd5e.applications.item.ItemSheet5e {
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			classes: ["dsrpg", "dnd5ebak", "sheet", "item"]
		});
	}

	get template() {
		if (!game.user.isGM && this.actor.limited && !game.settings.get(CONSTANTS.MODULE_ID, "expandedSheetEnabled"))
			return "modules/ds-rpg-extension/templates/items/dsrpg-spell-ltd.html";
		return "modules/ds-rpg-extension/templates/items/dsrpg-spell.hbs";
	}

	activateListeners(html) {
		super.activateListeners(html);

		let item = this.item;
		debug(`dsrpg-item | activateListeners | item: ${item}`);

		dsrpgShowItemArt(html, item);
	}
}

async function addEditorHeadline(app, html, data) {
	html.find(".tab[data-tab=description] .editor").prepend(
		`<h2 class="details-headline">${game.i18n.localize("DSRPG.ItemDetailsHeadline")}</h2>`
	);
}

Items.registerSheet("dnd5e", DSRPGItemSheet, { makeDefault: true });

Hooks.on("renderDSRPGItemSheet", (app, html, data) => {
	addEditorHeadline(app, html, data);
	applySpellClassFilterItemSheet(app, html, data);
	// NOTE LOCKS ARE THE LAST THING TO SET
	applyLocksItemSheet(app, html, data);
});