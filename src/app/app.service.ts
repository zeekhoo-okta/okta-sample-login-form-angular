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

  async login() {
    var transaction = await this.oktaAuth.signIn({ username : this.username, password : this.password });
    if (transaction.status === 'SUCCESS') {
      var sessionToken = transaction.sessionToken;
      if (sessionToken) {
        // Okta's auth-js does the heavy lifting here. Not only will getWithRedirect make the oauth authorize request,
        // it will perform token validation upon return of token(s), and throw exception if token is invalid
        // Here, we request idToken and accessTokens, which are redirected to the redirectUri...the handler is handlerAuthentication(), below
        this.oktaAuth.token.getWithRedirect({
            responseType: ['id_token', 'token'],
            sessionToken: sessionToken,
            scopes: config.oidc.scope.split(" ")
        });
      }
    } else {
      throw 'Cannot handle the ' + transaction.status + ' status';
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
    if (this.isAuthenticated) {
      this.router.navigate(['/']);
    }
  }

  async logout() {
    this.oktaAuth.tokenManager.clear();
    await this.oktaAuth.signOut();
    this.router.navigate(['/']);
  }
}
