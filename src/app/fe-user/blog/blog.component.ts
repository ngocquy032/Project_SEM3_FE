import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BlogService} from 'src/service/blog';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit{
  getBlogs: any[] = [];
  constructor(private blogService: BlogService) {}
  ngOnInit(): void{
    this.getBlog();
  }
  getBlog(){
     this.blogService.getBlog().subscribe(blog =>{
       this.getBlogs = blog;
     })

  }
}
