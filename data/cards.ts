/**
 * Card data for Top of Mind game.
 * Each card has two sides (front and back), each with 4 categories/phrases.
 * Total: 110 cards with 440 categories (4 per side, 2 sides per card).
 */

export interface Card {
  id: number;
  front: string[];
  back: string[];
}

/**
 * Sample card data - in a real implementation, this would contain all 110 cards.
 * For now, we'll create a generator that creates diverse categories.
 */
export const generateCards = (): Card[] => {
  const cards: Card[] = [];

  // Categories pool for generating diverse cards
  const categories = {
    animals: [
      "A farm animal",
      "A wild animal",
      "A pet",
      "An animal that lives in water",
      "An animal that can fly",
      "A dangerous animal",
      "A tiny animal",
      "A fast animal",
      "A slow animal",
      "An animal with stripes",
      "An animal that lives in the jungle",
      "An animal that lives in cold climates",
      "An animal with horns",
      "An animal with a shell",
      "An animal that hunts",
      "A nocturnal animal",
      "A colorful animal",
      "A reptile",
      "An amphibian",
      "An animal with claws",
    ],
    food: [
      "A pizza topping",
      "A breakfast food",
      "A dessert",
      "A vegetable",
      "A fruit",
      "Something spicy",
      "A snack food",
      "A type of pasta",
      "A type of soup",
      "A dairy product",
      "A type of bread",
      "A drink",
      "A type of candy",
      "A food you eat on holidays",
      "A type of meat",
      "A dish served cold",
      "A dish served hot",
      "A Filipino food",
      "A Japanese food",
      "A street food",
      "A comfort food",
      "A seafood dish",
      "A type of sauce",
      "A food you can grill",
      "A food made with rice",
    ],
    entertainment: [
      "A TV show",
      "A movie",
      "A book",
      "A video game",
      "A sport",
      "A musical instrument",
      "A board game",
      "A cartoon character",
      "A hobby",
      "A famous actor",
      "A famous singer",
      "A comedian",
      "An anime",
      "A manga",
      "A YouTuber",
      "A streaming service",
      "A concert venue",
      "A fictional place",
    ],
    time: [
      "A day of the week",
      "A month",
      "A season",
      "A holiday",
      "A time of day",
      "A decade",
      "A year in history",
      "A special event",
      "A historical era",
      "A time measurement",
    ],
    objects: [
      "Something besides a door that you can open with a key",
      "Something you can collect",
      "Something you use in the winter",
      "Something you can eat with a spoon",
      "A shoe brand",
      "A room in a house",
      "Something you plug in",
      "Something that uses batteries",
      "Something found in a backpack",
      "Something found in a kitchen",
      "Something made of metal",
      "Something made of wood",
      "Something round",
      "Something that floats",
      "A tool",
      "Something sharp",
      "Something soft",
      "Something heavy",
      "Something with wheels",
      "A cleaning item",
      "A school supply",
      "A type of container",
      "Something you lock",
      "Something that lights up",
      "Something breakable",
      "Something expensive",
      "Something disposable",
    ],
    body: [
      "A body part",
      "A body part that is hard",
      "A body part you can move",
      "A body part with hair",
      "A body part that comes in pairs",
      "A body part in the face",
      "A bone in the body",
      "A muscle group",
    ],
    places: [
      "A city in Texas",
      "A state that starts with M",
      "A country",
      "A place to visit",
      "A continent",
      "A place where you relax",
      "A place that is usually crowded",
      "A famous landmark",
      "A type of store",
      "A place you'd go on vacation",
      "A cold place",
      "A warm place",
      "A place in nature",
      "A place you need a ticket to enter",
    ],
    jobs: [
      "A high-paying job",
      "A creative job",
      "A job that helps people",
      "A job you need a degree for",
      "A job you can do from home",
      "A job that works at night",
      "A job that requires traveling",
      "A job in healthcare",
      "A job in tech",
      "A job kids often dream of",
    ],
    misc: [
      "Something you can wear",
      "Something that makes you happy",
      "Something you're afraid of",
      "Something you do on weekends",
      "Something you write with",
      "Something that smells good",
      "Something that makes noise",
      "Something you shouldn't touch",
      "Something valuable",
      "Something that moves",
      "Something you throw",
      "Something soft",
      "Something heavy",
      "Something light",
      "A reason to celebrate",
      "A mode of transportation",
      "Something in your pocket",
      "Something recyclable",
      "Something you bring to a party",
      "Something that melts",
      "Something you lose often",
      "Something in the sky",
      "A color",
      "A shape",
      "A number",
      "A feeling",
      "A skill",
      "Something futuristic",
      "Something old-fashioned",
      "Something you buy online",
    ],
    nature: [
      "A type of tree",
      "A type of flower",
      "A type of rock",
      "A type of weather",
      "A natural disaster",
      "A type of cloud",
      "A landscape",
      "A type of plant",
      "A type of bird",
      "A freshwater animal",
      "A saltwater animal",
    ],
    technology: [
      "A type of computer",
      "A phone brand",
      "An app you use daily",
      "A social media platform",
      "A gadget",
      "Something that uses WiFi",
      "Something with a screen",
      "A programming language",
      "A type of robot",
      "A tech brand",
      "A type of camera",
      "A gaming console",
    ],
    emotions: [
      "An emotion you feel at work",
      "An emotion you feel when stressed",
      "An emotion you feel when happy",
      "An emotion kids feel often",
      "A feeling you hide",
      "A feeling you love",
      "A feeling you hate",
    ],
    transportation: [
      "A land vehicle",
      "A water vehicle",
      "An air vehicle",
      "A vehicle brand",
      "A type of car",
      "Something with an engine",
      "Something without an engine",
      "A vehicle used for work",
    ],
    clothing: [
      "A type of hat",
      "A type of pants",
      "A type of shirt",
      "A type of shoe",
      "A clothing accessory",
      "Something worn in summer",
      "Something worn in winter",
      "A brand of clothing",
    ],
    science: [
      "A planet",
      "A star",
      "A scientific field",
      "A famous scientist",
      "A chemical element",
      "A body system",
      "A type of energy",
      "A type of experiment",
    ],
    school: [
      "A school subject",
      "A type of exam",
      "A classroom item",
      "A type of homework",
      "A school event",
      "A type of degree",
      "Something found in a library",
    ],
    games: [
      "A mobile game",
      "A PC game",
      "A board game",
      "A card game",
      "A puzzle game",
      "A game genre",
      "A playground activity",
    ],
  };

  const allCategories = Object.values(categories).flat();

  // Track which category indices have been used across all cards
  const usedCategoryIndices = new Set<number>();

  // Generate 110 cards
  for (let i = 0; i < 110; i++) {
    const front: string[] = [];
    const back: string[] = [];

    // Get available category indices (not yet used)
    const availableIndices = Array.from(
      { length: allCategories.length },
      (_, idx) => idx
    ).filter((idx) => !usedCategoryIndices.has(idx));

    // Shuffle available indices for random selection
    const shuffledAvailable = [...availableIndices].sort(
      () => Math.random() - 0.5
    );

    // If we have enough unused categories, use only those
    // Otherwise, we'll need to reuse (but prioritize unused ones)
    const useOnlyUnused = shuffledAvailable.length >= 8;

    // Randomly select 4 categories for front
    const frontIndices = new Set<number>();
    const indicesToChooseFrom = useOnlyUnused
      ? shuffledAvailable
      : Array.from({ length: allCategories.length }, (_, idx) => idx).sort(
          () => Math.random() - 0.5
        );

    for (const idx of indicesToChooseFrom) {
      if (frontIndices.size >= 4) break;
      if (useOnlyUnused || !usedCategoryIndices.has(idx)) {
        frontIndices.add(idx);
        usedCategoryIndices.add(idx);
      }
    }

    // Fill remaining slots if needed (shouldn't happen with useOnlyUnused, but safety check)
    while (frontIndices.size < 4) {
      const idx = Math.floor(Math.random() * allCategories.length);
      if (!frontIndices.has(idx)) {
        frontIndices.add(idx);
        usedCategoryIndices.add(idx);
      }
    }
    front.push(...Array.from(frontIndices).map((idx) => allCategories[idx]));

    // Randomly select 4 different categories for back
    const backIndices = new Set<number>();
    const backIndicesToChooseFrom = useOnlyUnused
      ? shuffledAvailable.filter((idx) => !frontIndices.has(idx))
      : Array.from({ length: allCategories.length }, (_, idx) => idx)
          .filter((idx) => !frontIndices.has(idx))
          .sort(() => Math.random() - 0.5);

    for (const idx of backIndicesToChooseFrom) {
      if (backIndices.size >= 4) break;
      if (useOnlyUnused || !usedCategoryIndices.has(idx)) {
        backIndices.add(idx);
        usedCategoryIndices.add(idx);
      }
    }

    // Fill remaining slots if needed
    while (backIndices.size < 4) {
      const idx = Math.floor(Math.random() * allCategories.length);
      if (!frontIndices.has(idx) && !backIndices.has(idx)) {
        backIndices.add(idx);
        usedCategoryIndices.add(idx);
      }
    }
    back.push(...Array.from(backIndices).map((idx) => allCategories[idx]));

    cards.push({
      id: i + 1,
      front,
      back,
    });
  }

  return cards;
};

export const CARDS = generateCards();
