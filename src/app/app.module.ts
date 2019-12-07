import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModelModule } from './model/model.module';
import { CoreModule } from './core/core.module';
import { TableComponent } from './core/table.component';
import { FormComponent } from './core/form.component';
import { MessageModule } from './messages/message.module';
import { MessageComponent } from './messages/message.component';
import { PopupComponent } from './core/popup.component';
import { MessageContentComponent } from './core/message-content.component';
import { ContentTabsDemoComponent } from './core/content-tabs-demo.component';
import { ContentTabComponent } from './core/content-tab.component';
import { ContentTabsetComponent } from './core/content-tabset.component';
import { ModalComponent } from './core/modal/modal.component';
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
import { OverlayModule } from '@angular/cdk/overlay';


@NgModule({
  imports: [
    BrowserModule,
    ModelModule,
    CoreModule,
    MessageModule,
    OverlayModule
  ],
  providers: [],
  bootstrap: [
    TableComponent,
    FormComponent,
    MessageComponent,
    PopupComponent,
    MessageContentComponent,
    ContentTabsDemoComponent,
    ContentTabComponent,
    ContentTabsetComponent
  ],
  declarations: [ModalComponent]
})
export class AppModule { }
