import { Component, Input, OnChanges } from '@angular/core';
import { HttpService } from '../services/http.service';

import { EmitterService } from '../services/emitter.service';

import { ProductModel } from '../productModel';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [HttpService]
})
export class AddProductComponent implements OnChanges {

  @Input() productInfo: string;
  @Input() reset: string;
  @Input() productList: string;

  private isInsert: Boolean = true;
  private productModel: ProductModel = new ProductModel('', '', 0, '', 0, '');

  constructor( private httpService: HttpService ) { }
  public addProduct() {
    this.httpService.addProduct(this.productModel).subscribe(
      response =>  {
        if (response.error) {
          alert(`The product could not be added, server Error.`);
        } else {
          EmitterService.get(this.productList).emit(response.products);
        }
      },
      error => {
        alert(`The product could not be added, server Error.`);
      }
    );
  }
  public updateProduct() {
    this.httpService.updateProduct(this.productModel).subscribe(
      response => {
        if (response.error) {
          alert(`The product could not be updated, server Error.`);
        } else {
          EmitterService.get(this.productList).emit(response.products);
        }
      },
      error => {
        alert(`The product could not be updated, server Error.`);
      }
    );
  }
  public resetAddProduct() {
    this.productModel = new ProductModel('', '', 0, '', 0, '');
    EmitterService.get(this.reset).emit(true);
    this.isInsert = true;
  }
  ngOnChanges(changes: any) {
    EmitterService.get(this.productInfo).subscribe( (value: ProductModel) => {
      this.productModel = new ProductModel(value._id, value.name, value.price, value.description, value.sort_order, value.urlimage);
      this.isInsert = false;
    });
  }
}
