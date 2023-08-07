import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    opponent:"",
    target:''
};

const detailsSlice = createSlice({ 
    name: 'details',
    initialState,
    reducers: {
        setOpponent (state, action) {
            state.opponent = action.payload
        },
        setTarget (state, action) {
            state.target = action.payload
        }
    }
})

export const { setOpponent, setTarget } = detailsSlice.actions
export default detailsSlice.reducer