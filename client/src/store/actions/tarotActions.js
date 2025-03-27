// src/store/actions/tarotActions.js
import { tarotDeck } from '../../components/tarot/tarotData';

// Khởi tạo bộ bài
export const initDeck = () => {
  return {
    type: 'INIT_DECK',
    payload: [...tarotDeck]
  };
};

// Đặt loại trải bài
export const setSelectedSpread = (spread) => {
  return {
    type: 'SET_SELECTED_SPREAD',
    payload: spread
  };
};

// Xáo bài
export const shuffleDeck = () => {
  const newDeck = [...tarotDeck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }

  return {
    type: 'SHUFFLE_DECK',
    payload: newDeck
  };
};

// Chọn lá bài
export const selectCard = (index, deck, selectedCards, selectedSpread) => {
  const card = deck[index];
  const isReversed = Math.random() > 0.7;
  const selectedCard = { ...card, isReversed };

  const newDeck = [...deck];
  newDeck.splice(index, 1);

  const cardsNeeded = getCardsNeeded(selectedSpread);
  const isLastCard = selectedCards.length + 1 === cardsNeeded;
  
  return {
    type: 'SELECT_CARD',
    payload: {
      selectedCard,
      newDeck,
      isSelectingCards: !isLastCard,
      isReading: isLastCard,
      step: isLastCard ? 'reading' : 'selecting'
    }
  };
};

// Đặt lá bài được chọn để xem ý nghĩa
export const setSelectedCardForMeaning = (card) => {
  return {
    type: 'SET_SELECTED_CARD_FOR_MEANING',
    payload: card
  };
};

// Reset trải bài
export const resetReading = () => {
  return {
    type: 'RESET_READING'
  };
};

// Helper function để lấy số lá bài cần thiết cho loại trải bài
function getCardsNeeded(spreadType) {
  switch (spreadType) {
    case 'one-card':
      return 1;
    case 'three-card':
      return 3;
    case 'celtic-cross':
      return 10;
    default:
      return 1;
  }
}