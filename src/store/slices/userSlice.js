import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState ={
   loading: false,
   user: null,
   error: null,
   message: null,
   isAuthenticated: false,
   isUpdated: false
};

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        // Login reducers
        loginRequest: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
            state.user = {};
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
            state.user = {};
            state.error = action.payload;
        },

        // Get user reducers
        getUserRequest: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
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
            state.error = action.payload;
        },

        // Logout reducers
         logoutSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            state.message = action.payload.message || "Logout Successfully";
        },
        logoutFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // update password reducers
         updatePasswordRequest: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            state.message = null;
        },
        updatePasswordSuccess: (state) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = null;
            state.error = null;
            state.message = "Password updated successfully";
        },
        updatePasswordFailed: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
            state.message = null;
        },
        // update profile reducers
         updateProfileRequest: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            state.message = null;
        },
        updateProfileSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload.user;      // updated user
        state.message = action.payload.message; // success message
        state.error = null;

        // optional: persist user in localStorage to survive refresh
        localStorage.setItem("user", JSON.stringify(state.user));
        },
        updateProfileFailed: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
            state.message = null;
        },
        updateProfileResetAfterUpdate: (state) => {
            state.loading = false;
            state.isAuthenticated = false;
             state.user = null;
            state.error = null;
            state.message = null;
        },

        // Clear errors
        clearMessage: (state) => {
            state.message = null;
        },
        clearAllErrors: (state) => {
            state.error = null;
            state.user = null;
        }
    }
});

let API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// Action for login
export const loginUser = (email, password) => async (dispatch) => {
    dispatch(userSlice.actions.loginRequest());

    try {
        const response = await axios.post(
            `${API_BASE_URL}/user/login`,
            { email, password },
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            }
        );
        localStorage.setItem("token", response.data.token);
        // Save user to Redux
        dispatch(userSlice.actions.loginSuccess(response.data.user));

        dispatch(userSlice.actions.clearAllErrors());

    } catch (error) {

        dispatch(
            userSlice.actions.loginFailed(
                error.response?.data?.message || "Something went wrong"
            )
        );
    }
};


// Action for getting user details
export const getUser = () => async (dispatch) => {
    dispatch(userSlice.actions.getUserRequest());
    try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${API_BASE_URL}/user/me`, {
            withCredentials: true,
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            }
        });

        dispatch(userSlice.actions.getUserSuccess(response.data.user));
    } catch (error) {
        dispatch(
            userSlice.actions.getUserFailed(
                error.response?.data?.message || "Something went wrong"
            )
        );
    }
};


// Action for logout
export const logoutUser = () => async (dispatch) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/user/logout`,
            { withCredentials: true }
        );
        localStorage.removeItem("token");

        // SEND SUCCESS MESSAGE TO REDUX
        dispatch(userSlice.actions.logoutSuccess(response.data.message));
        // dispatch(userSlice.actions.logoutSuccess("Logout Successfully"));

    } catch (error) {

        dispatch(
            userSlice.actions.logoutFailed(
                error.response?.data?.message || "Something went wrong"
            )
        );

    }
};


// Action to update password
export const updatePassword = (currentPassword, newPassword, confirmNewPassword) => async (dispatch) => {
     console.log("inside Dispatching updatePassword with:", { currentPassword, newPassword, confirmNewPassword });
    dispatch(userSlice.actions.updatePasswordRequest());
    try {
        const response = await axios.put(
        `${API_BASE_URL}/user/update/password`, 
        {
            currentPassword,
            newPassword,
            confirmNewPassword
        },
        {
            withCredentials: true,
            headers: { "Content-Type": "application/json" }
        }
        );
        dispatch(userSlice.actions.updatePasswordSuccess(response.data.message));
        dispatch(userSlice.actions.clearAllErrors());
    } catch (error){
        dispatch(
            userSlice.actions.updatePasswordFailed(
            error.response?.data?.message || "Something went wrong")
       );
    }
}

// Action to update profile
export const updateProfile = (data) => async (dispatch) => {
    dispatch(userSlice.actions.updateProfileRequest());
    try {
        const response = await axios.put(
        `${API_BASE_URL}/user/update/me`,
        data,
        {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" }
        }
        );
        dispatch(userSlice.actions.updateProfileSuccess({
        user: response.data.user,
        message: response.data.message,
      }));
        dispatch(userSlice.actions.clearAllErrors());
    } catch (error){
        dispatch(
            userSlice.actions.updateProfileFailed(
            error.response?.data?.message || "Something went wrong")
       );
    }
}
// Action to reset profile update state
export const resetUpdateProfileState = () => async (dispatch) => {
    dispatch(userSlice.actions.updateProfileResetAfterUpdate());
}
// Acton to clear errors
export const clearAllUserErrors = () => async (dispatch) => {
    dispatch(userSlice.actions.clearAllErrors());
}


export const { loginRequest, loginSuccess, loginFailed, clearAllErrors, clearMessage } = userSlice.actions;
export const userReducer = userSlice.reducer;
  