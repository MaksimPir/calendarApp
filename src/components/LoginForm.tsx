import { Button, Form, Input } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchAuth } from "../store/reducers/auth/ActionCreators";
import { IUser } from "../models/IUser";
import { useEffect } from "react";
type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  }
const LoginForm = () => {
    const dispatch=useAppDispatch()
    const {user,error,isAuth,isLoading} =useAppSelector(state=>state.auth)
    const Submit= (values:IUser)=>{
        fetchAuth(dispatch,values) 
        
    }
    useEffect(()=>{
        console.log(user, error, isAuth, isLoading);
    },[user, error, isAuth, isLoading])
    return (
        <Form
        onFinish={Submit}
        onFinishFailed={()=>{console.log('Error')}}
        >
            {error&& <div style={{color:'red', fontSize:'16'}}>{error}</div>}
            <Form.Item<FieldType>
                label="Логин"
                name="username"
                rules={[{ required: true, message: 'Введите ваш логин!' }]}
                >
                <Input />
            </Form.Item> 
            <Form.Item<FieldType>
                label="Пароль"
                name="password"
                rules={[{ required: true, message: 'Введите пароль!' }]}
            >
                <Input.Password />
            </Form.Item> 
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;