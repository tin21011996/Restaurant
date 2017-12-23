import { Component, Input, OnInit, OnChanges} from '@angular/core';
import { CategoryModel } from '../categoryModel';
import { HttpService } from '../servicesct/http.service';
import { EmitterService } from '../../services/emitter.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css'],
  providers: [ HttpService ]
})

export class ListCategoryComponent implements OnInit, OnChanges {

  @Input() reset: string;
  @Input() categoryInfo: string;
  @Input() categoryList: string;

  private categoriesList;
  private currentCategory: CategoryModel;
  private isReset: Boolean = true;

  constructor( private httpService: HttpService ) { }

  ngOnInit() {
    this.httpService.getAllCategory().subscribe(
      response => this.categoriesList = response.categories,
      error =>  { alert(`Can't get categories.`); }
    );
  }

  public categorySelected(category) {
    this.currentCategory = category;
    EmitterService.get(this.categoryInfo).emit(this.currentCategory);
    this.isReset = true;
  }
  public isSelected(category): boolean {
    if (!this.currentCategory) {
      return false;
    }
    return this.currentCategory._id ===  category._id ? true : false;
  }

  public deleteCategory(categoryId: String) {
    this.httpService.deleteCategory(categoryId).subscribe(
      response => {
        if (response.error) {
          alert(`The category could not be deleted, server Error.`);
        } else {
          this.categoriesList = response.categories;
        }
      },
      error => {
        alert(`The category could not be deleted, server Error.`);
      });
    }
    ngOnChanges(changes: any) {
      EmitterService.get(this.reset).subscribe( (reset: String) => {
        this.isReset = false;
      });
      EmitterService.get(this.categoryList).subscribe( (categoryList: String) => {
        this.categoriesList = categoryList;
      });
    }

}
