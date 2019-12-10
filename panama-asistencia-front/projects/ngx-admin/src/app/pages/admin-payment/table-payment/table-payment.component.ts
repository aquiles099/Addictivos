import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentRequestModel } from 'projects/ngx-admin/src/model/payment/request/payment-request.model';
import { PaymentService } from 'projects/ngx-admin/src/service/payment.service';



@Component({
  selector: 'app-table-payment',
  templateUrl: './table-payment.component.html',
  styleUrls: ['./table-payment.component.scss']
})
export class TablePaymentComponent implements OnInit {

  displayedColumns: string[] = ['id','avatar_file_name', 'name', 'description'];
  dataSource: MatTableDataSource<PaymentRequestModel>;
  

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  public platformList: Array<PaymentRequestModel>;
  
  constructor(private paymentService: PaymentService) {

  }

  ngOnInit() {
    /*this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel="Ver por página";*/
    this.getPlatforms();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getPlatforms() {

    this.platformList = [];
    this.paymentService.getPlatafforms().subscribe(data => {
      this.platformList = data['data']['payment_platform'];
      if (this.platformList.length > 0) {
        this.dataSource = new MatTableDataSource(this.platformList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.paginator._intl.itemsPerPageLabel = "Ver por página";
      }

    })
  }
}
