import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDeliveryBoyComponent } from './home-delivery-boy.component';

describe('HomeDeliveryBoyComponent', () => {
  let component: HomeDeliveryBoyComponent;
  let fixture: ComponentFixture<HomeDeliveryBoyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeDeliveryBoyComponent]
    });
    fixture = TestBed.createComponent(HomeDeliveryBoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
