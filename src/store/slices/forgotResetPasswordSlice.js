import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState ={
   loading: false,
   error: null,
   message: null
};

export const forgotResetPasswordSlice = createSlice({
    name:'forgotPassword',
    initialState,
    reducers: {
        // Forgot password reducers
        forgotPasswordRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        forgotPasswordSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = null;
        },
        forgotPasswordFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
         // reset password reducers
        resetPasswordRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        resetPasswordSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = null;
        },
        resetPasswordFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        clearMessage: (state) => {
            state.message = null;
        },
        // Clear errors
        clearAllErrors: (state) => {
            state.error = null;
            state.message = null;
        }
    }
});

let API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// Action for login
export const userForgotPassword = (email) => async (dispatch) => {
    dispatch(forgotResetPasswordSlice.actions.forgotPasswordRequest());
    try {
        const response = await axios.post(
        `${API_BASE_URL}/user/password/forgot`, 
        { email },
        {
            withCredentials: true,
            headers: { "Content-Type": "application/json" }
        }
        );
        dispatch(forgotResetPasswordSlice.actions.forgotPasswordSuccess(response.data.message));
    } catch (error){
        dispatch(
            forgotResetPasswordSlice.actions.forgotPasswordFailed(
            error.response?.data?.message || "Something went wrong")
       );
    }   
}

// Action for reset password
export const userResetPassword = (token, password, confirmPassword) => async (dispatch) => {
    dispatch(forgotResetPasswordSlice.actions.resetPasswordRequest());
    try {
        const response = await axios.put(
        `${API_BASE_URL}/user/password/reset/${token}`,
        { password, confirmNewPassword: confirmPassword },
        {
            withCredentials: true,
            headers: { "Content-Type": "application/json" }
        }
        );
        dispatch(forgotResetPasswordSlice.actions.resetPasswordSuccess(response.data.message));
    } catch (error){
        dispatch(
            forgotResetPasswordSlice.actions.resetPasswordFailed(
            error.response?.data?.message || "Something went wrong")
       );
    }
}

// Acton to clear errors
export const clearAllForgotPasswordErrors = () => async (dispatch) => {
    dispatch(forgotResetPasswordSlice.actions.clearAllErrors());
}


export const { forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordFailed, resetPasswordRequest, resetPasswordSuccess, resetPasswordFailed, clearMessage , clearAllErrors } = forgotResetPasswordSlice.actions;
export const forgotResetPasswordReducer = forgotResetPasswordSlice.reducer;
  