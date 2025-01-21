import { Component } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { Shop } from '../entities/shop.entity';
import { Review, ReviewRequest } from '../entities/review.entity';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../services/validators.service';
import { Location } from '@angular/common';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent {
  constructor(
    public reviewService: ReviewService,
    private validatorsService: ValidatorsService,
    private location: Location,
    private loginService: LoginService
  ) {}

  loggedUser = this.loginService.getLoggedUser();

  shopToReview: Shop;
  reviewToUpdate: Review;
  shopImageUrl: string;

  stars = [
    { number: 1, clicked: false },
    { number: 2, clicked: false },
    { number: 3, clicked: false },
    { number: 4, clicked: false },
    { number: 5, clicked: false },
  ];

  reviewForm = new FormGroup({
    stars: new FormControl(0, [Validators.required, this.notAccept0]),
    comment: new FormControl('', Validators.required),
  });
  formSubmitted = false;

  loading = false;

  ngOnInit() {
    this.shopToReview = this.reviewService.shopToReview;
    this.reviewToUpdate = this.reviewService.reviewToUpdate;

    if (this.reviewToUpdate) {
      this.shopToReview = this.reviewToUpdate.shop;
      this.reviewService.shopToReview = this.shopToReview;
      this.toggleStar(this.reviewToUpdate.stars);
      this.reviewForm.patchValue({ comment: this.reviewToUpdate.comment });
    }

    this.shopImageUrl = `${this.shopToReview.logoPath}`;
  }

  toggleStar(number: number) {
    this.reviewForm.patchValue({ stars: number });

    this.stars = this.stars.map((s) => {
      if (s.number <= number) {
        return { ...s, clicked: true };
      } else {
        return { ...s, clicked: false };
      }
    });
  }

  submitReview() {
    this.formSubmitted = true;

    if (this.reviewForm.valid) {
      this.loading = !this.loading;

      const review: ReviewRequest = {
        stars: this.reviewForm.controls['stars'].value,
        comment: this.reviewForm.controls['comment'].value,
        dateTime: this.validatorsService.getCurrentDateTime(),
        shop: this.shopToReview.id,
        user: this.loggedUser.id,
      };
      if (!this.reviewToUpdate) {
        // Create Review
        this.reviewService.create(review).subscribe(() => {
          this.goBack();
        });
      } else {
        // Update Review
        review.id = this.reviewToUpdate.id;
        this.reviewService.update(review).subscribe(() => {
          this.goBack();
        });
      }
    }
  }

  deleteReview() {
    this.loading = !this.loading;

    this.reviewService.delete(this.reviewToUpdate.id).subscribe(() => {
      this.goBack();
    });
  }

  goBack() {
    this.location.back();
  }

  getStars() {
    return this.reviewForm.get('stars');
  }

  getComment() {
    return this.reviewForm.get('comment');
  }

  notAccept0(control) {
    const value = control.value;
    if (value === 0) {
      return { notAccept0: true };
    }
    return null;
  }
}
