import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { HttpService } from '../services/http.service';
import { EmitterService } from '../services/emitter.service';

import { ProductModel } from '../productModel';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ HttpService ]
})
export class ProductListComponent implements OnInit, OnChanges {

  @Input() reset: string;
  @Input() productInfo: string;
  @Input() productList: string;

  private productsList;
  private currentProduct: ProductModel;
  private isReset: Boolean = true;

  constructor( private httpService: HttpService ) { }

  ngOnInit() {
    this.httpService.getAllProduct().subscribe(
      response => this.productsList = response.products,
      error =>  { alert(`Can't get products.`); }
    );
  }

  public productSelected(product) {
    this.currentProduct = product;
    EmitterService.get(this.productInfo).emit(this.currentProduct);
    this.isReset = true;
  }
  public isSelected(product): boolean {
    if (!this.currentProduct) {
      return false;
    }
    return this.currentProduct._id ===  product._id ? true : false;
  }

  public deleteProduct(productId: String) {
    this.httpService.deleteProduct(productId).subscribe(
      response => {
        if (response.error) {
          alert(`The product could not be deleted, server Error.`);
        } else {
          this.productsList = response.products;
        }
      },
      error => {
        alert(`The product could not be deleted, server Error.`);
      });
  }
  ngOnChanges(changes: any) {
      EmitterService.get(this.reset).subscribe( (reset: String) => {
        this.isReset = false;
      });
      EmitterService.get(this.productList).subscribe( (productList: String) => {
        this.productsList = productList;
      });
  }
}
