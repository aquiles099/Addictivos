import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryRequestModel } from 'projects/ngx-admin/src/model/category/request/category-request.model';
import { CategoryService } from 'projects/ngx-admin/src/service/category.service';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-categories',
  templateUrl: './table-categories.component.html',
  styleUrls: ['./table-categories.component.scss']
})
export class TableCategoriesComponent implements OnInit {

  public displayedColumns: string[] = ['slug', 'title', 'icon_class', 'actions'];
  public dataSource: MatTableDataSource<CategoryRequestModel>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  public categoryList: Array<CategoryRequestModel>;
  public categoryId: any;

  constructor( private categoryService: CategoryService,
               public dialogService: NbDialogService,
               public router: Router) {
    this.getCategory();
  }

  ngOnInit() {
    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getCategory(){
    this.categoryService.getCategories().subscribe(data => {
      this.categoryList = data['data']['categories'];
      this.dataSource = new MatTableDataSource(this.categoryList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel="Ver por página";
    });

  }

  openDialog(dialog: TemplateRef<any>, id:any) {
    this.categoryId = id;
    this.dialogService.open(
      dialog,
      { context: 'this is some additional data passed to dialog' });
  }


  public edit(id: any) {
    let aux = this.categoryList;
    for (let i = 0; i < aux.length; i++) {
      if (aux[i].id == id) {
        let category: any = aux[i];
        this.categoryService.setCategory(category);
        this.router.navigateByUrl("pages/admin-categories/edit-category");
      }
    }
  }

  public delete(id:number){

    this.categoryService.deleteCategory(id);
    this.router.navigateByUrl("pages/admin-categories/table-categories");
    
  }

}
