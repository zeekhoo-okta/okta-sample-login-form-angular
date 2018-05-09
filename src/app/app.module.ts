import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms';

// Okta Guard and Service
import { OktaAuthGuard } from './app.guard';
import { OktaAuthService } from './app.service';
import { CallbackComponent } from './callback.component';

import { AppComponent } from './app.component';

// Custom login page component
import { LoginComponent } from './login/login.component';

// Example protected page component
import { ProtectedComponent } from './protected/protected.component';


const appRoutes: Routes = [
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [ OktaAuthGuard ]
  },
]

@NgModule({
  declarations: [
    AppComponent,
    ProtectedComponent,
    LoginComponent,
    CallbackComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
  ],
  providers: [
    OktaAuthGuard,
    OktaAuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
