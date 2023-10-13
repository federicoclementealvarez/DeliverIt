import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeShopComponent } from './home-shop.component';

describe('HomeShopComponent', () => {
  let component: HomeShopComponent;
  let fixture: ComponentFixture<HomeShopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeShopComponent]
    });
    fixture = TestBed.createComponent(HomeShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
