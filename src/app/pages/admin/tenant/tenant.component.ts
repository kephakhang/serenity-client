import { Component } from '@angular/core'
import { LocalDataSource } from 'ng2-smart-table'
import { AuthServiceProvider } from '../../../providers/auth-service/auth-service'
import { SmartTableData } from '../../../@core/data/smart-table'
import { TenantData } from '../model/tenant-data'

@Component({
  selector: 'ngx-tenant-table',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss'],
})
export class TenantTableComponent {

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
        title: 'ID',
        type: 'string',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      type: {
        title: 'Type',
        type: 'number',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      countryId: {
        title: 'Country',
        type: 'string',
      },
      hostUrl: {
        title: 'Host Url',
        type: 'string',
      },
      prefix: {
        title: 'Prefix',
        type: 'string',
      },
      hostname: {
        title: 'Hostname',
        type: 'string',
      },
      // enable: {
      //   title: 'enable',
      //   type: 'boolean',
      // },
      regDatetime: {
        title: 'Registered',
        type: 'string',
      },
      modDatetime: {
        title: 'Updated',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(public auth: AuthServiceProvider, private service: SmartTableData) {
    const data = this.auth.get('/api/v1/tenant/list').then((list: any[]) => {
      const data = list.map(item => new TenantData(item.id, item.name, item.type, item.description, item.countryId, item.hostUrl, item.prefix, item.hostname, new Date(item.regDatetime).toLocaleString(), new Date(item.modDatetime).toLocaleString()))
      this.source.load(data);
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
