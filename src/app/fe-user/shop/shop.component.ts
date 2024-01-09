import { Component , ElementRef, ViewChild, Renderer2, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
