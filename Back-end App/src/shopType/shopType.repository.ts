import { Repository } from '../shared/repository.js';
import { shopType } from './shopType.entity.js';

const shopTypes = [
    new shopType (
        1,
        'heladería'
    ),
    new shopType (
        2,
        'hamburguesería'
    )
]

export class shopTypeRepository implements Repository<shopType>{

    public findAll(): shopType[] | undefined {
        return shopTypes;
    }

    public findOne(item: { id: number }): shopType | undefined {
        return shopTypes.find((oneShopType)=>oneShopType.id === item.id)
    }

    public remove(item: { id: number }): shopType | undefined {
        const shopTypeIndex = shopTypes.findIndex((oneShopType)=>oneShopType.id === item.id)

        if(shopTypeIndex===-1){
            return undefined;
        }

        return shopTypes.splice(shopTypeIndex, 1)[0];
    }

    public update(item: shopType): shopType | undefined {
        const shopTypeIndex = shopTypes.findIndex((oneShopType)=>oneShopType.id === item.id)  //PREGUNTAR si debería dejar que se modifique el id o no (porque así como está no es posible)
        if(shopTypeIndex===-1){
            return undefined;
        }
        shopTypes[shopTypeIndex] = Object.assign(shopTypes[shopTypeIndex], item);
        return shopTypes[shopTypeIndex];
    }

    public add(item: shopType): shopType | undefined {
        shopTypes.push(item);
        return item;
    }
}