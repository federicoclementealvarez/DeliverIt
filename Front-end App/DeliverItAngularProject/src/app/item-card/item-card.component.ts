import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {

  @Input() id: number;
  @Input() name: string = "Name ejemplo";
  @Input() description: string = "Description ejemplo";
}
