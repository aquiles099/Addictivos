import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DealModelResponse } from 'projects/ngx-admin/src/model/deal/response/dealModelResponse.model';
import { DealService } from 'projects/ngx-admin/src/service/deal.service';
import { Router } from '@angular/router';
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';
import {DomSanitizer} from '@angular/platform-browser';
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

  index = 1;
  destroyByClick = true;
  duration = 3000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';


constructor(private sanitizer:DomSanitizer,private dealService: DealService,private toastrService: NbToastrService,private router: Router) {
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
      console.log("dataSource:",this.dataSource);
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
  public delete(id: any){
    this.dealService.delete(id).toPromise().then(data =>{
      console.log("data:",data);
      this.showToast("success", "Proceso Exitoso", "Oferta eliminada con exito"); 
      this.getDeals();  
    }).catch((error) => {
      console.log("error");
      console.log(error);
    });
  }
  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `. ${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }
  sanitize(url:string){
      return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
