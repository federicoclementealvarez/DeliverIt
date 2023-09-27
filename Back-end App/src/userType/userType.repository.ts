import { Repository } from '../../shared/repository.js';
import { userType } from './userType.entity.js';

const userTypes = [
    new userType (
        0,
        'admin'
    ),
    new userType (
        1,
        'cliente'
    ),
    new userType (
        2,
        'cliente premium'
    ),
    new userType (
        3,
        'gestor de local'
    ),
    new userType (
        4,
        'repartidor'
    )
]


export class userTypeRepository implements Repository<userType>{


    public findAll(): userType[] | undefined {
        return userTypes;
    }


    public findOne(item: { id: number }): userType | undefined {
        return userTypes.find((oneUserType)=>oneUserType.id === item.id)
    }


    public remove(item: { id: number }): userType | undefined {
        const userTypeIndex = userTypes.findIndex((oneUserType)=>oneUserType.id === item.id)


        if(userTypeIndex===-1){
            return undefined;
        }


        return userTypes.splice(userTypeIndex, 1)[0]; //splice returns array of deleted elements [0] means the first and unique element removed in the array
    }


    public update(item: userType): userType | undefined {
        const userTypeIndex = userTypes.findIndex((oneUserType)=>oneUserType.id === item.id)  //PREGUNTAR si debería dejar que se modifique el id o no (porque así como está no es posible)
        if(userTypeIndex===-1){
            return undefined;
        }
        userTypes[userTypeIndex] = Object.assign(userTypes[userTypeIndex], item);
        return userTypes[userTypeIndex];
    }


    public add(item: userType): userType | undefined {
        userTypes.push(item);
        return item;
    }
}
