import { Component, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ComerceService } from '../../../../../service/comerce.service';
import { ComerceResponseModel } from 'projects/ngx-admin/src/model/comerce/response/comerceResponseModel.model';
import { NbDialogService } from '@nebular/theme';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-table-commerce',
  templateUrl: './table-commerce.component.html',
  styleUrls: ['./table-commerce.component.scss'],
})
export class TableCommerceComponent {
  public displayedColumns: string[] = ['name', 'web_site', 'manager_name', 'email', 'cellphone', 'acciones'];
  public dataSource: MatTableDataSource<ComerceResponseModel>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public companyList: Array<ComerceResponseModel>;
  public commerceId: any;


  constructor(private comerceService: ComerceService,
              public activatedRoute: ActivatedRoute,
              public dialogService: NbDialogService,
              public router: Router,
              public adminService: AdminService) {
    this.getCommerce();

  }

  ngOnInit(): void {

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getCommerce() {
    this.comerceService.getComerce().subscribe(data => {
      this.companyList = data['data']['commerce']['original'];
      console.log(this.companyList);
      this.dataSource = new MatTableDataSource(this.companyList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel = "Ver por página";

    });
  }

  openDialog(dialog: TemplateRef<any>, id:any) {
    this.commerceId = id;
    this.dialogService.open(
      dialog,
      { context: 'this is some additional data passed to dialog' });
  }

  public edit(id: any) {
    let aux = this.companyList;
    for (let i = 0; i < aux.length; i++) {
      if (aux[i].id == id) {
        let commerce: any = aux[i];
        this.adminService.updateCommerce(commerce);
        this.router.navigateByUrl("pages/admin/edit-commerce");
      }
    }
  }

  public delete(id: number) {
    //this.companyService.deleteCompany(id);
    this.router.navigateByUrl("pages/admin/table-commerce");
  }


}
