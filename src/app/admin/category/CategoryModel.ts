export class CategoryModel {
  constructor(
    public _id: String,
    public name: String,
    public parent_id: Number,
    public sort_order: Number,
    public href: String
  ) {}
}
