import { EmploymentStatusEnum } from "./EmploymentStatusEnum";

export class JobInformationDto {
    title!: string;
    supervisor!: string;
    workPhone!: string;
    employmentStatus!: EmploymentStatusEnum;
    hiringDate!: string;
    salary!: string;
}