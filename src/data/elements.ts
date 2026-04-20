export type Element = "Neutral" | "Water" | "Earth" | "Fire" | "Wind" | "Poison" | "Holy" | "Shadow" | "Ghost" | "Undead";

export interface ElementMatrix {
  [attacker: string]: {
    [defender: string]: number;
  };
}

// Elemental Multipliers for Level 1 Defenders
// Rows = Attacker Element, Cols = Defender Element
export const ELEMENT_DATA: Record<number, ElementMatrix> = {
  1: {
    Neutral: { Neutral: 100, Water: 100, Earth: 100, Fire: 100, Wind: 100, Poison: 100, Holy: 100, Shadow: 100, Ghost: 70, Undead: 100 },
    Water:   { Neutral: 100, Water: 25,  Earth: 100, Fire: 150, Wind: 90,  Poison: 100, Holy: 75,  Shadow: 100, Ghost: 100, Undead: 100 },
    Earth:   { Neutral: 100, Water: 100, Earth: 25,  Fire: 90,  Wind: 150, Poison: 100, Holy: 75,  Shadow: 100, Ghost: 100, Undead: 100 },
    Fire:    { Neutral: 100, Water: 90,  Earth: 150, Fire: 25,  Wind: 100, Poison: 100, Holy: 75,  Shadow: 100, Ghost: 100, Undead: 125 },
    Wind:    { Neutral: 100, Water: 150, Earth: 90,  Fire: 100, Wind: 25,  Poison: 100, Holy: 75,  Shadow: 100, Ghost: 100, Undead: 100 },
    Poison:  { Neutral: 100, Water: 100, Earth: 125, Fire: 125, Wind: 125, Poison: 0,   Holy: 75,  Shadow: 50,  Ghost: 100, Undead: 50  },
    Holy:    { Neutral: 100, Water: 100, Earth: 100, Fire: 100, Wind: 100, Poison: 100, Holy: 0,   Shadow: 125, Ghost: 100, Undead: 150 },
    Shadow:  { Neutral: 100, Water: 100, Earth: 100, Fire: 100, Wind: 100, Poison: 50,  Holy: 125, Shadow: 0,   Ghost: 100, Undead: 0   },
    Ghost:   { Neutral: 100, Water: 100, Earth: 100, Fire: 100, Wind: 100, Poison: 100, Holy: 75,  Shadow: 75,  Ghost: 125, Undead: 100 },
    Undead:  { Neutral: 100, Water: 100, Earth: 100, Fire: 100, Wind: 100, Poison: 50,  Holy: 100, Shadow: 0,   Ghost: 100, Undead: 0   },
  },
  2: {
    Neutral: { Neutral: 100, Water: 100, Earth: 100, Fire: 100, Wind: 100, Poison: 100, Holy: 100, Shadow: 100, Ghost: 50, Undead: 100 },
    Water:   { Neutral: 100, Water: 0,   Earth: 100, Fire: 175, Wind: 80,  Poison: 100, Holy: 50,  Shadow: 100, Ghost: 75,  Undead: 100 },
    Earth:   { Neutral: 100, Water: 100, Earth: 0,   Fire: 80,  Wind: 175, Poison: 100, Holy: 50,  Shadow: 100, Ghost: 75,  Undead: 100 },
    Fire:    { Neutral: 100, Water: 80,  Earth: 175, Fire: 0,   Wind: 100, Poison: 100, Holy: 50,  Shadow: 100, Ghost: 75,  Undead: 150 },
    Wind:    { Neutral: 100, Water: 175, Earth: 80,  Fire: 100, Wind: 0,   Poison: 100, Holy: 50,  Shadow: 100, Ghost: 75,  Undead: 100 },
    Poison:  { Neutral: 100, Water: 100, Earth: 150, Fire: 150, Wind: 150, Poison: 0,   Holy: 50,  Shadow: 25,  Ghost: 75,  Undead: 25  },
    Holy:    { Neutral: 100, Water: 100, Earth: 100, Fire: 100, Wind: 100, Poison: 125, Holy: -25, Shadow: 150, Ghost: 100, Undead: 175 },
    Shadow:  { Neutral: 100, Water: 100, Earth: 100, Fire: 100, Wind: 100, Poison: 25,  Holy: 150, Shadow: -25, Ghost: 100, Undead: -25 },
    Ghost:   { Neutral: 100, Water: 100, Earth: 100, Fire: 100, Wind: 100, Poison: 100, Holy: 50,  Shadow: 50,  Ghost: 150, Undead: 100 },
    Undead:  { Neutral: 100, Water: 100, Earth: 100, Fire: 100, Wind: 100, Poison: 25,  Holy: 100, Shadow: -25, Ghost: 100, Undead: -25 },
  },
  3: {
    Neutral: { Neutral: 100, Water: 100, Earth: 100, Fire: 100, Wind: 100, Poison: 100, Holy: 100, Shadow: 100, Ghost: 0,   Undead: 100 },
    Water:   { Neutral: 100, Water: -25, Earth: 100, Fire: 200, Wind: 70,  Poison: 100, Holy: 25,  Shadow: 100, Ghost: 50,  Undead: 100 },
    Earth:   { Neutral: 100, Water: 100, Earth: -25, Fire: 70,  Wind: 200, Poison: 100, Holy: 25,  Shadow: 100, Ghost: 50,  Undead: 100 },
    Fire:    { Neutral: 100, Water: 70,  Earth: 200, Fire: -25, Wind: 100, Poison: 100, Holy: 25,  Shadow: 100, Ghost: 50,  Undead: 175 },
    Wind:    { Neutral: 100, Water: 200, Earth: 70,  Fire: 100, Wind: -25, Poison: 100, Holy: 25,  Shadow: 100, Ghost: 50,  Undead: 100 },
    Poison:  { Neutral: 100, Water: 100, Earth: 175, Fire: 175, Wind: 175, Poison: 0,   Holy: 25,  Shadow: 0,   Ghost: 50,  Undead: 0   },
    Holy:    { Neutral: 100, Water: 100, Earth: 100, Fire: 100, Wind: 100, Poison: 150, Holy: -50, Shadow: 175, Ghost: 100, Undead: 200 },
    Shadow:  { Neutral: 100, Water: 100, Earth: 100, Fire: 100, Wind: 100, Poison: 0,   Holy: 175, Shadow: -50, Ghost: 100, Undead: -50 },
    Ghost:   { Neutral: 100, Water: 100, Earth: 100, Fire: 100, Wind: 100, Poison: 100, Holy: 25,  Shadow: 25,  Ghost: 175, Undead: 100 },
    Undead:  { Neutral: 100, Water: 100, Earth: 100, Fire: 100, Wind: 100, Poison: 0,   Holy: 100, Shadow: -50, Ghost: 100, Undead: -50 },
  },
  4: {
    Neutral: { Neutral: 100, Water: 100, Earth: 100, Fire: 100, Wind: 100, Poison: 100, Holy: 100, Shadow: 100, Ghost: 0,   Undead: 100 },
    Water:   { Neutral: 100, Water: -50, Earth: 100, Fire: 200, Wind: 60,  Poison: 100, Holy: 0,   Shadow: 100, Ghost: 25,  Undead: 100 },
    Earth:   { Neutral: 100, Water: 100, Earth: -50, Fire: 60,  Wind: 200, Poison: 100, Holy: 0,   Shadow: 100, Ghost: 25,  Undead: 100 },
    Fire:    { Neutral: 100, Water: 60,  Earth: 200, Fire: -50, Wind: 100, Poison: 100, Holy: 0,   Shadow: 100, Ghost: 25,  Undead: 200 },
    Wind:    { Neutral: 100, Water: 200, Earth: 60,  Fire: 100, Wind: -50, Poison: 100, Holy: 0,   Shadow: 100, Ghost: 25,  Undead: 100 },
    Poison:  { Neutral: 100, Water: 100, Earth: 200, Fire: 200, Wind: 200, Poison: 0,   Holy: 0,   Shadow: -25, Ghost: 25,  Undead: -25 },
    Holy:    { Neutral: 100, Water: 100, Earth: 100, Fire: 100, Wind: 100, Poison: 175, Holy: -100,Shadow: 200, Ghost: 100, Undead: 200 },
    Shadow:  { Neutral: 100, Water: 100, Earth: 100, Fire: 100, Wind: 100, Poison: -25, Holy: 200, Shadow: -100,Ghost: 100, Undead: -100},
    Ghost:   { Neutral: 100, Water: 100, Earth: 100, Fire: 100, Wind: 100, Poison: 100, Holy: 0,   Shadow: 0,   Ghost: 200, Undead: 100 },
    Undead:  { Neutral: 100, Water: 100, Earth: 100, Fire: 100, Wind: 100, Poison: -25, Holy: 100, Shadow: -100,Ghost: 100, Undead: -100},
  }
};

export const ELEMENTS: Element[] = ["Neutral", "Water", "Earth", "Fire", "Wind", "Poison", "Holy", "Shadow", "Ghost", "Undead"];
