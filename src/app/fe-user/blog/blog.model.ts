// blog.model.ts
export interface Blog {
    blogId: number;
    userId: number | null;
    images: string;
    nameCategory: string;
    content: string;
    blogComments: string[]; // Giả sử blogComments là một mảng chuỗi
    user: any | null; // Thay any bằng kiểu dữ liệu phù hợp với dữ liệu người dùng nếu có
    created_at: string; // Kiểu dữ liệu của created_at phụ thuộc vào dữ liệu thực tế từ API
    NameBlog:string;
  }
  