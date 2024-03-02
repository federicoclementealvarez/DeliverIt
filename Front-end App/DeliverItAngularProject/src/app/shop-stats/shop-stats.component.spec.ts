import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopStatsComponent } from './shop-stats.component';

describe('ShopStatsComponent', () => {
  let component: ShopStatsComponent;
  let fixture: ComponentFixture<ShopStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopStatsComponent]
    });
    fixture = TestBed.createComponent(ShopStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
