import { Component, Input } from '@angular/core';
import { Shop } from '../entities/shop.entity';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {

  @Input() arrayId?: number;
  @Input() name: string;
  @Input() description: string;
  @Input() shop?: string;
}
