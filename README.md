# Angular - Okta Auth-js Sample Login Form
#### A Simple Login Form Example using the Okta [Auth-js](https://github.com/okta/okta-auth-js) SDK  in Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0.

This sample is based on the [Using the AuthJS SDK in your Angular application](https://developer.okta.com/code/angular/okta_angular_auth_js) guide,
which walks you through integrating authentication and authorization into an Angular application with Okta.
But instead of redirecting to Okta for authentication, we build a simple login-form (username and password). 
This sample is for those who wish to leverage Okta for login, but still implement their own custom login UI.

## Prerequisites

Before running this sample, it would be helpful to read through the [guide.](https://developer.okta.com/code/angular/okta_angular_auth_js)

* Get an Okta Developer Account by signing up [https://developer.okta.com/signup/](https://developer.okta.com/signup/).
* Create an Okta Application, configured for Singe-Page App (SPA) mode. This is done from the Okta Developer Console and you can find instructions [here][OIDC SPA Setup Instructions].  When following the wizard, use the default properties.  They are are designed to work with our sample applications.


## Running This Example

To run this application, you first need to clone this repo and then enter into this directory:

```bash
git clone git@github.com:zeekhoo-okta/okta-sample-login-form-angular.git
cd okta-sample-login-form
```

Then install dependencies:

```bash
npm install
```

Now you need to gather the following information from the Okta Developer Console:

- **Client Id** - The client ID of the SPA application that you created earlier. This can be found on the "General" tab of an application, or the list of applications.  This identifies the application that tokens will be minted for.
- **Issuer** - This is the URL of the authorization server that will perform authentication.  All Developer Accounts have a "default" authorization server.  The issuer is a combination of your Org URL (found in the upper right of the console home page) and `/oauth2/default`. For example, `https://dev-1234.oktapreview.com/oauth2/default`.

Now place these values into the file `src/app/.samples.config.ts` that was created for you in this project:

```javascript
export default {
  oidc: {
    clientId: '{clientId}',
    issuer: 'https://{yourOktaDomain}.com/oauth2/default',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid profile email'
  },
};

```

Now start the app server:

```
ng serve
```
