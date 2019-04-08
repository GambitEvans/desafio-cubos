import moment = require('moment');

export default class DateUtils {
    
    getWeekDay(date: Date): string {
        const days = ['DOMINGO', 'SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO'];
        const day = moment(date, 'DD-MM-YYY'); 
        return days[day.weekday()];
    }

    getWeekDayByIndex(day: number): string {
        const days = ['DOMINGO', 'SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO'];
        return days[day];
    }
}