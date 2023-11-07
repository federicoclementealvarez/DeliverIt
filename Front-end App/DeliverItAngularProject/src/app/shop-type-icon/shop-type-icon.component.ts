import { Component, Input, HostListener } from '@angular/core';
import { CustomerSearchResultsComponent } from '../customer-search-results/customer-search-results.component';

@Component({
  selector: 'app-shop-type-icon',
  templateUrl: './shop-type-icon.component.html',
  styleUrls: ['./shop-type-icon.component.scss']
})
export class ShopTypeIconComponent {
  @Input() id: string;
  @Input() description: string;
  @Input() iconDescription: string;

  // When the User clicks the Component
  @HostListener("click") onClick() {
    CustomerSearchResultsComponent
    console.log(this.description)
  }
}
