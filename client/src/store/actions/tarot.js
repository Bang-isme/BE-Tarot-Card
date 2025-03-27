// src/store/actions/tarot.js
import actionTypes from './actionTypes';

export const getCards = (cards) => ({
    type: actionTypes.GET_CARDS,
    data: cards
});

export const selectCard = (card) => ({
    type: actionTypes.SELECT_CARD,
    data: card
});