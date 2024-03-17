import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Shop } from '../entities/shop.entity';
import { ShopService } from '../services/shop.service';
import { ReviewService } from '../services/review.service';
import { BaseUrlService } from '../services/base-url.service';

@Component({
  selector: 'app-shop-customer',
  templateUrl: './shop-customer.component.html',
  styleUrls: ['./shop-customer.component.scss']
})
export class ShopCustomerComponent {
  constructor(private orderService: OrderService,
    private productService: ProductService,
    private route: ActivatedRoute, private shopService: ShopService, private reviewService: ReviewService, private router: Router, private baseUrlService: BaseUrlService) { }

  products: Product[]
  totalQty: number
  shopId: string
  shop: Shop = new Shop()
  baseUrl: string;

  ngOnInit() {
    this.baseUrl = this.baseUrlService.getBaseUrl()
    this.shopId = this.route.snapshot.params['shopId']
    this.getShop()
    this.getProducts()
    this.orderService.totalQty$.subscribe((_totalQty) => {
      this.totalQty = _totalQty
    });
  }

  getShop() {
    this.shopService.getOne(this.shopId)
      .subscribe((data: Shop) => {
        this.shop = data
        localStorage.setItem('shippingPrice', this.shop.shippingPrice.toString())
      })
  }

  getProducts() {
    this.productService.getByShopId(this.shopId)
      .subscribe((data: Product[]) => {
        this.products = data
      })
  }

  resetProducts() {
    this.orderService.resetProducts()
  }

  navigateToReviews() {
    this.reviewService.shopToReview = this.shop
    this.router.navigate(['/reviews/shop'])
  }
}
