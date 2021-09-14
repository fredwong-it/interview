class PriorityQueue {
  constructor() {
    this.store = new Map() // keys are priorities, values are arrays of elements
    this.count = 0
  }

  // adds an item
  // priority must be an integer (higher value has higher priority)
  add(value, priority) {
    if (!this.store.has(priority)) {
      this.store.set(priority, [])
    }

    const list = this.store.get(priority)
    this.store.set(priority, [...list, value])
    this.count++
  }

  // returns the oldest-added value with the highest priority
  pop() {
    let result = null

    if (this.count > 0) {
      const maxKey = Math.max(...this.store.keys())
      const list = this.store.get(maxKey)
      result = list.shift()

      if (list.length > 0) {
        this.store.set(maxKey, list)
      } else {
        // remove this priority from store when the list is empty array
        this.store.delete(maxKey)
      }

      this.count--
    }

    return result
  }

  get length() {
    return this.count
  }

  getAllPriorities() {
    return [...this.store.keys()]
  }

  forEach(callback) {
    const keys = [...this.store.keys()].sort().reverse()

    for (const key of keys) {
      const list = this.store.get(key)

      for (const value of list) {
        callback(value)
      }
    }
  }

  changePriority(value, newPriority) {
    const keys = [...this.store.keys()]

    for (const key of keys) {
      const list = this.store.get(key)

      for (let i = 0; i < list.length; i++) {
        if (list[i] === value) {
          list.splice(i, 1)

          if (list.length === 0) {
            this.store.delete(key)
          }

          this.count--
          this.add(value, newPriority)
          return
        }
      }
    }
  }
}

describe('PriorityQueue', () => {
  it('getAllPriorities', () => {
    // Given
    const queue1 = new PriorityQueue()
    const queue2 = new PriorityQueue()

    // When
    queue1.add('a1', 1)
    queue1.add('b1', 3)
    queue2.add('a2', 2)
    queue2.add('c2', 3)
    queue2.add('e2', 4)

    // Then
    expect(queue1.getAllPriorities()).toMatchObject([1, 3])
    expect(queue2.getAllPriorities()).toMatchObject([2, 3, 4])
  })

  it('should add and pop properly', () => {
    // Given
    const queue1 = new PriorityQueue()

    // When
    queue1.add('a1', 3)
    queue1.add('b1', 2)
    queue1.add('c1', 1)
    queue1.add('d1', 1)
    queue1.add('e1', 2)

    // Then
    expect(queue1.length).toEqual(5)
    expect(queue1.pop()).toEqual('a1')
    expect(queue1.length).toEqual(4)
    expect(queue1.pop()).toEqual('b1')
    expect(queue1.length).toEqual(3)
    expect(queue1.pop()).toEqual('e1')
    expect(queue1.length).toEqual(2)
    expect(queue1.pop()).toEqual('c1')
    expect(queue1.length).toEqual(1)
    expect(queue1.pop()).toEqual('d1')
    expect(queue1.length).toEqual(0)
  })

  it('changePriority', () => {
    // Given
    const queue1 = new PriorityQueue()

    // When
    // Then
    queue1.add('a1', 1)
    queue1.add('b1', 2)
    expect(queue1.getAllPriorities()).toMatchObject([1, 2])
    expect(queue1.pop()).toEqual('b1')
    queue1.add('b1', 2)
    expect(queue1.getAllPriorities()).toMatchObject([1, 2])
    queue1.changePriority('a1', 3)
    expect(queue1.getAllPriorities()).toMatchObject([2, 3])
    expect(queue1.pop()).toEqual('a1')
  })

  it('forEach', () => {
    // Given
    const queue1 = new PriorityQueue()

    // When
    queue1.add('a1', 3)
    queue1.add('b1', 2)
    queue1.add('c1', 1)
    queue1.add('d1', 1)
    queue1.add('e1', 2)

    const result = []
    queue1.forEach((o) => {
      result.push(o)
    })

    // Then
    expect(result).toMatchObject(['a1', 'b1', 'e1', 'c1', 'd1'])
  })
})
