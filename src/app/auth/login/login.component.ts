import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import { NbAuthSocialLink } from '@nebular/auth/auth.options'
import { LoginData } from '../model/login-data'
import {
  SocialAuthService,
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
  MicrosoftLoginProvider,
  SocialUser,
} from 'angularx-social-login'
import { environment } from '../../../environments/environment'
import { env } from 'process'

@Component({
  selector: 'nb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  greeting: string = ''
  idRequired: string = ''
  idShouldBeReal: string = ''
  options: any = {}
  redirectDelay: number
  showMessages = {
    error: 'Cannot log in !!!',
    success: 'Login is successful !!'
  }
  strategy: string
  errors: string[]
  messages: string[]
  user: LoginData = new LoginData(
    '',
    '',
    false
  )
  id: any = {
    dirty: false,
    invalid: false,
    touched: false,
    errors: []
  }
  password: any = {
    dirty: false,
    invalid: false,
    touched: false,
    errors: []
  }
  submitted: boolean = false
  socialLogin: boolean = environment.socialLogin
  socialLinks: NbAuthSocialLink[] = [
    {
      link: '',
      target: '_blank',
      icon: 'google',  
      title: 'Google',
    },
    {
      link: '',
      target: '_blank',
      icon: 'facebook',
      title: 'Facebook',
    },
    {
      link: '',
      target: '_blank',
      icon: 'microsoft',
      title: 'Microsoft',
    },
    // {
    //   link: '',
    //   target: '_blank',
    //   icon: 'kakao',
    //   title: 'Kakao',
    // },
    {
      link: '',
      target: '_blank',
      icon: 'apple',
      title: 'Apple',
    },
  ]
  rememberMe: boolean
  apple: {
    state: 'Initial user authentication request',
    redirectURI: '',
    scope: 'name email mobile',
    color: 'light',
    clientId: 'clientId',
    type: 'sign in',
  }

  constructor(private authService: SocialAuthService, public auth: AuthServiceProvider,  protected cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (environment.emailIdOnly) {
      this.greeting = this.auth.message.get('auth.login.greetingEmailOnly')
      this.idShouldBeReal = this.auth.message.get('auth.login.emailShouldBeReal')
      this.idRequired = this.auth.message.get('auth.login.emailRequired')
    } else {
      this.greeting = this.auth.message.get('auth.login.greeting')
      this.idRequired = this.auth.message.get('auth.login.idRequired')
    }
  }

  login(): void {

  }

  signInWithGoogle():  Promise<SocialUser>  {
    return this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB():  Promise<SocialUser>  {
    return this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signInWithMS():  Promise<SocialUser>  {
    return this.authService.signIn(MicrosoftLoginProvider.PROVIDER_ID)
  }

  signInWithAWS():  Promise<SocialUser>  {
    return this.authService.signIn(AmazonLoginProvider.PROVIDER_ID)
  }

  // signWithKakao():  Promise<SocialUser>  {
  //   return new Promise<SocialUser>((resolve, reject) => {
  //     let loginOptions = {};
  //     loginOptions['authTypes'] = [
  //                                 AuthTypes.AuthTypeTalk, 
  //                                 AuthTypes.AuthTypeStory,
  //                                 AuthTypes.AuthTypeAccount
  //                               ];
    
  //     this.kakao.login(loginOptions).then((res) => {
  //       const user: SocialUser = new SocialUser
  //       user.id = res.id
  //       user.authToken = res.getAccessToken
  //       user.email = res.email
  //       user.name = res.nickname
  //       resolve(user)
  //     }, err => {
  //       reject(err)
  //     })
  //   })
  // }

  snsLogin(sns: NbAuthSocialLink) {
    switch(sns.title.toLowerCase()) {
      case 'google': 
        this.signInWithGoogle()
        break
      case 'microsoft': 
        this.signInWithMS()
        break
      case 'amazon': 
        this.signInWithAWS()
        break
      case 'facebook': 
        this.signInWithFB()
        break
      // case 'kakaotalk':
      //   this.signWithKakao()
      //   break
    }
  }
}
