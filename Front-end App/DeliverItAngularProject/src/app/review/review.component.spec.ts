import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewComponent } from './review.component';
import { ReviewService } from '../services/review.service';
import {
  CreateReviewServiceMock,
  UpdateReviewServiceMock,
} from '../mocks/review.service.mock';
import { ShopService } from '../services/shop.service';
import { ShopServiceMock } from '../mocks/shop.service.mock';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('Create a Review', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;
  let spy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ReviewService, useValue: CreateReviewServiceMock },
        { provide: ShopService, useValue: ShopServiceMock },
      ],
    }).compileComponents();
    spy = jest.spyOn(console, 'error').mockImplementation(() => null);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    jest.spyOn(component, 'submitReview');

    // Mock stars data
    component.stars = [
      { number: 1, clicked: false },
      { number: 2, clicked: false },
      { number: 3, clicked: false },
      { number: 4, clicked: false },
      { number: 5, clicked: false },
    ];
    fixture.detectChanges();
    component.shopToReview = ShopServiceMock.getOne();
    component.reviewService = TestBed.inject(ReviewService);
  });

  afterEach(() => {
    spy.mockRestore();
  });

  it('should create the page', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct button text', () => {
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    expect(button.textContent.trim()).toEqual('ENVIAR');
  });

  it('should have the correct shop title', () => {
    fixture.detectChanges();
    expect(component.shopToReview.name).toEqual('Mongo hamburguesería');
    expect(component.shopToReview.name).not.toEqual('Lemmys pizza');
  });

  it('should add 5 stars to the review', () => {
    const fiveStarButton = fixture.nativeElement.querySelector('#star-5');
    fiveStarButton.click();
    fixture.detectChanges();
    const starsFormControl = component.reviewForm.get('stars');
    expect(starsFormControl.value).toEqual(5);
  });

  it('should write the comment', () => {
    const opinion = 'Estuvieron muy ricas las hamburguesas!';
    const textarea: HTMLTextAreaElement =
      fixture.nativeElement.querySelector('#text-review');
    textarea.value = opinion;
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(textarea.value).toEqual(opinion);
  });

  it('should create the review', () => {
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('#enviar');
    button.click();
    expect(component.submitReview).toHaveBeenCalled();
  });
});

describe('Update a Review', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;
  let spy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewComponent],
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ReviewService, useValue: UpdateReviewServiceMock },
        { provide: ShopService, useValue: ShopServiceMock },
      ],
    }).compileComponents();
    spy = jest.spyOn(console, 'error').mockImplementation(() => null);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    jest.spyOn(component, 'submitReview');

    // Mock stars data
    component.stars = [
      { number: 1, clicked: false },
      { number: 2, clicked: false },
      { number: 3, clicked: false },
      { number: 4, clicked: false },
      { number: 5, clicked: false },
    ];
    fixture.detectChanges();
    component.shopToReview = ShopServiceMock.getOne();
    component.reviewService = TestBed.inject(ReviewService);

    const starsFormControl = component.reviewForm.get('stars');
    starsFormControl.setValue(component.reviewToUpdate.stars);
  });

  afterEach(() => {
    spy.mockRestore();
  });

  it('should create the page', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct button text', () => {
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('#actualizar');
    expect(button.textContent.trim()).toEqual('ACTUALIZAR');
  });

  it('should have the correct shop title', () => {
    fixture.detectChanges();
    expect(component.shopToReview.name).toEqual('Mongo hamburguesería');
    expect(component.shopToReview.name).not.toEqual('Lemmys pizza');
  });

  it('should have the correct number of stars', () => {
    const starsFormControl = component.reviewForm.get('stars');
    expect(starsFormControl.value).toEqual(5);
  });

  it('should have the correct comment', () => {
    const starsFormControl = component.reviewForm.get('comment');
    expect(starsFormControl.value).toEqual(
      'Estuvieron muy ricas las hamburguesas!'
    );
  });

  it('should change to 4 stars', () => {
    const fourStarButton = fixture.nativeElement.querySelector('#star-4');
    fourStarButton.click();
    fixture.detectChanges();
    const starsFormControl = component.reviewForm.get('stars');
    expect(starsFormControl.value).toEqual(4);
  });

  it('should change the comment', () => {
    const opinion = 'Estuvieron ricas las hamburguesas!';
    const textarea: HTMLTextAreaElement =
      fixture.nativeElement.querySelector('#text-review');
    textarea.value = opinion;
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(textarea.value).toEqual(opinion);
  });

  it('should update the review', () => {
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('#actualizar');
    button.click();
    expect(component.submitReview).toHaveBeenCalled();
  });
});

describe('Delete a Review', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;
  let spy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewComponent],
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ReviewService, useValue: UpdateReviewServiceMock },
        { provide: ShopService, useValue: ShopServiceMock },
      ],
    }).compileComponents();
    spy = jest.spyOn(console, 'error').mockImplementation(() => null);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    jest.spyOn(component, 'deleteReview');

    // Mock stars data
    component.stars = [
      { number: 1, clicked: false },
      { number: 2, clicked: false },
      { number: 3, clicked: false },
      { number: 4, clicked: false },
      { number: 5, clicked: false },
    ];
    fixture.detectChanges();
    component.shopToReview = ShopServiceMock.getOne();
    component.reviewService = TestBed.inject(ReviewService);

    const starsFormControl = component.reviewForm.get('stars');
    starsFormControl.setValue(component.reviewToUpdate.stars);
  });

  afterEach(() => {
    spy.mockRestore();
  });

  it('should create the page', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct button text', () => {
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('#eliminar');
    expect(button.textContent.trim()).toEqual('ELIMINAR');
  });

  it('should have the correct shop title', () => {
    fixture.detectChanges();
    expect(component.shopToReview.name).toEqual('Mongo hamburguesería');
    expect(component.shopToReview.name).not.toEqual('Lemmys pizza');
  });

  it('should have the correct number of stars', () => {
    const starsFormControl = component.reviewForm.get('stars');
    expect(starsFormControl.value).toEqual(5);
  });

  it('should have the correct comment', () => {
    const starsFormControl = component.reviewForm.get('comment');
    expect(starsFormControl.value).toEqual(
      'Estuvieron muy ricas las hamburguesas!'
    );
  });

  it('should delete the review', () => {
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('#eliminar');
    button.click();
    expect(component.deleteReview).toHaveBeenCalled();
  });
});
