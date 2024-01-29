import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategorierService } from 'src/service/categories';
import { ProductService } from 'src/service/products';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: [
    '../../../assets/admin/vendor/fonts/boxicons.css',
    '../../../assets/admin/vendor/fonts/fontawesome.css',
    '../../../assets/admin/vendor/fonts/flag-icons.css',
    '../../../assets/admin/vendor/css/rtl/core.css',
    '../../../assets/admin/vendor/css/rtl/theme-default.css',
    '../../../assets/admin/css/demo.css',
    '../../../assets/admin/vendor/libs/perfect-scrollbar/perfect-scrollbar.css',
    '../../../assets/admin/vendor/libs/typeahead-js/typeahead.css',
    '../../../assets/admin/vendor/libs/quill/typography.css',
    '../../../assets/admin/vendor/libs/quill/katex.css',
    '../../../assets/admin/vendor/libs/quill/editor.css',
    '../../../assets/admin/vendor/libs/select2/select2.css',
    '../../../assets/admin/vendor/libs/dropzone/dropzone.css',
    '../../../assets/admin/vendor/libs/flatpickr/flatpickr.css',
    '../../../assets/admin/vendor/libs/tagify/tagify.css',
    './product-add.component.css',
    '../../../assets/admin/vendor/css/boostrap/boostrap.css'
  ]
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup
  selectedFiles: any[] = [];
  categoriList: any[] = [];
  constructor(
    private categoriService: CategorierService,
    private FormBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = FormBuilder.group({
      productCode: [''],
      productCategoryId: [''],
      title: [''],
      sku: [''],
      brands: [''],
      commentBrands: [''],
      description: [''],
      price: [''],
      quantity: [''],
      weight: [''],
      tags: [''],
      availability: ['In stock'],
      sale: ['']
    })
  }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.categoriService.getCategorie().subscribe(category => {
      this.categoriList = category
    })
  }

  addProduct() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      console.log('data', productData);
      this.productService.addProduct(productData).subscribe(
        response => {
          console.log('Product added successfully:', response);
          alert('add product sussce.')
          this.productForm.reset();
          this.router.navigate(['/admin/productDetails', response.productId])

        },
        error => {
          console.error('Error adding product:', error);
        }
      )
    }
  }

  clearInput() {
    this.productForm.reset();
  }

  onCategorySelect(event: any): void {
    const selectedCategoryName = event.target.value;
    const selectedCategory = this.categoriList.find(category => category.nameCategory === selectedCategoryName);
    if (selectedCategory) {
      this.productForm.patchValue({
        productCategoryId: selectedCategory.categoryId
      });
    }
  }

  handleFileSelect(event: any): void {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const files = fileInput.files;
      for (let i = 0; i < files.length; i++) {
        const selectedFile = files[i];
        // Sử dụng FileReader để đọc hình ảnh từ tệp đã chọn
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedFiles.push({
            name: selectedFile.name,
            dataUrl: e.target.result
          });
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  }
  removeFile(file: any): void {
    const index = this.selectedFiles.indexOf(file);
    if (index !== -1) {
      this.selectedFiles.splice(index, 1);
    }
  }
}
