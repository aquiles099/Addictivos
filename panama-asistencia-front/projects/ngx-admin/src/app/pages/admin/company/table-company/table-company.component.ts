import { Component, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyService } from '../../../../../service/company.service';
import { CompanyResquestModel } from 'projects/ngx-admin/src/model/company/request/company-request.model';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';


@Component({
  selector: 'app-table-company',
  templateUrl: './table-company.component.html',
  styleUrls: ['./table-company.component.scss'],
})
export class TableCompanyComponent {

  public displayedColumns: string[] = ['id', 'business_name', 'dni', 'email', 'description', 'acciones'];
  public dataSource: MatTableDataSource<CompanyResquestModel>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public companyList: Array<CompanyResquestModel>;
  public companyId: any;

  constructor(private companyService: CompanyService,
              public adminService: AdminService,
              public router: Router,
              public dialogService: NbDialogService)
  {
    this.getCompany();
  }

  ngOnInit() {

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getCompany() {
    this.companyService.getCompany().subscribe(data => {
      console.log(data);
      this.companyList = data['data']['company']['original'];

      console.log(this.companyList);
      this.dataSource = new MatTableDataSource(this.companyList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel = "Ver por página";
      console.log(this.dataSource);

    });
  }

  openDialog(dialog: TemplateRef<any>, id:any) {
    this.companyId = id;
    this.dialogService.open(
      dialog,
      { context: 'this is some additional data passed to dialog' });
  }

  public edit(id: any) {
    let aux = this.companyList;
    for (let i = 0; i < aux.length; i++) {
      if (aux[i].id == id) {
        let company: any = aux[i];
        this.adminService.updateCompany(company);
        this.router.navigateByUrl("pages/admin/edit-company");
      }
    }
  }

  public delete(id: number) {
    //this.companyService.deleteCompany(id);
    this.router.navigateByUrl("pages/admin/table-company");
  }


}
