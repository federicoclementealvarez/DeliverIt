import { LineItem } from "../lineItem/lineItem.entity";
import { Order } from "../order/order.entity";
import { PaymentType } from "../paymentType/paymentType.entity";
import { Product } from "../product/product.entity";
import { ProductVariation } from "../productVariation/productVariation.entity";
import { User } from "../user/user.entity";

/**
 * Clase para representar la respuesta de una validación.
 * - `isValid`: Indica si la validación fue exitosa.
 * - `message`: Mensaje descriptivo en caso de error.
 */
class validatorResponse {
  constructor(v: boolean, m: string) {
    this.isValid = v;
    this.message = m;
  }

  isValid: boolean;
  message: string;
}

/**
 * Tipo parcial de una orden (`Order`), utilizado para validaciones.
 */
type partialOrder = {
  dateTimeOrder: Date;
  totalAmount: number;
  client: User | string;
  paymentType: PaymentType | string;
  lineItems:
    | LineItem[]
    | {
        quantity: number;
        product:
          | Product
          | {
              allowsVariations: boolean;
              maxVariations?: number;
            };
        productVariationArrays: {
          productVariations: ProductVariation[] | string[];
        }[];
      }[];
};

/**
 * Valida si un monto de precio es válido.
 * - Verifica que el monto sea un número y no sea negativo.
 */
function validatePriceAmount(amount: string) {
  const numberAmount = Number(amount);
  if (Number.isNaN(Number(numberAmount)) || numberAmount === undefined) {
    return new validatorResponse(false, "The price amount is not valid");
  }
  if (numberAmount < 0) {
    return new validatorResponse(false, "The price amount is less than 0");
  }
  return new validatorResponse(true, "");
}

/**
 * Valida si un ID tiene el formato correcto para un ObjectId de MongoDB.
 */
function validateObjectId(id: string) {
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  if (!objectIdPattern.test(id)) {
    return new validatorResponse(
      false,
      "The id requested does not have a valid format"
    );
  }
  return new validatorResponse(true, "");
}

/**
 * Valida una orden (`Order`) o un objeto parcial de orden (`partialOrder`).
 * - Verifica el tamaño de las variaciones, las cantidades y el máximo de variaciones permitidas.
 */
function validateOrder(order: Order | partialOrder) {
  const validatorVariationsSize = validateVariationsSize(order);
  if (!validatorVariationsSize.isValid) {
    return validatorVariationsSize;
  }

  const validatorVariationsAndQuantities =
    validateVariationsAndQuantities(order);
  if (!validatorVariationsAndQuantities.isValid) {
    return validatorVariationsAndQuantities;
  }

  const validatorMaxVariations = validateMaxVariations(order);
  if (!validatorMaxVariations.isValid) {
    return validatorMaxVariations;
  }

  return new validatorResponse(true, "");
}

/**
 * Valida que los productos que no permiten variaciones no tengan variaciones asignadas.
 */
function validateVariationsSize(order: Order | partialOrder) {
  for (const lineItem of order.lineItems) {
    if (
      lineItem.productVariationArrays !== undefined &&
      lineItem.productVariationArrays.length > 0 &&
      lineItem.product.allowsVariations === false
    ) {
      return new validatorResponse(
        false,
        "A product does not accept variations but at least one was provided"
      );
    }
  }
  return new validatorResponse(true, "");
}

/**
 * Valida que la cantidad de variaciones coincida con la cantidad de productos en un `LineItem`.
 */
function validateVariationsAndQuantities(order: Order | partialOrder) {
  for (const lineItem of order.lineItems) {
    if (
      lineItem.productVariationArrays !== undefined &&
      lineItem.productVariationArrays.length > 0 &&
      lineItem.product.allowsVariations === true
    ) {
      if (lineItem.quantity != lineItem.productVariationArrays.length)
        return new validatorResponse(
          false,
          "A lineItem quantity does not match with the amount of variation arrays provided"
        );
    }
  }
  return new validatorResponse(true, "");
}

/**
 * Valida que el número de variaciones no exceda el máximo permitido para un producto.
 */
function validateMaxVariations(order: Order | partialOrder) {
  let validatorMaxVariations = new validatorResponse(true, "");
  for (const lineItem of order.lineItems) {
    if (
      lineItem.productVariationArrays !== undefined &&
      lineItem.product.allowsVariations === true
    ) {
      for (const productVariationArray of lineItem.productVariationArrays) {
        if (
          lineItem.product.maxVariations !== undefined &&
          productVariationArray.productVariations.length >
            lineItem.product.maxVariations
        ) {
          return (validatorMaxVariations = {
            isValid: false,
            message:
              "The amount of variations in a product is greater than the maximum expected",
          });
        }
      }
    }
  }
  return validatorMaxVariations;
}

/**
 * Valida que una cadena de texto no exceda una longitud máxima permitida.
 */
function validateMaxCharLength(stringToValidate: string, maxLength: number) {
  if (stringToValidate.length > maxLength) {
    return new validatorResponse(
      false,
      "The length of a text input exceeded the allowed maximum"
    );
  } else {
    return new validatorResponse(true, "");
  }
}

/**
 * Exporta un objeto con todas las funciones de validación.
 */
export const validator = {
  validateObjectId,
  validatePriceAmount,
  validateOrder,
  validateMaxCharLength,
  validateVariationsSize,
  validateVariationsAndQuantities,
  validateMaxVariations,
};
