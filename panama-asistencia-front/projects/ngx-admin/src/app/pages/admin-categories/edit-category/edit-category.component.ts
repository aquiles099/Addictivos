import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryRequestModel } from 'projects/ngx-admin/src/model/category/request/category-request.model';
import { CategoryService } from 'projects/ngx-admin/src/service/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  public editForm: FormGroup;
  public editRequest: CategoryRequestModel;
  public category: CategoryRequestModel;
  isValid: boolean = false;


  constructor( public formBuilder: FormBuilder,
               public router: Router,
               public categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategory().subscribe(data => this.category = data);

    this.editForm = this.formBuilder.group({
      title: [{ value: this.category.title, disabled: true }, Validators.compose([Validators.required, Validators.minLength(3)])],
      slug: [{ value: this.category.slug, disabled: true }, Validators.required],
      icon_class: [{ value: this.category.icon_class, disabled: true}, Validators.required]
    });
  }

  public editCategory(){
    this.editRequest = new CategoryRequestModel();
    this.editRequest.title = this.editForm.controls.title.value;
    this.editRequest.slug = this.editForm.controls.slug.value;
    this.editRequest.icon_class = this.editForm.controls.icon_class.value;

    this.save(this.editRequest);

    this.editForm.controls.title.disable();
    this.editForm.controls.slug.disable();
    this.editForm.controls.icon_class.disable();

    this.isValid = false;
  }

  public save(editRequest: CategoryRequestModel) {
    this.categoryService.updateCategory(this.category.id, editRequest);
  }

  public enableEdit(){
    this.editForm.controls.title.enable();
    this.editForm.controls.slug.enable();
    this.editForm.controls.icon_class.enable();
    this.isValid = true;
  }

}
