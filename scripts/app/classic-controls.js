// ==================================
// THIS METHOD IS DEPRECATED WITH 2.1.X FOR NOW I LEAVE
// ============================================
export const dsrpgClassicControls = function (html) {
	let itemList = html.find(".ds-rpg-extension .list-layout .items-list"),
		item = html.find(".ds-rpg-extension .list-layout .item"),
		itemControls = html.find(".ds-rpg-extension .list-layout .item-controls");

	itemList.addClass("classic-controls");
	// item.removeClass('context-enabled').removeClass('context');
	// itemControls.removeClass('context-menu');

	/*
  itemControls.each(function(){
    let controls = $(this),
    controlItems = 0,
    controlItemsWidth = 14,
    spacing;
    setTimeout(function(){ 
      let count = controls.find('a').length;
      controlItems = count > controlItems ? count : controlItems;
      spacing = controlItems * controlItemsWidth + controlItems * 2 + 5;
      controls.closest('.item-list').prev('.items-header').css({'padding-right': spacing+'px'});
    }, 50);
  })
  */
};
