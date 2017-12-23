import { Component} from '@angular/core';
import { EmitterService } from '../services/emitter.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {

    private productInfo = 'CRUD_PRODUCT_INFO';
    private reset = 'CRUD_RESET_FORM';
    private productList = 'CRUD_PRODUCT_LIST';

    constructor(private _emitterService: EmitterService) {}

}
