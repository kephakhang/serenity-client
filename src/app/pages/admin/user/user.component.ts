import { Component, Output, EventEmitter } from '@angular/core'
import { LocalDataSource } from '../../../../components/smart-table/public-api'
import { AuthServiceProvider } from '../../../providers/auth-service/auth-service'
import { SmartTableData } from '../../../@core/data/smart-table'
import { UserData } from '../../model/user-data'
import { SelectComponent } from '../../../@theme/components/select/select.component'

@Component({
  selector: 'ngx-user-table',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserTableComponent {
  levelMap: Map<Number, String> = new Map([
    [1, "Guest"], 
    [10, "Factory Admin"], 
    [100, "eMoldino Admin"], 
    [1000, "Super Admin"]
  ])
  userList: UserData[]

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
        editable: false
      },
      mobile: {
        title: 'Mobile',
        type: 'string',
        editable: false
      },
      level: {
        title: 'Level',
        type: 'number',
        valuePrepareFunction: (value) => {
          return this.levelMap.get(value)
        },
        editor: {
          type: 'list',
          config: {
            list: [ //0: Guest, 10:Factory Admin, 100: eMoldino Admin, 1000:Super admin',
              {value: 0, title: 'Guest'},
              {value: 10, title: 'Factory Admin'},
              {value: 100, title: 'eMoldino Admin'},
              {value: 1000, title: 'Super Admin'},
            ]
          }
        }
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
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(public auth: AuthServiceProvider, private service: SmartTableData) {
    this.auth.getSession().then(user => {
      this.auth.get('/api/v1/user/list').then((list: any[]) => {
        const userList = list.map(item => new UserData(item.id, item.tenantId, item.name, item.detail.email, item.detail.mobile, item.level, new Date(item.regDatetime).toLocaleString(), new Date(item.modDatetime).toLocaleString()))
        this.source.load(userList);
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
