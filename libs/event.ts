type EventHandler = (data?: unknown) => void;

const eventList: Record<string, EventHandler[]> = {};

function on(event: string, handler: EventHandler) {
  if (!eventList[event]) {
    eventList[event] = [handler];
  } else {
    eventList[event].push(handler);
  }
}

function fire(event: string, data?: unknown) {
  if (eventList[event]) {
    eventList[event].forEach((handler) => handler(data));
  }
}

function off(event: string, handler?: EventHandler) {
  if (eventList[event]) {
    if (!handler) {
      delete eventList[event];
    } else {
      const index = eventList[event].indexOf(handler);
      if (index >= 0) {
        eventList[event].splice(index, 1);
      }
    }
  }
}

export default {
  on,
  fire,
  off,
};
