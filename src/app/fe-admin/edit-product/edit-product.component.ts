import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: [
    './edit-product.component.css',
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
    '../../../assets/admin/vendor/css/boostrap/boostrap.css'
]
})
export class EditProductComponent {
  selectedFiles: any[] = [];

  constructor(

  ){

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
