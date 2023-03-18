import { JobInformation } from "./JobInformation";
import { User } from "./User";

export class Employee extends User {
    jobInformationRepresentation: JobInformation;
}