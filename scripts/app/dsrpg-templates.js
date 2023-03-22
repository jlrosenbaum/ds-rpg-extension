/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */

export const preloadDSRPGHandlebarsTemplates = async function () {
	// Define template paths to load
	const dsrpgtemplatePaths = [
		// Actor Sheet Partials
		"modules/ds-rpg-extension/templates/actors/parts/dsrpg-traits.html",
		"modules/ds-rpg-extension/templates/actors/parts/dsrpg-inventory.html",
		"modules/ds-rpg-extension/templates/actors/parts/dsrpg-inventory-grid.html",
		"modules/ds-rpg-extension/templates/actors/parts/dsrpg-inventory-header.html",
		"modules/ds-rpg-extension/templates/actors/parts/dsrpg-inventory-footer.html",
		"modules/ds-rpg-extension/templates/actors/parts/dsrpg-features.html",
		"modules/ds-rpg-extension/templates/actors/parts/dsrpg-spellbook.html",
		"modules/ds-rpg-extension/templates/actors/parts/dsrpg-spellbook-grid.html",
		"modules/ds-rpg-extension/templates/actors/parts/dsrpg-spellbook-header.html",
		"modules/ds-rpg-extension/templates/actors/parts/dsrpg-spellbook-footer.html",
		"modules/ds-rpg-extension/templates/actors/parts/dsrpg-effects.html"
	];

	// Load the template parts
	return loadTemplates(dsrpgtemplatePaths);
}