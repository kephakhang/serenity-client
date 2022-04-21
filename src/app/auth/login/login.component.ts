import { Component, OnInit } from '@angular/core';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NbAuthSocialLink } from '@nebular/auth/auth.options';
import { FormBuilder, FormGroup, Validators } from '@angular/forms' ;

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showMessages = {
    error: 'Cannot log in !!!',
    success: 'Login is successful !!'
  };
  errors = [];
  messages = [];
  submitted = false;
  user: any = {
    email: '',
    password: ''
  };
  email = {
    dirty: false,
    invalid: false,
    touched: false
  };
  password = {
    dirty: false,
    invalid: false,
    touched: false
  };
  rememberMe = false;
  socialLinks: NbAuthSocialLink[];

  constructor(public auth: AuthServiceProvider) { }

  ngOnInit(): void {
  }

  login(): void {

  }
}
