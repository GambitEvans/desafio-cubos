import * as moment from 'moment';
import Interval from '../models/Interval';

export default class ValidationUtil {
    validateInterval(interval: Interval): boolean{
        const start = moment(interval._start, 'DD-MM-YYYY');
        const end = moment(interval._end, 'DD-MM-YYYY');
        if(!start.isValid() 
            || !end.isValid() 
            || start.isAfter(end))return false;
        return true;
    }
}