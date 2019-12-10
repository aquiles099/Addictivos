import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from 'projects/emporium/src/app/app.models';
import { Router } from '@angular/router';
import { CategoryRequestModel } from 'projects/ngx-admin/src/model/category/request/category-request.model';
import { CategoryService } from 'projects/ngx-admin/src/service/category.service';
import { MatTableDataSource } from '@angular/material/table';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';

import { ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-form-categories',
  templateUrl: './form-categories.component.html',
  styleUrls: ['./form-categories.component.scss']
})
export class FormCategoriesComponent implements OnInit {
  
  categoryForm: FormGroup;
  category: Category;

  //Toast
  config: ToasterConfig;
  index = 1;
  destroyByClick = true;
  duration = 3000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';

  private categoryRequest: CategoryRequestModel;

  constructor( protected router: Router,
               private formBuilder: FormBuilder,
               private categoryService: CategoryService,
               private toastrService: NbToastrService,) { }

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      icon_class: ['', Validators.required],
      slug: ['', Validators.required],
    });
  }

  createCategory(){
    this.categoryRequest = new CategoryRequestModel;
    this.categoryRequest.title = this.categoryForm.controls.name.value;
    this.categoryRequest.icon_class = this.categoryForm.controls.icon_class.value;
    this.categoryRequest.slug = this.categoryForm.controls.slug.value;
    this.save(this.categoryRequest);
  }
  
  save(categoriesRequest: CategoryRequestModel){
    this.categoryService.saveCategory(categoriesRequest).toPromise().then(output => {
      console.log(output);

      this.showToast("success", "Proceso Exitoso", "Categoria Agregada con exitos");
      setTimeout(() => {
        this.router.navigate(['/pages/admin-categories/table-categories']);
      }, 300);

    }).catch((error) => {
      // this.makeToast();
      this.showToast("danger", "Ups Sucedio Algo", "Esta categoria no lo hemos podido agregar, revisar los campos");
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



}
