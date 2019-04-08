import Scheduling from '../models/Scheduling';
import SchedulingDAO from 'src/dao/SchedulingDAO';
import Interval from 'src/models/Interval';
import * as moment from "moment";
import Schedule from 'src/models/Schedule';
import SchedulingUtils from 'src/utils/SchedulingUtils';
import DateRange from 'src/dto/DateRangeDTO';
import { identity } from 'rxjs';

export default class SchedulingService extends SchedulingDAO {
    
    schedulingUtis = new SchedulingUtils();

    getAllByInterval(dateRange: DateRange): Scheduling[] {
        const start = moment(dateRange._start, 'DD-MM-YYYY');
        const end = moment(dateRange._end, 'DD-MM-YYYY')
        const resultado: Scheduling[] = this.getAll().filter(item => {
            const data = moment(item._date, 'DD-MM-YYYY');
            if(data.isBetween(start, end))return item;
        });
        return resultado;
    }
    
    postScheduling(schedule: Schedule): string{
            try{
            const scheduling = this.schedulingUtis.initScheduling(schedule);
            if(this.existScheduling(schedule._date)){
                const intervals = this.getSchedulingsByDate(schedule._date)._interval;
                if(this.intervalExistInArray(intervals, schedule._interval)){
                    return `O intervalo de ${schedule._interval._start} às 
                        ${schedule._interval._end} já está reservado para este dia.`;;
                } else {
                    this.insertInterval(schedule._date, schedule._interval);
                    return `Os horários do dia ${schedule._date} foram atualizados`;
                }
            }
            this.createScheduling(scheduling);
            this.updateSequence(schedule._id);
            return 'Agendamento realizado com sucesso.';
        } catch(e) {
            return e;
        }
    }

    getIntervalByDate(date: Date): Scheduling{
        return this.getSchedulingsByDate(date);
    }

    remove(id: number){
        return this.removeScheduling(id);
    }

    intervalExistInArray(schedulingItervals: Interval[], scheduleInterval: Interval): boolean | string {
        let exist: boolean = false;        
        const intervalStart = moment(scheduleInterval._start, 'HH:mm');
        const intervalEnd = moment(scheduleInterval._end, 'HH:mm');
        schedulingItervals.map(item => {
            const intervalsStart = moment(item._start, 'HH:mm');
            const intervalsEnd = moment(item._end, 'HH:mm');
            if((intervalsStart.isSame(intervalStart)
                && intervalsEnd.isSame(intervalEnd))) {
                    exist = true; 
            } 
            if(intervalsStart.isBetween(intervalsStart, intervalsEnd)
                || intervalsEnd.isBetween(intervalStart, intervalEnd)){
                    throw 'Horário conflitante com a agenda';
            }
            if(intervalsStart.isSameOrAfter(intervalsEnd)){
                throw 'O horário de início não pode ser maior que o horário do fim atendimento';        
            }
        });
        return exist;    
    }
}