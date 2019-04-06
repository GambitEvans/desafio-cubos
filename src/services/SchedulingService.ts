import Scheduling from '../models/Scheduling';
import SchedulingDAO from 'src/dao/SchedulingDAO';
import Interval from 'src/models/Interval';
import * as moment from "moment";

export default class SchedulingService extends SchedulingDAO {
    
    getAllByInterval(interval: Interval): Scheduling[] {
        const start = moment(interval._start, 'DD-MM-YYYY');
        const end = moment(interval._end, 'DD-MM-YYYY')
        const resultado: Scheduling[] = this.getAll().filter(item => {
            let data = moment(item._data, 'DD-MM-YYYY');
            if(data.isBetween(start, end))return item;
        });

        return resultado;
    }
    
    postScheduling(scheduling: Scheduling){
       return this.createScheduling(scheduling);
    }

    remove(id: number){
        return this.removeScheduling(id);
    }

    intervalExistInArray(intervals: Interval[], interval: Interval): boolean{
        let exist: boolean = false;
        const intervalStart = moment(interval._start, 'DD-MM-YYYY');
        const intervalEnd = moment(interval._end, 'DD-MM-YYYY');
        console.log(intervals[0]._start);
        intervals.map(item => {
            console.log("//");
            const intervalsStart = moment(item._start, 'DD-MM-YYYY');
            const intervalsEnd = moment(item._end, 'DD-MM-YYYY');
            if(intervalsStart.isSame(intervalStart) 
                && intervalsEnd.isSame(intervalEnd))
                    exist = true;
        });
        return exist;    
    }
}