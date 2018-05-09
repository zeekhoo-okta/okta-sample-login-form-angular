import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms';

// Okta Guard and Service
import { OktaAuthGuard } from './app.guard';
import { OktaAuthService } from './app.service';

import { AppComponent } from './app.component';
import { CallbackComponent } from './callback.component';
import { ProtectedComponent } from './protected.component';

import { LoginComponent } from './login.component';


const appRoutes: Routes = [
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [ OktaAuthGuard ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
]

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    ProtectedComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [
    OktaAuthGuard,
    OktaAuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
