import {Component, OnDestroy, Output, EventEmitter} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {
  @Output() session: EventEmitter<any> = new EventEmitter();

  private alive = true;

  solarValue: number;
  lightCard: CardSettings = {
    title: 'MMS Server',
    iconClass: 'nb-lightbulb',
    type: 'primary',
  };
  rollerShadesCard: CardSettings = {
    title: 'Serenity Server',
    iconClass: 'nb-roller-shades',
    type: 'success',
  };
  wirelessAudioCard: CardSettings = {
    title: 'Terminal',
    iconClass: 'nb-audio',
    type: 'info',
  };
  coffeeMakerCard: CardSettings = {
    title: 'Counter',
    iconClass: 'nb-coffee-maker',
    type: 'warning',
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
    this.coffeeMakerCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
    'material-dark': CardSettings[];
    'material-light': CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.lightCard,
        type: 'warning',
      },
      {
        ...this.rollerShadesCard,
        type: 'primary',
      },
      {
        ...this.wirelessAudioCard,
        type: 'danger',
      },
      {
        ...this.coffeeMakerCard,
        type: 'info',
      },
    ],
    dark: this.commonStatusCardsSet,
    'material-dark': this.commonStatusCardsSet,
    'material-light': this.commonStatusCardsSet,
  };

  constructor(public auth: AuthServiceProvider, private themeService: NbThemeService,
              private solarService: SolarData) {
    this.auth.getUser().then(user => {
      this.themeService.getJsTheme()
        .pipe(takeWhile(() => this.alive))
        .subscribe(theme => {
          this.statusCards = this.statusCardsByThemes[theme.name];
      });

      this.solarService.getSolarData()
        .pipe(takeWhile(() => this.alive))
        .subscribe((data) => {
          this.solarValue = data;
        });
    }, err => {
      this.auth.showError(err)
      this.auth.logout()
    })
    
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
