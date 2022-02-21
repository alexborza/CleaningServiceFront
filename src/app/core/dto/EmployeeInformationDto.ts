import { EmergencyContactInformationDto } from "./EmergencyContactInformationDto";
import { JobInformationDto } from "./JobInformationDto";

export class EmployeeInformationDto {
    id!: number;
    jobInformation!: JobInformationDto;
    emergencyContactInformation!: EmergencyContactInformationDto;
}