import ScheduleDTO from '../dto/ScheduleDTO';
import Schedule from '../models/Schedule';
import Interval from '../models/Interval';
import DateUtils from '../utils/DateUtils'; 
import Scheduling from 'src/models/Scheduling';
import * as moment from 'moment';
import ValidationUtil from './ValidationUtil';

export default class SchedulingUtils {
    Util = new DateUtils();
    validationUtil = new ValidationUtil();
    initSchedule(scheduleDTO: ScheduleDTO): Schedule {
        let schedule = new Schedule(new Interval());
        if(!this.validationUtil.validateInterval(scheduleDTO.interval)){
            throw 'Erro - Verifique o intervalo.';
        }
        if(scheduleDTO.type === 'DAY') {
            if(scheduleDTO.date === (null||undefined)){
                throw 'Erro - Verifique a data';
            } else if(!moment(scheduleDTO.date, 'DD-MM-YYYY').isValid()) {
                throw 'Data inválida!';
            } else if(moment().isAfter(new Date(scheduleDTO.date))) {
                throw `Que eu saiba você não é o Matt McFly nem o DR. Emmett Brown pra viajar pelo tempo
            por isso não permitirei que agende um atendimento numa data passada.`;
            } 
            schedule._date = scheduleDTO.date;
        } else if(scheduleDTO.type === 'WEEKLY') {
            if(moment().weekday() != scheduleDTO.day){
                throw `Data de hoje incompatível com a regra de agendamento \n
                Data - ${moment().format('DD-MM-YYYY')},  ${this.Util.getWeekDayByIndex(moment().weekday())}\n
                Regra de disponibilidade - Todo dia de ${this.Util.getWeekDayByIndex(scheduleDTO.day)}.`;
            }
        } else if(scheduleDTO.type != 'DAILY') {
            throw 'Erro - Verifique o tipo do agendamento.';
        }
        schedule._type = scheduleDTO.type;
        if(schedule._date === (null || undefined)){
            schedule._date = this.Util.atualDate;
        }
        schedule._day = this.Util.getWeekDay(scheduleDTO.date);
        schedule._interval._start = scheduleDTO.interval._start;
        schedule._interval._end = scheduleDTO.interval._end;

        return schedule;
    }

    initScheduling(schedule: Schedule){
        let scheduling = new Scheduling([]);
        let interval = new Interval();
        scheduling._id = schedule._id;
        scheduling._type = schedule._type;
        scheduling._date = schedule._date;
        scheduling._day = this.Util.getWeekDay(schedule._date);
        interval._start = schedule._interval._start;
        interval._end = schedule._interval._end;
        scheduling._interval.push(interval);
        return scheduling;
    }
}