import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class Model {
  products: Product[] = [];
  private locator = (product: Product, id: number) => product.id === id;

  constructor(private dataSource: RestDataSource) {
    // this.dataSource.getData().forEach(product => this.products.push(product));
      this.dataSource.getData().subscribe(data => this.products = data);
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProduct(id: number): Product {
    return this.products.find(p => this.locator(p, id));
  }

  saveProduct(product: Product): void {
      if (product.id === 0 || product.id === null) {
          this.dataSource.saveProduct(product).subscribe(p => {
              this.products.push(p);
          });
      } else {
          this.dataSource.updateProduct(product).subscribe(p => {
              let index = this.products.findIndex(item => this.locator(item, p.id));
              this.products.splice(index, 1, p);
          });
      }
  }

  deleteProduct(id: number): void {
      this.dataSource.deleteProduct(id).subscribe(() => {
         let index = this.products.findIndex(p => this.locator(p, id));
            if (index > -1) {
                this.products.splice(index, 1);
            }
      });
  }

 private generateID(): number {
  let candidate = 100;
  while (this.getProduct(candidate) !== null) {
    candidate++;
  }
  return candidate;
 }

}
