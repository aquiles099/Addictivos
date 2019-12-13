import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DealModelResponse } from 'projects/ngx-admin/src/model/deal/response/dealModelResponse.model';
import { DealService } from 'projects/ngx-admin/src/service/deal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-deals',
  templateUrl: './table-deals.component.html',
  styleUrls: ['./table-deals.component.scss'],
})
export class TableDealsComponent {

displayedColumns: string[] = ['img','short_title', 'effective_date', 'is_public','actions'];
dataSource: MatTableDataSource<DealModelResponse>;

@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
@ViewChild(MatSort, {static: true}) sort: MatSort;

public dealsList: Array<DealModelResponse>;

constructor(private dealService: DealService,
               public router: Router) {
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
  this.dealService.getDeals().toPromise().then(data =>{
      this.dealsList = data['data']['deals'];    
      if(this.dealsList.length > 0){
        this.dataSource = new MatTableDataSource(this.dealsList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.paginator._intl.itemsPerPageLabel="Ver por página";
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }    
    }).catch((error) => {
      console.log("error");
      console.log(error);
    });
}
public edit(id: any) {
  let aux = this.dealsList;
  for (let i = 0; i < aux.length; i++) {
    if (aux[i].id == id) {
      let deal: any = aux[i];
      this.dealService.setDeal(deal);
      this.router.navigateByUrl("pages/admin-deal/edit-deal");
    }
  }
  }

}
