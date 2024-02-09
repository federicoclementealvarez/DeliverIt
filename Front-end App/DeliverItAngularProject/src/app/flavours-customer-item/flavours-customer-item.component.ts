import { Component, Input } from '@angular/core';
import { IcecreamflavorsService } from '../services/icecreamflavors.service';
import { ProductVariation } from '../entities/productVariation.entity';

@Component({
  selector: 'app-flavours-customer-item',
  templateUrl: './flavours-customer-item.component.html',
  styleUrls: ['./flavours-customer-item.component.scss']
})
export class FlavoursCustomerItemComponent {
  constructor(private icecreamflavorsService: IcecreamflavorsService) { }

  stateAdd = true;
  @Input() flavourId: string;
  @Input() maxVariations: number;
  @Input() productVariation: ProductVariation

  ngOnInit() {
    this.icecreamflavorsService.setMaxFlav(this.maxVariations)
  }

  toggleButton() {
    if (this.stateAdd) {
      this.icecreamflavorsService.addFlavour(this.flavourId)
    } else {
      this.icecreamflavorsService.removeFlavour(this.flavourId)
    }

    console.log(this.icecreamflavorsService.selectedCustFlav.length, this.maxVariations);


    if (this.icecreamflavorsService.selectedCustFlav.length === this.maxVariations) {
      return
    }

    console.log(this.icecreamflavorsService.selectedCustFlav);

    this.stateAdd = !this.stateAdd

  }
}

