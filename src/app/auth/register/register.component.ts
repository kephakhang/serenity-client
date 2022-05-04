import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NbAuthSocialLink } from '@nebular/auth/auth.options';
import { RegisterData } from  '../model/register-data'
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
  isTermsSelected = false;
  user: RegisterData = new RegisterData(
    '',
    '',
    '',
    '',
    false
  );
  name: any = {
    dirty: false,
    invalid: false,
    touched: false,
    errors: []
  };
  email: any = {
    dirty: false,
    invalid: false,
    touched: false,
    errors: []
  };
  mobile: any = {
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
  rePass: any = {
    dirty: false,
    invalid: false,
    touched: false,
    errors: []
  };
  confirmPassword = '';
  rememberMe = false;
  socialLinks: NbAuthSocialLink[];
  constructor(public auth: AuthServiceProvider, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  register(): void {

  }
}
