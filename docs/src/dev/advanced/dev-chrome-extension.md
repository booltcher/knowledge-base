---
outline: [2, 3]
tags: 
  - JavaScript
  - 应用
publishDate: 2023/02/17
---

# Chrome插件开发
[Docs](https://developer.chrome.com/docs/extensions/mv3/getstarted/)

## 快速上手

- 新建目录
- 新建*manifest.json*
- 定义好必须字段
- chrome://extensions/
- 加载已解压的包
- 更新后可以点击刷新同步。其实只有在更新 manifest 后才需要重新刷新，否则保存文件即可。
- 可以通过[chrome-extension://extension-id/popup.html](chrome-extension://extension-id/popup.html) 来快速调试页面

---

## manifest.json 概览

[manifest](https://developer.chrome.com/docs/extensions/mv3/manifest/)
每个扩展必备文件，提供重要信息，必须位于程序根目录。

```json
  // Required
  "manifest_version": 3,
  "name": "My Extension",
  "version": "1.0.1",

  // Recommended
  "action": {...},
  "default_locale": "en",
  "description": "A plain text description",
  "icons": {...},

  // Optional
  "author": "developer@example.com",
  "automation": {...},
  "background": {...},
  "chrome_settings_overrides": {...},
  "chrome_url_overrides": {...},
  "commands": {...},
  "content_scripts": [{...}],
  "content_security_policy": {...},
  "cross_origin_embedder_policy": {...},
  "cross_origin_opener_policy": {...},
  "declarative_net_request": {...},
  "devtools_page": "devtools.html",
  "event_rules": [{...}],
  "export": {...},
  "externally_connectable": {...},
  "file_browser_handlers": [...],
  "file_system_provider_capabilities": {...},
  "homepage_url": "https://path/to/homepage",
  "host_permissions": [...],
  "import": [{...}],
  "incognito": "spanning, split, or not_allowed",
  "input_components": [{...}],
  "key": "publicKey",
  "minimum_chrome_version": "107",
  "nacl_modules": [...],
  "oauth2": {...},
  "omnibox": {...},
  "optional_host_permissions": ["..."],
  "optional_permissions": ["..."],
  "options_page": "options.html",
  "options_ui": {...},
  "permissions": ["..."],
  "replacement_web_app": "https://example.com",
  "requirements": {...},
  "sandbox": {...},
  "short_name": "Short Name",
  "storage": {...},
  "tts_engine": {...},
  "update_url": "https://path/to/updateInfo.xml",
  "version_name": "1.0 beta",
  - [ ] "web_accessible_resources": [...]
```

### options_page

指定 option 操作打开的页面路径。

### background

事件驱动的，有活的时候才活动。否则会进入空闲。

```json
"background": {
	"service_worker": "background.js" // 必须位于根目录
}
```

![[Pasted image 20230218004945.png]]

## API

使扩展可以与 Chrome 浏览器互动。使用 chrome.xxx 来表示。

### chrome.action

> [Manifest keys: action](https://developer.chrome.com/docs/extensions/reference/action/)

用于控制扩展于工具栏中的图标。

#### default_icon

与 icons 不同：16/48/128
工具栏中的图标路径：16/24/32，不支持 svg
也可以使用`chrome.action.setIcon`来指定不同的图片路径。或者使用 canvas 动态生成。

```js
const canvas = new OffscreenCanvas(16, 16);
const context = canvas.getContext("2d");
context.clearRect(0, 0, 16, 16);
context.fillStyle = "#00FF00";
Greencontext.fillRect(0, 0, 16, 16);
const imageData = context.getImageData(0, 0, 16, 16);
chrome.action.setIcon({ imageData: imageData }, () => {
  /* ... */
});
```

#### default_title

标题。鼠标悬浮在图标上时显示。
`action.setTitle()`

#### default_popup

点击时加载的 xml 文件。
`action.setPopup()` 优先于 `action.onClicked`

#### badge

设置徽章。空间有限，四个字符以内最佳。
要调用方法来设置，其中可以通过`tabId`来给不同的 tab 设置不同的徽章，如果`tabId`未定义，则适用于所有 tab。特定的设置优先于全局设置。

```js
chrome.action.setBadgeBackgroundColor(
	{color: [0, 255, 0, 0]},
	Green  () => { /* ... */ },
);

chrome.action.setBadgeText({
	text: getTabBadge(tabId),
	tabId: getTabId(),
})
```

#### 设置状态

默认情况下，每个选项卡都可单击工具栏。可以通过方法来控制。
`action.disable()`
`action.enable()`

#### 其他方法

- `chrome.action.getUserSettings` 获取与 action 相关的设置
- `chrome.action.getTitle`
- `chrome.action.getPopup`
- `chrome.action.getBadgeTextColor`
- `chrome.action.getBadgeText`
- `chrome.action.getBadgeBackgroundColor`
- `chrome.action.openPopup` 打开弹窗
- `chrome.action.onClicked.addListener` 单击操作图标时出发。如果设置了弹出窗口，则不会触发。

---

### chrome.storage

存储，检索跟踪用户数据。

> [Permissions: storage](https://developer.chrome.com/docs/extensions/reference/storage/)

#### 存储区

storage 可以将数据缓存在不同的存储区：

- **local** 存储在本地，删除拓展时被清除，大小约为 5MB。但也可以通过请求权限`unlimitedStorage`来增加。适合用来存储大量数据。

- **sync** 启用同步。数据将同步到该用户的任意 Chrome 浏览器。如果用户未开启同步，那就等同于 local。离线时，Chrome 会将数据存储在本地，并在重新在线时恢复同步。配额约 100KB，每个项目 8KB。适合用于跨同步浏览器保留用户设置。

- **session** 在会话期间将数据保存在内存中。默认情况下，它不会暴露给内容脚本，但可以通过设置更改此行为`chrome.storage.session.setAccessLevel()`\。配额约 1MB。适用于保存跨服务 worker 的全局变量。

- **managed** 只读。

#### 用法

```js
chrome.storage.local.set({ key: value }).then(() => {
  console.log("Value is set to " + value);
});
chrome.storage.local.get(["key"]).then((result) => {
  console.log("Value currently is " + result.key);
});
```

#### 同步响应

```js
chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
  }
});
```

---

### chrome.alarms

让代码在指定时间或定期执行。Chrome 限制最多每分钟一次。触发`onAlarm`事件。

> [permissions: alarms](https://developer.chrome.com/docs/extensions/reference/alarms/)

#### 属性

`name` 告警名称
`periodInMinutes` 多少分钟执行一次。`nullable`
`scheduledTime` 定时在什么时候触发，单位为 ms。`Date.now() + n`

#### 创建信息

> AlarmCreateInfo

`delayInMinutes` 多久后执行
`periodInMinutes` 每隔多久执行一次，首次执行取决于`when`或者`delayInMinutes`。如果未设置该值，则只执行一次。
`when` 什么时候执行。单位为 ms。

#### 方法

##### 创建

```js
chrome.alarms.create(
  name?: string,
  alarmInfo: AlarmCreateInfo,
  callback?: function,
)
```

##### 清除

```js
chrome.alarms.clear(
  name?: string,
  callback?: function,  // manifest v3可以通过promise代替回调的方式
)

// callback
(wasCleared: boolean) => void
```

##### 全部清除

```js
chrome.alarms.clearAll(
  callback?: function,
)
```

##### 获取警告

```js
chrome.alarms.get(
  name?: string,
  callback?: function,
)

chrome.alarms.getAll(
  callback?: function,
)
```

---

### chrome.notifications

通过模板创建丰富的通知，并在系统托盘中向用户显示这些通知。

> [permissions: notifications](https://developer.chrome.com/docs/extensions/reference/notifications/)

```js
// 需要打开Chrome的通知
chrome.alarms.onAlarm.addListener((alarm) => {
  this.registration.showNotification("123", {
    body: "1111",
    icon: "assets/images/icon16.png", // 建议用128不失真
  });
});
```

#### NotificationOptions

✅ 为创建通知时的必需字段。

`buttons: NotificationButton[]` 通知的操作按钮。至多两个。
`contextMessage: string` 备用通知内容。
`eventTime: number` 通知的时间戳。单位 ms。
`iconUrl: string` 发件人头像，应用程序图标的 URL。✅
`items: NotificationItem[]` 多项目通知。MacOS 只显示第一个。
`message: string` 主要通知内容。✅
`progress: number` 0-100 的进度
`requireInteraction: boolean = false` 持续可见直到用户交互。
`silent: boolean = false` 不发出声音或震动。
`title: string` 通知的标题 ✅
`type: TemplateType` 使用哪种模板。 ✅

#### NotificationButton

`title: string` 按钮文字

#### TemplateType

- basic
- image
- list
- progress

#### 方法

创建，清除，获取，获取所有以及：

##### 获取权限级别

```js
chrome.notifications.getPermissionLevel(
	callback: function,
)
// granted / denied
```

##### 更新

```js
chrome.notifications.update(
	notificationId: string,
	options: NotificationOptions,
	callback?: function,
)
```
