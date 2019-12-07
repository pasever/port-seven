import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ModelModule } from '../model/model.module';
import { TableComponent } from './table.component';
import { FormComponent } from './form.component';
import { SharedState, SHARED_STATE } from './sharedState.model';
import { Subject } from 'rxjs';
import { StatePipe } from './state.pipe';
import { MessageModule } from '../messages/message.module';
import { MessageService } from '../messages/message.service';
import { Message } from '../messages/message.model';
import { Model } from '../model/repository.model';
import { MODES } from './sharedState.model';
import { PopupComponent } from './popup.component';
import { PopupDirective } from '../directives/popup';
import { MessageContentComponent } from './message-content.component';
import { ContentTabsDemoComponent } from './content-tabs-demo.component';
import { ContentTabComponent } from './content-tab.component';
import { ContentTabsetComponent } from './content-tabset.component';


@NgModule({
    imports: [ BrowserModule, FormsModule, ModelModule, MessageModule ],
    declarations: [
        TableComponent,
        FormComponent,
        StatePipe,
        PopupComponent,
        PopupDirective,
        MessageContentComponent,
        ContentTabsDemoComponent,
        ContentTabComponent,
        ContentTabsetComponent
    ],
    providers: [{
    provide: SHARED_STATE,
    deps: [ MessageService, Model ],
    useFactory: (messageService, model) => {
        const subject = new Subject<SharedState>();
        subject.subscribe(message => messageService.reportMessage(
            new Message(MODES[message.mode] + (message.id !== undefined
                ? ` ${model.getProduct(message.id).name}` : ''))));
        return subject;
        }
    }]
})
export class CoreModule { }
