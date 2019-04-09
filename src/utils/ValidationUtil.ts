import * as moment from 'moment';
import Interval from '../models/Interval';
import Schedule from '../models/Schedule';
import DateRangeDTO from '../dto/DateRangeDTO';
import DataUtil from '../utils/DateUtils';
export default class ValidationUtil {

    Util = new DataUtil();
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

    dateIsValid(date: string): boolean{ 
        const newDate = moment(new Date(date));
        const today = moment(new Date(this.Util.atualDate));
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