import { Injectable } from '@angular/core';
import { ItemCardComponent } from '../item-card/item-card.component';
import { OrderService } from './order.service';
import { Product } from '../entities/product.entity';

@Injectable({
  providedIn: 'root'
})
export class IcecreamflavorsService {
  constructor(private orderService: OrderService) { }

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
  selectedCustFlav: string[]

  setMaxFlav(quant: number) {
    this.maxFlav = quant
    this.selectedCustFlav = []
  }

  // Returns true if the variation was added to change the state of the button in the component
  addFlavour(flavourId: string): boolean {
    if (this.selectedCustFlav.length < this.maxFlav) {
      this.selectedCustFlav.push(flavourId)
      return true
    } else {
      return false
    }
  }

  removeFlavour(flavourId: string) {
    const index = this.selectedCustFlav.findIndex(f => f === flavourId)
    this.selectedCustFlav.splice(index, 1)
  }

  submitCustFlavours(product: Product) {
    console.log('r');
    
    this.orderService.addProduct(product, this.selectedCustFlav)
  }
}
