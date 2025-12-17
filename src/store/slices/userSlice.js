import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: true,          // Important: true on initial load
    user: null,
    error: null,
    message: null,
    isAuthenticated: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // ---------------- LOGIN ----------------
        loginRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
            state.message = action.payload.message || "Login Successful!";
        },
        loginFailed: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },

        // ---------------- GET USER ----------------
        getUserRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        getUserSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        getUserFailed: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },

        // ---------------- LOGOUT ----------------
        logoutSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            state.message = action.payload?.message || "Logout Successfully";
        },
        logoutFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // ---------------- UPDATE PASSWORD ----------------
        updatePasswordRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        updatePasswordSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload || "Password updated successfully";
        },
        updatePasswordFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // ---------------- UPDATE PROFILE ----------------
        updateProfileRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        updateProfileSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.message = action.payload.message;
            state.error = null;
            localStorage.setItem("user", JSON.stringify(state.user));
        },
        updateProfileFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateProfileResetAfterUpdate: (state) => {
            state.loading = false;
            state.error = null;
            state.message = null;
        },

        // ---------------- CLEAR ERRORS ----------------
        clearMessage: (state) => {
            state.message = null;
        },
        clearAllErrors: (state) => {
            state.error = null;
        }
    }
});

let API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ---------------- ACTIONS ----------------

// LOGIN
export const loginUser = (email, password) => async (dispatch) => {
    dispatch(userSlice.actions.loginRequest());
    try {
        const response = await axios.post(
            `${API_BASE_URL}/user/login`,
            { email, password },
            { withCredentials: true, headers: { "Content-Type": "application/json" } }
        );
        localStorage.setItem("token", response.data.token);
        dispatch(userSlice.actions.loginSuccess(response.data.user));
        dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(userSlice.actions.loginFailed(error.response?.data?.message || "Something went wrong"));
    }
};

// GET USER
export const getUser = () => async (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
        dispatch(userSlice.actions.getUserFailed("Please login to access this resource"));
        return;
    }
    dispatch(userSlice.actions.getUserRequest());
    try {
        const response = await axios.get(`${API_BASE_URL}/user/me`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(userSlice.actions.getUserSuccess(response.data.user));
    } catch (error) {
        localStorage.removeItem("token");
        dispatch(userSlice.actions.getUserFailed(error.response?.data?.message || "Something went wrong"));
    }
};

// LOGOUT
export const logoutUser = () => async (dispatch) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user/logout`, { withCredentials: true });
        localStorage.removeItem("token");
        dispatch(userSlice.actions.logoutSuccess(response.data.message));
    } catch (error) {
        dispatch(userSlice.actions.logoutFailed(error.response?.data?.message || "Something went wrong"));
    }
};

// UPDATE PASSWORD
export const updatePassword = (currentPassword, newPassword, confirmNewPassword) => async (dispatch) => {
    dispatch(userSlice.actions.updatePasswordRequest());
    try {
        const response = await axios.put(
            `${API_BASE_URL}/user/update/password`,
            { currentPassword, newPassword, confirmNewPassword },
            { withCredentials: true, headers: { "Content-Type": "application/json" } }
        );
        dispatch(userSlice.actions.updatePasswordSuccess(response.data.message));
        dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(userSlice.actions.updatePasswordFailed(error.response?.data?.message || "Something went wrong"));
    }
};

// UPDATE PROFILE
export const updateProfile = (data) => async (dispatch) => {
    dispatch(userSlice.actions.updateProfileRequest());
    try {
        const response = await axios.put(`${API_BASE_URL}/user/update/me`, data, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" }
        });
        dispatch(userSlice.actions.updateProfileSuccess({ user: response.data.user, message: response.data.message }));
        dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(userSlice.actions.updateProfileFailed(error.response?.data?.message || "Something went wrong"));
    }
};

// RESET PROFILE UPDATE STATE
export const resetUpdateProfileState = () => async (dispatch) => {
    dispatch(userSlice.actions.updateProfileResetAfterUpdate());
};

// CLEAR ERRORS
export const clearAllUserErrors = () => async (dispatch) => {
    dispatch(userSlice.actions.clearAllErrors());
};

export const { loginRequest, loginSuccess, loginFailed, clearAllErrors, clearMessage } = userSlice.actions;
export const userReducer = userSlice.reducer;