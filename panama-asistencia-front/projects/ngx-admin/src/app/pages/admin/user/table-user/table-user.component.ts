import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { SmartTableData } from 'projects/ngx-admin/src/app/@core/data/smart-table';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'projects/ngx-admin/src/app/app.models';
import { AdminService } from '../../admin.service';
import { MatTableDataSource, MatPaginator, MatSort, MatMenuTrigger } from '@angular/material';
import { NbDialogService } from '@nebular/theme';
import { UserModel } from 'projects/ngx-admin/src/model/user/response/userModel.model';
import { UserService } from 'projects/ngx-admin/src/service/user.service';


@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.scss']
})
export class TableUserComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Usuario', 'Nombre', 'Apellido', 'Correo', 'Tipo'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatMenuTrigger, { static: true }) trigger: MatMenuTrigger;

  public sub: any;
  public userType: Array<string> = ['Administrador', 'Comercio', 'Analista', 'Contable', 'Cliente', 'Empleado'];
  public selected: string;

  public usersList: Array<User>;
  public userId: any;

  constructor(private service: SmartTableData,
    public activatedRoute: ActivatedRoute,
    public adminService: AdminService,
    public dialogService: NbDialogService,
    public router: Router,
    public userService: UserService) {
    const data = this.service.getData();
    this.getUsers();
  }

  ngOnInit(): void {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;

    this.selected = 'Cliente';
  }

  someMethod() {
    this.trigger.openMenu();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDeleteConfirm(event): void {
    if (window.confirm('¿Estás seguro que quieres eliminar este elemento?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  public getUsers() {
    this.adminService.getUsers().subscribe(data => {
      console.log(data);
      this.usersList = data['data']['users'];
      this.dataSource = new MatTableDataSource(this.usersList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel = "Ver por página";
    });
  }

  openDialog(dialog: TemplateRef<any>, id: any) {
    this.userId = id;
    this.dialogService.open(
      dialog,
      { context: 'this is some additional data passed to dialog' });
  }

  public edit(id: any) {
    let aux = this.usersList;
    for (let i = 0; i < aux.length; i++) {
      if (aux[i].id == id) {
        let user: any = aux[i];
        this.adminService.updateUser(user);
        this.router.navigateByUrl("pages/admin/edit-user");
      }
    }
  }

  public delete(id: number) {
    this.userService.deleteUser(id);
    this.router.navigateByUrl("pages/admin/table-user");

  }

}
