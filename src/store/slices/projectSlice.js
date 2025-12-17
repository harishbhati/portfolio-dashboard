import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: true,
    error: null,
    message: null,
    projects: []
}

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        // get Project reducer
        getAllProjectRequest: (state) => {
            // state.projects = [];
            state.loading = true;
            state.error = null;
        },
         getAllProjectSuccess: (state, action) => {
            state.projects = action.payload;
            state.loading = false;
            state.error = null;
            state.message = null;
        },
         getAllProjectFailed: (state, action) => {
            state.projects = [];
            state.loading = false;
            state.error = action.payload;
        },
        // delete Project reducer
        deleteProjectRequest: (state) => {
            // state.projects = [];
            state.loading = true;
            state.error = null;
        },
        deleteProjectSuccess: (state, action) => {
            state.projects = action.payload;
            state.loading = false;
            state.error = null;
            state.message = action.payload || 'Project deleted successfully!';
        },
        deleteProjectFailed: (state, action) => {
            state.projects = [];
            state.loading = false;
            state.error = action.payload;
        },
        // add Project reducer
        addProjectRequest: (state) => {
            // state.projects = [];
            state.loading = true;
            state.error = null;
        },
        addProjectSuccess: (state, action) => {
           state.projects = action.payload;
            state.loading = false;
            state.error = null;
            state.message = action.payload || 'Application added successfully!';
        },
        addProjectFailed: (state, action) => {
            state.projects = [];
            state.loading = false;
            state.error = action.payload;
        },
        // update Project reducer
        updateProjectRequest: (state) => {
            // state.projects = [];
            state.loading = true;
            state.error = null;
        },
        updateProjectSuccess: (state, action) => {
           state.projects = action.payload;
            state.loading = false;
            state.error = null;
            state.message = action.payload || 'Application updated successfully!';
        },
        updateProjectFailed: (state, action) => {
            state.projects = [];
            state.loading = false;
            state.error = action.payload;
        },

        resetProjectSlice: (state) => {
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

// Method to fetch project data
export const getAllProjects = () => async (dispatch) => {
    dispatch(projectSlice.actions.getAllProjectRequest());

    try{
        const {data} = await axios.get(`${API_BASE_URL}/project/fetch`, {withCredentials: true});
        dispatch(projectSlice.actions.getAllProjectSuccess(data));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(projectSlice.actions.getAllProjectFailed(error.response.data.message));
    }
}

// Method to delete project data
export const deleteProject = (id) => async (dispatch) => {
    dispatch(projectSlice.actions.deleteProjectRequest());

    try{
        const {data} = await axios.delete(`${API_BASE_URL}/project/delete/${id}`, {withCredentials: true});
        console.log('Project deleted', data)
        dispatch(projectSlice.actions.getAllProjectSuccess(id));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch(error) {
        dispatch(projectSlice.actions.getAllProjectFailed(error.response.data.message));
    }
}

// Method to add project data
export const addProject = (formData) => async (dispatch) => {
    dispatch(projectSlice.actions.addProjectRequest());

    try{
        const {data} = await axios.post(`${API_BASE_URL}/project/add`,
            formData,
            {withCredentials: true}
        )
        dispatch(projectSlice.actions.addProjectSuccess(data.message));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch(error) {
        dispatch(projectSlice.actions.addProjectFailed(error.payload.data.message));
    }
}

// Method to update project data
export const updateProject = (id) => async (dispatch) => {
    dispatch(projectSlice.actions.updateProjectRequest());

    try{
        const {data} = await axios.put(`${API_BASE_URL}/project/update/${id}`, {withCredentials: true});
        console.log('Project updated', data);
        dispatch(projectSlice.actions.updateProjectSuccess(id));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch(error) {
        dispatch(projectSlice.actions.updateProjectFailed(error.response.data.message));
    }
}
// Clear all project error
export const clearAllProjectErrors = () => async (dispatch) => {
    dispatch(projectSlice.actions.clearAllErrors());
}

// Reset the project slice
export const resetProjectSlice = () => async (dispatch) => {
    dispatch(projectSlice.actions.resetProjectSlice())
}
export default projectSlice.reducer;