import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductButtonComponent } from './edit-product-button.component';

describe('EditProductButtonComponent', () => {
  let component: EditProductButtonComponent;
  let fixture: ComponentFixture<EditProductButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProductButtonComponent]
    });
    fixture = TestBed.createComponent(EditProductButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
