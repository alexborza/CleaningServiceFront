import { AvailableInterval } from "./AvailableInterval";

export class AvailableHour {
    employeeId!: number;
    interval!: AvailableInterval; 
    label!: string;

    constructor(employeeId: number, interval: AvailableInterval, label: string){
        this.employeeId = employeeId;
        this.interval = interval;
        this.label = label;
    }
}