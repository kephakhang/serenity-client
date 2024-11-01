/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

 export const environment = {
  production: false,
  apiHostUrl: 'https://serenity.emoldino.com',
  emailIdOnly: true,
  socialLogin: false,
  defaultTheme: 'material-light',
  password: {
    min: 7,
    max: 32
  },
  name: {
    min: 3,
    max: 64
  },
  sns : {
    facebook : {
      clientId: '897337357764734'
    },
    microsoft: {
      clientId: '8c8dddc6-fd3d-4e03-b947-c62d77c202ca'
    },
    google: {
      clientId: '07245424895-n3k5c8q9tj88uvem3d571gqnjs22jl3c.apps.googleusercontent.com'
    }
  }
};
