import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent {
  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit() {
    sessionStorage.removeItem('idPaymentType');
  }

  onAddPaymentType() {
    this.router.navigate(['add-payment-type']);
  }

  onEditPaymentType() {
    this.router.navigate(['payment-type-list']);
  }

  onAddProductCategory() {
    this.router.navigate(['add-product-category']);
  }

  onEditProductCategory() {
    this.router.navigate(['product-category-list']);
  }

  onAddCommissionPercentage() {
    this.router.navigate(['add-commission-percentage']);
  }

  onEditCommissionPercentage() {
    this.router.navigate(['commission-percentage-list']);
  }

  logout() {
    this.loginService.logout();
  }
}
