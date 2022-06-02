interface SetupIntersectionObserverMockOptions {
  root?: IntersectionObserver['root'];
  rootMargin?: IntersectionObserver['rootMargin'];
  thresholds?: IntersectionObserver['thresholds'];
  disconnect?: IntersectionObserver['disconnect'];
  observe?: IntersectionObserver['observe'];
  unobserve?: IntersectionObserver['unobserve'];
}

export function setupIntersectionObserverMock({
  root = null,
  rootMargin = '',
  thresholds = [],
  observe = () => null,
  unobserve = () => null,
  disconnect = () => null,
}: SetupIntersectionObserverMockOptions = {}) {
  let observers = new Set<MockIntersectionObserver>();

  function emit(init: Partial<IntersectionObserverEntryInit> = {}) {
    for (let observer of observers) {
      observer.emit(init);
    }
  }

  class MockIntersectionObserverEntry implements IntersectionObserverEntry {
    readonly boundingClientRect: DOMRectReadOnly;
    readonly intersectionRatio: number;
    readonly intersectionRect: DOMRectReadOnly;
    readonly isIntersecting: boolean;
    readonly rootBounds: DOMRectReadOnly | null;
    readonly target: Element;
    readonly time: DOMHighResTimeStamp;

    constructor(init: IntersectionObserverEntryInit) {
      this.boundingClientRect = emptyDomRect();
      this.intersectionRatio = init.intersectionRatio;
      this.intersectionRect = emptyDomRect();
      this.isIntersecting = init.isIntersecting;
      this.rootBounds = emptyDomRect();
      this.target = init.target;
      this.time = init.time;
    }
  }

  class MockIntersectionObserver implements IntersectionObserver {
    readonly root = root;
    readonly rootMargin = rootMargin;
    readonly thresholds = thresholds;

    #targets = new Set<Element>();
    #handlers = new Set<IntersectionObserverCallback>();
    #options: IntersectionObserverInit | undefined = undefined;

    constructor(handler: IntersectionObserverCallback, options?: IntersectionObserverInit) {
      this.#handlers.add(handler);
      this.#options = options;

      observers.add(this);
    }

    emit(init: Partial<IntersectionObserverEntryInit> = {}) {
      let entries: IntersectionObserverEntry[] = [];

      for (let target of this.#targets) {
        entries.push(
          new MockIntersectionObserverEntry({
            boundingClientRect: {},
            intersectionRatio: 1,
            intersectionRect: {},
            isIntersecting: true,
            rootBounds: null,
            time: Date.now(),
            ...init,
            target,
          }),
        );
      }

      for (let handler of this.#handlers) {
        handler(entries, this);
      }
    }

    observe(target: Element) {
      this.#targets.add(target);
      observe(target);
    }

    unobserve(target: Element) {
      this.#targets.delete(target);
      unobserve(target);
    }

    disconnect() {
      this.#targets.clear();
      this.#handlers.clear();
      disconnect();
    }

    takeRecords() {
      return [];
    }
  }

  let original = global.IntersectionObserver;

  function prepare() {
    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: MockIntersectionObserver,
    });

    Object.defineProperty(global, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: MockIntersectionObserver,
    });
  }

  function teardown() {
    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: original,
    });

    Object.defineProperty(global, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: original,
    });
  }

  return { observers, emit, prepare, teardown };
}

function emptyDomRect(): DOMRectReadOnly {
  return {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
    toJSON() {
      return '';
    },
  };
}
