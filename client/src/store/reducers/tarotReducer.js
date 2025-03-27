// src/store/reducers/tarotReducer.js
const initialState = {
    deck: [],
    selectedSpread: "one-card",
    selectedCards: [],
    isShuffling: false,
    isReading: false,
    isSelectingCards: false,
    step: "home",
    selectedCardForMeaning: null
  };
  
  const tarotReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INIT_DECK':
        return {
          ...state,
          deck: action.payload
        };
      case 'SET_SELECTED_SPREAD':
        return {
          ...state,
          selectedSpread: action.payload
        };
      case 'SHUFFLE_DECK':
        return {
          ...state,
          deck: action.payload,
          selectedCards: [],
          isReading: false,
          isShuffling: false,
          step: 'selecting',
          isSelectingCards: true
        };
      case 'SELECT_CARD':
        return {
          ...state,
          selectedCards: [...state.selectedCards, action.payload.selectedCard],
          deck: action.payload.newDeck,
          isSelectingCards: action.payload.isSelectingCards,
          isReading: action.payload.isReading,
          step: action.payload.step
        };
      case 'SET_SELECTED_CARD_FOR_MEANING':
        return {
          ...state,
          selectedCardForMeaning: action.payload
        };
      case 'RESET_READING':
        return {
          ...state,
          selectedCards: [],
          isReading: false,
          selectedCardForMeaning: null,
          step: 'home'
        };
      default:
        return state;
    }
  };
  
  export default tarotReducer;