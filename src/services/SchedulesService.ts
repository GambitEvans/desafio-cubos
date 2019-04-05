import Scheduling from '../models/Scheduling';
import { AbstractDB } from 'src/db/AbstractDB';
import { isArray } from 'util';
import { SSL_OP_CIPHER_SERVER_PREFERENCE } from 'constants';

export default class SchedulesService extends AbstractDB {
    
    getAll(): Promise<Scheduling[]> {
        return this.getAllSchedules();
    }

    getScheduleById(id: number){
        return this.getAllSchedules();
    }
    
    postSchedule(schedule: Scheduling){
        return this.createSchedule(schedule);
    }

    remove(id){
        return this.removeSchedules(id);
    }
}