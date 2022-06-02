export type DescendantOptions<DescendantData extends Record<string, unknown> = {}> = DescendantData & {
  disabled?: boolean;
  id?: string;
};

export type Descendant<
  DescendantNode,
  DescendantData extends Record<string, unknown>,
> = DescendantOptions<DescendantData> & {
  node: DescendantNode;
  index: number;
};

export class DescendantsManager<
  DescendantNode extends HTMLElement,
  DescendantData extends Record<string, unknown> = {},
> {
  #descendants = new Map<Node, Descendant<DescendantNode, DescendantData>>();

  register(nodeOrOptions: DescendantOptions<DescendantData>): (node: DescendantNode | null) => void;
  register(nodeOrOptions: DescendantNode | null): void;
  register(nodeOrOptions: DescendantOptions<DescendantData> | DescendantNode | null) {
    if (nodeOrOptions == null) return;

    if (isElement(nodeOrOptions)) {
      return this.#registerNode(nodeOrOptions);
    }

    return (node: DescendantNode | null) => {
      this.#registerNode(node, nodeOrOptions);
    };
  }

  unregister(node: DescendantNode) {
    this.#descendants.delete(node);
    this.#updateIndices();
  }

  destroy() {
    this.#descendants.clear();
  }

  item(index: number) {
    if (this.count() === 0) return undefined;

    let values = this.#values();
    return accessIndex(values, index);
  }

  enabledItem(index: number) {
    if (this.count() === 0) return undefined;

    let values = this.#enabledValues();
    return accessIndex(values, index);
  }

  count() {
    return this.#descendants.size;
  }

  enabledCount() {
    return this.#enabledValues().length;
  }

  first() {
    return this.item(0);
  }

  firstEnabled() {
    return this.enabledItem(0);
  }

  last() {
    return this.item(-1);
  }

  lastEnabled() {
    return this.enabledItem(-1);
  }

  next(currentIndex: number) {
    let next = currentIndex + 1;
    let max = this.count() - 1;
    if (next > max) {
      next = 0;
    }

    return this.item(next);
  }

  nextEnabled(currentIndex: number) {
    let item = this.item(currentIndex);
    if (item == null) return undefined;

    let enabledIndex = this.enabledIndexOf(item.node);
    let next = enabledIndex + 1;
    let max = this.enabledCount() - 1;
    if (next > max) {
      next = 0;
    }

    return this.enabledItem(next);
  }

  prev(currentIndex: number) {
    let prev = currentIndex - 1;
    if (prev < 0) {
      prev = this.count() - 1;
    }

    return this.item(prev);
  }

  prevEnabled(currentIndex: number) {
    let item = this.item(currentIndex);
    if (item == null) return undefined;

    let enabledIndex = this.enabledIndexOf(item.node);
    let prev = enabledIndex - 1;
    if (prev < 0) {
      prev = this.enabledCount() - 1;
    }

    return this.enabledItem(prev);
  }

  indexOf(node: DescendantNode | null) {
    if (node == null) return -1;
    let descendant = this.#descendants.get(node);
    return descendant?.index ?? -1;
  }

  enabledIndexOf(node: DescendantNode | null) {
    if (node == null) return -1;
    return this.#enabledValues().findIndex((item) => item.node.isSameNode(node));
  }

  #values() {
    let values = Array.from(this.#descendants.values());
    return values.sort((a, b) => a.index - b.index);
  }

  #enabledValues() {
    return this.#values().filter((item) => !item.disabled);
  }

  #registerNode(node: DescendantNode | null, options?: DescendantOptions<DescendantData>) {
    if (node == null || this.#descendants.has(node)) return;

    let descendant = { node, index: -1, ...options };
    this.#descendants.set(node, descendant as Descendant<DescendantNode, DescendantData>);
    this.#updateIndices();
  }

  #updateIndices() {
    let nodes = Array.from(this.#descendants.keys());
    let sorted = sortNodes(nodes);

    for (let descendant of this.#descendants.values()) {
      let index = sorted.indexOf(descendant.node);
      descendant.index = index;
      descendant.node.dataset.index = descendant.index.toString();
    }
  }
}

function isElement(el: any): el is HTMLElement {
  return typeof el == 'object' && 'nodeType' in el && el.nodeType === Node.ELEMENT_NODE;
}

function sortNodes(nodes: Node[]): Node[] {
  return [...nodes].sort((a, b) => {
    let compare = a.compareDocumentPosition(b);

    if (compare & Node.DOCUMENT_POSITION_DISCONNECTED || compare & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC) {
      throw new Error('Can not sort given nodes');
    }

    if (compare & Node.DOCUMENT_POSITION_FOLLOWING || compare & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      return -1;
    }

    if (compare & Node.DOCUMENT_POSITION_PRECEDING || compare & Node.DOCUMENT_POSITION_CONTAINS) {
      return 1;
    }

    return 0;
  });
}

function accessIndex<T>(items: T[], index: number): T | undefined {
  if (index < 0) return items[items.length + index];
  return items[index];
}
