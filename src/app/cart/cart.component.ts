import { Component, OnInit } from '@angular/core';
import { ItemService } from './servicescart/item.service';
import { ProductModel } from '../admin/productModel';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: ProductModel[] = [];
  constructor(private itemService: ItemService) { }
  getItemsForCart(): void {
    this.cartItems = this.itemService.getSelectedItems();
    console.log(this.cartItems);
  }
  ngOnInit(): void {
    this.getItemsForCart();
  }
  removeItemFromCart(_id: String): void {
    this.itemService.removeItem(_id);
  }
}
