import {configureStore}  from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlice';
import { forgotResetPasswordReducer } from './slices/forgotResetPasswordSlice';
import messageReducer from './slices/messageSlice';
import timelineReducer from './slices/timelineSlice';
import skillReducer from './slices/skillSlice';
import applicationReducer from './slices/applicationSlice';
import projectReducer from './slices/projectSlice';

const preloadedState = {
  user: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
    message: null,
  }
};

export const store = configureStore({
    reducer:{
        // add reducers here
        user: userReducer,
        forgotResetPassword: forgotResetPasswordReducer,
        messages: messageReducer,
        timeline: timelineReducer,
        skill: skillReducer,
        application: applicationReducer,
        project: projectReducer
    },
    preloadedState,
});