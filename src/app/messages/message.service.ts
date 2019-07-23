import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable()
export class MessageService {

    private handler: (message: Message) => void;
    private subject = new Subject<Message>();

    reportMessage(msg: Message) {
        this.subject.next(msg);
    }

    get messages(): Subject<Message> {
        return this.subject;
    }

}
