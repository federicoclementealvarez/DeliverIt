import { User } from './user.entity';

export class Withdrawal {
  amount?: number;
  amountBefore?: number;
  amountAfter?: number;
  user?: User;
  dateTime?: Date;
}
