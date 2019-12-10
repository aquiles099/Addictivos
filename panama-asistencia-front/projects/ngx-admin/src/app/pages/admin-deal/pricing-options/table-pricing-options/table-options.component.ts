import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DealModelResponse } from 'projects/ngx-admin/src/model/deal/response/dealModelResponse.model';
import { DealService } from 'projects/ngx-admin/src/service/deal.service';

@Component({
  selector: 'app-table-options',
  templateUrl: './table-options.component.html',
  styleUrls: ['./table-options.component.scss'],
})
export class TableOptionsComponent {

displayedColumns: string[] = ['img','short_title', 'effective_date', 'is_public','acciones'];
dataSource: MatTableDataSource<DealModelResponse>;

@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
@ViewChild(MatSort, {static: true}) sort: MatSort;

public dealsList: Array<DealModelResponse>;

constructor(private optionsService: DealService) {
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
  this.optionsService.getDeals().subscribe(data =>{
    this.dealsList = data['original'];
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
