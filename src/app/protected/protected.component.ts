import { Component } from '@angular/core';
import { OktaAuthService } from '../app.service';

interface Claim {
  claim: Object,
  value: Object
}

@Component({
  selector: 'app-secure',
  templateUrl: './protected.component.html'
})
export class ProtectedComponent {
  oktaAuthJs;
  token;
  claims: Array<Claim>

  constructor(private okta: OktaAuthService) {
    this.oktaAuthJs = okta;
    this.token = this.oktaAuthJs.oktaAuth.tokenManager.get('accessToken');
  }

  async ngOnInit() {
    var user = await this.oktaAuthJs.oktaAuth.token.getUserInfo(this.token);
    this.claims = Object.entries(user).map(entry => ({ claim: entry[0], value: entry[1] }));
  }

}
