import { AppDispatch } from "../..";
import UserService from "../../../api/UserService";
import { eventSlice } from ".";
import { IEvent } from "../../../models/IEvent";


export const fetchGuests = async(dispatch:AppDispatch) =>{
    const {setUsers}=eventSlice.actions
    try {
        const guests=await UserService.getUsers()        
        dispatch(setUsers(guests.data))        
    } catch (e) {
        console.log((e as Error).message);
    }
}
export const addEventToList=(dispatch:AppDispatch,event:IEvent)=>{
    const {setEvents}=eventSlice.actions
    dispatch(setEvents(event))
}
