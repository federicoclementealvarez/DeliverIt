import { Injectable } from '@angular/core';
import { ItemCardComponent } from '../item-card/item-card.component';

@Injectable({
  providedIn: 'root'
})
export class IcecreamflavorsService {

  flavors: ItemCardComponent[] = [];
  lastIndex=0; 

  createFlavor(name: string, description: string){
    const flavor = new ItemCardComponent();
    flavor.id=this.lastIndex;
    flavor.name = name;
    flavor.description = description;
    this.flavors.push(flavor);
    this.lastIndex++;
  }

  deleteFlavor(id:number){
    const index=this.flavors.findIndex((flavor)=>(flavor.id==id));
    this.flavors.splice(index,1);
    this.lastIndex--;
  }
}
