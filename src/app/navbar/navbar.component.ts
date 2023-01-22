import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CartService } from '../services/cart.service';
import { ProductModel } from './../interface/product-model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  showCart: boolean = false;

  cartSubject = new Subject<ProductModel[]>();
  products: ProductModel[] = new Array<ProductModel>();

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.getCartData();
  }

  getTotal(product: ProductModel) {
    return product.price * product.count;
  }

  getCartData() {
    this.cartSubject = this.cartService.getCart();
    this.cartSubject.subscribe((data) => {
      this.products = data;
    });
  }

  ngOnDestroy() {
    this.cartSubject.unsubscribe();
  }

  deleteItemFromCart(product: ProductModel) {
    this.cartService.deleteObject(product);
  }
}
