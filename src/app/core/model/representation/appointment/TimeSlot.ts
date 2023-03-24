export class TimeSlot {
    startingHour: number;
    finishingHour: number;

    constructor(startingHour: number, finishingHour: number) {
        this.startingHour = startingHour;
        this.finishingHour = finishingHour;
    }
}