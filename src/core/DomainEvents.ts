import { Entity } from "./Entity";

type SubscriberCallback = (event: any) => void;
type Subscriber = Record<string, Array<SubscriberCallback>>;

export class DomainEvents {
  static subscribers: Subscriber = {};
  static markedEntitiesToDispatch: Array<Entity<any>> = [];

  public static registerSubscriber(event: string, cb: SubscriberCallback) {
    if (event in this.subscribers) {
      this.subscribers[event].push(cb);
      return;
    }
    this.subscribers[event] = [cb];
  }

  public static markEntityForDispatch(entity: Entity<any>) {
    const alreadyMarked = this.markedEntitiesToDispatch.find((item) => item.id === entity.id);
    if (alreadyMarked) return;
    this.markedEntitiesToDispatch.push(entity);
  }

  public static dispatchEventsForEntity(id: string) {
    const entity = this.markedEntitiesToDispatch.find((item) => item.id === id);
    if (!entity) return;

    entity.domainEvents.forEach((event) => {
      const eventClassName = event.constructor.name;
      if (eventClassName in this.subscribers) {
        const handlers = this.subscribers[eventClassName];

        for (const handler of handlers) {
          handler(event);
        }
      }
    });

    entity.clearEvents();
  }
}
