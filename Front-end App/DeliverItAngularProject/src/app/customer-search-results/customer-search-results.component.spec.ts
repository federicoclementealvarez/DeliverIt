import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSearchResultsComponent } from './customer-search-results.component';

describe('CustomerSearchResultsComponent', () => {
  let component: CustomerSearchResultsComponent;
  let fixture: ComponentFixture<CustomerSearchResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerSearchResultsComponent]
    });
    fixture = TestBed.createComponent(CustomerSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
