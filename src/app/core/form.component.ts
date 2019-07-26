import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../model/product.model';
import { Model } from '../model/repository.model';
import { MODES, SharedState, SHARED_STATE } from './sharedState.model';
import { Observable } from 'rxjs';
import { filter, map, distinctUntilChanged, skipWhile } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  product: Product = new Product();

  constructor(
    private model: Model,
    @Inject(SHARED_STATE) private stateEvents: Observable<SharedState>
  ) {
    stateEvents
        // .pipe(skipWhile(state => state.mode === MODES.EDIT))
        // .pipe(distinctUntilChanged())
        // .pipe(map(state => state.mode == MODES.EDIT ? state.id : -1))
        //   .pipe(filter(id => id !== 3))
        //   .subscribe((id) => {
        //       this.editing = id !== -1;
        //       this.product = new Product();
        //       if (id !== -1) {
        //           Object.assign(this.product, this.model.getProduct(id))
        //       }
        //   });
    //     .pipe(map(state => new SharedState(state.mode, state.id === 5 ? 1 : state.id)))
    //     .pipe(filter(state => state.id !== 3))
        .subscribe(update => {
      this.product = new Product();
      if (update.id !== undefined) {
        Object.assign(this.product, this.model.getProduct(update.id));
      }
      this.editing = update.mode === MODES.EDIT;
    });
  }

  editing = false;

  submitForm(form: NgForm) {
    if (form.valid) {
      this.model.saveProduct(this.product);
      this.product = new Product();
      form.reset();
    }
  }

  resetForm() {
    this.product = new Product();
  }

}
