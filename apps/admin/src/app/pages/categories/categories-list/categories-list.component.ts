import { Component, OnInit } from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import { CategoriesService } from '@bluebits/products'
import { Category } from '@bluebits/products';
import {ConfirmationService} from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ],
  providers: [ConfirmationService]
})
export class CategoriesListComponent implements OnInit {

  items: MenuItem[] = [];
  categories: Category[] = [];
  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoriesService.getCategories().subscribe(categoriesRes => {
      this.categories = categoriesRes;
    });
  }

  deleteCategory(id: string) {
      this.confirmationService.confirm({
        message: 'Do you want to delete this category?',
        header: 'Delete Category',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.categoriesService.deleteCategory(id).subscribe(() => {
            this.messageService.add({severity: "success", summary: "Success", detail: "Category is deleted!"})
            this.getCategories();
          }, () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Category is not created!'
              });
            });
        }
    });
  }

  updateCategory(categoryId: string): void {
    this.router.navigateByUrl(`/categories/form/${categoryId}`);
  }

}

