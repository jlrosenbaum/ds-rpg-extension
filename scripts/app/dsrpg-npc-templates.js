/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */

export const preloadDSRPGHandlebarsTemplates = async function () {
	// Define template paths to load
	const dsrpgtemplatePaths = [
		// Actor Sheet Partials
		"modules/ds-rpg-extension/templates/actors/parts/dsrpg-npc-spellbook.html"
	];

	// Load the template parts
	return loadTemplates(dsrpgtemplatePaths);
};
