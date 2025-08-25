Hooks.once("item-piles-ready", async () => {

	const baseConfig = {
		// These keys and setting are unlikely to ever change

		// The actor class type is the type of actor that will be used for the default item pile actor that is created on first item drop.
		"ACTOR_CLASS_TYPE": "pc",

		// The item class type is the type of item that will be used for the default loot item
		"ITEM_CLASS_LOOT_TYPE": "sundry",

		// The item class type is the type of item that will be used for the default weapon item
		"ITEM_CLASS_WEAPON_TYPE": "weapon",

		// The item class type is the type of item that will be used for the default equipment item
		"ITEM_CLASS_EQUIPMENT_TYPE": "gear",

		// The item quantity attribute is the path to the attribute on items that denote how many of that item that exists
		"ITEM_QUANTITY_ATTRIBUTE": "system.quantity",

		// The item price attribute is the path to the attribute on each item that determine how much it costs
		"ITEM_PRICE_ATTRIBUTE": "system.price.value",

		// Item filters actively remove items from the item pile inventory UI that users cannot loot, such as spells, feats, and classes
		"ITEM_FILTERS": [
			{
				"path": "type",
				"filters": "spell,talent,class,subclass,background,lineage,heritage,feature"
			}
		],

		"PILE_DEFAULTS": {
			merchantColumns: [{
				label: "<i class=\"fa-solid fa-shield\"></i>",
				path: "system.equipped",
				formatting: "{#}",
				buying: false,
				selling: true,
				mapping: {
					"true": "✔",
					"false": ""
				}
			}, {
				label: "Rarity",
				path: "system.rarity",
				formatting: "{#}",
				buying: true,
				selling: true,
				mapping: {
					"common": "BF.Rarity.Level.Common",
					"uncommon": "BF.Rarity.Level.Uncommon",
					"rare": "BF.Rarity.Level.Rare",
					"veryRare": "BF.Rarity.Level.VeryRare",
					"legendary": "BF.Rarity.Level.Legendary",
					"fabled": "BF.Rarity.Level.Fabled",
					"artifact": "BF.Rarity.Level.Artifact"
				}
			}]
		},

		// Item similarities determines how item piles detect similarities and differences in the system
		"ITEM_SIMILARITIES": ["name", "type"],

		// Currencies in item piles is a versatile system that can accept actor attributes (a number field on the actor's sheet) or items (actual items in their inventory)
		// In the case of attributes, the path is relative to the "actor.system"
		// In the case of items, it is recommended you export the item with `.toObject()` and strip out any module data
		"CURRENCIES": [
			{
				type: "item",
				name: "Platinum",
				img: "icons/commodities/currency/coin-embossed-skull-silver.webp",
				abbreviation: "{#}PP",
				data: {
					uuid: "Compendium.black-flag.currencies.Item.DSIvSjJQvxdi7IWG"
				},
				primary: false,
				exchangeRate: 10
			},
			{
				type: "item",
				name: "Gold",
				img: "icons/commodities/currency/coin-inset-insect-gold.webp",
				abbreviation: "{#}GP",
				data: {
					uuid: "Compendium.black-flag.currencies.Item.eWMYzM5UVZUDIqtg",
				},
				primary: true,
				exchangeRate: 1
			},
			{
				type: "item",
				name: "Silver",
				img: "icons/commodities/currency/coin-inset-snail-silver.webp",
				abbreviation: "{#}SP",
				data: {
					uuid: "Compendium.black-flag.currencies.Item.ywar06UcV0H66yKq",
				},
				primary: false,
				exchangeRate: 0.1
			},
			{
				type: "item",
				name: "Copper",
				img: "icons/commodities/currency/coin-oval-rune-copper.webp",
				abbreviation: "{#}CP",
				data: {
					uuid: "Compendium.black-flag.currencies.Item.CsAQAHTK5LWUHcPX",
				},
				primary: false,
				exchangeRate: 0.01
			}
		],

		"VAULT_STYLES": [
			{
				path: "system.rarity",
				value: "artifact",
				styling: {
					"box-shadow": "inset 0px 0px 7px 0px rgba(255,191,0,1)"
				}
			},
			{
				path: "system.rarity",
				value: "fabled",
				styling: {
					"box-shadow": "inset 0px 0px 7px 0px rgba(255, 0, 0, 1)"
				}
			},
			{
				path: "system.rarity",
				value: "legendary",
				styling: {
					"box-shadow": "inset 0px 0px 7px 0px rgba(255,119,0,1)"
				}
			},
			{
				path: "system.rarity",
				value: "veryRare",
				styling: {
					"box-shadow": "inset 0px 0px 7px 0px rgba(255,0,247,1)"
				}
			},
			{
				path: "system.rarity",
				value: "rare",
				styling: {
					"box-shadow": "inset 0px 0px 7px 0px rgba(0,136,255,1)"
				}
			},
			{
				path: "system.rarity",
				value: "uncommon",
				styling: {
					"box-shadow": "inset 0px 0px 7px 0px rgba(0,255,9,1)"
				}
			}
		],

		"SYSTEM_HOOKS": () => {},

		// This function is an optional system handler that specifically transforms an item when it is added to actors
		"ITEM_TRANSFORMER": async (itemData) => {
			return itemData;
		},

		"UNSTACKABLE_ITEM_TYPES": ["container"],

		"ITEM_TYPE_HANDLERS": {
			"GLOBAL": {
				[game.itempiles.CONSTANTS.ITEM_TYPE_METHODS.IS_CONTAINED]: ({ item }) => {
					//return item.system.container;
					return item.system.containerId ? item.system.containerId : "";
				},
				[game.itempiles.CONSTANTS.ITEM_TYPE_METHODS.IS_CONTAINED_PATH]: "system.containerId",
				[game.itempiles.CONSTANTS.ITEM_TYPE_METHODS.CONTAINER_ID_GENERATOR]: ({ actor, containerId }) => {
					return `${actor.uuid}.Item.${containerId}`;
				},
				[game.itempiles.CONSTANTS.ITEM_TYPE_METHODS.CONTAINER_ID_RETRIEVER]: ({ item }) => {
					return item.system.containerId.split(".").pop();
				},
				[game.itempiles.CONSTANTS.ITEM_TYPE_METHODS.CONTAINER_TRANSFORMER]: ({ actor, map }) => {
					Object.values(map).forEach(data => {
						data.item.system.items = data.items.reduce((acc, item) => {
							let _id = foundry.utils.randomID();
							acc[_id] = {
								quantity: item.system.quantity,
								uuid: `${actor.uuid}.Item.${item._id}`
							}
							return acc;
						}, {})
					})
				}
			},
			"container": {
				[game.itempiles.CONSTANTS.ITEM_TYPE_METHODS.HAS_CURRENCY]: true,
				[game.itempiles.CONSTANTS.ITEM_TYPE_METHODS.CONTENTS]: ({ item }) => {
					return item?.system.allContainedItems ?? [];
				},
				[game.itempiles.CONSTANTS.ITEM_TYPE_METHODS.TRANSFER]: ({ item, items, raw = false } = {}) => {
					const containerItems = item?.system.allContainedItems ?? [];
					for (const containedItem of containerItems) {
						const item = fromUuidSync(containedItem.uuid);
						if (!item) continue;
						items.push(item.toObject());
					}
				}
			}
		},

		// This function is an optional system handler that specifically transforms an item's price into a more unified numeric format
		"ITEM_COST_TRANSFORMER": (item) => {
			const itemCost = foundry.utils.getProperty(item, "system.price");
			const currencies = game.blackFlag.config.currencies;
			let copperValue = 0;

			if (typeof itemCost?.value === "number" && typeof itemCost?.denomination === "string") {
				const conv = currencies[itemCost.denomination]?.conversion ?? 0;
				copperValue = Math.round((itemCost.value * conv) / currencies.cp.conversion);
			}
			
			return copperValue / 100;
		},
	}

	const VERSIONS = {

		"1.3.066": {
			...baseConfig,
			"VERSION": "1.0.0"
		}
	}

	for (const [version, data] of Object.entries(VERSIONS)) {
		await game.itempiles.API.addSystemIntegration(data, version);
	}

});