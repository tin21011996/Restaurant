import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ProductModel } from '../productModel';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService {

  private BASE_URL: String = 'http://localhost:8080/api/products/';


  constructor( private http: Http ) { }

  public getAllProduct() {
    return this.http.get(`${this.BASE_URL}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public getAllProductPage(page: Number) {
    return this.http.get(`${this.BASE_URL}${page}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public addProduct(body: ProductModel) {
    let options = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
    });
    return this.http.post(`${this.BASE_URL}`, JSON.stringify(body), options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public updateProduct(body: ProductModel) {

    let options = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
    });

    return this.http.put(`${this.BASE_URL}${body['_id']}`, JSON.stringify(body), options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public deleteProduct(productsID: String) {

    let options = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
    });

    return this.http.delete(`${this.BASE_URL}${productsID}`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
