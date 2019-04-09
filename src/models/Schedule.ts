import Interval from './Interval';
import { EnumType } from 'src/enum/EnumType';

export default class Schedule {
    public _id: number;
    public _type: EnumType;
    public _date: string;
    public _day: string;
    public _interval: Interval;

    constructor(interval: Interval){
        this._interval = interval;
    }
}