import { Component } from '@angular/core';
import { Product } from '../model/product.model';
import { Model } from '../model/repository.model';
import { ActivatedRoute } from '@angular/router';
// import { HighlightTrigger } from './table.animations';
import { MODES, SharedState} from './sharedState.model';

@Component({
  selector: 'paTable',
  templateUrl: 'table.component.html'
  // animations: [HighlightTrigger]
})
export class TableComponent {

  constructor(
    private model: Model,
    private state: SharedState
    // activeRoute: ActivatedRoute
  ) {
    // activeRoute.params.subscribe(params => {
    //   this.category = params.category || null;
    // });
  }

  // get categories(): string[] {
  //   return this.model.getProducts()
  //     .map(p => p.category)
  //     .filter((category, index, array) => array.indexOf(category) === index);
  // }
  // category: string = null;
  //
  // highlightCategory = '';

  getProduct(key: number): Product {
    return this.model.getProduct(key);
  }

  getProducts(): Product[] {
    return this.model.getProducts();
 }

  // getProducts(): Product[] {
  //   return this.model.getProducts()
  //     .filter(p => this.category === null || p.category === this.category);
  // }

  deleteProduct(key: number) {
    this.model.deleteProduct(key);
  }

  editProduct(key : number) {
    this.state.id = key;
    this.state.mode = MODES.EDIT;
  }

  createProduct() {
    this.state.id = undefined;
    this.state.mode = MODES.CREATE;
  }

  // getRowState(category: string): string {
  //   return this.highlightCategory === '' ? '' :
  //     this.highlightCategory === category ? 'selected' : 'notselected';
  // }
}
