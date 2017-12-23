import { Component, OnInit, Input } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { HttpService } from '../admin/category/servicesct/http.service';
import { CategoryModel } from '../admin/category/CategoryModel';
import { EmitterService } from '../admin/services/emitter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ HttpService ]
})
export class HeaderComponent implements OnInit, OnChanges {

  @Input() reset: string;
  @Input() categoryInfo: string;
  @Input() categoryList: string;

  private categoriesList;
  private currentCategory: CategoryModel;
  private isReset: String = '';

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
    this.isReset = '';
  }
  public isSelected(category): boolean {
    if (!this.currentCategory) {
      return false;
    }
    return this.currentCategory._id ===  category._id ? true : false;
  }
  ngOnChanges(changes: any) {
    EmitterService.get(this.reset).subscribe( (reset: String) => {
      this.isReset = '';
    });
    EmitterService.get(this.categoryList).subscribe( (categoryList: String) => {
      this.categoriesList = categoryList;
    });
  }

}
