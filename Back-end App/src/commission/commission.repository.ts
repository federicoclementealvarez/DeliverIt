import { Repository } from '../shared/repository.js';
import { Commission } from './commission.entity.js';

const commissions = [
  new Commission (1,new Date('2023-09-13'),5)
];

export class CommissionRepository implements Repository<Commission>
{
  public findAll(): Commission[]|undefined 
  {
    return commissions;
  }

  public findOne(item: { id: number; }): Commission | undefined 
  {
    return commissions.find((commission)=>commission.id === item.id)  
  }

  public add(item: Commission): Commission | undefined 
  {
    commissions.push(item)
    return item
  }

  public update(item: Commission): Commission | undefined 
  {
    const commissionIdx = commissions.findIndex((commission)=>commission.id===item.id)
    
    if (commissionIdx !==-1)
    {
      commissions[commissionIdx] = {...commissions[commissionIdx],...item}
    }
    else {return undefined}
    return commissions[commissionIdx]
  }

  public remove(item: { id: number; }): Commission | undefined 
  {
    const commissionIdx = commissions.findIndex((commission)=>commission.id === item.id)
    
    if (commissionIdx!==-1)
    {
      const deletedCommission = commissions[commissionIdx]
      commissions.splice(commissionIdx,1)
      return deletedCommission
    }
    else 
    {
      return undefined
    }

  }
}