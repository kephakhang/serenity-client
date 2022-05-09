import { environment } from './../../../environments/environment'
import { Common } from './../common/common'
import { Location } from '@angular/common'
import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Message } from '../message/message'
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router'
import { NbDialogService, NbToastrService } from '@nebular/theme'
import { AlertController, Platform, LoadingController, ModalController } from '@ionic/angular'


/*
  Generated class for the this provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  public apiHostUrl = environment.apiHostUrl
  public jwt: string = null
  public lang = 'en'
  public confirmStr = 'Confirm'
  public notificationStr = 'Notification'
  public okStr = 'Ok'
  public errorStr = 'Error'
  public cancelStr = 'Cancel'
  public closeStr = 'Close'
  public package: string = null
  public version: string = null
  public root: string = "/"
  public baseHref: string = "/"
  public title: string = ''
  public user: any = null
  fileChooser: any

  constructor(
    public router: Router,
    public modal: ModalController,
    public alertCtrl: AlertController ,
    public loadingCtrl: LoadingController,
    public ahttp: HttpClient,
    public platform: Platform,
    public message: Message,
    public location: Location,
    public activateRoute: ActivatedRoute) {

    this.platform.ready()
      .then((data) => {

        this.user = localStorage.getItem(Common.USER)


        this.root = ""
        this.baseHref = "./"
        this.package = 'com.emoldino.serenity'
        this.version = '1.0.0'

        let lang = localStorage.getItem(Common.LANG)
        if (!lang) {
          lang = this.getUsersLocale('en_US').split('_')[0]
        }

        if (!this.message.langMapArr[lang]) {
          this.lang = 'en'
        } else {
          this.lang = lang
          localStorage.setItem(Common.LANG, this.lang)
        }

        this.okStr = this.message.get('global.ok')
        this.errorStr = this.message.get('global.error')
        this.confirmStr = this.message.get('global.confirm')
        this.cancelStr = this.message.get('global.cancel')
        this.closeStr = this.message.get('global.close')
        this.notificationStr = this.message.get('global.notification')
      })
  }

  getUsersLocale(defaultValue: string): string {
    if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
      return defaultValue;
    }
    const wn = window.navigator as any;
    let lang = wn.languages ? wn.languages[0] : defaultValue;
    lang = lang || wn.language || wn.browserLanguage || wn.userLanguage;
    return lang;
  }

  public switchLanguage(lang: string) {
    this.lang = lang
    this.message.setLang(lang)
  }

  public setTitle(title) {
    this.title = title
  }

  public goBack() {
    this.location.back()
  }

  public nvr(data) {
    if (data === undefined || data == null) {
      return ''
    } else {
      return data
    }
  }


  public naviToMain() {

    this.location.go('/')
  }

  public getjwt(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.user = localStorage.getItem(Common.USER)
      if (this.user) {
        if (this.user.jwt) {
          this.jwt = this.user.jwt
          resolve(this.user.jwt)
        } else {
          this.navigateRoot('/auth/login')
          reject('JWT is not found')
        }
      } else {
        this.navigateRoot('/auth/login')
        reject('JWT is not found')
      }
    })
  }

  public goHome() {
    this.location.go('/')
  }

  public async showError(err: any) {
    try {

      if (err.message !== undefined) {
        this.presentAlert(err.message)
      } else if(err instanceof String) {
        this.presentAlert(err as string)
      } else {
        this.presentAlert(JSON.stringify(err))
      }

      if (err.status !== undefined && err.status === 400) {
        this.location.go('/auth/login')
      }
    } catch (e) {
      this.presentAlert(e)
    }
  }

  public async showLoading() {

    const loading = await this.loadingCtrl.create({
      message: '',
      spinner: 'bubbles',
      cssClass: 'background-color: rgba( 255, 255, 255, 1.0 )',
      translucent: true,
      duration: 2000000000
    })
    loading.present()
    return loading
  }

  public async presentAlert(nick: string) {

    let message = 'empty or undefined message: Please contact the administrator.'

    if (!nick && nick.trim() !== '') {
      message = this.message.get(nick)
      if (!message) {
        message = nick
      }
    }

    
    // const alertController = document.querySelector('ion-alert-controller')
    // await alertController.componentOnReady()

    const alert = await this.alertCtrl.create({
      header: this.notificationStr,
      subHeader: '',
      message: message,
      buttons: [this.okStr] // this.auth.message.get('general', 'close')]
    })

    return await alert.present()
  }

  public async promptAlert(nick): Promise<string> {

    let prompt = 'empty or undefined message: Please contact the administrator.'

    if (!nick && nick.trim() !== '') {
      prompt = this.message.get(nick)
      if (!prompt) {
        prompt = nick
      }
    }

    let resolveFunction: (confirm: string) => void
    let rejectFunction: (confirm: string) => void
    let promise = new Promise<string>((resolve,reject) => {
      resolveFunction = resolve
      rejectFunction = reject
    })
    const alert = await this.alertCtrl.create({
      header: this.notificationStr,
      subHeader: '',
      inputs: [{ type: 'text', name: 'description', placeholder: '비디오 설명', id: 'videoDescription' }],
      message: prompt,
      cssClass: 'alertCustomCss',
      buttons: [{
        text: this.cancelStr,
        role: 'cancel',
        handler: (data) => {
          rejectFunction(null)
        }
      },
      {
        text: this.okStr,
        role: 'ok',
        handler: (data) => {

          if (data.description === undefined || data.description == null || data.description.trim() === '') {
            this.presentAlert(this.message.get('filetransfer.desc.needed'))
            return false
          }
          else {
            resolveFunction(data.description)
            return true
          }
        }
      }]
    })
    alert.present()

    return promise

    // const alertController = document.querySelector('ion-alert-controller')
    // await alertController.componentOnReady()

  }

  public setStorage(key: string, value: any): Promise<any> {
    return new Promise<any>(resolve => {
      localStorage.setItem(key, value)
      resolve(value)
    })
  }

  public getStorage(key: string): Promise<any> {
    return new Promise<any>(resolve => {
      let value = localStorage.getItem(key)
      resolve(value)
    })
  }

  public removeStorage(key: string): Promise<any> {
    return new Promise<any>(resolve => {
      let value = localStorage.removeItem(key)
      resolve(value)
    })
  }

  //common/http ================================================== [

  public anyToFormData(model: any, form: FormData = null, namespace = ''): FormData {
    let formData = form || new FormData()
    for (var propertyName in model) {
      if (!model.hasOwnProperty(propertyName) || model[propertyName] == undefined) continue
      let formKey = namespace ? `${namespace}[${propertyName}]` : propertyName
      if (model[propertyName] instanceof Date) {
        formData.append(formKey, model[propertyName].toString())
      }
      else if (model[propertyName] instanceof Array) {
        model[propertyName].forEach((element, index) => {
          if (typeof element != 'object')
            formData.append(`${formKey}[]`, element)
          else {
            const tempFormKey = `${formKey}[${index}]`
            this.anyToFormData(element, formData, tempFormKey)
          }
        })
      }
      else if (typeof model[propertyName] === 'object' && !(model[propertyName] instanceof File)) {
        this.anyToFormData(model[propertyName], formData, formKey)
      }
      else {
        formData.append(formKey, model[propertyName].toString())
      }
    }
    return formData
  }

  public async get(uri: string, params?: HttpParams) {

    return new Promise(async (resolve, reject) => {

      this.getjwt().then(async (value) => {
        var jwt: string = value
        if (this.isEmpty(jwt)) {
          jwt = ''
        }

        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'jwt': jwt
        })

        const loading = await this.showLoading()
        let options: any = { headers: headers }
        if (params !== undefined && params != null) {
          options = { params: params, headers: headers }
        }
        this.ahttp.get(this.apiHostUrl + uri, options)
          .subscribe((res: any) => {
            loading.dismiss()
            resolve(res)
          }, (err: any) => {
            loading.dismiss()
            reject(err)
          })
      })
    })
  }


  public async delete(uri: string, params?: HttpParams) {

    return new Promise(async (resolve, reject) => {
      this.getjwt().then(async (value) => {
        let jwt: string = value
        if (this.isEmpty(jwt)) {
          jwt = ''
        }

        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'jwt': jwt
        })

        let loading = await this.showLoading()
        let options: any = { headers: headers }
        if (params !== undefined && params != null) {
          options = { params: params, headers: headers }
        }

        this.ahttp.delete(this.apiHostUrl + uri, options)
          .subscribe((res: any) => {
            loading.dismiss()
            resolve(res)
          }, (err: any) => {
            loading.dismiss()
            reject(err)
          })
      })
    })
  }

  public async post2(uri: string, body: any) {

    return new Promise((resolve, reject) => {
      this.getjwt().then(async (value) => {
        let jwt: string = value
        if (this.isEmpty(jwt)) {
          jwt = ''
        }
        const headers = new HttpHeaders({
          'Content-Type': 'multipart/form-data',
          'jwt': jwt
        })

        const formData: FormData = this.anyToFormData(body)
        const loading = await this.showLoading()
        this.ahttp.post(this.apiHostUrl + uri, formData, { headers: headers })
          .subscribe((res: any) => {
            loading.dismiss()
            resolve(res)

          }, (err) => {
            loading.dismiss()
            reject(err)
          })
      })
    })
  }


  public async post(uri: string, body: any) {

    if (uri.startsWith('/sso/')) {
      return new Promise(async (resolve, reject) => {

          const headers = new HttpHeaders({
            'Content-Type': 'application/json;charset=UTF-8',
          })
          const loading = await this.showLoading()
          this.ahttp.post(this.apiHostUrl + uri, body, { headers: headers })
            .subscribe((res: any) => {
              loading.dismiss()
              resolve(res)
            }, (err) => {
              loading.dismiss()
              reject(err)
            })
      })
    } else {
      return new Promise((resolve, reject) => {
        this.getjwt().then(async (value) => {
          let jwt: string = value
          if (this.isEmpty(jwt)) {
            jwt = ''
          }

          const headers = new HttpHeaders({
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearert ' + jwt
          })
          const loading = await this.showLoading()
          this.ahttp.post(this.apiHostUrl + uri, body, { headers: headers })
            .subscribe((res: any) => {
              loading.dismiss()
              resolve(res)
            }, (err) => {
              loading.dismiss()
              reject(err)
            })
        })

      })
    }
  }

  public async put(uri: string, body: any) {

    return new Promise((resolve, reject) => {
      this.getjwt().then(async (value) => {
        let jwt: string = value
        if (this.isEmpty(jwt)) {
          jwt = ''
        }
        const headers = new HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8',
          'jwt': jwt
        })

        const formData: FormData = this.anyToFormData(body)
        const loading = await this.showLoading()
        this.ahttp.put(this.apiHostUrl + uri, formData, { headers: headers })
          .subscribe((res: any) => {
            loading.dismiss()
            resolve(res)

          }, (err) => {
            loading.dismiss()
            reject(err)
          })
      })
    })
  }

  public async put2(uri: string, body: any) {

    return new Promise((resolve, reject) => {
      this.getjwt().then(async (value) => {
        let jwt: string = value
        if (this.isEmpty(jwt)) {
          jwt = ''
        }
        const headers = new HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8',
          'jwt': jwt
        })

        //const formData: FormData = this.anyToFormData(body)
        const loading = await this.showLoading()
        this.ahttp.put(this.apiHostUrl + uri, body, { headers: headers })
          .subscribe((res: any) => {
            loading.dismiss()
            resolve(res)

          }, (err) => {
            loading.dismiss()
            reject(err)
          })
      })
    })
  }

  public async postMultipart(uri: string, body: any, params: URLSearchParams) {

    return new Promise((resolve, reject) => {
      this.getjwt().then(async (value) => {
        const headers = new HttpHeaders()
        if (params == null) {
          params = new URLSearchParams()
        }
        const jwt: string = value
        if (jwt !== undefined && jwt != null) {
          headers.append('jwt', jwt)
        }
        headers.append('Accept', 'application/json;charset=UTF-8')
        headers.append('Content-Type', 'multipart/form-data')
        const loading = await this.showLoading()
        this.ahttp.post(this.apiHostUrl + uri, body, { headers: headers })
          .subscribe((res: any) => {
            loading.dismiss()
            resolve(res)

          }, (err) => {
            loading.dismiss()
            reject(err)
          })

      })
    })

  }

  public hot(count?: number) {
    if( count )
      return this.setStorage('/hot', count)
    else
      return this.getStorage('/hot')
  }

  public cool(count?: number) {
    if( count )
      return this.setStorage('/hot', count)
    else
      return this.getStorage('/hot')
  }

  public login(credential: any) {

    return this.post('/sso/login', credential)
  }

  public signup(userInfo) {
    return this.post('/sso/signup', userInfo)
  }

  public logout() {
    localStorage.removeItem(Common.USER)
    localStorage.removeItem(Common.PARAMS)
    localStorage.removeItem(Common.VIDEO)
    localStorage.removeItem(Common.STAT_PARAMS)
    this.jwt = null
    this.user = null
    this.location.go('/auth/login')
  }

  public isEmpty(value: string): boolean {
    if (value == '' || value == null || value == undefined || value == 'null') {
      return true
    } else {
      return false
    }
  }

  /**
   * 사용자 정보를 Promise<user> 형식으로 스토리지에서 가져오는 함수
   */
  public getUser(): Promise<any> {

    if (this.user !== undefined && this.user != null) {
      return new Promise((resolve, reject) => {
        resolve(this.user)
      })
    }
    else {
      return new Promise((resolve, reject) => {
        this.user = localStorage.get(Common.USER)
        if (this.user === null) {
          reject('User not found !!!')
        } else {
          resolve(this.user)
        }
      })
    }
  }

  public navigateRoot(uri: string, data?: any) {
    this.navigate('root', uri, data)
  }

  public navigateForward(uri: string, data?: any) {
    this.navigate('forward', uri, data)
  }

  public navigateBack(data?: any) {
    this.navigate('back', null, data)
  }

  public navigate(direction, uri, data) {

    if (data === undefined || data == null) {
      this.removeStorage(Common.NAVIGATION_EXTRA).then(res => {
        switch (direction) {
          case 'root': this.location.go(uri)
            break
          case 'forward': this.location.go(uri)
            break
          case 'back': this.location.back()
            break
        }
      })

    } else {
      this.setStorage(Common.NAVIGATION_EXTRA, data)
        .then(extraData => {
          switch (direction) {
            case 'root': this.location.go(uri)
              break
            case 'forward': this.location.go(uri)
              break
            case 'back': this.location.back()
              break
          }
        })
    }
  }

  public getNavigationExtra() {

    return new Promise((resolve, reject) => {
      this.getStorage(Common.NAVIGATION_EXTRA)
        .then(data => {
          //this.removeStorage(Common.NAVIGATION_EXTRA)
          resolve(data)
        }, err => {
          reject(err)
        })
    })
  }

  public navigateWithParams(uri, params) {
    let navigationExtras: NavigationExtras = {
      queryParams: params
    }
    this.setStorage(Common.NAVIGATION_EXTRA, params)
      .then(res => {
        this.navigate('forward', uri, navigationExtras)
      })
  }

  public isMobileNumber(str: string): boolean {
    return /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/.test(str)
  }

  public isValidEmail(str: string): boolean {
    return (/^[_a-z0-9-]+(.[_a-z0-9-]+)*@(?:\w+\.)+\w+$/.test(str) || /^[_a-z0-9-]+(.[_a-z0-9-]+)*@(?:\w+\-)+\w+\.+\w+$/.test(str))
  }

  public getImageUrl(id): string {
    return this.apiHostUrl + 'api/attachment/image?id=' + id
  }
}
