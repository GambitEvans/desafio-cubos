import Scheduling from '../models/Scheduling';
import SchedulingDAO from 'src/dao/SchedulingDAO';
import Interval from 'src/models/Interval';
import * as moment from "moment";

export default class SchedulingService extends SchedulingDAO {
    
    getAllByInterval(interval: Interval): Scheduling[] {
        const array: Scheduling[] = this.getAll();
        return array.filter(scheduling => {
            if(moment(scheduling._data, "DD-MM-YYYY")
                .isSameOrAfter(moment(interval._start, "DD-MM-YYYY"))
                || moment(scheduling._data, "DD-MM-YYYY")
                .isSameOrBefore(moment(interval._end, "DD-MM-YYYY"))){
                    return scheduling;
            }
        });
    }

    // getSchedulingBySchedule(schedule: Schedule){
    //     return this.getBySchedule(schedule);
    // }
    
    postScheduling(scheduling: Scheduling){
        return this.createScheduling(scheduling);
        // if(this.existScheduling(scheduling._day)){
        //     console.log('entrou no if');
        //     return this.createScheduling(scheduling);
        // } else { 
        //     console.log('entrou no else');
        //     const listSchedules = this.getSchedulesByDay(scheduling._day);
        //     scheduling._schedules.map(schedule => {
        //         if(!listSchedules.includes(schedule)){
        //             console.log('entrou no if do map');
        //             return this.getEntitySchedulesByDay(scheduling._day).push(schedule).write();
        //         }
        //     });
        // }
    }

    remove(id: number){
        return this.removeScheduling(id);
    }
}