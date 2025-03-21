---
outline: [2, 3]
tags: 
  - JavaScript
publishDate: 2020/05/26
---
# Web Worker

## **Web Worker 的作用**

- **解决主线程阻塞问题**：
    - JavaScript 是单线程的，如果在主线程中执行耗时任务（如大量计算、文件读取等），会导致页面卡顿或无响应。
    - Web Worker 可以将这些任务放到后台线程中执行，避免阻塞主线程。
- **提高性能**：
    - 利用多核 CPU 的能力，将任务分配到多个线程中并行执行。
- **适合场景**：
    - 大量计算（如数据处理、图像处理）。
    - 长时间运行的任务（如文件读取、网络请求）。
    - 需要高响应的任务（如实时数据更新）。

## **Web Worker 的基本用法**

### **(1) 创建 Web Worker**

- 使用 `new Worker(scriptURL)` 创建一个专用 Worker。
- `scriptURL` 是 Worker 脚本的 URL。

**示例**：

```jsx
// 主线程代码
const worker = new Worker("worker.js");
```

### **(2) 主线程与 Worker 通信**

- 通过 `postMessage` 发送消息。
- 通过 `onmessage` 接收消息。

**主线程代码**：

```jsx
// 创建 Worker
const worker = new Worker("worker.js");

// 向 Worker 发送消息
worker.postMessage("Hello from main thread!");

// 接收 Worker 的消息
worker.onmessage = function(event) {
    console.log("Message from worker:", event.data);
};
```

**Worker 脚本（worker.js）**：

```jsx
// 接收主线程的消息
self.onmessage = function(event) {
    console.log("Message from main thread:", event.data);

    // 向主线程发送消息
    self.postMessage("Hello from worker!");
};
```

---

### 4. **Web Worker 的限制**

1. **无法访问 DOM**：
    - Worker 不能直接操作 DOM，也不能访问 `window`、`document` 等对象。
2. **无法使用某些 API**：
    - Worker 中不能使用 `alert`、`confirm` 等阻塞式 API。
3. **同源限制**：
    - Worker 脚本必须与主线程脚本同源（相同协议、域名和端口）。
4. **通信开销**：
    - 主线程和 Worker 之间通过消息传递数据，频繁通信可能会影响性能。

---

### 5. **Web Worker 的高级用法**

### **(1) 终止 Worker**

- 使用 `worker.terminate()` 终止 Worker。

```jsx
worker.terminate();
```

### **(2) 错误处理**

- 通过 `onerror` 监听 Worker 中的错误。

```jsx
worker.onerror = function(event) {
    console.error("Error in worker:", event);
};
```

### **(3) 使用 Shared Worker**

- Shared Worker 可以被多个页面共享。

**主线程代码**：

```
const worker = new SharedWorker("shared-worker.js");

worker.port.onmessage = function(event) {
    console.log("Message from shared worker:", event.data);
};

worker.port.postMessage("Hello from main thread!");
```

**Shared Worker 脚本（shared-worker.js）**：

```
self.onconnect = function(event) {
    const port = event.ports[0];

    port.onmessage = function(event) {
        console.log("Message from main thread:", event.data);
        port.postMessage("Hello from shared worker!");
    };
};
```

---

### 6. **Web Worker 的适用场景**

1. **大量计算**：
    - 例如图像处理、数据分析、加密解密等。
2. **长时间运行的任务**：
    - 例如文件读取、网络请求、定时任务等。
3. **高响应需求**：
    - 例如实时数据更新、游戏逻辑处理等。

---

### 7. **Web Worker 的替代方案**

1. **Service Worker**：
    - 用于实现离线缓存、推送通知等功能。
    - 主要用于 PWA（渐进式 Web 应用）。
2. **Worklet**：
    - 用于扩展浏览器的渲染管道，例如 CSS Houdini。

---

### 8. **示例：使用 Web Worker 计算斐波那契数列**

**主线程代码**：

```
const worker = new Worker("fib-worker.js");

worker.postMessage(40); // 计算第 40 个斐波那契数

worker.onmessage = function(event) {
    console.log("Result:", event.data);
};
```

**Worker 脚本（fib-worker.js）**：

```
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

self.onmessage = function(event) {
    const result = fibonacci(event.data);
    self.postMessage(result);
};
```

---

### 9. **总结**

- **Web Worker** 是 JavaScript 中用于在后台运行脚本的技术，可以避免阻塞主线程，提高页面性能。
- 它适合处理大量计算、长时间运行的任务和高响应需求的任务。
- 使用 Web Worker 时需要注意其限制（如无法访问 DOM、同源限制等）。
- 通过 `postMessage` 和 `onmessage` 实现主线程与 Worker 的通信。