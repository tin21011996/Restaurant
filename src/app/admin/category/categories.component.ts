import { Component } from '@angular/core';
import { EmitterService } from '../services/emitter.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent {

  private categoryInfo = 'CRUD_CATEGORY_INFO';
  private reset = 'CRUD_RESET_FORM';
  private categoryList = 'CRUD_CATEGORY_LIST';

  constructor(private _emitterService: EmitterService) {}
}
