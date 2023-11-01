import { it } from "node:test";
import { Repository } from "../shared/repository.js";
import { ProductCategory } from "./productCategory.entity.js";

const productCategories = [
  new ProductCategory(1, 'Hamburguesa'),
  new ProductCategory(2, 'Helado')
]

export class ProductCategoryRepository implements Repository<ProductCategory> {
  public findAll(): ProductCategory[] | undefined {
    return productCategories;
  }

  findOne(item: { id: number; }): ProductCategory | undefined {
    return productCategories.find((pc) => pc.id === item.id)
  }

  add(item: ProductCategory): ProductCategory | undefined {
    productCategories.push(item)
    return item
  }

  update(item: ProductCategory): ProductCategory | undefined {
    const prodCatIdx = productCategories.findIndex((pc) => pc.id === item.id)

    if (prodCatIdx !== -1) {
      return productCategories[prodCatIdx] = {...productCategories[prodCatIdx], ...item}
    } else {
      return undefined;
    }
  }

  remove(item: { id: number; }): ProductCategory | undefined {
    const prodCatIdx = productCategories.findIndex((pc) => pc.id === item.id)

    if (prodCatIdx !== -1) {
      const prodCatDeleted = productCategories[prodCatIdx]
      productCategories.splice(prodCatIdx, 1)
      return prodCatDeleted
    } else {
      return undefined;
    }
  }
}