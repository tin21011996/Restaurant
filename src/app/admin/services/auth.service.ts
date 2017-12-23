import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  isLoggedIn = false;
  redirectUrl: String;
  // domain = ""; // Production

  constructor(private http: Http) { }

  registerUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // make HTTP Connection
    return this.http.post('http://localhost:8080/users/register', user, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // make HTTP Connection
    return this.http.post('http://localhost:8080/users/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  getProfile() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    // make HTTP Connection
    return this.http.get('http://localhost:8080/users/profile', {headers: headers})
      .map(res => res.json());
  }
  public getAllUser() {
    return this.http.get('http://localhost:8080/users/profile')
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  private loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logOut() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
