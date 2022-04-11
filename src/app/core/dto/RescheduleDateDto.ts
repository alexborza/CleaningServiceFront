export class RescheduleDateDto {
    dateToReschedule: string;
    rescheduledDate: string;
    startingHour: number;
    endingHour: number;

    constructor(dateToReschedule: string, rescheduledDate: string, startingHour: number, endingHour: number){
        this.dateToReschedule = dateToReschedule;
        this.rescheduledDate = rescheduledDate;
        this.startingHour = startingHour;
        this.endingHour = endingHour;
    }
}