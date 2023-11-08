import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSearchbarComponent } from './customer-searchbar.component';

describe('CustomerSearchbarComponent', () => {
  let component: CustomerSearchbarComponent;
  let fixture: ComponentFixture<CustomerSearchbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerSearchbarComponent]
    });
    fixture = TestBed.createComponent(CustomerSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
