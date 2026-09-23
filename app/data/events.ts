export type NoxenEvent = {
  id: number;
  title: string;
  club: string;
  city: string;
  location: string;
  genre: string;
  crowd: string;
  energy: string;
  heatScore: number;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  lineup: string[];
  description: string;
};

export const noxenEvents: NoxenEvent[] = [
  {
    id: 1,
    title: "BLACKROOM",
    club: "Bootshaus",
    city: "Köln",
    location: "Aachener Straße 12, Köln",
    genre: "Techno",
    crowd: "1.2K",
    energy: "98%",
    heatScore: 98,
    date: "2026-08-15",
    startTime: "23:00",
    endTime: "06:00",
    price: 15,
    lineup: ["Klanglos", "NOVA", "VYBE"],
    description:
      "Eine Nacht voller Peak Energy, treibendem Techno und kompromisslosem Clubsound.",
  },
  {
    id: 2,
    title: "NEON RAVE",
    club: "Club Z",
    city: "Düren",
    location: "Innenstadt, Düren",
    genre: "EDM",
    crowd: "740",
    energy: "87%",
    heatScore: 87,
    date: "2026-08-14",
    startTime: "22:30",
    endTime: "05:00",
    price: 12,
    lineup: ["NEON", "LUX", "RAVEKID"],
    description:
      "Neon Lights, EDM und eine volle Tanzfläche. NEON RAVE bringt elektronische Sounds und maximale Festival-Energie in die Nacht.",
  },
  {
    id: 3,
    title: "STUDENT NIGHT",
    club: "Campus Club",
    city: "Saarbrücken",
    location: "Campus Club, Saarbrücken",
    genre: "Mixed",
    crowd: "980",
    energy: "91%",
    heatScore: 91,
    date: "2026-08-14",
    startTime: "22:00",
    endTime: "05:00",
    price: 8,
    lineup: ["DJ MAX", "LEO", "NXT"],
    description:
      "Student Night mit Mixed Music, Drinks und voller Tanzfläche bis tief in die Nacht.",
  },
];