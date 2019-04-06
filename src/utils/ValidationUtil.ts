import * as moment from 'moment';
import Interval from '../models/Interval';
import Scheduling from 'src/models/Scheduling';

export default class ValidationUtil {
    
    validateInterval(interval: Interval): boolean{
        const start = moment(interval._start, 'DD-MM-YYYY');
        const end = moment(interval._end, 'DD-MM-YYYY');
        if(!start.isValid() 
            || !end.isValid() 
            || start.isAfter(end))return false;
        return true;
    }

    schedulingIsValid(scheduling: Scheduling): boolean{
        if(!this.idIsEmpty(scheduling._id) 
            || !this.dateIsValid(scheduling._date)
            || !this.intervalIsValid(scheduling._interval))
                return false;
        return true;
    }

    idIsEmpty(id: number): boolean{
        if(id === (null || undefined))return true;
        return false;
    }

    dateIsValid(date: Date): boolean{
        const newDate = moment(date, 'DD-MM-YYY');
        if(newDate.isBefore(Date.now()) || newDate.isValid()) return false;
        return true;
    }

    intervalIsValid(interval: Interval[]): boolean{
        if(this.validateInterval(interval[0]))return true;
        return false;
    }
}