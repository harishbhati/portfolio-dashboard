import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    error: null,
    message: null,
    skills: []
}

const skillSlice = createSlice({
    name: "skill",
    initialState,
    reducers : {
        // get skill reducer
        getAllSkillRequest: (state) => {
            state.skills = [];
            state.loading = true;
            state.error = null;
        },
         getAllSkillSuccess: (state, action) => {
           state.skills = action.payload;
            state.loading = false;
            state.error = null;
            state.message = null;
        },
         getAllSkillFailed: (state, action) => {
            state.skills = [];
            state.loading = false;
            state.error = action.payload;
        },

         // delete skill reducer
        deleteSkillRequest: (state) => {
            state.skills = [];
            state.loading = true;
            state.error = null;
        },
         deleteSkillSuccess: (state, action) => {
           state.skills = action.payload;
            state.loading = false;
            state.error = null;
        },
         deleteSkillFailed: (state, action) => {
            state.skills = [];
            state.loading = false;
            state.error = action.payload;
        },
        // update skill reducer
        updateSkillRequest: (state) => {
            state.skills = [];
            state.loading = true;
            state.error = null;
        },
         updateSkillSuccess: (state, action) => {
           state.skills = action.payload;
            state.loading = false;
            state.error = null;
        },
         updateSkillFailed: (state, action) => {
            state.skills = [];
            state.loading = false;
            state.error = action.payload;
        },
        // add skill reducer
        addSkillRequest: (state) => {
            state.skills = [];
            state.loading = true;
            state.error = null;
        },
         addSkillSuccess: (state, action) => {
            state.skills = action.payload;
            state.loading = false;
            state.error = null;
            state.message = action.payload || 'Timeline added successfully!'
        },
         addSkillFailed: (state, action) => {
            state.skills = [];
            state.loading = false;
            state.error = action.payload;
        },

        resetSkillSlice: (state) => {
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

//method to get all skill
export const getAllSkills = () => async (dispatch) =>{
    dispatch(skillSlice.actions.getAllSkillRequest());

    try{
        const {data} = await axios.get(`${API_BASE_URL}/skill/fetch`, {withCredentials: true});
        console.log('skill', data)
        dispatch(skillSlice.actions.getAllSkillSuccess(data))
        dispatch(skillSlice.actions.clearAllErrors());
    } catch(error){
        dispatch(skillSlice.actions.getAllSkillFailed(error.response.data.message))
    }
}
//method to post skill
export const addSkills = (formData) => async (dispatch) => {
  dispatch(skillSlice.actions.addSkillRequest());

  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/skill/add`,
      formData,
      { withCredentials: true }
    );

    dispatch(skillSlice.actions.addSkillSuccess(data.message));
  } catch (error) {
    dispatch(skillSlice.actions.addSkillFailed(error.response.data.message));
  }
};

//method to delete skill
export const deleteSkill = (id) => async (dispatch) => {
    dispatch(skillSlice.actions.deleteSkillRequest());

    try{
        const {data} = await axios.delete(`${API_BASE_URL}/skill/delete/${id}`, {withCredentials: true});
        console.log('skill deleted', data);
        dispatch(skillSlice.actions.deleteSkillSuccess(id));
        dispatch(skillSlice.actions.deleteSkillSuccess(data.message));
        dispatch(skillSlice.actions.clearAllErrors());
    } catch(error) {
        dispatch(skillSlice.actions.deleteSkillFailed(error.response.data.message));
    }
}

//method to update skill
export const updateSkill = (id) => async (dispatch) => {
    dispatch(skillSlice.actions.updateSkillRequest());

    try {
        const {data} = await axios.put(`${API_BASE_URL}/skill/update/${id}`, {withCredentials: true});
        console.log('Skill updated', data)
        dispatch(skillSlice.actions.updateSkillSuccess(id));
        dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(skillSlice.actions.updateSkillFailed(error.response.data.message));
    }
}
// Clear all messages error
export const clearAllErrors = () => async (dispatch) => {
    dispatch(skillSlice.actions.clearAllErrors());
}

// Reset the message slice
export const resetSkillSlice = () => async (dispatch) => {
    dispatch(skillSlice.actions.resetSkillSlice())
}

export default skillSlice.reducer;