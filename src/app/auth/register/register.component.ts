import { Component, OnInit } from '@angular/core';
import { NbAuthSocialLink } from '@nebular/auth/auth.options';
import { FormBuilder, FormGroup, Validators } from '@angular/forms' ;
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  showMessages = {
    error: 'Cannot log in !!!',
    success: 'Login is successful !!'
  };
  errors = [];
  messages = [];
  submitted = false;
  user: any = {
    name: '',
    email: '',
    password: '',
    errors: []
  };
  name = {
    dirty: false,
    invalid: false,
    touched: false,
    errors: []
  };
  email = {
    dirty: false,
    invalid: false,
    touched: false,
    errors: []
  };
  password = {
    dirty: false,
    invalid: false,
    touched: false,
    errors: []
  };
  rePass = {
    dirty: false,
    invalid: false,
    touched: false,
    errors: []
  };
  confirmPassword = '';
  rememberMe = false;
  socialLinks: NbAuthSocialLink[];
  constructor(auth: AuthServiceProvider) { }

  ngOnInit(): void {
  }

  register(): void {

  }
}
