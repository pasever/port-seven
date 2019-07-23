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
      messageService.messages.subscribe(message => this.lastMessage = message);
    }
}
