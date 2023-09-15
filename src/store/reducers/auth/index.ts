import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../../models/IUser";

interface IAuthInitialState{
    isAuth:boolean
    user:IUser|null
    isLoading:boolean
    error:string
}
interface IAuthPayload{
    isAuth:boolean
    user:IUser|null
}
interface IErrorPayload{
    isAuth:boolean
    error:string
}

const initialState:IAuthInitialState={
    isAuth:false,
    user:null,
    error:'',
    isLoading:false
}
export const authSlice=createSlice(
    {
        name:'auth',
        initialState,
        reducers:
        {
            auth:(state, action:PayloadAction<IAuthPayload>)=>{
                state.isAuth=action.payload.isAuth
                state.user=action.payload.user
                state.error=''
                state.isLoading=false
            },
            error:(state, action:PayloadAction<IErrorPayload>)=>{
                state.isAuth=action.payload.isAuth
                state.user=null
                state.error=action.payload.error
                state.isLoading=false
            },
            load:(state)=>{
                state.isAuth=false
                state.user=null
                state.error=''
                state.isLoading=true
            },
        }
    }
)
export const {auth,error,load}=authSlice.actions
export default authSlice.reducer