type Listener<K extends keyof MediaQueryListEventMap> =
  | ((this: MediaQueryList, ev: MediaQueryListEventMap[K]) => any)
  | EventListenerOrEventListenerObject;

export function setupMatchMedia(initialMatches: boolean) {
  let instances = new Set<MockMediaQueryList>();

  class MediaQueryListEvent extends Event {
    readonly matches: boolean;
    readonly media: string;

    constructor(matches: boolean, media: string) {
      super('change');
      this.matches = matches;
      this.media = media;
    }
  }

  class MockMediaQueryList implements MediaQueryList {
    matches = initialMatches;
    readonly media: string;

    #listeners = new Set<Listener<'change'>>();

    constructor(media: string) {
      this.media = media;
      instances.add(this);
    }

    onchange = null;

    addEventListener<K extends keyof MediaQueryListEventMap>(
      type: K,
      listener: Listener<K>,
      _?: boolean | AddEventListenerOptions,
    ) {
      if (type === 'change') this.#listeners.add(listener);
    }
    addListener(
      callback: (this: MediaQueryList, ev: MediaQueryListEvent) => any,
    ) {
      this.addEventListener('change', callback);
    }

    removeEventListener<K extends keyof MediaQueryListEventMap>(
      _: K,
      listener: Listener<K>,
      __?: boolean | AddEventListenerOptions,
    ) {
      this.#listeners.delete(listener);
    }
    removeListener(
      callback: (this: MediaQueryList, ev: MediaQueryListEvent) => any,
    ) {
      this.removeEventListener('change', callback);
    }

    dispatchEvent(event: MediaQueryListEvent) {
      this.matches = event.matches;
      for (let callback of this.#listeners) {
        if (typeof callback === 'function') {
          callback.call(this, event);
        }
      }

      return true;
    }
  }

  function mockMatchMedia(query: string) {
    return new MockMediaQueryList(query);
  }

  function emit(matches: boolean) {
    for (let mql of instances) {
      let event = new MediaQueryListEvent(matches, mql.media);
      mql.dispatchEvent(event);
    }
  }

  let original = global.matchMedia;

  function prepare() {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: mockMatchMedia,
    });

    Object.defineProperty(global, 'matchMedia', {
      writable: true,
      configurable: true,
      value: mockMatchMedia,
    });
  }

  function teardown() {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: original,
    });

    Object.defineProperty(global, 'matchMedia', {
      writable: true,
      configurable: true,
      value: original,
    });
  }

  return { instances, emit, prepare, teardown };
}
