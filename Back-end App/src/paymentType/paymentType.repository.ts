import { Repository } from '../../shared/repository.js';
import { paymentType } from './paymentType.entity.js';

const paymentTypes = [
    new paymentType (
        1,
        'Efectivo'
    ),
    new paymentType (
        2,
        'Tarjeta de crédito'
    )
]

export class paymentTypeRepository implements Repository<paymentType>{

    public findAll(): paymentType[] | undefined {
        return paymentTypes;
    }

    public findOne(item: { id: number }): paymentType | undefined {
        return paymentTypes.find((onePaymentType)=>onePaymentType.id === item.id)
    }

    public remove(item: { id: number }): paymentType | undefined {
        const paymentTypeIndex = paymentTypes.findIndex((onePaymentType)=>onePaymentType.id === item.id)

        if(paymentTypeIndex===-1){
            return undefined;
        }

        return paymentTypes.splice(paymentTypeIndex, 1)[0];
    }

    public update(item: paymentType): paymentType | undefined {
        const paymentTypeIndex = paymentTypes.findIndex((onePaymentType)=>onePaymentType.id === item.id)  //PREGUNTAR si debería dejar que se modifique el id o no (porque así como está no es posible)
        if(paymentTypeIndex===-1){
            return undefined;
        }
        paymentTypes[paymentTypeIndex] = Object.assign(paymentTypes[paymentTypeIndex], item);
        return paymentTypes[paymentTypeIndex];
    }

    public add(item: paymentType): paymentType | undefined {
        paymentTypes.push(item);
        return item;
    }
}