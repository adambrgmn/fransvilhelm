import { DescendantsManager } from './DescendantsManager';

afterEach(() => {
  while (document.body.lastChild) {
    document.body.removeChild(document.body.lastChild);
  }
});

describe('DescendantsManager', () => {
  it('handle descendants', () => {
    let manager = new DescendantsManager();

    let el1 = document.createElement('div');
    el1.setAttribute('id', 'el-1');
    document.body.appendChild(el1);
    manager.register(el1);

    expect(manager.count()).toEqual(1);
    expect(manager.item(0)?.node).toEqual(el1);

    let el2 = document.createElement('div');
    el2.setAttribute('id', 'el-2');
    document.body.insertBefore(el2, el1);
    manager.register(el2);

    expect(manager.count()).toEqual(2);
    expect(manager.item(0)?.node).toBe(el2);

    let el3 = document.createElement('div');
    el3.setAttribute('id', 'el-3');
    document.body.appendChild(el3);
    manager.register(el3);

    expect(manager.count()).toEqual(3);
    expect(manager.item(0)?.node).toBe(el2);
    expect(manager.item(1)?.node).toBe(el1);
    expect(manager.item(2)?.node).toBe(el3);
  });

  it('will throw if registering a node that is not mounted to the dom', () => {
    let manager = new DescendantsManager();
    manager.register(document.createElement('div'));

    let el = document.createElement('div');
    expect(() => manager.register(el)).toThrow(Error);
  });

  it('can remove descendants', () => {
    let manager = new DescendantsManager();
    let [el1, el2] = setup(manager);

    manager.unregister(el1);
    expect(manager.count()).toEqual(3);
    expect(manager.first()?.node).toEqual(el2);

    manager.destroy();
    expect(manager.count()).toEqual(0);
    expect(manager.indexOf(el2)).toEqual(-1);
    expect(manager.item(0)).toBeUndefined();
    expect(manager.enabledItem(0)).toBeUndefined();
  });

  it('ignores when trying to register a node that is null', () => {
    let manager = new DescendantsManager<HTMLElement, { value?: string }>();
    manager.register(null);
    expect(manager.count()).toEqual(0);

    manager.register({ value: 'hello' })(null);
    expect(manager.count()).toEqual(0);
  });

  it('is possible to append any props to descendants', () => {
    let manager = new DescendantsManager<HTMLElement, { value: string }>();

    let el = document.createElement('div');
    document.body.appendChild(el);
    manager.register({ value: 'hello' })(el);

    expect(manager.item(0)?.value).toEqual('hello');
  });

  it('keeps enabled and disabled state in mind', () => {
    let manager = new DescendantsManager();

    let el1 = document.createElement('div');
    document.body.appendChild(el1);
    manager.register({ disabled: true })(el1);

    let el2 = document.createElement('div');
    document.body.appendChild(el2);
    manager.register({ disabled: false })(el2);

    expect(manager.count()).toBe(2);
    expect(manager.enabledCount()).toBe(1);
  });

  it('is possible to get index of nodes', () => {
    let manager = new DescendantsManager();
    let [, el2, el3] = setup(manager);

    expect(manager.indexOf(el2)).toEqual(1);
    expect(manager.enabledIndexOf(el2)).toEqual(-1);
    expect(manager.enabledIndexOf(el3)).toEqual(1);
    expect(manager.indexOf(null)).toEqual(-1);
    expect(manager.enabledIndexOf(null)).toEqual(-1);
  });

  it('is possible to traverse with next/prev methods', () => {
    let manager = new DescendantsManager();
    let [el1, el2, el3, el4] = setup(manager);

    expect(manager.next(0)?.node).toBe(el2);
    expect(manager.nextEnabled(0)?.node).toBe(el3);

    expect(manager.next(3)?.node).toBe(el1);
    expect(manager.nextEnabled(1)?.node).toBe(el1);

    expect(manager.prev(3)?.node).toBe(el3);
    expect(manager.prevEnabled(1)?.node).toBe(el3);

    expect(manager.prev(0)?.node).toBe(el4);
    expect(manager.prevEnabled(0)?.node).toBe(el3);
  });

  it('gives back the first and last elements with first/last', () => {
    let manager = new DescendantsManager();
    let [el1, , el3, el4] = setup(manager);

    expect(manager.first()?.node).toBe(el1);
    expect(manager.firstEnabled()?.node).toBe(el1);

    expect(manager.last()?.node).toBe(el4);
    expect(manager.lastEnabled()?.node).toBe(el3);
  });

  it('handles nested descendants', () => {
    let manager = new DescendantsManager();
    let [el1, el2, el3, el4] = setup(manager);

    let el5 = document.createElement('div');
    el3.appendChild(el5);
    manager.register({ disabled: false })(el5);

    expect(manager.indexOf(el1)).toBe(0);
    expect(manager.indexOf(el2)).toBe(1);
    expect(manager.indexOf(el3)).toBe(2);
    expect(manager.indexOf(el4)).toBe(4);
    expect(manager.indexOf(el5)).toBe(3);
  });
});

function setup(manager: DescendantsManager<HTMLElement>) {
  let el1 = document.createElement('div');
  document.body.appendChild(el1);
  manager.register({ disabled: false })(el1);

  let el2 = document.createElement('div');
  document.body.appendChild(el2);
  manager.register({ disabled: true })(el2);

  let el3 = document.createElement('div');
  document.body.appendChild(el3);
  manager.register({ disabled: false })(el3);

  let el4 = document.createElement('div');
  document.body.appendChild(el4);
  manager.register({ disabled: true })(el4);

  return [el1, el2, el3, el4] as const;
}
