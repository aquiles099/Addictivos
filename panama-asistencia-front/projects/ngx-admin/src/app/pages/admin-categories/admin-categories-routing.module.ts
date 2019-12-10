import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCategoriesComponent } from './admin-categories.component';
import { FormCategoriesComponent } from './form-categories/form-categories.component';
import { TableCategoriesComponent } from './table-categories/table-categories.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

const routes: Routes = [
    {
        path: '',
        component: AdminCategoriesComponent,
        children: [
            {
                path: 'categories',
                component: FormCategoriesComponent,
            },
            {
                path: 'table-categories',
                component: TableCategoriesComponent,
            },
            {
                path: 'edit-category',
                component: EditCategoryComponent
            },
        ],
    },
];


@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})

export class AdminCategoriesRoutingModule {

}