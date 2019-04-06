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

    @POST
    createScheduling(scheduling: Scheduling): string {
        if(this.Util.schedulingIsValid(scheduling)){
            scheduling._id = this.service.getSequence();
            this.service.postScheduling(scheduling);
            this.service.updateSequence(scheduling._id);
            return 'Agendamento realizado com sucesso.'
        }
        return 'Há algo errado com os dados que você inserir.';
    }

    @DELETE
    @Path(':id')
    deleteScheduling(@PathParam('id') id: number): string {
        this.service.remove(id)
        return 'agendamento com o id ' + id + ' deletado com sucesso';
    }
}