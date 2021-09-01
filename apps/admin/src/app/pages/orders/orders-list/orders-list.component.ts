import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from "@bluebits/orders";
import { ConfirmationService, MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order-status.constant';


@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit {

  orders: Order[] = [];
  orderStatus: any = ORDER_STATUS;

  constructor(
    private ordersService: OrdersService, 
    private router: Router,
    private confirmationService: ConfirmationService,private messageService: MessageService) { }

  ngOnInit(): void {
    this._getOrders();
  }

  private _getOrders() {
    this.ordersService.getOrders().subscribe(orders => {
      
      this.orders = orders;
    })
  }

  deleteOrder(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete order?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.ordersService.deleteOrder(id).subscribe(
          () => {
            this._getOrders();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Order is Deleted'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Order is not deleted'
            });
          }
        );
      }
    });
  }


  showOrder(id: string) {
    this.router.navigateByUrl(`orders/${id}`);
  }

}
