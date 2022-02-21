import { EmergencyContactInformationDto } from "./EmergencyContactInformationDto";
import { EmployeeInformationDto } from "./EmployeeInformationDto";
import { JobInformationDto } from "./JobInformationDto";
import { UserInformationDto } from "./UserInformationDto";

export class EmployeeDto {
    id!: number;
    type!: string;
    username!: string;
    email!: string;
    password!: string;
    userInformation!: UserInformationDto;
    employeeInformation!: EmployeeInformationDto;
}