import { UserInformationDto } from "./UserInformationDto";

export class UserDto {
    id!: number;
    type!: string;
    username!: string;
    email!: string;
    password!: string;
    userInformation!: UserInformationDto;
}