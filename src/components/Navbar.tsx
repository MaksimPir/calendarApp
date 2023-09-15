import { Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { logout } from "../store/reducers/auth/ActionCreators";

const Navbar:FC = () => {

    const {isAuth, user}=useAppSelector(state=>state.auth);
    const dispatch = useAppDispatch();
    const navigate=useNavigate()
    console.log(isAuth);
    
    return (
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent:'end' }}>
         {isAuth?
         <>
         <div style={{color:'white'}}>{user?.username}</div>
           <Menu
        theme="dark"
        items={
              [{
                key:1,
                label: 'Выйти',
                onClick:()=>{logout(dispatch)
                }
              }]

            }
        />

         </>
       :
        <Menu
          theme="dark"
          items={
            [{
              key:1,
              label: 'Логин',
              onClick:()=>{navigate('/login')}
            }]
          }
        />
        }
      </Header>
    
    );
};

export default Navbar;