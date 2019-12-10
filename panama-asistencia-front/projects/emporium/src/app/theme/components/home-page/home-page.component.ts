import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public slides = [
    { title: "New Laptops", subtitle: "Now starting at $1299", image: "assets/images/addictivosLogos/Fotografia a cafe.jpg" },
    { title: "New mobile phone", subtitle: "Special for today", image: "assets/images/addictivosLogos/Niño en en tablero .jpg" },
    { title: "New Laptops", subtitle: "Now starting at $1299", image: "assets/images/addictivosLogos/Fotografia a cafe.jpg" },
    { title: "New mobile phone", subtitle: "Special for today", image: "assets/images/addictivosLogos/Niño en en tablero .jpg" },
  ];

  public config: SwiperConfigInterface = {};

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true
  };

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.config = {
      slidesPerView: 1,
      spaceBetween: 0,
      keyboard: true,
      navigation: true,
      pagination: this.pagination,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false
      },
      speed: 500,
      effect: "slide"
    }
  }

}
