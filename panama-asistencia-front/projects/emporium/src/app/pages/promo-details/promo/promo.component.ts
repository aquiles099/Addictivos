import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { Data, AppService } from '../../../app.service';
import { Product, Deal, OptionPrice } from "../../../app.models";
import { emailValidator } from '../../../theme/utils/app-validators';
import { DataPaService } from '../../../services/data-pa.service';
import { PromoZoomComponent } from './promo-zoom/promo-zoom.component';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit {

  @ViewChild('zoomViewer', { static: false }) zoomViewer;
  @ViewChild(SwiperDirective, { static: true }) directiveRef: SwiperDirective;
  public config: SwiperConfigInterface={};
  public product: Product;
  public image: any;
  public zoomImage: any;
  private sub: any;
  public form: FormGroup;
  public relatedProducts: Array<Product>;
  public deal: Deal;
  public selected: OptionPrice;

  public slides = [
    { title: "New Laptops", subtitle: "Now starting at $1299", image: "assets/images/banners/Banner-1.jpg" },
    { title: "New mobile phone", subtitle: "Special for today", image: "assets/images/banners/Banner-2.jpg" },
    { title: "Watch collection", subtitle: "Special for today", image: "assets/images/banners/Banner-3.jpg" },
    { title: "Summer collection", subtitle: "New Arrivals On Sale", image: "assets/images/banners/Banner-4.jpg" }
];

  constructor(public appService:AppService, 
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog, 
              public formBuilder: FormBuilder,
              public dataPaService: DataPaService) {  }

  ngOnInit() {      
    this.sub = this.activatedRoute.params.subscribe(params => { 
      this.getDealById(params['id']); 
    }); 
    this.form = this.formBuilder.group({ 
      'review': [null, Validators.required],            
      'name': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': [null, Validators.compose([Validators.required, emailValidator])]
    }); 
    this.getRelatedProducts();    
  }

  ngAfterViewInit(){
    this.config = {
      observer: false,
      slidesPerView: 4,
      spaceBetween: 10,      
      keyboard: true,
      navigation: true,
      pagination: false,       
      loop: false, 
      preloadImages: false,
      lazy: true, 
      breakpoints: {
        480: {
          slidesPerView: 2
        },
        600: {
          slidesPerView: 3,
        }
      }
    }
  }

  public getDealById(id){
    this.dataPaService.getData().subscribe(data=>{
      let aux:Array<Deal> = data['deals'];
      for (let i = 0; i < aux.length; i++) {
        if (aux[i].id == id) {
          this.deal = aux[i];
          this.image = this.slides[0].image;
          this.zoomImage = this.slides[0].image;
          this.selected = this.deal.option_pricings[0];
          i = aux.length;
        }
      }
    })
  }

  public getRelatedProducts(){
    this.appService.getProducts('related').subscribe(data => {
      this.relatedProducts = data;
    })
  }

  public selectImage(image){
    this.image = image;
    this.zoomImage = image;
  }

  public onMouseMove(e){
    if(window.innerWidth >= 1280){
      var image, offsetX, offsetY, x, y, zoomer;
      image = e.currentTarget; 
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      x = offsetX/image.offsetWidth*100;
      y = offsetY/image.offsetHeight*100;
      zoomer = this.zoomViewer.nativeElement.children[0];
      if(zoomer){
        zoomer.style.backgroundPosition = x + '% ' + y + '%';
        zoomer.style.display = "block";
        zoomer.style.height = image.height + 'px';
        zoomer.style.width = image.width + 'px';
      }
    }
  }

  public onMouseLeave(event){
    this.zoomViewer.nativeElement.children[0].style.display = "none";
  }

  public openZoomViewer(){
    this.dialog.open(PromoZoomComponent, {
      data: this.zoomImage,
      panelClass: 'zoom-dialog'
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  } 

  public onSubmit(values:Object):void {
    if (this.form.valid) {
      //email sent
    }
  }

}
