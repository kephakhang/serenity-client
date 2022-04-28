import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'ngx-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss']
})
export class RequestPasswordComponent implements OnInit {
  showMessages: any;
  strategy: string;
  errors: string[];
  messages: string[];
  user: any;
  confirmPassword: string;
  submitted: boolean;

  constructor(public auth: AuthServiceProvider, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  requestPass(): void {

  }
}
