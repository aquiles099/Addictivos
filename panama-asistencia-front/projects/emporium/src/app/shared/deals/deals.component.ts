import { Component, OnInit, Input } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { DataPaService } from '../../services/data-pa.service';
import { Deal } from '../../app.models';
import { SlugifyPipe } from '../../theme/utils/slugify.pipe';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {
  @Input('type') type: number;
  @Input('deals') deals: Array<Deal>;

  public config: SwiperConfigInterface = {};
  public label: string;
  public route: string;
  public button: string;

  constructor(public dataPaService: DataPaService, public slugifyPipe: SlugifyPipe) { }

  ngOnInit() {
    this.getLabel(this.type);
  }

  ngAfterViewInit() {
    this.config = {
      observer: false,
      slidesPerView: 6,
      spaceBetween: 16,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: true,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 1
        },
        740: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },
        1500: {
          slidesPerView: 5,
        }
      }
    }
  }

  public getLabel(num: number) {
    if (num == 1) {
      this.label = "OFERTAS EN LÍNEA";
      this.route = "deals";
      this.button = "Oferta";
    } else {
      this.label = "DESCUENTOS EN COMERCIOS";
      this.route = "promos";
      this.button = "Promoción";
    }
  }
  slugify(input: string) {
    return this.slugifyPipe.transform(input);
  }


}
