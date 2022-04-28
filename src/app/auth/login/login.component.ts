import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NbAuthSocialLink } from '@nebular/auth/auth.options';
// import { NbAuthService } from '@nebular/auth';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms' ;

@Component({
  selector: 'ngx-login',
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
  user: any = {
    id: '',
    password: ''
  };
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
  submitted: boolean;
  socialLinks: NbAuthSocialLink[];
  rememberMe: boolean;

  constructor(public auth: AuthServiceProvider,  protected cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  login(): void {

  }
}
