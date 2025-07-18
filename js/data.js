// Crossword puzzle data structure
// Each entry: { answer, clue, row, col, direction, number }
// Black squares: grid array with nulls for black cells

export const GRID_SIZE = 19;

export const puzzle = {
  words: [
    { answer: "JEUX", clue: "Sport national", row: 10, col: 1, direction: "across", number: 1 },
    { answer: "SUTOM", clue: "Gymnastique matinale", row: 4, col: 4, direction: "across", number: 2 },
    { answer: "KIRI", clue: "Carré blanc sur fond blanc", row: 5, col: 4, direction: "across", number: 3 },
    { answer: "CHAUSSETTE", clue: "A motif ou rien", row: 9, col: 2, direction: "across", number: 4 },
    { answer: "SECHECHEVEUX", clue: "Souffle rassurant", row: 12, col: 5, direction: "across", number: 5 },
    { answer: "ORDINATEUR", clue: "Ton premier amour", row: 13, col: 3, direction: "across", number: 6 },
    { answer: "TERRASSE", clue: "Passe temps commun", row: 14, col: 6, direction: "across", number: 7 },
    { answer: "TONG", clue: "Star de la fashion week", row: 7, col: 8, direction: "across", number: 8 },
    { answer: "MONTROUGE", clue: "On dirait le sud", row: 6, col: 9, direction: "across", number: 9 },
    { answer: "DENT", clue: "Sagesse inutile", row: 15, col: 8, direction: "across", number: 10 },
    { answer: "BONNET", clue: "Se porte en gang en hiver", row: 4, col: 12, direction: "across", number: 11 },
    { answer: "BOLO", clue: "Plat signature", row: 11, col: 12, direction: "across", number: 12 },
    { answer: "ASPERGE", clue: "Verdure 5*", row: 1, col: 16, direction: "down", number: 13 },
    { answer: "IPO", clue: "Même pas en rêve", row: 2, col: 13, direction: "down", number: 14 },
    { answer: "RACOON", clue: "Animal totem", row: 2, col: 10, direction: "down", number: 15 },
    { answer: "OUI", clue: "Sms le plus utilisé", row: 3, col: 5, direction: "down", number: 16 },
    { answer: "TRAINS", clue: "Always the summers are slipping away", row: 4, col: 6, direction: "down", number: 17 },
    { answer: "TONG", clue: "Star de la fashion week", row: 7, col: 8, direction: "down", number: 18 },
    { answer: "TREILHARD", clue: "Point de départ", row: 7, col: 8, direction: "down", number: 19 },
    { answer: "DAX", clue: "On aime y rater son train", row: 8, col: 4, direction: "down", number: 20 },
    { answer: "RALER", clue: "Sport national", row: 9, col: 14, direction: "down", number: 21 },
    { answer: "OCEAN", clue: "Passion salée", row: 11, col: 10, direction: "down", number: 22 }
  ]
};




// -------------------
// Previous puzzle data
// -------------------
/*
export const puzzle = {
  words: [
    { answer: "APPLE", clue: "Fruit that keeps the doctor away", row: 0, col: 0, direction: "across", number: 1 },
    { answer: "PEAR", clue: "Green fruit, often bell-shaped", row: 2, col: 0, direction: "across", number: 4 },
    { answer: "ORANGE", clue: "Citrus fruit and a color", row: 4, col: 0, direction: "across", number: 7 },
    { answer: "BANANA", clue: "Long yellow fruit", row: 6, col: 0, direction: "across", number: 10 },
    { answer: "GRAPE", clue: "Small fruit, used for wine", row: 8, col: 0, direction: "across", number: 13 },
    { answer: "LEMON", clue: "Sour yellow citrus fruit", row: 0, col: 2, direction: "down", number: 2 },
    { answer: "LIME", clue: "Small green citrus fruit", row: 0, col: 4, direction: "down", number: 3 },
    { answer: "DATE", clue: "Sweet fruit from a palm", row: 0, col: 6, direction: "down", number: 5 },
  ],
  // Black squares: 2D array, null = black, '' = empty, number = clue number
  // For simplicity, we will generate the grid in logic.js
};
*/ 


