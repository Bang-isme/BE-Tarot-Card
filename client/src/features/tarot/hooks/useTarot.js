import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAllCards,
  fetchCardById,
  fetchDailyTarot,
  performReading,
  fetchReadingById,
  fetchUserReadings,
  getInterpretation,
  selectCard,
  unselectCard,
  clearSelectedCards,
  setCurrentCard,
  clearError
} from '../slices/tarotSlice';

export const useTarot = () => {
  const dispatch = useDispatch();
  const {
    cards,
    selectedCards,
    currentCard,
    dailyCard,
    readings,
    currentReading,
    interpretation,
    loading,
    error,
    userReadings
  } = useSelector((state) => state.tarot);

  // Load all cards
  const loadAllCards = useCallback(() => {
    return dispatch(fetchAllCards());
  }, [dispatch]);

  // Load a specific card
  const loadCardById = useCallback((cardId) => {
    return dispatch(fetchCardById(cardId));
  }, [dispatch]);

  // Load daily tarot
  const loadDailyTarot = useCallback(() => {
    return dispatch(fetchDailyTarot());
  }, [dispatch]);

  // Create a new reading
  const createNewReading = useCallback((readingData) => {
    return dispatch(performReading(readingData));
  }, [dispatch]);

  // Load a specific reading
  const loadReadingById = useCallback((readingId) => {
    return dispatch(fetchReadingById(readingId));
  }, [dispatch]);

  // Load user's reading history
  const loadUserReadings = useCallback((params = {}) => {
    return dispatch(fetchUserReadings(params));
  }, [dispatch]);

  // Get AI interpretation for cards
  const getAIInterpretation = useCallback((cards, question, readingType) => {
    return dispatch(getInterpretation({ cards, question, readingType }));
  }, [dispatch]);

  // Select a card
  const handleSelectCard = useCallback((card) => {
    dispatch(selectCard(card));
  }, [dispatch]);

  // Unselect a card
  const handleUnselectCard = useCallback((card) => {
    dispatch(unselectCard(card));
  }, [dispatch]);

  // Clear selected cards
  const handleClearSelectedCards = useCallback(() => {
    dispatch(clearSelectedCards());
  }, [dispatch]);

  // Set current card
  const handleSetCurrentCard = useCallback((card) => {
    dispatch(setCurrentCard(card));
  }, [dispatch]);

  // Clear error
  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    // State
    cards,
    selectedCards,
    currentCard,
    dailyCard,
    readings,
    currentReading,
    interpretation,
    loading,
    error,
    userReadings,
    
    // Actions
    loadAllCards,
    loadCardById,
    loadDailyTarot,
    createNewReading,
    loadReadingById,
    loadUserReadings,
    getAIInterpretation,
    handleSelectCard,
    handleUnselectCard,
    handleClearSelectedCards,
    handleSetCurrentCard,
    handleClearError
  };
}; 