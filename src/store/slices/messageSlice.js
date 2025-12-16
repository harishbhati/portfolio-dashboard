import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    messages: [],
    error: null,
    message: null,
    isMessageSent: false,
};

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        // get message reducer
        getAllMessageRequest: (state) => {
            state.messages = [];
            state.loading = true;
            state.error = null;
        },
         getAllMessageSuccess: (state, action) => {
           state.messages = action.payload;
            state.loading = false;
            state.error = null;
        },
         getAllMessageFailed: (state, action) => {
            state.messages = [];
            state.loading = false;
            state.error = action.payload;
        }, 

        // delete message reducer
        deleteMessageRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteMessageSuccess: (state, action) => {
            state.messages = state.messages.filter(
                (msg) => msg._id !== action.payload
            );
            state.loading = false;
            state.message =  'Message deleted successfully!'
        },
        deleteMessageFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        resetMessageSlice: (state) => {
            state.message = null;
            state.loading = false;
            state.error = null;
        },
        clearAllErrors: (state) => {
            state.error = null;
        }
    },
});

let API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//method to get all message
export const getAllMessages = () => async (dispatch) => {
    dispatch(messageSlice.actions.getAllMessageRequest());

    try {
        const { data } = await axios.get(`${API_BASE_URL}/message/fetch`, { withCredentials: true });
        dispatch(messageSlice.actions.getAllMessageSuccess(data.messages));
        dispatch(messageSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(messageSlice.actions.getAllMessageFailed(error.response.data.message));
    }
}

// Method to delete the message
export const deletemessage = (id) => async (dispatch) => {
    dispatch(messageSlice.actions.deleteMessageRequest());
    try{
        const {data} = await axios.delete(`${API_BASE_URL}/message/delete/${id}`, {withCredentials: true});
        dispatch(messageSlice.actions.deleteMessageSuccess(id));
        dispatch(messageSlice.actions.clearAllErrors());
        console.log(data)

    } catch(error){
        dispatch(messageSlice.actions.deleteMessageFailed(error.response.data.message));
    }
}

// Clear all messages error
export const clearAllMessageErrors = () => async (dispatch) => {
    dispatch(messageSlice.actions.clearAllErrors());
}

// Reset the message slice
export const resetMessageSlice = () => async (dispatch) => {
    dispatch(messageSlice.actions.resetMessageSlice())
}


// export const { getAllMessageRequest, getAllMessageSuccess, getAllMessageFailed } = messageSlice.actions;
export default messageSlice.reducer;
