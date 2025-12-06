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
    ],
    food: [
      "A pizza topping",
      "A breakfast food",
      "A dessert",
      "A vegetable",
      "A fruit",
      "Something spicy",
      "A snack food",
    ],
    entertainment: [
      "A TV show",
      "A movie",
      "A book",
      "A video game",
      "A sport",
      "A musical instrument",
    ],
    time: [
      "A day of the week",
      "A month",
      "A season",
      "A holiday",
      "A time of day",
    ],
    objects: [
      "Something besides a door that you can open with a key",
      "Something you can collect",
      "Something you use in the winter",
      "Something you can eat with a spoon",
      "A shoe brand",
      "A room in a house",
    ],
    body: [
      "A body part",
      "A body part that is hard",
      "A body part you can move",
    ],
    places: [
      "A city in Texas",
      "A state that starts with M",
      "A country",
      "A place to visit",
    ],
    jobs: [
      "A high-paying job",
      "A creative job",
      "A job that helps people",
    ],
    misc: [
      "Something you can wear",
      "Something that makes you happy",
      "Something you're afraid of",
      "Something you do on weekends",
    ],
  };

  const allCategories = Object.values(categories).flat();
  
  // Generate 110 cards
  for (let i = 0; i < 110; i++) {
    const front: string[] = [];
    const back: string[] = [];
    
    // Randomly select 4 categories for front
    const frontIndices = new Set<number>();
    while (frontIndices.size < 4) {
      frontIndices.add(Math.floor(Math.random() * allCategories.length));
    }
    front.push(...Array.from(frontIndices).map(idx => allCategories[idx]));
    
    // Randomly select 4 different categories for back
    const backIndices = new Set<number>();
    while (backIndices.size < 4) {
      const idx = Math.floor(Math.random() * allCategories.length);
      if (!frontIndices.has(idx)) {
        backIndices.add(idx);
      }
    }
    back.push(...Array.from(backIndices).map(idx => allCategories[idx]));
    
    cards.push({
      id: i + 1,
      front,
      back,
    });
  }
  
  return cards;
};

export const CARDS = generateCards();

