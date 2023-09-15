import Event from "../pages/Event"
import Login from "../pages/Login"

export interface IRoute{
    path:string
    component:React.ComponentType
}
export enum routesEnum{
    LOGIN='/login',
    EVENT='/'
}


export const publicRoutes:IRoute[]=[
    {
        path:routesEnum.LOGIN,
        component:Login,
    }
]

export const privateRoutes:IRoute[]=[
    {
        path:routesEnum.EVENT,
        component:Event,
    }
]