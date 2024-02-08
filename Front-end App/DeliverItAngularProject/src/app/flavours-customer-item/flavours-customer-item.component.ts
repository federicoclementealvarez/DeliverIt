import { Component, Input } from '@angular/core';
import { IcecreamflavorsService } from '../services/icecreamflavors.service';

@Component({
  selector: 'app-flavours-customer-item',
  templateUrl: './flavours-customer-item.component.html',
  styleUrls: ['./flavours-customer-item.component.scss']
})
export class FlavoursCustomerItemComponent {
  constructor(private icecreamflavorsService: IcecreamflavorsService) { }

  stateAdd = true;
  @Input() flavourId: string;
  @Input() maxFlavours: number;

  toggleButton() {
    if (this.stateAdd) {
      this.icecreamflavorsService.addFlavour(this.flavourId)
    } else {
      this.icecreamflavorsService.removeFlavour(this.flavourId)
    }

    console.log(this.icecreamflavorsService.selectedCustFlav.length, this.maxFlavours);


    if (this.icecreamflavorsService.selectedCustFlav.length === this.maxFlavours) {
      return
    }

    console.log(this.icecreamflavorsService.selectedCustFlav);

    this.stateAdd = !this.stateAdd

  }
}

