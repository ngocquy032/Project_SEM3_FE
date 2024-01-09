import { Component } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {
  selectedMethod: string = 'cash'; // Set default selected method to 'cash'

  ngOnInit(): void {
    // Các thao tác khác có thể được thêm ở đây nếu cần
  }

  cash(): void {
    this.selectedMethod = 'cash';
  }

  pay(): void {
    this.selectedMethod = 'vnpay';
  }
}
