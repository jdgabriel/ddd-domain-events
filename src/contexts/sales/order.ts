import { Entity } from "@/core/Entity";
import { OrderCreatedEvent } from "./order-created";
import { OrderPaidEvent } from "./order-paid";

interface OrderProps {
  customerId: string;
  productId: string;
  amountInCents: number;
  status: "pending" | "paid";
  createdAt: Date;
}

export class Order extends Entity<OrderProps> {
  get customerId() {
    return this.props.customerId;
  }

  get productId() {
    return this.props.productId;
  }

  get amountInCents() {
    return this.props.amountInCents;
  }

  get status() {
    return this.props.status;
  }

  public pay() {
    this.props.status = "paid";
    this.addDomainEvent(new OrderPaidEvent(this));
  }

  get createdAt() {
    return this.props.createdAt;
  }

  static create(props: OrderProps) {
    const order = new Order(props);
    order.addDomainEvent(new OrderCreatedEvent(order));
    return order;
  }

  static remap(props: OrderProps, id: string) {
    const order = new Order(props);
    return order;
  }
}
