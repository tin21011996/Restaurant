import { Component, OnChanges, Input, OnInit } from '@angular/core';
import { ProductModel } from '../../admin/productModel';
import { HttpService } from '../../admin/services/http.service';
import { EmitterService } from '../../admin/services/emitter.service';
import { ItemService } from '../../cart/servicescart/item.service';
import { Item } from '../../cart/servicescart/item';

@Component({
  selector: 'app-add-productdetail',
  templateUrl: './add-productdetail.component.html',
  styleUrls: ['./add-productdetail.component.css'],
  providers: [HttpService]
})
export class AddProductdetailComponent implements OnChanges, OnInit {
  [x: string]: any;

  @Input() productInfo: string;
  @Input() reset: string;
  @Input() productList: string;

  private isInsert: Boolean = true;
  private productModel: ProductModel = new ProductModel('', '', 0, '', 0, '');

  storeItems: Item[] = [];
  errorMessage: String;

  constructor(private itemService: ItemService,
    private _emitterService: EmitterService) { }
  getStoreItems(): void {
     this.itemService.getItems().subscribe(
             data => this.storeItems = data,
         error =>  this.errorMessage = <any>error);
  }
  ngOnInit(): void {
       this.getStoreItems();
  }
  addItemInCart(_id: String): void {
     this.itemService.addItem(_id);
  }
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
