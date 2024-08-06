import { InnGeneratorSettings } from "src/types/inn/InnGeneratorSettings";
import { FantasyPluginSettings } from "src/types/settings/FantasyPluginSettings";
import { DrinkGeneratorSettings } from "src/types/drink/DrinkGeneratorSettings";
import { LootGeneratorSettings } from "src/types/loot/LootGeneratorSettings";
import { NPCGeneratorSettings } from "src/types/npc/NPCGeneratorSettings";

//The Default Settings for the Plugin.
export const DEFAULT_SETTINGS: FantasyPluginSettings = {
    enableCurrency: false,
    innSettings: new InnGeneratorSettings(true),
    currencyFrequency: 50,
    drinkSettings: new DrinkGeneratorSettings(true),
    lootSettings: new LootGeneratorSettings(true),
    npcSettings: new NPCGeneratorSettings(true, true),
    usedNpcSettings: new NPCGeneratorSettings(false, false) // TODO - switch to True,
}

export const ITEM_LIST = {"Common": {
    "Dungeon Master's Guide": [
      "Potion of Healing",
      "Potion of Climbing",
      "Spell Scroll (Cantrip)",
      "Spell Scroll (1st Level)",
      "Spell Scroll (2nd Level)"
    ],
    "Xanathar's Guide to Everything": [
      "Armor of Gleaming",
      "Bead of Nourishment",
      "Bead of Refreshment",
      "Boots of False Tracks",
      "Candle of the Deep",
      "Cast-Off Armor",
      "Charlatan's Die",
      "Cloak of Billowing",
      "Cloak of Many Fashions",
      "Clockwork Amulet",
      "Clothes of Mending",
      "Dark Shard Amulet",
      "Dread Helm",
      "Ear Horn of Hearing",
      "Enduring Spellbook",
      "Ersatz Eye",
      "Hat of Vermin",
      "Hat of Wizardry",
      "Heward's Handy Spice Pouch",
      "Horn of Silent Alarm",
      "Instrument of Illusions",
      "Instrument of Scribing",
      "Lock of Trickery",
      "Moon Touched Sword",
      "Mystery Key",
      "Orb of Direction",
      "Orb of Time",
      "Perfume of Bewitching",
      "Pipe of Smoke Monsters",
      "Pole of Angling",
      "Pole of Collapsing",
      "Pot of Awakening",
      "Rope of Mending",
      "Ruby of the War Mage",
      "Shield of Expression",
      "Smoldering Armor",
      "Staff of Adornment",
      "Staff of Birdcalls",
      "Staff of Flowers",
      "Talking Doll",
      "Tankard of Sobriety",
      "Unbreakable Arrow",
      "Veteran's Cane",
      "Walloping Ammunition",
      "Wand of Conducting",
      "Wand of Pyrotechnics",
      "Wand of Scowls",
      "Wand of Smiles"
    ],
    "Tasha's Cauldron of Everything": [
      "Illuminators Tattoo",
      "Masquerade Tattoo",
      "Prosthetic Limb",
      "Spellwrought Tattoo"
    ],
    "Explorer's Guide to Wildemount": [
      "Breathing Bubble",
      "Coin of Delving",
      "Ersatz Eye",
      "Prosthetic Limb (Wildemount)",
      "Vox Seeker"
    ],
    "Acquisitions Incorporated": [
      "Cartographer's Map Case",
      "Coin of Decisionry (rank 2)",
      "Documancy Satchel (rank 2)",
      "Occultant Abacus (rank 1)",
      "Spyglass of Clairvoyance",
      "Voting Kit",
      "Whisper Jar (rank 1)"
    ],
    "Cricital Role: Call of the Netherdeep": [
      "Earring of Message",
      "Medal of Muscle",
      "Medal of the Conch",
      "Medal of the Horizonback",
      "Medal of the Maze",
      "Medal of the Meat Pie",
      "Medal of the Wetlands",
      "Medal of Wit"
    ],
    "Eberron: Rising from the Last War": [
      "Keycharm",
      "Prosthetic Limb",
      "Shiftweave",
      "Spellshard"
    ],
    "Ghosts of Saltmarsh": [
      "Pipe of Remembrance",
      "Pressure Capsule",
      "Sekolahian Worshiping Statuette"
    ],
    "Guildmasters' Guide to Ravnica": [
      "Moodmark Paint"
    ],
    "Icewind Dale: Rime of the Frostmaiden": [
      "Lantern of Tracking",
      "Thermal Cube"
    ],
    "Phandelver and Below: The Shattered Obelisk": [
      "Mind Crystal (Subtle)"
    ],
    "Strixhaven: A Curriculum of Chaos": [
      "Bottle of Boundless Coffee",
      "Cuddly Strixhaven Mascot",
      "Masque Charm",
      "Strixhaven Pennant"
    ],
    "Tal’dorei Campaign Setting Reborn": [
      "Doublet of Dramatic Demise"
    ],
    "Tryanny of Dragons": [
      "Tankard of Plenty"
    ],
    "Waterdeep: Dungeon of the Mad Mage": [
      "Chest of Preserving",
      "Orb of Gonging",
      "Potion of Comprehension",
      "Potion of Watchful Rest"
    ],
    "Wayfinder's Guide to Eberron": [
      "Armblade",
      "Band of Loyalty",
      "Cleansing Stone",
      "Everbright Lantern",
      "Feather Token (Feather Fall)",
      "Glamerweave (Common)",
      "Imbued Wood Focus",
      "Orb of Shielding",
      "Scribe’s Pen",
      "Wand Sheath"
    ]
  },
  "Uncommon": {
    "Dungeon Master's Guide": [
      "Potion of Greater Healing",
      "Bag of Holding",
      "Driftglobe",
      "Potion of Fire Breath",
      "Potion of Resistance",
      "Ammunition, +1",
      "Potion of Animal Friendship",
      "Potion of Giant Strength (Hill Giant)",
      "Potion of Growth",
      "Potion of Water Breathing",
      "Spell Scroll (2nd Level)",
      "Spell Scroll (3rd Level)",
      "Keoghtom's Ointment",
      "Oil of Slipperiness",
      "Dust of Disappearance",
      "Dust of Dryness",
      "Dust of Sneezing And Choking",
      "Elemental Gem",
      "Philter of Love",
      "Alchemy Jug",
      "Cap of Water Breathing",
      "Cloak of the Manta Ray",
      "Goggles of Night",
      "Helm of Comprehending Languages",
      "Immovable Rod",
      "Lantern of Revealing",
      "Mariner's Armor",
      "Mithral Armor, (medium or heavy, but not hide)",
      "Potion of Poison",
      "Ring of Swimming",
      "Robe of Useful Items",
      "Rope of Climbing",
      "Saddle of the Cavalier",
      "Wand of Magic Detection",
      "Wand of Secrets",
      "Decanter of Endless Water",
      "Eyes of Minute Seeing",
      "Periapt of Health",
      "Sending Stones",
      "Weapon, +1",
      "Shield, +1",
      "Sentinel Shield",
      "Boots of Elvenkind",
      "Broom of Flying",
      "Javelin of Lightning",
      "Wand of Magic Missiles",
      "Adamantine Armor, Chain Mail",
      "Adamantine Armor, Chain Shirt",
      "Adamantine Armor, Scale Mail",
      "Bag of Tricks",
      "Circlet of Blasting",
      "Deck of Illusions",
      "Eversmoking Bottle",
      "Figurine of Wondrous Power (Silver Raven)",
      "Gem of Brightness",
      "Gloves of Thievery",
      "Pipes of Haunting",
      "Ring of Water Walking",
      "Quiver of Ehlonna",
      "Wind Fan",
      "Adamantine Armor, Breastplate",
      "Adamantine Armor, Splint",
      "Adamantine Armor, Half Plate",
      "Adamantine Armor, Plate",
      "Adamantine Armor, Any",
      "Amulet of Proof Against Detection And Location",
      "Boots of Striding And Springing",
      "Bracers of Archery",
      "Brooch of Shielding",
      "Cloak of Elvenkind",
      "Cloak of Protection",
      "Gauntlets of Ogre Power",
      "Hat of Disguise",
      "Pearl of Power",
      "Rod of the Pact Keeper, +1",
      "Slippers of Spider Climbing",
      "Staff of the Adder",
      "Staff of the Python",
      "Sword of Vengeance",
      "Trident of Fish Command",
      "Wand of the War Mage, +1",
      "Wand of Web",
      "Weapon of Warning",
      "Boots of the Winterlands",
      "Eyes of Charming",
      "Eyes of the Eagle",
      "Gloves of Missile Snaring",
      "Gloves of Swimming And Climbing",
      "Headband of Intellect",
      "Helm of Telepathy",
      "Instrument of the Bard (Doss Lute)",
      "Instrument of the Bard (Fochlucan Bandore)",
      "Instrument of the Bard (Mac-Fuirmidh Cittern)",
      "Medallion of Thoughts",
      "Necklace of Adaptation",
      "Periapt of Wound Closure",
      "Pipes of the Sewers",
      "Ring of Jumping",
      "Ring of Mind Shielding",
      "Ring of Warmth",
      "Stone of Good Luck (Luckstone)",
      "Winged Boots"
    ],
    "Explorer's Guide to Wildemount": [
      "Amulet of the Drunkard",
      "Dust of Deliciousness",
      "Ring of Obscuring",
      "Rod of Retribution",
      "Brooch of Living Essence",
      "Goggles of Object Reading"
    ],
    "Acquisitions Incorporated": [
      "Coin of Decisionry (rank 3)",
      "Documancy Satchel (rank 3)",
      "Elder Cartographer's Glossography",
      "Living Loot Satchel (rank 2)",
      "Obviator's Lenses (rank 2)",
      "Occultant Abacus (rank 2)",
      "Portfolio Keeper (rank 2)",
      "Sending Stone",
      "Travel Alchemical Kit",
      "Whisper Jar (rank 2)"
    ],
    "Baldur's Gate: Descent into Avernus": [
      "Hellfire Weapon",
      "Infernal Puzzle Box",
      "Soul Coin"
    ],
    "Bigby Presents: Glory of the Giants": [
      "Prehistoric Figurines of Wondrous Power (Pyrite Plesiosaurus)"
    ],
    "Candlekeep Mysteries": [
      "Alchemy Jug (Blue)",
      "Alchemy Jug (Orange)",
      "Cracked Driftglobe",
      "Serpent Scale Armor"
    ],
    "Fizban's Treasury of Dragons": [
      "Emerald Pen",
      "Dragon Vessel (Slumbering)",
      "Dragon's Wrath Weapon (Slumbering)",
      "Dragonhide Belt, +1",
      "Dragon-Touched Focus (Slumbering)",
      "Scaled Ornament (Slumbering)"
    ],
    "Hunt for the Thessalhydra": [
      "Winter's Dark Bite"
    ],
    "Infernal Machine Rebuild": [
      "Blood of the Lycanthrope Antidote",
      "Crown of the Forest",
      "Mummy Rot Antidote",
      "Thessaltoxin Antidote"
    ],
    "Lost Mine of Phandelver": [
      "Hew",
      "Lightbringer"
    ],
    "Princes of the Apocalypse": [
      "Balloon Pack",
      "Bottled Breath",
      "Seeker Dart",
      "Storm Boomerang",
      "Wingwear"
    ],
    "Phandelver and Below: The Shattered Obelisk": [
      "Mind Crystal (Distant)",
      "Mind Crystal (Empowered)",
      "Mind Crystal (Extended)",
      "Mind Crystal (Careful)",
      "Potion of Psionic Fortitude",
      "Ring of the Orator"
    ],
    "Spelljammer: Adventures in Space": [
      "Wildspace Orrery"
    ],
    "Tal’dorei Campaign Setting Reborn": [
      "Boots of the Vigilant",
      "Echo Stone",
      "Rod of Mercurial Form"
    ],
    "The Hidden Shrine of Tamoachan": [
      "Balance of Harmony",
      "Stone of Ill Luck"
    ],
    "The Sunless Citadel": [
      "Night Caller",
      "Shatterspike",
      "Wand of Entangle"
    ],
    "The Wild Beyond the Witchlight": [
      "Dust of Corrosion",
      "Pixie Dust",
      "Potion of Advantage"
    ],
    "Tomb of Annihilation": [
      "Mask of the Beast",
      "Yklwa, +1"
    ],
    "Tryanny of Dragons": [
      "Insignia of Claws"
    ],
    "Waterdeep: Dragon Heist": [
      "Paper Bird",
      "Smokepowder",
      "Ring of Truth Telling"
    ],
    "Wayfinder's Guide to Eberron": [
      "Bag of Bounty",
      "Glamerweave (Uncommon)",
      "Wheel of Wind and Water",
      "Inquisitive's Goggles",
      "Rings of Shared Suffering"
    ],
    "Planescape: Adventures in the Multiverse": [
      "Portal Compass",
      "Sensory Stone"
    ],
    "The Book of Many Things": [
      "Armor of Fungal Spores",
      "Bloodrage Greataxe",
      "Card Sharp's Deck",
      "Deck of Miscellany",
      "Deck of Wonder",
      "Dried Leech",
      "House of Cards",
      "Ring of Puzzler's Wit",
      "Sling of Giant Felling",
      "Winged Ammunition",
      "Wraps of Unarmed Prowess, +1",
      "Armor of the Fallen",
      "Armor of Weightlessness",
      "Blasted Goggles",
      "Boomerang Shield",
      "Fabulist Gem",
      "Plate of Knight's Fellowship",
      "Shield of the Tortoise"
    ],
    "Dungeons of Drakkenheim": [
      "Flame Lance",
      "Purging Rod",
      "Skymetal Shield",
      "Spellpiercing Wand"
    ],
    "Tasha's Cauldron of Everything": [
      "Nature's Mantle",
      "All Purpose Tool, +1",
      "Coiling Grasp Tattoo",
      "Eldritch Claw Tattoo",
      "Feywild Shard",
      "Guardian Emblem",
      "Amulet of the Devout, +1",
      "Arcane Grimoire, +1",
      "Barrier Tattoo 12+Dex",
      "Bloodwell Vial, +1",
      "Moon Sickle, +1",
      "Rhythm Maker's Drum, +1"
    ],
    "Curse of Strahd": [
      "Blood Spear"
    ],
    "Eberron: Rising from the Last War": [
      "Earworm",
      "Finder's Goggles",
      "Living Gloves"
    ],
    "Ghosts of Saltmarsh": [
      "Cursed Luckstone",
      "Helm of Underwater Action"
    ],
    "Guildmasters' Guide to Ravnica": [
      "Rakdos Keyrune",
      "Simic Keyrune",
      "Azorius Guild Signet",
      "Boros Guild Signet",
      "Dimir Guild Signet",
      "Golgari Guild Signet",
      "Gruul Guild Signet",
      "Izzet Guild Signet",
      "Orzhov Guild Signet",
      "Rakdos Guild Signet",
      "Selesnya Guild Signet",
      "Simic Guild Signet",
      "Mizzium Apparatus",
      "Pyroconverger",
      "Skyblinder Staff",
      "Spies' Murmur"
    ],
    "Icewind Dale: Rime of the Frostmaiden": [
      "Orc Stone",
      "Psi Crystal"
    ],
    "Out of the Abyss": [
      "Piwafwi (Cloak of Elvenkind)",
      "Spell Gem (Lapis Lazuli)",
      "Spell Gem (Obsidian)"
    ],
    "Storm King's Thunder": [
      "Robe of Serpents"
    ],
    "Strixhaven: A Curriculum of Chaos": [
      "Lorehold Primer",
      "Prismari Primer",
      "Quandrix Primer",
      "Silverquill Primer",
      "Witherbloom Primer"
    ],
    "Van Richten's Guide to Ravenloft": [
      "Harkon's Bite"
    ],
    "Waterdeep: Dungeon of the Mad Mage": [
      "Circlet of Human Perfection",
      "Propeller Helm"
    ],
    "Lairs of Etharis": [
      "Wand of Silence"
    ],
    "Humblewood Campaign Setting": [
      "Nest Charm",
      "Red-Feather Bow",
      "Wing Crest Shield"
    ]
  },
  "Rare": {
    "Dungeon Master's Guide": [
      "Potion of Superior Healing",
      "Spell Scroll (4th Level)",
      "Spell Scroll (5th Level)",
      "Ammunition, +2",
      "Potion of Clairvoyance",
      "Potion of Diminution",
      "Potion of Gaseous Form",
      "Potion of Giant Strength (Frost Or Stone Giant)",
      "Potion of Heroism",
      "Potion of Invulnerability",
      "Potion of Mind Reading",
      "Elixir of Health",
      "Oil of Etherealness",
      "Potion of Giant Strength (Fire Giant)",
      "Quaal's Feather Token",
      "Scroll of Protection",
      "Bag of Beans",
      "Bead of Force",
      "Chime of Opening",
      "Folding Boat",
      "Heward's Handy Haversack",
      "Horseshoes of Speed",
      "Necklace of Fireballs",
      "Portable Hole",
      "Weapon, +2",
      "Figurine of Wondrous Power (Bronze Griffon)",
      "Figurine of Wondrous Power (Ebony Fly)",
      "Figurine of Wondrous Power (Golden Lions)",
      "Figurine of Wondrous Power (Ivory Goats)",
      "Figurine of Wondrous Power (Marble Elephant)",
      "Figurine of Wondrous Power (Onyx Dog)",
      "Figurine of Wondrous Power (Serpentine Owl)",
      "Arrow-Catching Shield",
      "Bowl of Commanding Water Elementals",
      "Brazier of Commanding Fire Elementals",
      "Cape of the Mountebank",
      "Censer of Controlling Air Elementals",
      "Chain Mail, +1",
      "Chain Shirt, +1",
      "Daern's Instant Fortress",
      "Dagger of Venom",
      "Dimensional Shackles",
      "Dragon Slayer",
      "Elven Chain",
      "Giant Slayer",
      "Glamoured Studded Leather",
      "Horn of Blasting",
      "Horn of Valhalla (Silver Or Brass)",
      "Iron Bands of Bilarro",
      "Leather, +1",
      "Scale Mail, +1",
      "Mace of Smiting",
      "Periapt of Proof Against Poison",
      "Ring of Animal Influence",
      "Rope of Entanglement",
      "Shield, +2",
      "Stone of Controlling Earth Elementals",
      "Vicious Weapon",
      "Breastplate, +1",
      "Splint, +1",
      "Studded Leather, +1",
      "Half Plate, +1",
      "Plate, +1",
      "Armor, +1",
      "Amulet of Health",
      "Armor of Vulnerability",
      "Belt of Dwarvenkind",
      "Belt of Giant Strength (Hill Giant)",
      "Berserker Axe",
      "Boots of Levitation",
      "Boots of Speed",
      "Bracers of Defense",
      "Armor of Resistance, Chain Shirt",
      "Cloak of Displacement",
      "Cloak of the Bat",
      "Cube of Force",
      "Flame Tongue",
      "Gem of Seeing",
      "Helm of Teleportation",
      "Instrument of the Bard (Canaith Mandolin)",
      "Instrument of the Bard (Cli Lyre)",
      "Ioun Stone (Awareness)",
      "Ioun Stone (Protection)",
      "Ioun Stone (Reserve)",
      "Ioun Stone (Sustenance)",
      "Armor of Resistance, Chain Mail",
      "Mace of Disruption",
      "Mace of Terror",
      "Mantle of Spell Resistance",
      "Necklace of Prayer Beads",
      "Ring of Evasion",
      "Ring of Feather Falling",
      "Ring of Free Action",
      "Ring of Protection",
      "Ring of Resistance",
      "Ring of Spell Storing",
      "Ring of the Ram",
      "Ring of X-Ray Vision",
      "Robe of Eyes",
      "Rod of Rulership",
      "Rod of the Pact Keeper, +2",
      "Armor of Resistance, Leather",
      "Armor of Resistance, Scale Mail",
      "Shield of Missile Attraction",
      "Staff of Charming",
      "Staff of Healing",
      "Staff of Swarming Insects",
      "Staff of the Woodlands",
      "Staff of Withering",
      "Sun Blade",
      "Sword of Life Stealing",
      "Sword of Wounding",
      "Tentacle Rod",
      "Wand of Binding",
      "Wand of Enemy Detection",
      "Wand of Fear",
      "Wand of Fireballs",
      "Wand of Lightning Bolts",
      "Wand of Paralysis",
      "Wand of the War Mage +2",
      "Wand of Wonder",
      "Wings of Flying",
      "Armor of Resistance, Breastplate",
      "Armor of Resistance, Splint",
      "Armor of Resistance, Studded Leather",
      "Armor of Resistance, Half Plate",
      "Armor of Resistance, Plate",
      "Armor of Resistance, Any"
    ],
    "Explorer's Guide to Wildemount": [
      "Potion of Maximum Power",
      "Weapon of Certain Death",
      "Acheron Blade",
      "Battering Shield",
      "Butcher's Bib",
      "Corpse Slayer",
      "Needle of Mending",
      "Ring of Temporal Salvation",
      "Staff of the Ivory Claw"
    ],
    "Acquisitions Incorporated": [
      "Documancy Satchel (rank 4)",
      "Living Loot Satchel (rank 3)",
      "Mithral Half Plate, +1",
      "Obviator's Lenses (rank 4)",
      "Occultant Abacus (rank 3)",
      "Portfolio Keeper (rank 3)",
      "Vicious Rapier, +1",
      "Whisper Jar (rank 3)",
      "Failed Experiment Wand",
      "Piercer"
    ],
    "Against the Giant": [
      "Potion of Mind Control (Beast)",
      "Potion of Mind Control (Humanoid)",
      "Hell Hound Cloak"
    ],
    "Bigby Presents: Glory of the Giants": [
      "Glowrune Pigment",
      "Lash of Immolation",
      "Prehistoric Figurines of Wondrous Power (Kyanite Pteranodon)",
      "War Horn of Valor",
      "Crown of the Wrath Bringer",
      "Delver's Claws",
      "Staff of the Rooted Hills",
      "Wayfarer's Boots",
      "Zephyr Armor"
    ],
    "Candlekeep Mysteries": [
      "Serpent's Fang"
    ],
    "Cricital Role: Call of the Netherdeep": [
      "Teleportation Tablet"
    ],
    "Dead in Thay": [
      "Robe of Summer",
      "Loadstone"
    ],
    "Dungeons & Dragons vs. Rick and Morty": [
      "Concertina"
    ],
    "Guildmasters' Guide to Ravnica": [
      "Mizzium Armor",
      "Mizzium Mortar",
      "Azorius Keyrune",
      "Boros Keyrune",
      "Gruul Keyrune",
      "Izzet Keyrune",
      "Orzhov Keyrune",
      "Selesnya Keyrune",
      "Pariah's Shield",
      "Sunforger"
    ],
    "Icewind Dale: Rime of the Frostmaiden": [
      "Cauldron of Plenty",
      "Hook of Fisher's Delight",
      "Professor Skant",
      "Shield Guardian Amulet"
    ],
    "Infernal Machine Rebuild": [
      "Bridle of Capturing"
    ],
    "Lost Mine of Phandelver": [
      "Dragonguard",
      "Spider Staff",
      "Staff of Defense"
    ],
    "Mythis Odysseys of Theros": [
      "Flying Chariot",
      "Potion of Aqueous Form",
      "Two-Birds Sling",
      "Helm of the Gods",
      "Molten Bronze Skin",
      "Siren Song Lyre"
    ],
    "Phandelver and Below: The Shattered Obelisk": [
      "Mind Crystal (Heightened)",
      "Mind Crystal (Quickened)",
      "Bracers of Celerity",
      "Flayer Slayer",
      "Luminous War Pick",
      "Netherese Ring of Protection"
    ],
    "Sleeping Dragon's Wake": [
      "Bonecounter"
    ],
    "Tal’dorei Campaign Setting Reborn": [
      "Magician's Judge",
      "Stormrider Boots",
      "Coat of the Crest",
      "Dagger of Denial",
      "Earthboard",
      "Flamefriend Lantern",
      "Inescapable Lash",
      "Oceanic Weapon",
      "Skysail",
      "Summer's Dance"
    ],
    "The Hidden Shrine of Tamoachan": [
      "Eagle Whistle",
      "Mirror of the Past",
      "Amulet of Protection from Turning"
    ],
    "The Wild Beyond the Witchlight": [
      "Chromatic Rose",
      "Woodcutter's Axe",
      "Scissors of Shadow Snipping"
    ],
    "Tomb of Annihilation": [
      "Yklwa, +2",
      "Ghost Lantern",
      "Scorpion Armor"
    ],
    "Tryanny of Dragons": [
      "Dragontooth Dagger",
      "Wand of Winter"
    ],
    "Waterdeep: Dungeon of the Mad Mage": [
      "Dodecahedron of Doom",
      "Horn of the Endless Maze",
      "Professor Orb",
      "Dagger of Blindsight"
    ],
    "The Book of Many Things": [
      "Grasping Whip",
      "Wraps of Unarmed Prowess, +2",
      "Bow of Conflagration",
      "Breastplate of Balance",
      "Deck of Oracles",
      "Donjon's Sundering Sphere",
      "Fate Dealer's Deck, +1",
      "Feywrought Armor",
      "Glimmering Moonbow",
      "Gloomwrought Armor",
      "Rogue's Mantle",
      "Ruinous Flail",
      "Sage's Signet (Serpent)",
      "Sage's Signet (Songbird)",
      "Shrieking Greaves",
      "Starshot Crossbow",
      "Sun Staff",
      "Voidwalker Armor",
      "Warrior's Passkey"
    ],
    "Lairs of Etharis": [
      "Arcane Oil",
      "Lycan Weapon",
      "Lycanthropy Antidote",
      "Ready Gunk",
      "Coat of Lies",
      "Glass-Studded Armor",
      "Knifewing Cape"
    ],
    "Dungeons of Drakkenheim": [
      "Aqua Delerium",
      "Aqua Expurgo",
      "Bottled Comet",
      "Delerium-Forged Blade",
      "Hardened Delerium-tipped Arrows",
      "Refined Delerium Dust",
      "Chancellor's Crest",
      "Delerium Crystal Focus",
      "Helm of Patron Saints",
      "Lord Commander's Badge",
      "Saint Vitruvio's Phylactery",
      "Sceptre of Saint Vitruvio",
      "Skymetal Staff",
      "Starcrossed Bow",
      "Steward's Seal",
      "The Shield of Sacred Flame"
    ],
    "Tasha's Cauldron of Everything": [
      "Alchemical Compendium",
      "Astral Shard",
      "Astromancy Archive",
      "Atlas of Endless Horizons",
      "Bell Branch",
      "Devotee's Censer",
      "Duplicitous Manuscript",
      "Elemental Essence Shard",
      "Far Realm Shard",
      "Fulminating Treatise",
      "Heart Weaver's Primer",
      "Libram of Souls And Flesh",
      "Lyre of Building",
      "Outer Essence Shard",
      "Protective Verses",
      "Reveler's Concertina",
      "Shadowfell Brand Tattoo",
      "Shadowfell Shard",
      "Planecaller's Codex",
      "All Purpose Tool, +2",
      "Amulet of the Devout, +2",
      "Arcane Grimoire, +2",
      "Barrier Tattoo 15+ 2 Dex",
      "Bloodwell Vial, +2",
      "Moon Sickle, +2",
      "Rhythm Maker's Drum, +2"
    ],
    "Baldur's Gate: Descent into Avernus": [
      "Gauntlets of Flaming Fury"
    ],
    "Curse of Strahd": [
      "Gulthias Staff",
      "Saint Markovia's Thighbone"
    ],
    "Dragonlance: Shadow of the Dragon Queen": [
      "Kagonesti Forest Shroud"
    ],
    "Eberron: Rising from the Last War": [
      "Ventilating Lungs"
    ],
    "Fizban's Treasury of Dragons": [
      "Crystal Blade",
      "Dragon Vessel (Stirring)",
      "Dragon Wing Bow",
      "Dragon's Wrath Weapon (Stirring)",
      "Dragonhide Belt, +2",
      "Dragon-Touched Focus (Stirring)",
      "Scaled Ornament (Stirring)"
    ],
    "Ghosts of Saltmarsh": [
      "Charm of Plant Command"
    ],
    "Keys from the Golden Vault": [
      "Shard of Xeluan"
    ],
    "Lost Laboratory of Kwalish": [
      "Galder's Bubble Pipe",
      "Gambler's Blade",
      "Ioun Stone of Historical Knowledge",
      "Ioun Stone of Language Knowledge",
      "Ioun Stone of Natural Knowledge",
      "Ioun Stone of Religious Knowledge",
      "Ioun Stone of Self-Preservation",
      "Ioun Stone of Supreme Intellect",
      "Leather Golem Armor"
    ],
    "Out of the Abyss": [
      "Piwafwi of Fire Resistance",
      "Spell Gem (Bloodstone)",
      "Spell Gem (Quartz)",
      "Stonespeaker Crystal",
      "Wand of Viscid Globs"
    ],
    "Princes of the Apocalypse": [
      "Claws of the Umber Hulk",
      "Weird Tank"
    ],
    "Spelljammer: Adventures in Space": [
      "Spelljamming Helm"
    ],
    "Storm King's Thunder": [
      "Banner of the Krig Rune",
      "Blod Stone",
      "Claw of the Wyrm Rune",
      "Gavel of the Venn Rune",
      "Opal of the Ild Rune",
      "Orb of the Stein Rune",
      "Rod of the Vonindod"
    ],
    "Waterdeep: Dragon Heist": [
      "Badge of the Watch",
      "Bracer of Flying Daggers",
      "Feather of Diatryma Summoning",
      "Knave's Eye Patch"
    ],
    "Wayfinder's Guide to Eberron": [
      "Docent"
    ],
    "Planescape: Adventures in the Multiverse": [
      "Mimir"
    ],
    "Humblewood Campaign Setting": [
      "Blade of the Wood",
      "Feathered Helm"
    ]
  },
  "Very Rare": {
    "Dungeon Master's Guide": [
      "Potion of Supreme Healing",
      "Potion of Invisibility",
      "Potion of Speed",
      "Spell Scroll (6th Level)",
      "Spell Scroll (7th Level)",
      "Ammunition, +3",
      "Oil of Sharpness",
      "Potion of Flying",
      "Potion of Giant Strength (Cloud Giant)",
      "Potion of Longevity",
      "Potion of Vitality",
      "Horseshoes of A Zephyr",
      "Nolzur's Marvelous Pigments",
      "Bag of Devouring",
      "Spell Scroll (8th Level)",
      "Arrow of Slaying",
      "Weapon, +3",
      "Carpet of Flying",
      "Rod of Security",
      "Shield, +3",
      "Chain Mail, +2",
      "Chain Shirt, +2",
      "Dwarven Plate",
      "Efreeti Bottle",
      "Figurine of Wondrous Power (Obsidian Steed)",
      "Horn of Valhalla (Bronze)",
      "Leather, +2",
      "Manual of Bodily Health",
      "Manual of Gainful Exercise",
      "Manual of Golems",
      "Manual of Quickness of Action",
      "Mirror of Life Trapping",
      "Scale Mail, +2",
      "Tome of Clear Thought",
      "Tome of Leadership And Influence",
      "Tome of Understanding",
      "Breastplate, +2",
      "Splint, +2",
      "Studded Leather, +2",
      "Half Plate, +2",
      "Plate, +2",
      "Armor, +2",
      "Amulet of the Planes",
      "Crystal Ball",
      "Ring of Regeneration",
      "Ring of Shooting Stars",
      "Ring of Telekinesis",
      "Robe of Scintillating Colors",
      "Robe of Stars",
      "Rod of Absorption",
      "Rod of Alertness",
      "Rod of the Pact Keeper, +3",
      "Scimitar of Speed",
      "Staff of Fire",
      "Staff of Frost",
      "Staff of Power",
      "Staff of Striking",
      "Staff of Thunder And Lightning",
      "Sword of Sharpness",
      "Wand of Polymorph",
      "Wand of the War Mage, +3",
      "Animated Shield",
      "Belt of Giant Strength (Fire Giant)",
      "Belt of Giant Strength (Frost Or Stone Giant)",
      "Candle of Invocation",
      "Cloak of Arachnida",
      "Dancing Sword",
      "Demon Armor",
      "Dragon Scale Mail",
      "Dwarven Thrower",
      "Frost Brand",
      "Helm of Brilliance",
      "Instrument of the Bard (Anstruth Harp)",
      "Ioun Stone (Absorption)",
      "Ioun Stone (Agility)",
      "Ioun Stone (Fortitude)",
      "Ioun Stone (Insight)",
      "Ioun Stone (Intellect)",
      "Ioun Stone (Leadership)",
      "Ioun Stone (Strength)",
      "Nine Lives Stealer",
      "Oathbow",
      "Spellguard Shield"
    ],
    "Tasha's Cauldron of Everything": [
      "Reincarnation Dust",
      "All Purpose Tool, +3",
      "Amulet of the Devout, +3",
      "Arcane Grimoire, +3",
      "Barrier Tattoo 18Ac",
      "Bloodwell Vial, +3",
      "Moon Sickle, +3",
      "Rhythm Maker's Drum, +3",
      "Absorbing Tattoo",
      "Cauldron of Rebirth",
      "Crystalline Chronicle",
      "Ghost Step Tattoo",
      "Lifewell Tattoo",
      "Orb of the Veil"
    ],
    "Explorer's Guide to Wildemount": [
      "Arcane Cannon",
      "Dispelling Stone",
      "Last Stand Armor",
      "Potion of Possibility",
      "Bloodaxe",
      "Duskcrusher",
      "Hunter's Coat",
      "Staff of Dunamancy"
    ],
    "Acquisitions Incorporated": [
      "Living Loot Satchel (rank 4)",
      "Occultant Abacus (rank 4)",
      "Portfolio Keeper (rank 4)",
      "Whisper Jar (rank 4)",
      "Chronolometer",
      "Dimensional Loop",
      "Far Gear",
      "Rotor of Return",
      "Timepiece of Travel",
      "Wheel of Stars"
    ],
    "Against the Giant": [
      "Potion of Mind Control (Monster)"
    ],
    "Bigby Presents: Glory of the Giants": [
      "Prehistoric Figurines of Wondrous Power (Carnelian Triceratops)",
      "Thunderbuss",
      "Armor of Safeguarding",
      "Bloodshed Blade",
      "Elven Thrower",
      "Lucent Destroyer",
      "Mistral Mantle",
      "Nimbus Coronet",
      "Ring of Amity",
      "Sanctum Amulet",
      "Wyrmreaver Gauntlets"
    ],
    "Eberron: Rising from the Last War": [
      "Speaking Stone",
      "Arcane Propulsion Arm",
      "Dyrrn's Tentacle Whip",
      "Kyrzin's Ooze",
      "Living Armor"
    ],
    "Icewind Dale: Rime of the Frostmaiden": [
      "Abracadabrus"
    ],
    "Mythis Odysseys of Theros": [
      "Sling Bullets of Althemone"
    ],
    "Princes of the Apocalypse": [
      "Devastation Orb"
    ],
    "Spelljammer: Adventures in Space": [
      "Fish Suit"
    ],
    "Tal’dorei Campaign Setting Reborn": [
      "Cataclysm Bolts",
      "Mirror of Infinite Transpondence",
      "Raven's Slumber",
      "Boots of Haste",
      "Corecut Dagger",
      "Tinkertop Boltblaster 1000"
    ],
    "The Wild Beyond the Witchlight": [
      "Ornithopter of Flying",
      "Bobbing Lily Pad",
      "Eldritch Staff",
      "Steel"
    ],
    "Tomb of Annihilation": [
      "Yklwa, +3",
      "Amulet of the Black Skull"
    ],
    "The Book of Many Things": [
      "Baleful Talon",
      "Bloodseeker Ammunition",
      "Deck of Wild Cards",
      "Forcebreaker Weapon",
      "Wraps of Unarmed Prowess, +3",
      "Antimagic Armor, Any",
      "Bow of Melodies",
      "Clockwork Armor",
      "Crown of Whirling Comets",
      "Deck of Dimensions",
      "Fate Cutter Shears",
      "Fate Dealer's Deck, +2",
      "Fool's Blade",
      "Hammer of Runic Focus",
      "Rod of Hellish Flames",
      "Sage's Signet (Bear)",
      "Sage's Signet (Hart)",
      "Sage's Signet (Lion)",
      "Sage's Signet (Wolf)",
      "Skull Helm",
      "Stonemaker War Pick",
      "Tidecaller Trident",
      "Weapon of Throne's Command"
    ],
    "Lairs of Etharis": [
      "Lindwyrm Venom",
      "Brazen Armor"
    ],
    "Dungeons of Drakkenheim": [
      "Hazewalker Plate",
      "Comet Smasher"
    ],
    "Baldur's Gate: Descent into Avernus": [
      "Battle Standard of Infernal Power",
      "Helm of Devil Command"
    ],
    "Candlekeep Mysteries": [
      "Staff of Fate",
      "Watchful Helm"
    ],
    "Cricital Role: Call of the Netherdeep": [
      "Ring of Red Fury",
      "Ruidium Armor",
      "Ruidium Shield",
      "Ruidium Weapon"
    ],
    "Dragonlance: Shadow of the Dragon Queen": [
      "Flying Citadel Helm",
      "Mirror of Reflected Pasts"
    ],
    "Fizban's Treasury of Dragons": [
      "Amethyst Lodestone",
      "Dragon Vessel (Wakened)",
      "Dragon's Wrath Weapon (Wakened)",
      "Dragonhide Belt, +3",
      "Dragon-Touched Focus (Wakened)",
      "Sapphire Buckler",
      "Scaled Ornament (Wakened)"
    ],
    "Guildmasters' Guide to Ravnica": [
      "Dimir Keyrune",
      "Golgari Keyrune",
      "Illusionist's Bracers",
      "Peregrine Mask",
      "Sword of the Paruns",
      "Voyager Staff"
    ],
    "Infernal Machine Rebuild": [
      "Ioun Stone of Vitality"
    ],
    "Keys from the Golden Vault": [
      "Constantori's Portrait"
    ],
    "Lost Laboratory of Kwalish": [
      "Blade of the Medusa",
      "Heward's Hireling Armor",
      "Polymorph Blade"
    ],
    "Out of the Abyss": [
      "Spell Gem (Amber)",
      "Spell Gem (Jade)",
      "Spell Gem (Topaz)"
    ],
    "Phandelver and Below: The Shattered Obelisk": [
      "Cape of Enlargement",
      "Mindblasting Cap",
      "Mindguard Crown",
      "Mudslick Tower"
    ],
    "Storm King's Thunder": [
      "Conch of Teleportation",
      "Ingot of the Skold Rune",
      "Navigation Orb",
      "Pennant of the Vind Rune",
      "Shard of the Ise Rune"
    ],
    "The Hidden Shrine of Tamoachan": [
      "Bracelet of Rock Magic"
    ],
    "Tomb of Horrors": [
      "Javelin of Backbiting",
      "Spear of Backbiting"
    ],
    "Waterdeep: Dragon Heist": [
      "Lord's Ensemble"
    ],
    "Waterdeep: Dungeon of the Mad Mage": [
      "Blast Scepter",
      "Horned Ring",
      "Shield of the Uven Rune"
    ]
  },
  "Legendary": {
    "Dungeon Master's Guide": [
      "Potion of Giant Strength (Storm Giant)",
      "Spell Scroll (9th Level)",
      "Universal Solvent",
      "Sovereign Glue",
      "Chain Mail, +3",
      "Chain Shirt, +3",
      "Leather, +3",
      "Studded Leather, +3",
      "Breastplate, +3",
      "Splint, +3",
      "Half Plate, +3",
      "Plate, +3",
      "Armor, +3",
      "Iron Flask",
      "Well of Many Worlds",
      "Apparatus of Kwalish",
      "Cubic Gate",
      "Deck of Many Things",
      "Horn of Valhalla (Iron)",
      "Ring of Three Wishes",
      "Sphere of Annihilation",
      "Defender",
      "Hammer of Thunderbolts",
      "Luck Blade",
      "Sword of Answering",
      "Holy Avenger",
      "Ring of Invisibility",
      "Ring of Spell Turning",
      "Rod of Lordly Might",
      "Staff of the Magi",
      "Vorpal Sword",
      "Belt of Giant Strength (Cloud Giant)",
      "Cloak of Invisibility",
      "Crystal Ball of Mind Reading",
      "Crystal Ball of Telepathy",
      "Crystal Ball of True Seeing",
      "Robe of the Archmagi",
      "Rod of Resurrection",
      "Scarab of Protection",
      "Armor of Invulnerability",
      "Belt of Giant Strength (Storm Giant)",
      "Efreeti Chain",
      "Instrument of the Bard (Ollamh Harp)",
      "Ioun Stone (Greater Absorption)",
      "Ioun Stone (Mastery)",
      "Ioun Stone (Regeneration)",
      "Plate Armor of Etherealness",
      "Ring of Air Elemental Command",
      "Ring of Djinni Summoning",
      "Ring of Earth Elemental Command",
      "Ring of Fire Elemental Command",
      "Ring of Water Elemental Command",
      "Talisman of Pure Good",
      "Talisman of the Sphere",
      "Talisman of Ultimate Evil",
      "Tome of the Stilled Tongue",
      "Axe of the Dwarvish Lords",
      "Book of Exalted Deeds",
      "Book of Vile Darkness",
      "Eye And Hand of Vecna",
      "Orb of Dragonkind",
      "Sword of Kas",
      "Wand of Orcus",
      "Whelm",
      "Moonblade",
      "Blackrazor",
      "Wave"
    ],
    "Explorer's Guide to Wildemount": [
      "Luxon Beacon",
      "Nightfall Pearl",
      "Spell Bottle",
      "Danoth's Visor",
      "Grimoire Infinitus",
      "Hide of the Feral Guardian",
      "Infiltrator's Key",
      "Stormgirdle",
      "Verminshroud",
      "Wreath of the Prism"
    ],
    "Baldur's Gate: Descent into Avernus": [
      "Obsidian Flint Dragon Plate",
      "Fane-Eater",
      "Matalotok",
      "Shield of the Hidden Lord",
      "Blade of Avernus",
      "Sword of Zariel"
    ],
    "Bigby Presents: Glory of the Giants": [
      "Prehistoric Figurines of Wondrous Power (Jasper Tyrannosaurus Rex)",
      "Longbow of the Healing Hearth",
      "Orb of Skoraeus",
      "Reaper’s Scream",
      "Shield of the Blazing Dreadnought",
      "Stonebreaker’s Breastplate",
      "Adze of Annam",
      "Bigby’s Beneficent Bracelet",
      "Harp of Gilded Plenty",
      "Helm of Perfect Potential"
    ],
    "Candlekeep Mysteries": [
      "Nether Scroll of Azumar",
      "Gloves of Soul Catching"
    ],
    "Fizban's Treasury of Dragons": [
      "Gold Canary Figurine of Wondrous Power",
      "Potion of Dragon's Majesty",
      "Dragon Vessel (Ascendant)",
      "Dragon’s Wrath Weapon (Ascendant)",
      "Dragonlance",
      "Dragon-Touched Focus (Ascendant)",
      "Flail of Tiamat",
      "Platinum Scarf",
      "Ruby Weave Gem",
      "Scaled Ornament (Ascendant)",
      "Topaz Annihilator"
    ],
    "Icewind Dale: Rime of the Frostmaiden": [
      "Scroll of Tarrasque Summoning",
      "Scroll of the Comet",
      "Ythryn Mythallar"
    ],
    "Journeys through the Radiant Citadel": [
      "Hammock of Worlds"
    ],
    "Legendary Magic Items": [
      "Hither-Thither Staff",
      "Red Wizard Blade",
      "Tablet of Reawakening",
      "Helm of Disjunction",
      "Horn of Beckoning Death"
    ],
    "Lost Laboratory of Kwalish": [
      "Deck of Several Things",
      "Powered Armor"
    ],
    "Mythis Odysseys of Theros": [
      "Pyxis of Pandemonium",
      "Akmon, Hammer of Purphoros",
      "Dekella, Bident of Thassa",
      "Ephixis, Bow of Nylea",
      "Khrusor, Spear of Heliod",
      "Mastix, Whip of Erebos"
    ],
    "Storm King's Thunder": [
      "Potion of Giant Size",
      "Gurt’s Greataxe",
      "Korolnor Scepter",
      "Wyrmskull Throne"
    ],
    "The Book of Many Things": [
      "Deck of Many More Things",
      "Telescopic Transporter",
      "Euryale’s Aegis",
      "Fate Dealer’s Deck, +3",
      "Jester’s Mask",
      "Spindle of Fate",
      "Sword of the Planes"
    ],
    "Tasha's Cauldron of Everything": [
      "Blood Fury Tattoo",
      "Baba Yaga's Mortar And Pestle",
      "Crook of Rao",
      "Demonomicon of Iggwilv",
      "Luba's Tarokka of Souls",
      "Mighty Servant of Leuk-O",
      "Teeth of Dahlver-Nar"
    ],
    "Against the Giant": [
      "Waythe"
    ],
    "Cricital Role: Call of the Netherdeep": [
      "Jewel of Three Prayers"
    ],
    "Curse of Strahd": [
      "Holy Symbol of Ravenkind",
      "Icon of Ravenloft",
      "Sunsword",
      "Crusader’s Shortsword",
      "Shield of the Silver Dragon"
    ],
    "Eberron: Rising from the Last War": [
      "Belashyrra’s Beholder Crown"
    ],
    "Guildmasters' Guide to Ravnica": [
      "Rakdos Riteknife"
    ],
    "Infernal Machine Rebuild": [
      "Ruinblade",
      "The Infernal Machine of Lum the Mad"
    ],
    "Keys from the Golden Vault": [
      "Shard Solitaire",
      "Book of Vile Darkness (Variant)"
    ],
    "Monstrous Compendium Volume 2: Dragonlance Creatures": [
      "Nightbringer"
    ],
    "Mordenkainen Presents: Monsters of the Multiverse": [
      "Infernal Track"
    ],
    "Out of the Abyss": [
      "Dawnbringer",
      "Spell Gem (Diamond)",
      "Spell Gem (Ruby)",
      "Spell Gem (Star Ruby)"
    ],
    "Princes of the Apocalypse": [
      "Drown",
      "Ironfang",
      "Lost Crown of Besilmer",
      "Orcsplitter",
      "Tinderstrike",
      "Windvane"
    ],
    "Spelljammer: Adventures in Space": [
      "Talarith"
    ],
    "Strixhaven: A Curriculum of Chaos": [
      "Murgaxor’s Orb"
    ],
    "Tal’dorei Campaign Setting Reborn": [
      "Agony",
      "Armor of the Valiant Soul",
      "Cabal’s Ruin",
      "Circlet of Barbed Vision",
      "Condemner",
      "Deathwalker’s Ward",
      "Fenthras",
      "Graz’tchar, the Decadent End",
      "Honor’s Last Stand",
      "Kiss of the Changebringer",
      "Mythcarver",
      "Plate of the Dawnmartyr",
      "Pyremaul",
      "Spire of Conflux",
      "Star Razor",
      "Titanstone Knuckles",
      "Whisper",
      "Wraps of Dyamak"
    ],
    "The Wild Beyond the Witchlight": [
      "Snicker-Snack",
      "Witchlight Vane",
      "Witchlight Watch",
      "Iggwilv's Cauldron"
    ],
    "Tomb of Annihilation": [
      "Bookmark",
      "Ring of Winter",
      "Staff of the Forgotten One"
    ],
    "Tryanny of Dragons": [
      "Black Dragon Mask",
      "Blue Dragon Mask",
      "Green Dragon Mask",
      "Hazirawn",
      "Red Dragon Mask",
      "White Dragon Mask",
      "Draakhorn",
      "Mask of the Dragon Queen"
    ],
    "Van Richten's Guide to Ravenloft": [
      "Nepenthe"
    ],
    "Waterdeep: Dragon Heist": [
      "Azuredge",
      "Blackstaff",
      "Dragonstaff of Ahghairon",
      "Stone of Golorr"
    ],
    "Waterdeep: Dungeon of the Mad Mage": [
      "Black Crystal Tablet",
      "Helm of the Scavenger",
      "Tearulai"
    ],
    "Dungeons of Drakkenheim": [
      "Crown of Westemar",
      "Ignacious, the Sword of Burning Truth",
      "Inscrutable Staff",
      "Spymaster's Signet",
      "Staff of Contaminated Power"
    ],
    "Humblewood Campaign Setting": [
      "The Borealus",
      "Necronomicon Ex Corvis"
    ],
    "Acquisitions Incorporated": [
      "Orrery of the Wanderer"
    ],
    "Divine Contention": [
      "Ruinstone"
    ]
  },
  "Other": {
    "Bigby Presents: Glory of the Giants": [
      "Horizon Puzzle Cube"
    ],
    "Candlekeep Mysteries": [
      "Orcus Figurine",
      "Radiance",
      "Stonky’s ring"
    ],
    "Curse of Strahd": [
      "Yester Hill Axe"
    ],
    "Divine Contention": [
      "Gnomengarde Grenade"
    ],
    "Icewind Dale: Rime of the Frostmaiden": [
      "The Codicil of White"
    ],
    "Monstrous Compendium Volume 3: Minecraft Creatures": [
      "End Crystal",
      "Ender Pearl"
    ],
    "Phandelver and Below: The Shattered Obelisk": [
      "Statuette of Augury"
    ],
    "Tryanny of Dragons": [
      "Dragongleam"
    ],
    "Wayfinder's Guide to Eberron": [
      "Revenant Double-Bladed Scimitar"
    ]
  }
}