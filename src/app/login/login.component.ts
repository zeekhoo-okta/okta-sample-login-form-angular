import { Component } from '@angular/core';
import { OktaAuthService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(public oktaAuth: OktaAuthService) {}
}
