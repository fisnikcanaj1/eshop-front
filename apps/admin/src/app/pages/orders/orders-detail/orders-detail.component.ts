import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@bluebits/orders';
import { MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order-status.constant';

@Component({
  selector: 'bluebits-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [
  ]
})
export class OrdersDetailComponent implements OnInit {
  order: Order = {};
  isLoaded = false;
  orderStatuses: any[] = [];
  selectedStatus: any = {};
  orderCurrentId: string = '';

  constructor(
    private ordersService: OrdersService,
    private router: ActivatedRoute,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this._getRouteId();
    this._getLabelStatus();
  }

  private _getRouteId() {
    this.router.params.subscribe(params => {
      this.orderCurrentId = params['id']; 
       this._getOrder(params['id'])
    })
  }

  private _getLabelStatus(): void {
    this.orderStatuses = Object.keys(ORDER_STATUS).map(key => {
      return {id: key, name: ORDER_STATUS[key].label }
    })
  }

  private _getOrder(id: string): void {
    this.ordersService.getOrder(id).subscribe(order => {
      let currentStatus = ORDER_STATUS[JSON.stringify(order.status)]
      this.selectedStatus = {id: JSON.stringify(order.status), name: currentStatus.label};
      this.order = order;
      this.isLoaded = true;
    }); 
  }

  onStatusChange() {
    const statusObj = {status: this.selectedStatus.id}
    this.ordersService.updateOrder(this.orderCurrentId, statusObj).subscribe(() => {
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Order status is updated'});
    }, error => {
      console.error(error);
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Order status is not updated!'});
    })
  }
}
