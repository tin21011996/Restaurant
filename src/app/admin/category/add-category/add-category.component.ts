import { Component, Input, OnChanges } from '@angular/core';

import { CategoryModel } from '../CategoryModel';
import { HttpService } from '../servicesct/http.service';
import { EmitterService } from '../../services/emitter.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
  providers: [ HttpService ]
})

export class AddCategoryComponent implements OnChanges {

  @Input() categoryInfo: string;
  @Input() reset: string;
  @Input() categoryList: string;

  private isInsert: Boolean = true;
  private categoryModel: CategoryModel = new CategoryModel('', '', 0, 0, '');

  constructor(
    private httpService: HttpService
  ) {}

  public addCategory() {
    this.httpService.addCategory(this.categoryModel).subscribe(
      response =>  {
        if (response.error) {
          alert(`The category could not be added, server Error.`);
        } else {
          EmitterService.get(this.categoryList).emit(response.categories);
        }
      },
      error => {
        alert(`The category could not be added, server Error.`);
      }
    );
  }

  public updateCategory() {
    this.httpService.updateCategory(this.categoryModel).subscribe(
      response => {
        if (response.error) {
          alert(`The category could not be updated, server Error.`);
        } else {
          EmitterService.get(this.categoryList).emit(response.categories);
        }
      },
      error => {
        alert(`The category could not be updated, server Error.`);
      }
    );
  }

  public resetAddCategory() {
    this.categoryModel = new CategoryModel('', '', 0, 0, '');
    EmitterService.get(this.reset).emit(true);
    this.isInsert = true;
  }

  ngOnChanges(changes: any) {
    EmitterService.get(this.categoryInfo).subscribe( (value: CategoryModel) => {
      this.categoryModel = new CategoryModel(value._id, value.name, value.parent_id, value.sort_order, value.href);
      this.isInsert = false;
    });
  }
}
