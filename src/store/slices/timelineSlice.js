import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    error: null,
    message: null,
    timelines: []
}

const timelineSlice = createSlice({
    name: "timeline",
    initialState,
    reducers : {
        // get timeline reducer
        getAllTimelineRequest: (state) => {
            state.timelines = [];
            state.loading = true;
            state.error = null;
        },
         getAllTimelineSuccess: (state, action) => {
           state.timelines = action.payload;
            state.loading = false;
            state.error = null;
            state.message = null;
        },
         getAllTimelineFailed: (state, action) => {
            state.timelines = [];
            state.loading = false;
            state.error = action.payload;
        },

         // delete timeline reducer
        deleteTimelineRequest: (state) => {
            state.timelines = [];
            state.loading = true;
            state.error = null;
        },
         deleteTimelineSuccess: (state, action) => {
           state.timelines = action.payload;
            state.loading = false;
            state.error = null;
        },
         deleteTimelineFailed: (state, action) => {
            state.timelines = [];
            state.loading = false;
            state.error = action.payload;
        },
        // add timeline reducer
        addTimelineRequest: (state) => {
            state.timelines = [];
            state.loading = true;
            state.error = null;
        },
         addTimelineSuccess: (state, action) => {
            state.timelines = action.payload;
            state.loading = false;
            state.error = null;
            state.message = action.payload || 'Timeline added successfully!'
        },
         addTimelineFailed: (state, action) => {
            state.timelines = [];
            state.loading = false;
            state.error = action.payload;
        },

        resetTimelineSlice: (state) => {
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

//method to get all timeline
export const getAllTimeline = () => async (dispatch) => {
    dispatch(timelineSlice.actions.deleteTimelineRequest());
    try {
        const {data} = await axios.get(`${API_BASE_URL}/timeline/fetch`, {withCredentials: true});
        dispatch(timelineSlice.actions.getAllTimelineSuccess(data));
        dispatch(timelineSlice.actions.clearAllErrors());
    } catch(error){
        dispatch(timelineSlice.actions.getAllTimelineFailed(error.response.data.message))
    }
}

//method to delete timeline
export const deleteTimeline = (id) => async (dispatch) => {
    dispatch(timelineSlice.actions.deleteTimelineRequest());

    try{
        const { data } = await axios.delete(`${API_BASE_URL}/timeline/delete/${id}`, {withCredentials: true});
         console.log('timeline deleted', data)
        dispatch(timelineSlice.actions.deleteTimelineSuccess(id));
        dispatch(timelineSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(timelineSlice.actions.deleteTimelineFailed(error.response.data.message));
    }
}

//method to post timeline
export const addTimeline = (timelineData) => async (dispatch) => {
    dispatch(timelineSlice.actions.addTimelineRequest());

    try{
        const {data} = await axios.post(`${API_BASE_URL}/timeline/add`, timelineData, 
            {withCredentials: true, headers: {"Content-Type": 'application/json'}}
        );
        dispatch(timelineSlice.actions.addTimelineSuccess(data.timelines));
        dispatch(timelineSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(timelineSlice.actions.addTimelineFailed(error.response.data.message));
    }
}


// Clear all messages error
export const clearAllErrors = () => async (dispatch) => {
    dispatch(timelineSlice.actions.clearAllErrors());
}

// Reset the message slice
export const resetTimelineSlice = () => async (dispatch) => {
    dispatch(timelineSlice.actions.resetTimelineSlice())
}

export default timelineSlice.reducer;