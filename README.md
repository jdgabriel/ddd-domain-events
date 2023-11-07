### DDD - Domain Events

#### Fluxograma

```mermaid
flowchart TD
    A[Order] --> B(new Order)
    B --> |event| C(OrderCreatedEvent)
    B --> |event| D(OrderPaidEvent)
    B --> |persist| F[Database]
    C --> E
    D --> E
    E(DomainEvents)
    F[Database] --> |Dispatch events| E
```

1. Criar uma `Order`;
2. Criar um evento respectivo a sua ação;
3. Salvar em banco de dados;
4. Disparar `DomainEvents` com o `id` da entidade;

#### Fluxograma em código

```ts
// src/infra/index.ts

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
```