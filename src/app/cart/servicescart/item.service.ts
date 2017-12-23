import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { ProductModel } from '../../admin/productModel';

@Injectable()
export class ItemService {
  observableItems: Observable<ProductModel[]>;
  allItems: ProductModel[] = [];
    selectedItems: ProductModel[] = [];
  errorMessage: string;
  url = 'http://localhost:8080/api/products';
  constructor(private http: Http) {
    this.observableItems = this.http.get(this.url).map((res: Response) => res.json());
      this.observableItems.subscribe(
        data => this.allItems = data,
        error =>  this.errorMessage = <any>error);
      }
      getItems(): Observable<ProductModel[]> {
        return this.observableItems;
      }
      getSelectedItems(): ProductModel[] {
        return this.selectedItems;
      }
    addItem(_id: String): void {
       let item = this.allItems.find(ob => ob._id === _id);
       if (this.selectedItems.indexOf(item) < 0) {
         this.selectedItems.push(item);
        }
    }
    removeItem(_id: String): void {
      let item = this.selectedItems.find(ob => ob._id === _id);
      let itemIndex = this.selectedItems.indexOf(item);
      this.selectedItems.splice(itemIndex, 1);
    }
}
