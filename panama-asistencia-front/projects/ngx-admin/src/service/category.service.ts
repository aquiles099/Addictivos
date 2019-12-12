import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { CategoryRequestModel } from '../model/category/request/category-request.model';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { ToasterConfig } from 'angular2-toaster';


@Injectable()
export class CategoryService extends BaseService {

    private servicio = 'category/create';
    private categories = 'category/categories';
    public urlC = environment.url + 'category/';

    //Toast
    config: ToasterConfig;
    index = 1;
    destroyByClick = true;
    duration = 3000;
    hasIcon = true;
    position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    preventDuplicates = false;
    status: NbComponentStatus = 'primary';

    private categoryEdit = new BehaviorSubject<CategoryRequestModel>(null);


    constructor(private http: HttpClient,
        private toastrService: NbToastrService,
        public router: Router) {
        super();
    }

    saveCategory(request: CategoryRequestModel): Observable<any> {
        return this.post(this.http, this.servicio, request);
    }

    getCategories(): Observable<any> {
        //return this.http.get(this.http + this.categories);
        return this.get(this.http, this.categories);
    }

    public updateCategory(id: number, category: CategoryRequestModel): void {
        this.http.patch(this.urlC + id, category).subscribe(
            res => {
                console.log(res);
                this.showToast("success", "Proceso Exitoso", "Categoría Agregada con exitos");
                setTimeout(() => {
                    this.router.navigate(['/pages/admin-categories/table-categories']);
                }, 300);
            },
            error => {
                console.log(error);
                this.showToast("danger", "Ups Sucedio Algo", "Esta categoría no se ha podido actualizar, revisar los campos");
            });

        console.log('request sent. Waiting for response...');
    }

    public deleteCategory(id: number) {
        return this.http.delete(this.urlC + id).subscribe(
            (response) => {
                console.log(response);
                this.showToast("success", "Proceso Exitoso", "Categoría eliminada con exitos");
                setTimeout(() => {
                    this.router.navigate(['/pages/admin-categories/table-categories']);
                }, 3000);
            },
            (error) => {
                console.log(error);
                this.showToast("danger", "Ups Sucedio Algo", "Esta categoría no se ha podido eliminar. Intente de nuevo");
            }
        );
    }

    //Enviar usuario de TableComerceComponent a EditCategoryComponent
    setCategory(category: CategoryRequestModel) {
        this.categoryEdit.next(category);
    }

    //Obtener usuario enviado a EditCategoryComponent
    getCategory(): Observable<CategoryRequestModel> {
        return this.categoryEdit.asObservable();
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
