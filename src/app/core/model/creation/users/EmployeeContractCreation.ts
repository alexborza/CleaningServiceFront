import { JobInformationCreation } from "./JobInformationCreation";
import { UserInformationCreation } from "./UserInformationCreation";

export class EmployeeContractCreation {
    username: string;
    email: string;
    password: string;
    userInformationCreation: UserInformationCreation;
    jobInformationCreation: JobInformationCreation;
}