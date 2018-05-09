import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OktaAuthService } from './app.service';

@Injectable()
export class OktaAuthGuard implements CanActivate {
  oktaAuth;
  authenticated;

  constructor(private okta: OktaAuthService, private router: Router) {
    this.authenticated = okta.isAuthenticated()
    this.oktaAuth = okta;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticated) { return true; }

    this.router.navigate(['/login']);
    return false;
  }
}
