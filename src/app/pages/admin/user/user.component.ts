import { Component } from '@angular/core'
import { LocalDataSource } from 'ng2-smart-table'
import { AuthServiceProvider } from '../../../providers/auth-service/auth-service'
import { SmartTableData } from '../../../@core/data/smart-table'
import { UserData } from '../model/user-data'

@Component({
  selector: 'ngx-user-table',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserTableComponent {

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
      tenantId: {
        title: 'Tenant',
        type: 'string',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      mobile: {
        title: 'Mobile',
        type: 'string',
      },
      level: {
        title: 'Level',
        type: 'number',
      },
      regDatetime: {
        title: 'Registered',
        type: 'string'
      },
      modDatetime: {
        title: 'Updated',
        type: 'string'
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(public auth: AuthServiceProvider, private service: SmartTableData) {
    const data = this.auth.get('/api/v1/user/list').then((list: any[]) => {
      const data = list.map(item => new UserData(item.tenantId, item.name, item.detail.email, item.detail.mobile, item.level, new Date(item.regDatetime).toLocaleDateString(), new Date(item.modDatetime).toLocaleDateString()))
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
