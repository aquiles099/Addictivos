import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DealModelResponse } from 'projects/ngx-admin/src/model/deal/response/dealModelResponse.model';
import { DealService } from 'projects/ngx-admin/src/service/deal.service';

@Component({
  selector: 'app-table-deals',
  templateUrl: './table-deals.component.html',
  styleUrls: ['./table-deals.component.scss'],
})
export class TableDealsComponent {

displayedColumns: string[] = ['img','short_title', 'effective_date', 'is_public','acciones'];
dataSource: MatTableDataSource<DealModelResponse>;

@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
@ViewChild(MatSort, {static: true}) sort: MatSort;

public dealsList: Array<DealModelResponse>;

constructor(private dealService: DealService) {
  this.getDeals();
}

ngOnInit(): void {
  
}

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

public getDeals(){

  this.dealsList =[];
  this.dealService.getDeals().subscribe(data =>{
    this.dealsList = data['data']['deals'];
    console.log(data);
    console.log(this.dealsList);
    
    if(this.dealsList.length > 0){
      this.dataSource = new MatTableDataSource(this.dealsList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel="Ver por página";
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    }


    
  })
}


}
