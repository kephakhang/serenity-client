import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme'
import { NbAuthSocialLink } from '@nebular/auth/auth.options';
import { RegisterData } from  '../model/register-data'
import { TermsComponent } from './terms/terms.component';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Common } from '../../providers/common/common'

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
  enableTerms = true;
  isTermsSelected = false;
  user: RegisterData = new RegisterData(
    '',
    '',
    '',
    ''
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
  constructor(public auth: AuthServiceProvider, private cd: ChangeDetectorRef, public dialogService: NbDialogService) { }

  ngOnInit(): void {
  }

  public register(): void {
    if (this.user.password !== this.confirmPassword) {
      this.auth.presentAlert(this.auth.message.get('auth.register.passwordMismatch'))
    } else {
      this.user.mobile = this.user.mobile.replace('-', '')
      this.auth.signup(this.user).then((user: any) => {
        if (user) {
          localStorage.setItem(Common.USER, user)
          this.auth.naviToMain()
        } else {
          this.auth.showError('auth.register.unknownError')
        }
      }, err => {
        this.auth.showError(err)
      })
    }
  }

  public openTerms(): void {
    this.auth.navigateForward('/auth/register/terms')
  }
}
