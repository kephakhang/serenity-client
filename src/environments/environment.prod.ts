/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {
  production: true,
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
      clientId: ''
    },
    microsoft: {
      clientId: ''
    },
    google: {
      clientId: ''
    }
  }
};
