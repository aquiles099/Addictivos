import { Component, OnInit, Input } from '@angular/core';
import { Deal } from '../../app.models';
import { SlugifyPipe } from '../../theme/utils/slugify.pipe';

@Component({
  selector: 'app-secondary-deal',
  templateUrl: './secondary-deal.component.html',
  styleUrls: ['./secondary-deal.component.scss']
})
export class SecondaryDealComponent implements OnInit {
  @Input('deals') deals: Array<Deal>;

  constructor(public slugifyPipe: SlugifyPipe) { }

  ngOnInit() {
  }

  slugify(input: string){
    return this.slugifyPipe.transform(input);
}

}
