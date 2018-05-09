import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as OktaAuth from '@okta/okta-auth-js';

import config from './.config';

@Injectable()
export class OktaAuthService {
  username: string;
  password: string;

  oktaAuth = new OktaAuth({
    url: config.oidc.issuer.split("/oauth2/")[0],
    clientId: config.oidc.clientId,
    issuer: config.oidc.issuer,
    redirectUri: config.oidc.redirectUri,
  });

  constructor(private router: Router) {}

  isAuthenticated() {
    // Checks if there is a current accessToken in the TokenManger.
    return !!this.oktaAuth.tokenManager.get('accessToken');
  }


// Original function redirects to Okta.
//  login() {
//    // Launches the login redirect.
//    this.oktaAuth.token.getWithRedirect({
//      responseType: ['id_token', 'token'],
//      scopes: config.oidc.scope.split(" ")
//    });
//  }
  async login() {
    var txn = await this.oktaAuth.signIn({ username : this.username, password : this.password });
    if (txn.status === 'SUCCESS') {
      var sessionToken = txn.sessionToken;
      console.log('sessionToken:' + sessionToken);
      if (sessionToken) {
        this.oktaAuth.token.getWithRedirect({
            responseType: ['id_token', 'token'],
            sessionToken: sessionToken,
            scopes: config.oidc.scope.split(" ")
        });
      }
    } else {
      throw 'Cannot handle the ' + txn.status + ' status';
    }
  }


  async handleAuthentication() {
    const tokens = await this.oktaAuth.token.parseFromUrl();
    tokens.forEach(token => {
      if (token.idToken) {
        this.oktaAuth.tokenManager.add('idToken', token);
      }
      if (token.accessToken) {
        this.oktaAuth.tokenManager.add('accessToken', token);
      }
    });
  }

  async logout() {
    this.oktaAuth.tokenManager.clear();
    await this.oktaAuth.signOut();
  }
}
