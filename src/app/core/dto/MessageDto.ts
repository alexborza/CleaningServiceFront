export class MessageDto {
    messageDate: string;
    sender: string;
    content: string;

    constructor(messageDate: string, sender: string, content: string){
        this.messageDate = messageDate;
        this.sender = sender;
        this.content = content;
    }
}