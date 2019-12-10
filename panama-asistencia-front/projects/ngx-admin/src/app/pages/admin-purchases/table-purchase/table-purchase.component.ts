import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-table-purchase',
  templateUrl: './table-purchase.component.html',
  styleUrls: ['./table-purchase.component.scss']
})
export class TablePurchaseComponent implements OnInit {

  public displayedColumns: string[] = ['name', 'username', 'deal', 'deal_price', 
                                        'status', 'date', 'actions'];
  public dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor( ) {
    this.getPurchase();
  }

  ngOnInit() {
    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getPurchase(){

    /*
    this.categoryService.getCategories().subscribe(data => {
      console.log(data);
      this.purchaseList = data['data']['categories'];
      console.log(this.purchaseList);
      this.dataSource = new MatTableDataSource(this.purchaseList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel="Ver por página";

      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel="Ver por página";

    });
*/
  }


}
