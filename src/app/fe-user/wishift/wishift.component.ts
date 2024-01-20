import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-wishift',
  templateUrl: './wishift.component.html',
  styleUrls: ['./wishift.component.css']
})
export class WishiftComponent implements OnInit {
  wishList: any[] = [];
  hasItems: boolean = true;
  constructor(private location: Location) { }
  ngOnInit(): void {
    this.getWishList();
  }
  private getWishList() {
    const localStorageData = localStorage.getItem('wishlist');
    if (localStorageData) {
      this.wishList = JSON.parse(localStorageData);
      this.hasItems = this.wishList.length > 0;
    } else {
      this.hasItems = false;
    }
  }
  deleteItem(productId: string): void {
    // Lọc sản phẩm có productId để xóa khỏi wishList
    if(confirm(`Are you sure you want to delete`)){
      this.wishList = this.wishList.filter(item => item.productId !== productId);
      // Cập nhật localStorage
      localStorage.setItem('wishlist', JSON.stringify(this.wishList));
    }
  }
}
