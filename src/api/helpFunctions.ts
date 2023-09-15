import { Dayjs } from 'dayjs';
export function convertDate(date:Dayjs, isMonth:boolean): string
{
    // console.log(date);
    
    let day = date.get('D')<10?'0'+date.get('D'):date.get('D')
    let month=(date.get('M')+1)<10?'0'+(date.get('M')+1):date.get('M')+1
    if(!isMonth)
    {
        return date.get('year')+'-'+month+'-'+day
    }
    else
    {
        return ''+month
    }
}