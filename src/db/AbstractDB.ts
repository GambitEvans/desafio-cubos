import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import Scheduling from '../models/Scheduling';

export class AbstractDB {
    adapter:FileSync = new FileSync('./src/db.json');
    db:lowdb = lowdb(this.adapter);
    constructor() {}

    getAllSchedules() {
        return this.db.get('schedules').values();
    }

    getScheduleId(id:number){
        return this.db.get('schedules').find({_id: id}).value();
    }

    createSchedule(schedule: Scheduling){
        return this.db.get('schedules').push(schedule).write();
    }

    removeSchedules(id){
        return this.db.get('schedules').remove({_id: id}).write();
    }
}