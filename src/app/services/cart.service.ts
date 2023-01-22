import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ProductModel } from '../interface/product-model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  //A subject that you can subscribe on
  shopCardProduct = new Subject<ProductModel[]>();

  //array behind the products in the cart
  products: ProductModel[] = new Array<ProductModel>();

  objectToDelete?: ProductModel;

  constructor() {
    this.shopCardProduct = new BehaviorSubject<ProductModel[]>(
      new Array<ProductModel>()
    );
  }

  shop(product: ProductModel) {
    this.addOrReplaceObject(this.products, product);
    this.shopCardProduct.next(this.products);
  }

  getCart(): Subject<ProductModel[]> {
    return this.shopCardProduct;
  }

  addOrReplaceObject(array: ProductModel[], newObject: ProductModel) {
    const index = array.findIndex((obj) => obj.id === newObject.id);
    if (index !== -1) {
      array.splice(index, 1, newObject);
    } else {
      array.push(newObject);
    }
  }

  deleteObject(objectDeleted: ProductModel) {
    this.products.forEach((object, index) => {
      if (object.id === objectDeleted.id) {
        this.objectToDelete = object;
        this.products.splice(index, 1);
      }
    });
    this.shopCardProduct.next(this.products);
  }
}
