import { FC, useEffect } from "react";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import Layout, { Content } from "antd/es/layout/layout";
import './index.css'
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import auth, { authSlice } from "./store/reducers/auth";
import { IUser } from "./models/IUser";

const App:FC=()=> {
  const dispatch=useAppDispatch()
  const {auth}=authSlice.actions

  useEffect(()=>{
      if(localStorage.getItem('auth'))
      {
        const user:IUser= JSON.parse(localStorage.getItem('user')+'')
        dispatch(auth({isAuth:true,user:user}))
      }
  },[])
  return (
    <Layout>
      <Navbar/>
      <AppRouter/>
    </Layout>
     
  );
}

export default App;
