import { Component, Input } from '@angular/core';


@Component({ 
  selector: 'app-shop-add-product',
  templateUrl: './shop-add-product.component.html',
  styleUrls: ['./shop-add-product.component.scss']
})
export class ShopAddProductComponent {

    @Input() config : {title:string, primaryButtonText:string, hasProductType:boolean, disabledDate:boolean, hasDeleteButton:boolean} = {
        title : 'Agregar Producto',
        primaryButtonText: 'CONFIRMAR',
        hasProductType : true, 
        disabledDate: true,
        hasDeleteButton: false
    }

    shopTypes = [
        { id: 0, description: "Helado" },
        { id: 1, description: "Medicamento" },
        { id: 2, description: "Hamburguesa" },
        { id: 3, description: "Pizza" }
    ];

    getTodayDate() {
        const fecha = new Date().toLocaleDateString();
        const year = fecha.slice(6,10);
        const month = fecha.slice(3,5);
        const day = fecha.slice(0,2);
        return (year+'-'+month+'-'+day);
    }

}


