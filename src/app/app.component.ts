/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core'
import { AnalyticsService } from './@core/utils/analytics.service'
import { SeoService } from './@core/utils/seo.service'
import { Storage } from '@ionic/storage-angular'
import { AuthServiceProvider } from './providers/auth-service/auth-service'

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(
    private analytics: AnalyticsService,
    private seoService: SeoService,
    @Inject(LOCALE_ID) public locale: string) {
  }

  async ngOnInit() {
    // this.analytics.trackPageViews();
    // this.seoService.trackCanonicalChanges();
  }
}
