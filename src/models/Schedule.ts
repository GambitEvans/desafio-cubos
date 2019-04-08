import Interval from './Interval';

export default class Schedule {
    public _id: number;
    public _date: Date;
    public _day: string;
    public _interval: Interval;

    constructor(interval: Interval){
        this._interval = interval;
    }
}