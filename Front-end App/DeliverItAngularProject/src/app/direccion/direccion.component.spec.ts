import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DireccionComponent } from './direccion.component';

describe('DireccionComponent', () => {
  let component: DireccionComponent;
  let fixture: ComponentFixture<DireccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DireccionComponent]
    });
    fixture = TestBed.createComponent(DireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
