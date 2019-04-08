import * as moment from 'moment';
import Interval from '../models/Interval';
import Schedule from '../models/Schedule';
import DateRangeDTO from '../dto/DateRangeDTO';

export default class ValidationUtil {
    validateInterval(interval: Interval): boolean{
        const start = moment(interval._start, 'HH:mm', true);
        const end = moment(interval._end, 'HH:mm', true);
        if(!start.isValid() || !end.isValid() || start.isAfter(end))return false;
        return true;
    }

    validateDateRange(dateRange: DateRangeDTO): boolean{
        const start = moment(dateRange._start, 'DD-MM-YYYY');
        const end = moment(dateRange._end, 'DD-MM-YYYY');
        if(start.isAfter(end))return false;
        return true;
    }

    scheduleIsValid(schedule: Schedule): boolean{
        if(!this.dateIsValid(schedule._date)
            || !this.intervalIsValid(schedule._interval))
                return false;
        return true;
    }

    dateIsValid(date: Date): boolean{
        const today: Date = new Date(moment().format('DD-MM-YYYY')); 
        const newDate = moment(date, 'DD-MM-YYYY');
        if(newDate.isAfter(today) 
            || !newDate.isValid()) return false;
        return true;
    }

    intervalIsValid(interval: Interval): boolean{
        let auxInterval = new Interval();
        auxInterval._start = interval._start; 
        auxInterval._end = interval._end;
        if(this.validateInterval(interval))return true;
        return false;
    }
}