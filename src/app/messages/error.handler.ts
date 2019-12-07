import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MessageService } from './message.service';
import { Message } from './message.model';
import { Error } from 'tslint/lib/error';


@Injectable()
export class MessageErrorHandler implements ErrorHandler {
  constructor(
      private messageService: MessageService,
      private ngZone: NgZone
  ) {
  }

  handleError(error) {
      let msg = error instanceof Error ? error.message : error.toString();
      this.ngZone.run(() => this.messageService.reportMessage(new Message(msg, true)), 0);
  }
}