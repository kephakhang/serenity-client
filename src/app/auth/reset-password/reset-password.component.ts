import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  showMessages: any;
  strategy: string;
  errors: string[];
  messages: string[];
  user: any;
  submitted: boolean;
  confirmPassword: string;

  constructor(public auth: AuthServiceProvider, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  resetPass(): void {

  }

}
