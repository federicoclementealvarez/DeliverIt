import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shop-type-icon',
  templateUrl: './shop-type-icon.component.html',
  styleUrls: ['./shop-type-icon.component.scss']
})
export class ShopTypeIconComponent {
  @Input() icon: string;
  @Input() subtitle: string;


}
