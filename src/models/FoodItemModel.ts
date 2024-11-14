import {
  BaseSizeUnitEnum,
  FoodItemCategoryEnum,
  ServingSizeUnitEnum,
} from "../types";

class FoodItemModal {
  id: string;
  name: string;
  category: FoodItemCategoryEnum;
  baseSizeUnit: BaseSizeUnitEnum;
  servingSizeUnit: ServingSizeUnitEnum;

  constructor(
    id: string,
    name: string,
    category: FoodItemCategoryEnum,
    baseSizeUnit: BaseSizeUnitEnum,
    servingSizeUnit: ServingSizeUnitEnum
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.baseSizeUnit = baseSizeUnit;
    this.servingSizeUnit = servingSizeUnit;
  }
}

export default FoodItemModal;