import { Component, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-type-icon',
  templateUrl: './shop-type-icon.component.html',
  styleUrls: ['./shop-type-icon.component.scss']
})
export class ShopTypeIconComponent {
  @Input() id: string;
  @Input() description: string;
  @Input() iconDescription: string;

  constructor(private router: Router) { }

  // When the User clicks the Component
  @HostListener("click") onClick() {
    this.router.navigate(['/search-customer'], { queryParams: { shopTypeId: this.id, shopTypeDescription: this.description } })
  }
}
