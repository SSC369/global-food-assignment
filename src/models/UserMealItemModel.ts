class UserMealItemModel {
  id: string;
  name: string;
  quantity: number;
  constructor(id: string, name: string, quantity: number) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
  }
}
export default UserMealItemModel;
