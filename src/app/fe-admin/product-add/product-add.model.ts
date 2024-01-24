// product.model.ts
export class ProductModel {
  title: string;
  weight: number;
  quantity: number;
  sku: number;
  barcode: string;
  description: string;
  price: number;
  sale: number;
  categoryId: number; // ID của category
  inStock: boolean;
  images: File[]; // Danh sách hình ảnh

  constructor() {
    this.title = '';
    this.weight = 0;
    this.quantity = 0;
    this.sku = 0;
    this.barcode = '';
    this.description = '';
    this.price = 0;
    this.sale = 0;
    this.categoryId = 0;
    this.inStock = false;
    this.images = [];
  }
}
