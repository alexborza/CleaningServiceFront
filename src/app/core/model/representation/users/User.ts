import { UserInformation } from "./UserInformation";

export abstract class User {
    id: number;
    username: string;
    email: string;
    userInformation: UserInformation;
}