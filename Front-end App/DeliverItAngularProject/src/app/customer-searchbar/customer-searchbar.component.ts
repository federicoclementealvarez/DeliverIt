import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-searchbar',
  templateUrl: './customer-searchbar.component.html',
  styleUrls: ['./customer-searchbar.component.scss']
})
export class CustomerSearchbarComponent {
  constructor(private router: Router) { }

  searchInput = ''

  handleSubmit(e) {
    e.preventDefault();
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
    this.router.navigate(['/search-customer', { searchInput: this.searchInput }])
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.handleSubmit(e);
    }
  }
}
