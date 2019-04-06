import Scheduling from '../models/Scheduling';
import Interval from '../models/Interval'
import BaseDAO from './BaseDao';

export default class SchedulingDAO extends BaseDAO {
    //get the next id available for insertion.
    getSequence(){
        this.getEntity('sequence_scheduling').value();
    }

    //generates the next id available for insertion.
    updateSequence(sequence: number){
        const newSequence = sequence + 1;
        this.db.set('sequence_scheduling', newSequence).write();
    }

    //get all the schedules.
    getAll(){
        return this.getEntity('scheduling').values();
    }

    //picks up all schedules based on a given date range.
    getSchedulingByInterval(interval: Interval): Scheduling[]{
        return this.getEntity('scheduling').find({ _interval: interval }).value();
    }

    //creates a scheduling
    createScheduling(scheduling: Scheduling){
        return this.db.get('scheduling').push(scheduling).write();
    }

    //removes a scheduling
    removeScheduling(id: number){
        return this.db.get('scheduling').remove({_id: id}).write();
    }

    //verifies if exists a scheduling for a given date.
    existScheduling(date: Date): boolean{
        if(this.getEntity('scheduling').find({_day: date}).value()==null)return true;
        return false;
    }
}