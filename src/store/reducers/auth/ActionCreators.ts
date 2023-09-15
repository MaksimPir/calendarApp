import axios, { AxiosResponse } from "axios";
import { AppDispatch } from "../..";
import { authSlice } from ".";
import { IUser } from "../../../models/IUser";


export const fetchAuth = async(dispatch:AppDispatch, user:IUser) =>{
    const {auth,error, load}=authSlice.actions
    try {
        dispatch(load())
        setTimeout(async()=>{   
        const mokUsers=await axios.get<IUser[]>('./users.json')
        console.log(mokUsers);
        const candidate= mokUsers.data.find((el)=>{
            if(el.password==user.password && el.username==user.username){
                return el
            }
        })
        if (candidate)
        {
            dispatch(auth({isAuth:true, user:candidate}))
            localStorage.setItem('auth','true')
            localStorage.setItem('user',JSON.stringify(candidate))
        }
        else{
            dispatch(error({isAuth:false, error:'Неверный логин или пароль'}))
        } 
            },5000)
    
    } catch (e) {
        dispatch(error({isAuth:false, error: (e as Error).message}))
    }
}

export const logout = async(dispatch:AppDispatch) =>{
    const {auth}=authSlice.actions
    dispatch(auth({isAuth:false, user:{}as IUser}))
    localStorage.removeItem('auth')
    localStorage.removeItem('user')
}