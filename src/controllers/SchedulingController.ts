import { Path, GET, POST, DELETE, PathParam, Param} from 'typescript-rest';
import Scheduling from '../models/Scheduling';
import SchedulesService from 'src/services/SchedulingService';
import Interval from '../models/Interval';
import Validations from '../utils/ValidationUtil';

@Path('/schedules')
export class SchedulingController {
    Util = new Validations();
    service: SchedulesService = new SchedulesService();;
    constructor(){}

    //Lists all scheduling.
    @GET
    getAllByInterval(interval: Interval): Scheduling[] | string {
        if(this.Util.validateInterval(interval))
            return this.service.getAllByInterval(interval);
        return 'Tem algo de errado com o interval informado';
    }

    // @GET
    // @Path(':schedule')  
    // getSchedulingBySchedule(@PathParam('schedule') schedule: Schedule): Scheduling{
    //     return this.service.getSchedulingBySchedule(schedule);
    // }

    @POST
    createScheduling(scheduling: Scheduling){
        return this.service.postScheduling(scheduling);
    }

    @DELETE
    @Path(':id')
    deleteScheduling(@PathParam('id') id: number){
        return this.service.remove(id);
    }
}