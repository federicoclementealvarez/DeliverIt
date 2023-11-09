import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../services/shop.service';
import { ShopTypeService } from '../services/shop-type.service';
import { ShopType } from '../entities/shopType.entity';
import { Shop } from '../entities/shop.entity';

@Component({
  selector: 'app-customer-search-results',
  templateUrl: './customer-search-results.component.html',
  styleUrls: ['./customer-search-results.component.scss']
})
export class CustomerSearchResultsComponent {
  shopTypeId?: string
  searchInput?: string
  shopType: ShopType
  shops: Shop[] = []

  constructor(private _Activatedroute: ActivatedRoute,
    private shopService: ShopService,
    private shopTypeService: ShopTypeService) { }

  ngOnInit() {
    this.shopTypeId = this._Activatedroute.snapshot.paramMap.get("shopTypeId");
    this.searchInput = this._Activatedroute.snapshot.paramMap.get("searchInput");

    console.log(this.searchInput, this.shopTypeId)

    if (this.shopTypeId !== null) {
      this.getShopType(this.shopTypeId)
      this.shopService.getShopsByShopType(this.shopTypeId).subscribe((data: Shop[]) => {
        this.shops = data
      })
      console.log(this.shops)
    }

    if (this.searchInput !== null) {
      console.log('s')
      this.shopService.getShopsBySearchInput(this.searchInput).subscribe((data: Shop[]) => {
        this.shops = data
      })
    }
  }

  getShopType(id: string) {
    this.shopTypeService.getOne(id)
  }
}
