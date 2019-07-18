import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../model/product.model';
import { Model } from '../model/repository.model';
import { MODES, SharedState} from './sharedState.model';

// import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'paForm',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css']
})
export class FormComponent {
  product: Product = new Product();
  originalProduct = new Product();

  constructor(
    private model: Model,
    private state: SharedState
    // activeRoute: ActivatedRoute,
    // private router: Router,
  ) {
    // activeRoute.params.subscribe(params => {
    //   this.editing = params.mode == 'edit';
    //   const id = params.id;
    //   if (id != null) {
    //     Object.assign(this.product, model.getProduct(id) || new Product());
    //     Object.assign(this.originalProduct, this.product);
    //   }
    // });
  }

  // editing = false;
  get editing(): boolean {
    return this.state.mode === MODES.EDIT;
  }

  submitForm(form: NgForm) {
    if (form.valid) {
      this.model.saveProduct(this.product);
      this.product = new Product();
      form.reset();
      // this.originalProduct = this.product;
      // this.router.navigateByUrl('/');
    }
  }

  // resetForm() {
  //    this.product = new Product();
  // }
}
