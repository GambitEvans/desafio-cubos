import ScheduleDTO from '../dto/ScheduleDTO';
import Schedule from '../models/Schedule';
import Interval from '../models/Interval';
import DateUtils from '../utils/DateUtils'; 
import Scheduling from 'src/models/Scheduling';
import moment = require('moment');

export default class SchedulingUtils {
    Util = new DateUtils();
    initSchedule(scheduleDTO: ScheduleDTO): Schedule {
        let schedule = new Schedule(new Interval());
        if(scheduleDTO.type === 'DAILY'){
            schedule._date = new Date(moment().format('DD-MM-YYYY'));
            schedule._day = this.Util.getWeekDay(scheduleDTO.date);
            schedule._interval._start = scheduleDTO.interval._start;
            schedule._interval._end = scheduleDTO.interval._end;
            return schedule;
        } else if(scheduleDTO.type === 'WEEKLY') {
            if(moment().weekday() == scheduleDTO.day){
                schedule._date = new Date(moment().format('DD-MM-YYYY'));
                schedule._day = this.Util.getWeekDayByIndex(scheduleDTO.day);
                schedule._interval._start = scheduleDTO.interval._start;
                schedule._interval._end = scheduleDTO.interval._end;
                return schedule;
            }
        } else {
            schedule._date = scheduleDTO.date;
            schedule._day = this.Util.getWeekDay(scheduleDTO.date);
            schedule._interval._start = scheduleDTO.interval._start;
            schedule._interval._end = scheduleDTO.interval._end;
            return schedule;
        }
    }

    initScheduling(schedule: Schedule){
        let scheduling = new Scheduling([]);
        let interval = new Interval();
        scheduling._id = schedule._id;
        scheduling._date = schedule._date;
        scheduling._day = this.Util.getWeekDay(schedule._date);
        interval._start = schedule._interval._start;
        interval._end = schedule._interval._end;
        scheduling._interval.push(interval);
        return scheduling;
    }
}