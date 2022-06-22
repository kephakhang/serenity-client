import { Component, Output, EventEmitter } from '@angular/core'
import { LocalDataSource } from '../../../../components/smart-table/public-api'
import { AuthServiceProvider } from '../../../providers/auth-service/auth-service'
import { SmartTableData } from '../../../@core/data/smart-table'
import { CounterData } from '../../model/counter-data'

@Component({
  selector: 'ngx-counter-table',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterTableComponent {

  counterList: CounterData[]

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'Id',
        type: 'string',
      },
      tenantId: {
        title: 'TenantId',
        type: 'string',
      },
      terminalId: {
        title: 'TerminalId',
        type: 'string',
      },
      version: {
        title: 'Version',
        type: 'number',
      },
      status: {
        title: 'Status',
        type: 'number',
      },
      regDatetime: {
        title: 'Registered',
        type: 'string',
        editable: false
      },
      modDatetime: {
        title: 'Updated',
        type: 'string',
        editable: false
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(public auth: AuthServiceProvider, private service: SmartTableData) {
    this.auth.getSession().then(user => {
      this.auth.get('/api/v1/counter/list').then((list: any[]) => {
        this.counterList = list.map(item => new CounterData(item.id, item.tenantId, item.terminalId, item.version, item.status, new Date(item.regDatetime).toLocaleString(), new Date(item.modDatetime).toLocaleString()))
        this.source.load(this.counterList);
      }, err => {
        this.auth.showError(err)
      })
    }, err => {
      this.auth.showError(err)
    }) 
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
