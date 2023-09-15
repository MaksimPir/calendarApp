import { Input,Form, Select, Calendar, Row, Button, DatePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FC, useState } from "react";
import { IUser } from "../models/IUser";
import { Option } from "antd/es/mentions";
import { IEvent } from "../models/IEvent";
import { Moment } from "moment";
import dayjs, { Dayjs } from "dayjs";
import { useAppSelector } from "../hooks/hooks";

type FieldType = {
    nameEvent?: string;
    date?: string;
    guests?: string[];
    description?:string;
  }
interface IPropsEventForm{
    users:IUser[],
    submit:(event:IEvent)=>void
}
const EventForm:FC<IPropsEventForm> = ({users, submit}) => {
    const {user}=useAppSelector(state=>state.auth)
    const [event, setEvent]=useState<IEvent>({
        author:user?.username||'Unknown',
        date:'',
        description:'',
        guests:[],
        name:''
    })
    const onChangeGuest=(el:string[])=>{
        setEvent({...event, guests:el})
    }
    const onCalendarChange=(value: Dayjs | null, dateString: string)=>{
        console.log(dateString)
        setEvent({...event, date:dateString})
    }
    const Submit=(values:IEvent)=>{
        submit(event)
        setEvent({  
        author:user?.username||'Unknown',
        date:'',
        description:'',
        guests:[],
        name:''}as IEvent)
        
    }
    return (
        <Form
        onFinish={Submit}
        >
              <Form.Item<FieldType>
                label="Название события"
                name="nameEvent"
                rules={[{ required: true, message: 'Введите название!' }]}
                >
                <Input value={event.name}  onChange={(el)=>{setEvent({...event, name:el.target.value})}}/>
            </Form.Item> 
            <Form.Item<FieldType>
                label="Описание"
                name="description"
                rules={[{ required: true, message: 'Введите описание!' }]}
                >
                <TextArea  value={event.description} onChange={(el)=>{setEvent({...event, description:el.target.value})}}/>
            </Form.Item>
            <Form.Item<FieldType>
                name='guests'
                label='Гости'    
                rules={[{ required: true, message: 'Выберите гостя!' }]}
            >
                <Select
                    onChange={onChangeGuest}
                    mode='multiple'
                    style={{ width: '100%' }}
                    >
                    {users.map(item => (       
                        <Select.Option key={item.username} value={item.username}   >
                        <div>
                            {item.username}
                        </div>
                        </Select.Option>
                    ))}
                 </Select>
             </Form.Item>
             <Form.Item<FieldType>
                name='date'
                label='Дата события'  
                // rules={[{ required: true, type:'date', message: 'Введите дату!' }]}  
            >
                <div>
                    <DatePicker onChange={onCalendarChange} />
                </div>             
            </Form.Item>
            <Row justify={'end'}>
                <Button type="primary" htmlType="submit">Сохранить</Button> 
            </Row>
        </Form>
    );
};

export default EventForm;