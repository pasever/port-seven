import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ModelModule } from '../model/model.module';
import { TableComponent } from './table.component';
import { FormComponent } from './form.component';
import { SharedState, SHARED_STATE } from './sharedState.model';
import { Subject } from 'rxjs';


@NgModule({
    imports: [ BrowserModule, FormsModule, ModelModule ],
    declarations: [TableComponent, FormComponent ],
    providers: [{ provide: SHARED_STATE, useValue: new Subject<SharedState>() }],
    exports: [ ModelModule, TableComponent, FormComponent ]
})
export class CoreModule { }
