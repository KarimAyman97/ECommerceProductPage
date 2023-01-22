import { Component } from '@angular/core';
import { ProductModel } from '../interface/product-model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  realPrice: number = 250;
  discountPrice: number = 125;
  count: number = 1;
  showZoomer: boolean = false;
  selectedItem: number = 1;

  product: ProductModel = {
    name: 'Fall Limited Edition Sneakers',
    count: this.count,
    id: 1,
    price: 125,
  };

  constructor(private cartService: CartService) {}

  increaseNumberRequired() {
    this.count++;
  }

  decreaseNumberRequired() {
    if (this.count <= 0) {
      this.count = 1;
    } else if (this.count === 1) {
    } else {
      this.count--;
    }
  }

  showZoomed() {
    this.showZoomer = true;
    document!.getElementById('Zoomer')!.style.backgroundColor =
      'hsl(0, 0%, 0%, 75%)';
    document!.getElementById('Zoomer')!.style.zIndex = '0';
  }

  onCloseZoomer(event: any) {
    this.showZoomer = false;
    document!.getElementById('Zoomer')!.style.backgroundColor = 'transparent';
    document!.getElementById('Zoomer')!.style.zIndex = '-1';
  }

  selectItem1(event: any) {
    this.selectedItem = 1;
  }

  selectItem2(event: any) {
    this.selectedItem = 2;
  }

  selectItem3(event: any) {
    this.selectedItem = 3;
  }

  selectItem4(event: any) {
    this.selectedItem = 4;
  }

  moveBack(event: any) {
    if (this.selectedItem === 1) {
      this.selectedItem = 4;
    } else {
      this.selectedItem--;
    }
  }

  moveForward(event: any) {
    if (this.selectedItem === 4) {
      this.selectedItem = 1;
    } else {
      this.selectedItem++;
    }
  }

  addToCart() {
    this.product.count = this.count;
    this.cartService.shop(this.product);
  }
}
