import { createSlice } from "@reduxjs/toolkit"


const initialState={
    loading :false,
    userDetails:null,
    allAddedUser:null
}


const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setLoading:(state,action)=>{
            state.loading = action.payload
        },
        
        setUserDetails:(state,action)=>{
            state.userDetails = action.payload
        },

        clearUserDetails :(state,action)=>{
            state.userDetails = null
        },
        
        setAllAddedUser:(state,action)=>{
            state.allAddedUser = action.payload
        },

        clearAllAddedUser :(state,action)=>{
            state.allAddedUser = null
        },
    }
})

export const {setLoading,clearUserDetails,setUserDetails,setAllAddedUser,clearAllAddedUser} = userSlice.actions
export default userSlice.reducer 