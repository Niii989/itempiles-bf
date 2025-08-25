# itempiles-bf
This is a module that enables the Black Flag Foundry system to have compatibility with [Item Piles](https://foundryvtt.com/packages/item-piles).

Built using the [ItemPiles System Template](https://github.com/fantasycalendar/FoundryVTT-ItemPiles-System-Template)

## Usage
Simply install this alongside Item Piles. Once installed and activated it will provide Item Piles with the configuration it needs to work properly in the Black Flag system.

## Installation
1. Launch Foundry
2. Go to the "Add-on Modules" tab of the setup screen
3. Click "Install Module"
4. Paste the following manifest into the "Manifest URL" field: `https://github.com/Niii989/itempiles-bf/releases/latest/download/module.json`
5. Click "Install"

## Known Issues
Verify that all actors have the currency items in their inventories to work correctly.
When storing containers in vaults and Item Piles, all items inside the container will be saved as separate items.
Warning! When adding containers (e.g., Explorer's Pack) to Merchants, the items inside the container will disappear.