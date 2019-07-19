import { Component } from '@angular/core';
import { MessageService } from './message.service';
import { Message } from './message.model';

@Component({
    selector: 'app-messages',
    templateUrl: 'message.component.html',
    styleUrls: ['./message.component.scss']
})
export class MessageComponent {
    lastMessage: Message;

    constructor(messageService: MessageService) {
        messageService.registerMessageHandler(message => this.lastMessage = message);
    }
}

// This component receives a MessageService object
// and uses it to register a handler function that will be
// invoked when a message is received by the service, assigning
// the most recent message to a property lastMessage.
