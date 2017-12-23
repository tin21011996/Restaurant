export class ProductModel {
  constructor(
    public _id: String,
    public name: String,
    public price: Number,
    public description: String,
    public sort_order: Number,
    public urlimage: String
  ) {}
}
