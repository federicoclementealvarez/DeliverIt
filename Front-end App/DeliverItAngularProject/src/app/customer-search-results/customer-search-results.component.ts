import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../services/shop.service';
import { Shop } from '../entities/shop.entity';

@Component({
  selector: 'app-customer-search-results',
  templateUrl: './customer-search-results.component.html',
  styleUrls: ['./customer-search-results.component.scss']
})
export class CustomerSearchResultsComponent {
  shopTypeId?: string
  shopTypeDescription?: string
  searchInput?: string
  shops: Shop[]

  constructor(private route: ActivatedRoute, private shopService: ShopService) {
    this.shops = []
  }

  ngOnInit() {
    this.route.queryParams.subscribe((p: any) => {
      if (p.shopTypeId && p.shopTypeDescription) {
        this.shopTypeId = p.shopTypeId
        this.shopTypeDescription = p.shopTypeDescription
        this.shopService.getShopsByShopType(this.shopTypeId).subscribe((data: Shop[]) => {
          this.shops = data
        })
      }
      if (p.searchInput) {
        this.searchInput = p.searchInput
        this.shopService.getShopsBySearchInput(this.searchInput).subscribe((data: Shop[]) => {
          this.shops = data
        })
      }
    })
  }
}
