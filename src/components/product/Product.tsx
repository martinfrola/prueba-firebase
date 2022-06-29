export class Product {
  id: number;
  title: string;
  price: number;
  constructor(p: any) {
    this.id = p.id;
    this.title = p.title;
    this.price = p.price;
  }
}
