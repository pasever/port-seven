import { Component, DoCheck } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../model/product.model';
import { Model } from '../model/repository.model';
import { MODES, SharedState} from './sharedState.model';

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements DoCheck {
  product: Product = new Product();
  lastId: number;

  constructor(
    private model: Model,
    private state: SharedState
  ) { }


  get editing(): boolean {
    return this.state.mode === MODES.EDIT;
  }

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

  ngDoCheck() {
    if (this.lastId !== this.state.id) {
      this.product = new Product();
    }
    if (this.state.mode === MODES.EDIT) {
      Object.assign(this.product, this.model.getProduct(this.state.id))
    }
    this.lastId = this.state.id;
  }

}
