import { Component } from '@angular/core';
import { IcecreamflavorsService } from 'src/app/services/icecreamflavors.service';

@Component({
  selector: 'app-signup-shop-data-icecreamflavors',
  templateUrl: './signup-shop-data-icecreamflavors.component.html',
  styleUrls: ['./signup-shop-data-icecreamflavors.component.scss']
})
export class SignupShopDataIcecreamflavorsComponent {

  constructor(private serv: IcecreamflavorsService){}

  getService():IcecreamflavorsService{
    return this.serv;
  }

  createFlavor(name: string, description: string){
    this.serv.createFlavor(name, description);
  }

  deleteFlavor(id:number){
    this.serv.deleteFlavor(id);
  }
}
