import { IEvent } from './../../../models/IEvent';
import { IUser } from './../../../models/IUser';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IEventInitialState{
    users:IUser[]
    events:IEvent[]
}
const initialState:IEventInitialState={
    events:[],
    users:[]
}
export const eventSlice=createSlice(
    {
        name:'event',
        initialState,
        reducers:
        {
            setUsers:(state,action:PayloadAction<IUser[]>)=>{
                console.log(action);
                state.users=action.payload
            },
            setEvents:(state, action:PayloadAction<IEvent>)=>{
                state.events.push(action.payload)
            }
        }
    }
)