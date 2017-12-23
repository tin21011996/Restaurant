import { Component, OnInit} from '@angular/core';
import { EmitterService } from '../admin/services/emitter.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css'],
})
export class ProductdetailComponent {

  private productInfo = 'CRUD_PRODUCT_INFO';
  private reset = 'CRUD_RESET_FORM';
  private productList = 'CRUD_PRODUCT_LIST';

  constructor( private _emitterService: EmitterService) { }
}
