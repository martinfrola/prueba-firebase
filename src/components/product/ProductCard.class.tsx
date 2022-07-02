export class ProductCardClass {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  constructor(p: any) {
    this.id = p.id;
    this.title = p.title;
    this.price = p.price;
    this.image = p.image;
    this.description = p.description;
    this.stock = p.rating?.count;
  }
}
