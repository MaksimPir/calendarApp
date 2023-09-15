import { Badge, Button, Calendar, CalendarProps, Modal, Row } from "antd";
import Layout from "antd/es/layout/layout";
import { FC, useEffect, useState } from "react";
import EventForm from "../components/EventForm";
import { addEventToList, fetchGuests } from "../store/reducers/event/ActionCreators";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { IEvent } from "../models/IEvent";
import { Dayjs } from "dayjs";
import { convertDate } from "../api/helpFunctions";


const Event:FC = () => {
    const [visibleModal, setVisibleModal]=useState<boolean>(false)
    const dispatch=useAppDispatch()
    const {users,events}=useAppSelector(state=>state.event)
    useEffect(()=>{
        fetchGuests(dispatch)
    },[])
    const addNewEvent=(event:IEvent)=> {
        setVisibleModal(false)
        addEventToList(dispatch,event)

    }
    const dateCellRender = (value: Dayjs) => {
        const convertedDate=convertDate(value,false);
        const currentDateEvents=events.filter(el=>el.date==convertedDate)        
        return (
          <ol >
            {
                currentDateEvents.map((item,index) => 
                    <li key={index} className="eventItem">{item.name}</li>
            )
            }
          </ol>
        );
      };
    const monthCellRender = (value: Dayjs) => {
        const month=convertDate(value,true);
        const currentDateEvents=events.filter(el=>el.date.slice(5,7)==month)        
        return (
          <div >
            {
                currentDateEvents.map((item,index) => 
                    <div key={index} className="eventItem">{item.name}</div>
                )
            }
          </div>
        );
      };
    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
    };
    return (
        <Layout>
            <Row style={{width:'1200px', margin:'0 auto'}}>
                <Calendar cellRender={cellRender}/>
            </Row>
            <Row justify={'center'}>
                <Button onClick={()=>setVisibleModal((prev)=>!prev)}>Добавить событие</Button> 
            </Row>
            <Modal title='Добавить событие' open={visibleModal} footer={null} onCancel={()=>{setVisibleModal((prev)=>!prev)}}>
                <EventForm 
                users={users}
                submit={addNewEvent}/>
            </Modal>
        </Layout>
    );
};

export default Event;