import { DomainEvent } from "@/core/DomainEvent";
import { Order } from "./order";

export class OrderCreatedEvent implements DomainEvent {
  public order: Order;
  public createdAt: Date;

  constructor(order: Order) {
    this.order = order;
    this.createdAt = new Date();
  }

  getEntityId(): string {
    return this.order.id;
  }
}
