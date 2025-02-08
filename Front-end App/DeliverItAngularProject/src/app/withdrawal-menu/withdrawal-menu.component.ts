import { Component } from '@angular/core';
import { User } from '../entities/user.entity';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { WithdrawalService } from '../services/withdrawal.service';

@Component({
  selector: 'app-withdrawal-menu',
  templateUrl: './withdrawal-menu.component.html',
  styleUrls: ['./withdrawal-menu.component.scss'],
})
export class WithdrawalMenuComponent {
  loggedUser: User = new User();
  pastWithdrawals = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private withdrawalService: WithdrawalService
  ) {}

  ngOnInit() {
    this.userService
      .findOne()
      .subscribe((response) => (this.loggedUser = response));
    this.withdrawalService
      .findAllByDelivery()
      .subscribe((response) => (this.pastWithdrawals = response.slice(0, 3)));
  }
}
