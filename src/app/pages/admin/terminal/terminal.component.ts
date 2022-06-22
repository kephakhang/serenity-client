import { Component, Output, EventEmitter } from '@angular/core'
import { LocalDataSource } from '../../../../components/smart-table/public-api'
import { AuthServiceProvider } from '../../../providers/auth-service/auth-service'
import { SmartTableData } from '../../../@core/data/smart-table'
import { TerminalData } from '../../model/terminal-data'

@Component({
  selector: 'ngx-terminal-table',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
})
export class TerminalTableComponent {

  terminalList: TerminalData[]

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
      countryCode: {
        title: 'CountryCode',
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
      this.auth.get('/api/v1/terminal/list').then((list: any[]) => {
        this.terminalList = list.map(item => new TerminalData(item.id, item.tenantId, item.version, item.status, item.ip, new Date(item.regDatetime).toLocaleString(), new Date(item.modDatetime).toLocaleString()))
        this.source.load(this.terminalList);
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
