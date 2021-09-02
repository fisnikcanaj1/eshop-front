import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { User, UsersService } from '@bluebits/users';
import { ConfirmationService } from 'primeng/api/';
import { MessageService } from 'primeng/api';
import { User, UsersService } from '@bluebits/products';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: [
  ]
})
export class UsersListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private usersService: UsersService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {
   }

  ngOnInit(): void {
    this._getUsers();
   
  }

  private _getUsers(): void {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    });
  }


  deleteUser(id: string): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(id).subscribe(() => {
          this.messageService.add({severity: "success", summary: "Success", detail: "Category is deleted!"})
          this._getUsers();
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
    this.router.navigateByUrl(`/users/form/${id}`);
  }

}
