class Queue<T> {
  private elements: T[]

  constructor() {
    this.elements = []
  }

  // 入队
  enqueue(element: T): void {
    this.elements.push(element)
  }

  // 出队
  dequeue(): T | undefined {
    return this.elements.splice(0, 1)[0]
  }

  // 返回队首元素
  peek(): T | undefined {
    return this.elements[0]
  }

  // 返回队列大小
  size(): number {
    return this.elements.length
  }

  // 检查队列是否为空
  isEmpty(): boolean {
    return this.elements.length === 0
  }

  // 清空队列
  clear(): void {
    this.elements = []
  }
}

// 使用示例
const queue = new Queue<number>()
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)

console.log(queue.peek()) // 1
console.log(queue.size()) // 3

console.log(queue.dequeue()) // 1
console.log(queue.peek()) // 2
console.log(queue.size()) // 2

queue.clear()
console.log(queue.isEmpty()) // true
