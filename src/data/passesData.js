export const EARLY_BOOKING_DISCOUNT_PERCENT = 15;

export function getDiscountedPassPrice(price) {
  return Math.round(price * (1 - EARLY_BOOKING_DISCOUNT_PERCENT / 100));
}

export const PASSES_DATA = {
  general: {
    key: "general",
    id: "pass-general",
    name: "General Pass",
    price: 100,
    code: "GEN-SOT-2026",
    deck: "Back Seating Access",
    link: "..",
    features: [
      "Full auditorium access",
      "All talks",
      "Back Seating",
      "Refreshments",
      "Key Rings"
    ],
    noteTitle: "Who can purchase?",
    noteText: "Open for all attendees."
  },
  gold: {
    key: "gold",
    id: "pass-gold",
    name: "Gold Pass",
    price: 1699,
    code: "GOLD-SOT-2026",
    deck: "Middle Seating Access",
    link: "..",
    features: [
      "Full auditorium access",
      "All talks",
      "Middle Seating",
      "Diary & Pen",
      "Meal + Refreshment"
    ],
    noteTitle: "Eligibility",
    noteText: "Open for all attendees seeking enhanced seating and perks."
  },
  platinum: {
    key: "platinum",
    id: "pass-platinum",
    name: "Platinum Pass",
    price: 2099,
    code: "PLAT-SOT-2026",
    deck: "Front-Row Access",
    link: "..",
    features: [
      "Full auditorium access",
      "All talks",
      "Front-row seating",
      "TEDx kit",
      "Meal + Refreshment",
      "Meet & Greet with speakers"
    ],
    noteTitle: "Eligibility",
    noteText: "Limited availability for premium experience seekers."
  }
};

export const STORE_PAGE_CONTENT = {
  metaTitle: 'Buy Passes | TEDx Integral',
  metaDescription: 'Secure your seats for the TEDx Integral conference. Compare passes, view event details, and book your tickets to experience ideas worth spreading.'
};

export const FACULTY_PASS = {
  key: "faculty",
  id: "pass-faculty",
  name: "Faculty Pass",
  price: 2599,
  code: "FAC-SOT-2026",
  deck: "VIP Access",
  link: "..",
  features: [
    "Full auditorium access",
    "All talks",
    "VIP seating",
    "TEDx kit",
    "Meal + Refreshment",
    "Meet & Greet with speakers"
  ],
  noteTitle: "Eligibility",
  noteText: "Reserved for faculty members and VIP guests."
}