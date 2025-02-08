import { Component } from '@angular/core';
import { User } from '../entities/user.entity';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ValidatorsService } from '../services/validators.service';
import { WithdrawalService } from '../services/withdrawal.service';

@Component({
  selector: 'app-withdraw-options',
  templateUrl: './withdraw-options.component.html',
  styleUrls: ['./withdraw-options.component.scss'],
})
export class WithdrawOptionsComponent {
  loggedUser: User = new User();

  constructor(
    private userService: UserService,
    private router: Router,
    private validatorsService: ValidatorsService,
    private withdrawalService: WithdrawalService
  ) {}

  ngOnInit() {
    this.userService
      .findOne()
      .subscribe((response) => (this.loggedUser = response));
  }

  withdrawAll() {
    if (this.loggedUser.creditBalance > 0) {
      const withdrawal = {
        amount: this.loggedUser.creditBalance,
        amountBefore: this.loggedUser.creditBalance,
        amountAfter: 0,
        dateTime: this.validatorsService.getCurrentDateTime(),
      };
      this.userService
        .update(this.loggedUser.creditBalance * -1)
        .subscribe((response) => console.log(response));
      this.withdrawalService.add(withdrawal).subscribe((response) => {
        console.log(response);
        localStorage.setItem(
          'withdrawalAmount',
          this.loggedUser.creditBalance.toString()
        );
        this.router.navigate(['withdrawal-confirmed']);
      });
    } else alert('No puedes retirar $0');
  }

  selectAmount() {
    this.router.navigate(['withdrawal-amount']);
  }
}
