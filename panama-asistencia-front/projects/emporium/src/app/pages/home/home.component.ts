import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Product, Deal } from "../../app.models";
import { DataPaService } from '../../../app/services/data-pa.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public slides = [
    { title: "New Laptops", subtitle: "Now starting at $1299", image: "assets/images/banners/Banner-1.jpg" },
    { title: "New mobile phone", subtitle: "Special for today", image: "assets/images/banners/Banner-2.jpg" },
    { title: "Watch collection", subtitle: "Special for today", image: "assets/images/banners/Banner-3.jpg" },
    { title: "Summer collection", subtitle: "New Arrivals On Sale", image: "assets/images/banners/Banner-4.jpg" }
];

  public brands = [];
  public banners = [];
  public featuredProducts: Array<Product>;
  public onSaleProducts: Array<Product>;
  public topRatedProducts: Array<Product>;
  public newArrivalsProducts: Array<Product>;
  public type: number= 1;
  public type2: number= 2;
  public deals:any;
  public sDeals:Array<Deal>;
  private param1;




  constructor(public appService:AppService,
              public dataPaService:DataPaService) { }

  ngOnInit() {

    
    if(localStorage.getItem('load')=='1'){
      localStorage.setItem('load', '2');
      window.location.reload();
      
    }

    this.getBanners();
    this.getProducts("featured");
    this.getBrands();
    this.getDeals();
    localStorage.removeItem('response');
    localStorage.removeItem('option');
    localStorage.removeItem('deal');
  }

  public onLinkClick(e){
    this.getProducts(e.tab.textLabel.toLowerCase()); 
  }

  public getDeals(){
    this.dataPaService.getData().subscribe(
      data => {
        //console.log(data);
        this.deals = data['deals'];
        this.sDeals = data['deals'].slice(0,2);
      },
      (err) => {
        console.log (err.message);
      }
    );
  }

  public getProducts(type){
    if(type == "featured" && !this.featuredProducts){
      this.appService.getProducts("featured").subscribe(data=>{
        this.featuredProducts = data;      
      }) 
    }
    if(type == "on sale" && !this.onSaleProducts){
      this.appService.getProducts("on-sale").subscribe(data=>{
        this.onSaleProducts = data;      
      })
    }
    if(type == "top rated" && !this.topRatedProducts){
      this.appService.getProducts("top-rated").subscribe(data=>{
        this.topRatedProducts = data;      
      })
    }
    if(type == "new arrivals" && !this.newArrivalsProducts){
      this.appService.getProducts("new-arrivals").subscribe(data=>{
        this.newArrivalsProducts = data;      
      })
    }
   
   
  }

  public getBanners(){
    this.appService.getBanners().subscribe(data=>{
      this.banners = data;
    })
  }

  public getBrands(){
    this.brands = this.appService.getBrands();
  }

}
