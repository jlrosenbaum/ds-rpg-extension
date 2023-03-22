import DSRPGBaseConfigSheet from "./dsrpg-base-config-sheet.js";

/**
 * A form for configuring actor hit points and bonuses.
 */
export default class DSRPGActorHitPointsConfig extends DSRPGBaseConfigSheet {
	constructor(...args) {
		super(...args);

		/**
		 * Cloned copy of the actor for previewing changes.
		 * @type {Actor5e}
		 */
		this.clone = this.object.clone();
	}

	/* -------------------------------------------- */

	/** @override */
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: ["dnd5e", "actor-hit-points-config"],
			template: "systems/dnd5e/templates/apps/hit-points-config.hbs",
			width: 320,
			height: "auto",
			sheetConfig: false
		});
	}

	/* -------------------------------------------- */

	/** @inheritdoc */
	get title() {
		return `${game.i18n.localize("DND5E.HitPointsConfig")}: ${this.document.name}`;
	}

	/* -------------------------------------------- */

	/** @inheritdoc */
	getData(options) {
		return {
			hp: this.clone.system.attributes.hp,
			source: this.clone.toObject().system.attributes.hp,
			isCharacter: this.document.type === "character"
		};
	}

	/* -------------------------------------------- */

	/** @inheritdoc */
	_getActorOverrides() {
		return Object.keys(foundry.utils.flattenObject(this.object.overrides?.system?.attributes || {}));
	}

	/* -------------------------------------------- */

	/** @inheritdoc */
	async _updateObject(event, formData) {
		const hp = foundry.utils.expandObject(formData).hp;
		this.clone.updateSource({ "system.attributes.hp": hp });
		const maxDelta = this.clone.system.attributes.hp.max - this.document.system.attributes.hp.max;
		// Start of the patch for dsrpg and the strange reset to 0 behaviour...
		//hp.value = Math.max(this.document.system.attributes.hp.value + maxDelta, 0);
		hp.value = Math.max(this.document.system.attributes.hp.value, 0);
		// End of the patch for dsrpg and the strange reset to 0 behaviour...
		return this.document.update({ "system.attributes.hp": hp });
	}

	/* -------------------------------------------- */
	/*  Event Listeners and Handlers                */
	/* -------------------------------------------- */

	/** @inheritDoc */
	activateListeners(html) {
		super.activateListeners(html);
		html.find(".roll-hit-points").click(this._onRollHPFormula.bind(this));
	}

	/* -------------------------------------------- */

	/** @inheritdoc */
	async _onChangeInput(event) {
		await super._onChangeInput(event);
		const t = event.currentTarget;

		// Start of the patch for dsrpg and the strange reset to 0 behaviour...
		if (t.value === "" || t.value === "0" || t.value === null || t.value === undefined) {
			if (t.name === "hp.max") {
				const rollData = this.object.getRollData();

				this.object.system._source.attributes.hp.max = null;
				this.object._prepareHitPoints(rollData);
				t.value = this.object.system.attributes.hp.max;
			}
		}
		// End of the patch

		// Update clone with new data & re-render
		this.clone.updateSource({ [`system.attributes.${t.name}`]: t.value || null });
		if (t.name !== "hp.formula") this.render();
	}

	/* -------------------------------------------- */

	/**
	 * Handle rolling NPC health values using the provided formula.
	 * @param {Event} event  The original click event.
	 * @protected
	 */
	async _onRollHPFormula(event) {
		event.preventDefault();
		try {
			const roll = await this.clone.rollNPCHitPoints();
			this.clone.updateSource({ "system.attributes.hp.max": roll.total });
			this.render();
		} catch (error) {
			ui.notifications.error(game.i18n.localize("DND5E.HPFormulaError"));
			throw error;
		}
	}
}
