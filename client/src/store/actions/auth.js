// src/store/actions/auth.js
import actionTypes from './actionTypes';

export const login = (payload) => ({
    type: actionTypes.LOGIN_SUCCESS,
    data: payload
});

export const loginFail = (message) => ({
    type: actionTypes.LOGIN_FAIL,
    data: message
});