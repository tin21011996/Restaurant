import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { HttpService } from '../../admin/services/http.service';
import { EmitterService } from '../../admin/services/emitter.service';
import { ProductModel } from '../../admin/productModel';
import { ItemService } from '../../cart/servicescart/item.service';

@Component({
  selector: 'app-productdetail-list',
  templateUrl: './productdetail-list.component.html',
  styleUrls: ['./productdetail-list.component.css'],
  providers: [ HttpService ]
})

export class ProductdetailListComponent implements OnInit, OnChanges {

  @Input() reset: string;
  @Input() productInfo: string;
  @Input() productList: string;

  private productsList;
  private currentProduct: ProductModel;
  private isReset: Boolean = true;

  storeItems: ProductModel[] = [];
  errorMessage: string;

  constructor( private httpService: HttpService,
    private itemService: ItemService ) { }
  ngOnInit() {
    this.httpService.getAllProductPage(1).subscribe(
      response => this.productsList = response.products,
      error =>  { alert(`Can't get products.`); }
    );
  }
  addItemInCart(_id: String): void {
    this.itemService.addItem(_id);
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

  public getAllProductPage(page: Number) {
    this.httpService.getAllProductPage(page).subscribe(
      response => this.productsList = response.products,
      error =>  { alert(`Can't get products.`); }
    );
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
