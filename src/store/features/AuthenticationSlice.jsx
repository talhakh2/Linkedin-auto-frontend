import { createSlice } from '@reduxjs/toolkit';

// Function to load state from local storage
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('authenticationData');
        if (serializedState === null) {
            return undefined;
        }
        const parsedState = JSON.parse(serializedState);
        if (parsedState && parsedState._id !== undefined) {
            return parsedState;
        } else {
            localStorage.removeItem('authenticationData'); // Remove invalid data
            return undefined;
        }
    } catch (err) {
        localStorage.removeItem('authenticationData'); // Handle JSON parsing error
        return undefined;
    }
};

// Function to save state to local storage
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('authenticationData', serializedState);
    } catch (err) {
        console.error("Could not save state to localStorage:", err);
    }
};

// Load initial state from local storage or use default value
const initialState = {
    _id: 0,
    fullName: '',
    email: '',
    via_google: false,
    plan: '',
    ...loadState(), // Merge loaded state with default values
};

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        saveUser: (state, action) => {
            state._id = action.payload._id;
            state.fullName = action.payload.fullName;
            state.email = action.payload.email;
            state.via_google = action.payload.via_google;
            state.plan = action.payload.plan;
            saveState(state); // Save state to local storage
        },
        removeUser: (state) => {
            state._id = 0;
            state.fullName = '';
            state.email = '';
            state.via_google = false;
            state.plan = '';
            saveState(state); // Save state to local storage
        },
        updateUser: (state, action) => {
            // Update only the fields that are provided in action.payload
            Object.assign(state, action.payload);
            saveState(state); // Save updated state to local storage
        },
    },
});

// Action creators are generated for each case reducer function
export const { saveUser, removeUser, updateUser } = authenticationSlice.actions;

export default authenticationSlice.reducer;
