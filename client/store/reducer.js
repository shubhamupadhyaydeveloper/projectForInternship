import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    users : [],
    filterdUsers : []
}

export const userSlice = createSlice({
    name :'user',
    initialState,
    reducers :  {
        setUsers : (state,action) => {
            state.users = action.payload
        },
        setFilteredUser : (state,action) => {
            state.filterdUsers = action.payload
        }
    }
})

export const {setUsers , setFilteredUser} = userSlice.actions
export const  userReducer = userSlice.reducer