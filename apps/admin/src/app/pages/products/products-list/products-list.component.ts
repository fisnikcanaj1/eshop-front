import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductsService } from '@bluebits/products';
import { ConfirmationService } from 'primeng/api/';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductsService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {
    this.products = [];
   }

  ngOnInit(): void {
    this._getProducts();
   
  }

  private _getProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

 

  deleteProduct(id: string): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(id).subscribe(() => {
          this.messageService.add({severity: "success", summary: "Success", detail: "Category is deleted!"})
          this._getProducts();
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

  updateUpdate(id: string): void {
    this.router.navigateByUrl(`/products/form/${id}`);
  }

}
