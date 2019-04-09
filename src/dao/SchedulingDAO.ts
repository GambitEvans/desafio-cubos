import Scheduling from '../models/Scheduling';
import BaseDAO from './BaseDao';
import Interval from 'src/models/Interval';

export default class SchedulingDAO extends BaseDAO {
    //get the next id available for insertion.
    getSequence(){
        return this.getEntity('sequence_scheduling').value();
    }

    //generates the next id available for insertion.
    updateSequence(sequence: number){
        const newSequence = sequence + 1;
        this.db.set('sequence_scheduling', newSequence).write();
    }

    //get all the schedules.
    getAll(): Scheduling[]{
        return this.getEntity('scheduling').values();
    }

    //creates a scheduling
    createScheduling(scheduling: Scheduling){
        return this.db.get('scheduling').push(scheduling).write();
    }

    //removes a scheduling
    removeScheduling(id: number){
        return this.db.get('scheduling').remove({ _id: id }).write();
    }

    //verifies if exists a scheduling for a given date.
    existScheduling(date: string, type: string): boolean{
        if(this.getSchedulingByDateAndType(date, type)!=null)return true;
        return false;
    }

    getSchedulingByDateAndType(date: string, type: string): Scheduling {
        return this.getEntity('scheduling').find({ _date: date, _type: type }).value();
    }

    insertInterval(date: string, type: string, interval: Interval){
        return this.getEntity('scheduling').find({ _date: date, _type: type }).get('_interval').push(interval).write();
    }
}