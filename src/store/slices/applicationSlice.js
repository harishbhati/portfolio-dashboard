import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    message: null,
    error: null,
    applications: []
}

const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        // get Application reducer
        getAllApplicationRequest: (state) => {
            state.applications = [];
            state.loading = true;
            state.error = null;
        },
         getAllApplicationSuccess: (state, action) => {
           state.applications = action.payload;
            state.loading = false;
            state.error = null;
            state.message = null;
        },
         getAllApplicationFailed: (state, action) => {
            state.applications = [];
            state.loading = false;
            state.error = action.payload;
        },
        // delete Application reducer
        deleteApplicationRequest: (state) => {
            state.applications = [];
            state.loading = true;
            state.error = null;
        },
        deleteApplicationSuccess: (state, action) => {
           state.applications = action.payload;
            state.loading = false;
            state.error = null;
            state.message = null;
        },
        deleteApplicationFailed: (state, action) => {
            state.applications = [];
            state.loading = false;
            state.error = action.payload;
        },
        // add Project reducer
        addApplicationRequest: (state) => {
            state.applications = [];
            state.loading = true;
            state.error = null;
        },
        addApplicationSuccess: (state, action) => {
           state.applications = action.payload;
            state.loading = false;
            state.error = null;
            state.message = action.payload || 'Application added successfully!';
        },
        addApplicationFailed: (state, action) => {
            state.applications = [];
            state.loading = false;
            state.error = action.payload;
        },

        resetApplicationSlice: (state) => {
            state.message = null;
            state.loading = false;
            state.error = null;
        },
        clearAllErrors: (state) => {
            state.error = null;
        }

    }
})

let API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Method to get all application data
export const getAllApplication = () => async (dispatch) => {
    dispatch(applicationSlice.actions.getAllApplicationRequest());

    try{
        const {data} = await axios.get(`${API_BASE_URL}/softwareapplication/fetch`, {withCredentials: true});
        console.log('applications', data)
        dispatch(applicationSlice.actions.getAllApplicationSuccess(data));
        dispatch(applicationSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(applicationSlice.actions.addApplicationFailed(error.response.data.message));
    }
}

// Method to delete application data
export const deleteApplication = (id) => async (dispatch) => {
    dispatch(applicationSlice.actions.deleteApplicationRequest());

    try{
        const {data} = await axios.delete(`${API_BASE_URL}/softwareapplication/delete/${id}`, {withCredentials: true});
        console.log('Application deleted', data)
        dispatch(applicationSlice.actions.deleteApplicationSuccess(id));
        dispatch(applicationSlice.actions.deleteApplicationSuccess(data.message));
        dispatch(applicationSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(applicationSlice.actions.deleteApplicationFailed(error.response.data.message));
    }
}

// Method to add application data
export const addApplication = (formData) => async (dispatch) => {
    dispatch(applicationSlice.actions.addApplicationRequest());

    try {
        const {data} = await axios.post(`${API_BASE_URL}/softwareapplication/add`,
            formData, 
            {withCredentials: true}
        );
        dispatch(applicationSlice.actions.addApplicationSuccess(data.message));
        dispatch(applicationSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(applicationSlice.actions.addApplicationFailed(error.response.data.message));
    }
}
// Clear all application error
export const clearAllApplicationErrors = () => async (dispatch) => {
    dispatch(applicationSlice.actions.clearAllErrors());
}

// Reset the application slice
export const resetApplicationSlice = () => async (dispatch) => {
    dispatch(applicationSlice.actions.resetApplicationSlice())
}

export default applicationSlice.reducer;