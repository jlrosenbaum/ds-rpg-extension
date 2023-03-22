export const dsrpgShowItemArt = function (html, item) {
	let image = html.find("img.profile");
	image.attr(
		"title",
		`${game.i18n.localize("DSRPG.EditActorImage")} / ${game.i18n.localize("DSRPG.ShowItemImage")}`
	);
	let container = `<div class="item-image item-image-show-item-art"></div>`;
	let menu = `<div class="item-menu hidden"><a class="showItemArt">${game.i18n.localize("DSRPG.ShowItemArt")}</a>`;
	image.wrap(container);
	let imageContainer = html.find(".item-image-show-item-art");
	imageContainer.append(menu);
	let imageMenu = html.find(".item-menu");
	let imageButton = html.find(".showItemArt");

	image.mousedown(async (e) => {
		switch (e.which) {
			case 3:
				imageMenu.toggleClass("hidden");
				break;
		}
	});

	imageButton.click(function (e) {
		e.preventDefault();
		imageMenu.addClass("hidden");
		let id = $(this).attr("id"),
			itemImg = item.img;
		new ImagePopout(itemImg, {
			title: "Item: " + item.name,
			shareable: true,
			uuid: item.uuid
		}).render(true);
	});
};