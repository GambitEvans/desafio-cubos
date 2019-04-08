import { Path, GET, POST, DELETE, PathParam} from 'typescript-rest';
import Scheduling from '../models/Scheduling';
import SchedulesService from '../services/SchedulingService';
import Validations from '../utils/ValidationUtil';
import ScheduleDTO from '../dto/ScheduleDTO';
import SchedulingUtils from '../utils/SchedulingUtils';
import Schedule from '../models/Schedule';
import moment = require('moment');
import DateUtils from '../utils/DateUtils';
import DateRangeDTO from '../dto/DateRangeDTO';

@Path('/schedules')
export class SchedulingController {
    Util = new Validations();
    DateUtils = new DateUtils();
    schedulingUtils = new SchedulingUtils()
    service: SchedulesService = new SchedulesService();;
    constructor(){}
    
    @GET
    getAllScheduling(): Scheduling[]{
        return this.service.getAll();
    }

    //Lists all scheduling.
    @GET
    @Path('by')
    getAllByInterval(dateRange: DateRangeDTO): Scheduling[] | string {
        if(this.Util.validateDateRange(dateRange))return this.service.getAllByInterval(dateRange);
        return 'Tem algo de errado com o interval informado';
    }

    @POST
    createScheduling(scheduleDTO: ScheduleDTO): Schedule | string{
        try {
            const schedule: Schedule = this.schedulingUtils.
            initSchedule(scheduleDTO);
            if(this.Util.scheduleIsValid(schedule)){
                schedule._id = this.service.getSequence();
                return this.service.postScheduling(schedule);
            }
            return 'Há algo errado com os dados que você inserir.';
        } catch(e) {
            return `Data de hoje incompatível com a regra de agendamento \n
            Data - ${moment().format('DD-MM-YYYY')},  ${this.DateUtils.getWeekDayByIndex(moment().weekday())}\n
            Regra de disponibilidade - Todo dia de ${this.DateUtils.getWeekDayByIndex(scheduleDTO.day)}.`
        }
    }

    @DELETE
    @Path(':id')
    deleteScheduling(@PathParam('id') id: number): string {
        this.service.remove(id)
        return `Agendamento com o id ${id} deletado com sucesso`;
    }
}