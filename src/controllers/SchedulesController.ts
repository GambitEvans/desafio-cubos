import {Path, GET, POST, DELETE } from 'typescript-rest';
import Scheduling from '../models/Scheduling';
import SchedulesService from 'src/services/SchedulesService';

@Path('/schedules')
export class SchedulesController {
    service: SchedulesService = new SchedulesService();
    
    constructor(){}

    @GET
    async getSchedules() {
        return this.service.getAll();
    }

    @GET
    @Path('/id/') 
    getSchedule(id: number){
        return this.service.getScheduleById(id);
    }

    @POST
    create(schedule: Scheduling){
        return this.service.postSchedule(schedule);
    }

    @DELETE
    @Path('delete/')
    deleteSchedules(id){
        console.log(id);
        return this.service.remove(id);
    }
}