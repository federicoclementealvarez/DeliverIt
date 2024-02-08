import { Injectable } from '@angular/core';
import { ItemCardComponent } from '../item-card/item-card.component';
import { CustomerSelectedFlavour } from '../entities/productVariation.entity';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IcecreamflavorsService {

  flavors: ItemCardComponent[] = [];
  lastIndex = 0;

  createFlavor(name: string, description: string) {
    const flavor = new ItemCardComponent();
    flavor.id = this.lastIndex;
    flavor.name = name;
    flavor.description = description;
    this.flavors.push(flavor);
    this.lastIndex++;
  }

  deleteFlavor(id: number) {
    const index = this.flavors.findIndex((flavor) => (flavor.id == id));
    this.flavors.splice(index, 1);
    this.lastIndex--;
  }

  // Implementation of the selection of flavours by the customer

  maxFlav: number;
  selectedCustFlav: CustomerSelectedFlavour[]

  setMaxFlav(quant: number) {
    this.maxFlav = quant
    this.selectedCustFlav = []
  }

  addFlavour(flavourId: string) {
    if (this.selectedCustFlav.length === this.maxFlav) return;
    this.selectedCustFlav.push({ id: flavourId })
    console.log(this.selectedCustFlav);    
  }

  removeFlavour(flavourId: string) {
    const index = this.selectedCustFlav.findIndex(f => f.id === flavourId)
    this.selectedCustFlav = this.selectedCustFlav.splice(index, 1)
    console.log(this.selectedCustFlav);
  }
}
