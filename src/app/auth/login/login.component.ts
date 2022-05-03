import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NbAuthSocialLink } from '@nebular/auth/auth.options';
import { LoginData } from '../model/login-data'
import {NgForm} from '@angular/forms';
// import { NbAuthService } from '@nebular/auth';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms' ;

@Component({
  selector: 'nb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  options: any = {};
  redirectDelay: number;
  showMessages = {
    error: 'Cannot log in !!!',
    success: 'Login is successful !!'
  };
  strategy: string;
  errors: string[];
  messages: string[];
  user: LoginData = new LoginData(
    '',
    '',
    false
  );
  id: any = {
    dirty: false,
    invalid: false,
    touched: false,
    errors: []
  };
  password: any = {
    dirty: false,
    invalid: false,
    touched: false,
    errors: []
  };
  submitted: boolean = false;
  socialLinks: NbAuthSocialLink[];
  rememberMe: boolean;

  constructor(public auth: AuthServiceProvider,  protected cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  login(): void {

  }
}
