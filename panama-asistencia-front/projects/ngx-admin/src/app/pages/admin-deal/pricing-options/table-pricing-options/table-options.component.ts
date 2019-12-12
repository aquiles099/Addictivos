import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PriceOptionService } from 'projects/ngx-admin/src/service/price_option.service';
import { PriceOptionResquestModel } from 'projects/ngx-admin/src/model/price_option/request/price_option-request.model';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-options',
  templateUrl: './table-options.component.html',
  styleUrls: ['./table-options.component.scss'],
})
export class TableOptionsComponent {

  displayedColumns: string[] = ['original', 'description', 'efective_date', 'closing_date', 'status','actions'];


  dataSource: MatTableDataSource<PriceOptionResquestModel>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public optionsList: Array<PriceOptionResquestModel>;
  public priceOptionId: any;

  constructor( private priceOptionService: PriceOptionService,
               public dialogService: NbDialogService,
               public router: Router) {
    this.getoptions();
  }

  ngOnInit(): void {

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getoptions() {

    this.optionsList = [];
    this.priceOptionService.getOptionPrices().subscribe(data => {
      this.optionsList = data['data']['option_pricing'];
      console.log(this.optionsList);

      if (this.optionsList.length > 0) {
        this.dataSource = new MatTableDataSource(this.optionsList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.paginator._intl.itemsPerPageLabel = "Ver por página";
 
      }

    })
  }

  openDialog(dialog: TemplateRef<any>, id:any) {
    this.priceOptionId = id;
    this.dialogService.open(
      dialog,
      { context: 'this is some additional data passed to dialog' });
  }


  public edit(id: any) {
    let aux = this.optionsList;
    for (let i = 0; i < aux.length; i++) {
      if (aux[i].id == id) {
        let category: any = aux[i];
        //this.priceOptionService.setCategory(category);
        //this.router.navigateByUrl("pages/admin-categories/edit-category");
      }
    }
  }

  public delete(id:number){
    //this.priceOptionService.deleteCategory(id);
    //this.router.navigateByUrl("pages/admin-categories/table-categories");
    
  }


}
