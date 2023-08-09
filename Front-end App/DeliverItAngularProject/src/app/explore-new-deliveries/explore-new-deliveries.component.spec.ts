import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreNewDeliveriesComponent } from './explore-new-deliveries.component';

describe('ExploreNewDeliveriesComponent', () => {
  let component: ExploreNewDeliveriesComponent;
  let fixture: ComponentFixture<ExploreNewDeliveriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExploreNewDeliveriesComponent]
    });
    fixture = TestBed.createComponent(ExploreNewDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
