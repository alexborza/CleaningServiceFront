export class MessageCreation {
    sender: string;
    content: string;

    constructor(sender: string, content: string) {
        this.sender = sender;
        this.content = content;
    }
}