import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name:"user",
    initialState:{
        userData: null
    },

    reducers: {
        setUserdata:(state, action) => {
            state.userData = action.payload
        }
    }

})
//It means exporting the setUserdata action creator so that you can use it in other components.
export const {setUserdata} = userSlice.actions
// It means exporting the slice's reducer function so that you can register it in the Redux store.
export default userSlice.reducer