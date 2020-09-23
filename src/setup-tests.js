const observers = [];

class IntersectionObserver {
  static emit(baseEntry) {
    observers.forEach((observer) => {
      const targets = observer.targets.map((target) => ({
        target,
        ...baseEntry,
      }));

      observer.handler(targets, observer);
    });
  }

  constructor(handler) {
    this.handler = handler;
    this.targets = [];

    this.observe = jest.fn(this.observe.bind(this));
    this.unobserve = jest.fn(this.unobserve.bind(this));

    observers.push(this);
  }

  observe(target) {
    this.targets.push(target);
  }

  unobserve(target) {
    this.targets = this.targets.filter((e) => e !== target);
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  value: IntersectionObserver,
});
