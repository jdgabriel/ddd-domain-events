import { Order } from "@/contexts/sales/order";
import { OrderCreatedEvent } from "@/contexts/sales/order-created";
import { OrderPaidEvent } from "@/contexts/sales/order-paid";
import { DomainEvents } from "@/core/DomainEvents";

// Subscriber
DomainEvents.registerSubscriber(OrderCreatedEvent.name, (order) => {
  console.log("order event", order);
});

// Subscriber
DomainEvents.registerSubscriber(OrderPaidEvent.name, (order) => {
  console.log("paid event", order);
});

// Publisher
const order = Order.create({
  customerId: "customer_id",
  productId: "product_id",
  amountInCents: 1000,
  status: "pending",
  createdAt: new Date(),
});

order.pay();

// Dentro da camada de persistência (repositório)
// Finalização do processo de venda
DomainEvents.dispatchEventsForEntity(order.id);
