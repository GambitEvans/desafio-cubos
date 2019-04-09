import { EnumType } from '../enum/EnumType';
import Interval from '../models/Interval';

export default class ScheduleDTO {
    public date: string;
    public day: number;
    public type: EnumType;
    public interval: Interval;

    constructor(_interval: Interval){
        this.interval = _interval;
    }
}