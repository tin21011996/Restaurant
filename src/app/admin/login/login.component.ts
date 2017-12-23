import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router, NavigationExtras} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService, FlashMessagesService]
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  message: '';
  isLoggedIn = false;

  constructor(private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password,
    };
    this.authService.authenticateUser(user)
      .subscribe( data => {
        if (data.success) {
          this.router.navigate(['admin']);
          // navigate after login
          this.authService.storeUserData(data.token, data.user);
          this.alertService.success('Registration successful', true);
          this.router.navigate(['admin']);
        } else {
          this.alertService.error('Login dont success');
          this.router.navigateByUrl('/admin/login');
        }
      });
  }
}
