import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

export const productPageMock = {
  content: [
    {
      id: 1,
      name: "Produto A",
      imgUrl:
        "https://content.rolex.com/v7/dam/collection/watches-grid/popin-cards/m124060-0001/m124060-0001_v01.jpg",
      price: Math.random() * 20 + 5,
      description: lorem.generateParagraphs(2),
    },
    {
      id: 2,
      name: "Produto B",
      imgUrl:
        "https://content.rolex.com/v7/dam/collection/watches-grid/popin-cards/m124060-0001/m124060-0001_v01.jpg",
      price: Math.random() * 20 + 5,
      description: lorem.generateParagraphs(2),
    },
    {
      id: 3,
      name: "Produto C",
      imgUrl:
        "https://content.rolex.com/v7/dam/collection/watches-grid/popin-cards/m124060-0001/m124060-0001_v01.jpg",
      price: Math.random() * 20 + 5,
      description: lorem.generateParagraphs(2),
    },
    {
      id: 4,
      name: "Produto C",
      imgUrl:
        "https://content.rolex.com/v7/dam/collection/watches-grid/popin-cards/m124060-0001/m124060-0001_v01.jpg",
      price: Math.random() * 20 + 5,
      description: lorem.generateParagraphs(2),
    },
    {
      id: 5,
      name: "Produto D",
      imgUrl:
        "https://content.rolex.com/v7/dam/collection/watches-grid/popin-cards/m124060-0001/m124060-0001_v01.jpg",
      price: Math.random() * 20 + 5,
      description: lorem.generateParagraphs(2),
    },
    {
      id: 6,
      name: "Produto E",
      imgUrl:
        "https://content.rolex.com/v7/dam/collection/watches-grid/popin-cards/m124060-0001/m124060-0001_v01.jpg",
      price: Math.random() * 20 + 5,
      description: lorem.generateParagraphs(2),
    },
    {
      id: 7,
      name: "Produto F",
      imgUrl:
        "https://content.rolex.com/v7/dam/collection/watches-grid/popin-cards/m124060-0001/m124060-0001_v01.jpg",
      price: Math.random() * 20 + 5,
      description: lorem.generateParagraphs(2),
    },
    {
      id: 8,
      name: "Produto G",
      imgUrl:
        "https://content.rolex.com/v7/dam/collection/watches-grid/popin-cards/m124060-0001/m124060-0001_v01.jpg",
      price: Math.random() * 20 + 5,
      description: lorem.generateParagraphs(2),
    },
  ],
};
