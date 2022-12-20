import { createSlice } from "@reduxjs/toolkit";

const trainerSlice = createSlice({
    name: 'trainer',
    initialState: '',
    reducers:{
      setTrainerGlobal: (state,actions) => actions.payload //son las cosa q el usuario memanda por parametro
    }
})

export const { setTrainerGlobal } = trainerSlice.actions


export default trainerSlice.reducer