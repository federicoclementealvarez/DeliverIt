import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductCategoryComponent } from './add-product-category.component';

describe('AddProductCategoryComponent', () => {
  let component: AddProductCategoryComponent;
  let fixture: ComponentFixture<AddProductCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProductCategoryComponent]
    });
    fixture = TestBed.createComponent(AddProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
