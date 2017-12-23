import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _router: Router,
              private authService: AuthService) {}

  canActivate() {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this._router.navigateByUrl('/admin/login');
      return false;
    }
  }
}
