import { createSlice } from "@reduxjs/toolkit";
import { CartType, UserTypes } from "../../types";




const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {} as UserTypes,


    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setVerified: (state, action) => {
            state.user.user.verified = action.payload
        },
        // setCart: (state, action) => {
        //     state.cart = action.payload
        // },
        // removeCart: (state) => {
        //     state.cart = [] as CartType[]
        // },
        logout: (state) => {
            state.user = {} as UserTypes
            // state.cart = [] as CartType[]
        }
    }
})

export const { setUser, setVerified, logout } = userSlice.actions;
export default userSlice.reducer;