import { Component } from '@angular/core';

@Component({
  selector: 'app-signup-shop-data1',
  templateUrl: './signup-shop-data1.component.html',
  styleUrls: ['./signup-shop-data1.component.scss']
})
export class SignupShopData1Component {

  shopTypes = [
    {id: 0, description: "Heladería"},
    {id: 1, description: "Farmacia"},
    {id: 2, description: "Hamburguesería"},
    {id: 3, description: "Pizzería"}
  ]
}
