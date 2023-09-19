import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.scss']
})
export class ShopCardComponent {

  @Input() productId: string;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() bottomText: string;
  @Input() hasStar: boolean;
  @Input() hasDropdown: boolean = false;
  @Input() hasButton: boolean = false;

}
