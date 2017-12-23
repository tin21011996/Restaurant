import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CategoryModel } from '../CategoryModel';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService {

  private BASE_URL: String = 'http://localhost:8080/api/categories/';

  constructor( private http: Http ) { }

  public getAllCategory() {
    return this.http.get(`${this.BASE_URL}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public addCategory(body: CategoryModel) {
    let options = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
    });
    return this.http.post(`${this.BASE_URL}`, JSON.stringify(body), options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public updateCategory(body: CategoryModel) {

    let options = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
    });

    return this.http.put(`${this.BASE_URL}${body['_id']}`, JSON.stringify(body), options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public deleteCategory(categoriesID: String) {

    let options = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
    });

    return this.http.delete(`${this.BASE_URL}${categoriesID}`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
