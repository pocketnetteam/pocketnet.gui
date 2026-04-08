# Архитектура миниприложений

Система для встраивания внешних сайтов (миниприложений) в хост-проект через `<iframe>` с двусторонней коммуникацией по `postMessage`.

---

## Общая схема

```
┌──────────────────────────────────┐
│         Хост-страница            │
│                                  │
│  ┌────────────────────────────┐  │
│  │  HostBridge (host-bridge.js)│  │
│  │  - window.message listener │  │
│  │  - реестр приложений       │  │
│  │  - RPC-диспетчер           │  │
│  │  - emit → iframe           │  │
│  └──────────┬─────────────────┘  │
│             │ postMessage         │
│  ┌──────────▼─────────────────┐  │
│  │  <iframe sandbox>          │  │
│  │  src="https://miniapp.com" │  │
│  └────────────────────────────┘  │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│  Миниприложение (iframe)         │
│                                  │
│  ┌────────────────────────────┐  │
│  │  AppSDK (app-sdk.js)       │  │
│  │  - window.message listener │  │
│  │  - action() → RPC к хосту  │  │
│  │  - on() / emit()           │  │
│  └────────────────────────────┘  │
└──────────────────────────────────┘
```

Два скрипта:

| Скрипт | Где работает | Назначение |
|--------|-------------|------------|
| **host-bridge.js** | Хост-страница | Управляет iframe-ами, слушает входящие сообщения, выполняет RPC-запросы, пушит события в iframe |
| **app-sdk.js** | Внутри iframe (миниприложение подключает самостоятельно) | Предоставляет API для общения с хостом: вызов действий, подписка на события |

---

## Протокол сообщений

Все сообщения передаются через `window.postMessage` как plain-объекты (JSON-совместимые). Никакой криптографической аутентификации — безопасность обеспечивается проверкой `event.origin`.

### Типы сообщений

#### 1. RPC-запрос (iframe → хост)

```js
{
  id: "uuid-1234",       // уникальный ID запроса
  action: "get.user",    // имя действия (точка = вложенность)
  data: { /* ... */ }    // произвольные параметры
}
```

#### 2. RPC-ответ (хост → iframe)

Успех:
```js
{
  response: "uuid-1234",  // тот же ID
  data: { /* результат */ }
}
```

Ошибка:
```js
{
  response: "uuid-1234",
  error: { message: "not found" }
}
```

#### 3. Регистрация слушателя (iframe → хост, один раз)

```js
{
  id: "uuid-5678",
  listener: "listen-abc"  // постоянный ID слушателя этого iframe
}
```

Хост запоминает `listener` и отвечает `{ response: "uuid-5678", data: "registered" }`.

#### 4. Пуш-событие (хост → iframe)

```js
{
  listener: "listen-abc",  // ранее зарегистрированный ID
  key: "theme.changed",   // имя события
  data: { theme: "dark" }
}
```

#### 5. Событие от iframe (iframe → хост, fire-and-forget)

```js
{
  event: "loaded",
  data: { /* ... */ }
}
```

---

## Жизненный цикл

```
1. Хост создаёт <iframe src="https://miniapp.example.com">
2. Миниприложение загружается, подключает app-sdk.js
3. SDK вызывает listen() → отправляет { id, listener } хосту
4. Хост сохраняет listener ID + event.source окно
5. SDK вызывает init() → action("appinfo") → получает конфигурацию
6. Миниприложение отправляет event: "loaded"
7. Хост убирает спиннер, показывает iframe
8. Далее — произвольный обмен RPC и событиями
```

---

## Реализация: хост-сторона (host-bridge.js)

### Конфигурация приложений

Список миниприложений фиксирован. Никакой установки не нужно.

```js
const apps = {
  weather: {
    id: "weather",
    name: "Погода",
    url: "https://weather.example.com",
    // разрешённый origin для проверки входящих сообщений
    origin: "https://weather.example.com"
  },
  chat: {
    id: "chat",
    name: "Чат",
    url: "https://chat.example.com",
    origin: "https://chat.example.com"
  }
};
```

### Класс HostBridge

```js
class HostBridge {
  constructor(appsConfig) {
    this.apps = appsConfig;
    // app.id → { window, listenerId }
    this.connections = {};
    // app.id → Set<{ key, handler }>
    this.hostEventHandlers = {};

    this.actions = {};
    this.hostEvents = {};

    window.addEventListener("message", (e) => this._onMessage(e));
  }

  // --- Определение доступных RPC-действий ---

  registerActions(actionsMap) {
    // actionsMap: { "get.user": async (data, app) => result, ... }
    // Точки в имени = вложенность. Для простоты можно хранить плоский map.
    Object.assign(this.actions, actionsMap);
  }

  // --- Определение событий, которые хост может пушить в iframe ---

  registerHostEvents(eventNames) {
    // eventNames: ["theme.changed", "locale.changed", "newdata", ...]
    eventNames.forEach((name) => {
      this.hostEvents[name] = true;
    });
  }

  // --- Обработка входящих сообщений от iframe ---

  _findAppByOrigin(origin) {
    return Object.values(this.apps).find((a) => a.origin === origin);
  }

  async _onMessage(event) {
    const app = this._findAppByOrigin(event.origin);
    if (!app) return; // неизвестный origin — игнорируем

    const msg = event.data;
    if (!msg || typeof msg !== "object") return;

    // Запоминаем окно для обратной связи
    this.connections[app.id] = this.connections[app.id] || {};
    this.connections[app.id].window = event.source;

    // 1) Регистрация слушателя
    if (msg.listener && msg.id) {
      this.connections[app.id].listenerId = msg.listener;
      this._reply(app, msg.id, "registered");
      return;
    }

    // 2) RPC-запрос
    if (msg.action && msg.id) {
      try {
        const handler = this.actions[msg.action];
        if (!handler) throw new Error(`unknown action: ${msg.action}`);
        const result = await handler(msg.data, app);
        this._reply(app, msg.id, result);
      } catch (err) {
        this._replyError(app, msg.id, err.message);
      }
      return;
    }

    // 3) Fire-and-forget событие от iframe
    if (msg.event) {
      this._handleIframeEvent(app, msg.event, msg.data);
    }
  }

  _reply(app, id, data) {
    const conn = this.connections[app.id];
    if (!conn?.window) return;
    conn.window.postMessage({ response: id, data }, app.origin);
  }

  _replyError(app, id, message) {
    const conn = this.connections[app.id];
    if (!conn?.window) return;
    conn.window.postMessage({ response: id, error: { message } }, app.origin);
  }

  // --- Обработка событий от iframe ---

  _handleIframeEvent(app, eventName, data) {
    const handlers = this.hostEventHandlers[app.id];
    if (!handlers) return;
    handlers.forEach((h) => {
      if (h.key === eventName) h.handler(data);
    });
  }

  onAppEvent(appId, eventName, handler) {
    if (!this.hostEventHandlers[appId]) {
      this.hostEventHandlers[appId] = new Set();
    }
    const entry = { key: eventName, handler };
    this.hostEventHandlers[appId].add(entry);
    return () => this.hostEventHandlers[appId].delete(entry);
  }

  // --- Отправка событий в iframe ---

  emit(appId, key, data) {
    const conn = this.connections[appId];
    if (!conn?.listenerId || !conn?.window) return;
    if (!this.hostEvents[key]) return;

    const app = this.apps[appId];
    conn.window.postMessage(
      { listener: conn.listenerId, key, data },
      app.origin
    );
  }

  emitAll(key, data) {
    Object.keys(this.connections).forEach((appId) => this.emit(appId, key, data));
  }
}
```

### Использование на хосте

```js
const bridge = new HostBridge(apps);

// Регистрируем действия, которые может вызывать миниприложение
bridge.registerActions({
  "appinfo": async (data, app) => ({
    id: app.id,
    name: app.name,
    host: location.hostname
  }),
  "get.user": async () => ({
    name: "Иван",
    id: 42
  }),
  "get.feed": async (data) => {
    return await fetchFeed(data.page);
  }
});

// Регистрируем события, которые хост может пушить
bridge.registerHostEvents(["theme.changed", "locale.changed", "newdata"]);

// Слушаем событие "loaded" от миниприложения
bridge.onAppEvent("weather", "loaded", () => {
  document.querySelector("#weather-spinner").remove();
});

// Пушим событие в конкретное приложение
bridge.emit("weather", "theme.changed", { theme: "dark" });

// Пушим во все
bridge.emitAll("locale.changed", { locale: "ru" });
```

### HTML iframe

```html
<iframe
  id="app-weather"
  src="https://weather.example.com"
  sandbox="allow-scripts allow-same-origin allow-forms"
  style="width: 100%; height: 600px; border: none;"
></iframe>
```

`sandbox` ограничивает возможности iframe. `allow-same-origin` нужен, чтобы скрипты внутри могли использовать свой localStorage и куки.

---

## Реализация: сторона миниприложения (app-sdk.js)

### Класс AppSDK

```js
class AppSDK {
  constructor() {
    this._callbacks = {};      // id → { resolve, reject }
    this._listeners = {};      // key → [handler, ...]
    this._listenerId = this._uuid();

    window.addEventListener("message", (e) => this._onMessage(e));
    this._register();
  }

  // --- Регистрация у хоста ---

  _register() {
    const id = this._uuid();
    window.parent.postMessage({ id, listener: this._listenerId }, "*");
  }

  // --- RPC-вызов к хосту ---

  action(actionName, data) {
    return new Promise((resolve, reject) => {
      const id = this._uuid();
      this._callbacks[id] = { resolve, reject };
      window.parent.postMessage({ id, action: actionName, data }, "*");
    });
  }

  // --- Подписка на события от хоста ---

  on(key, handler) {
    if (!this._listeners[key]) this._listeners[key] = [];
    this._listeners[key].push(handler);
  }

  off(key, handler) {
    if (!this._listeners[key]) return;
    this._listeners[key] = this._listeners[key].filter((h) => h !== handler);
  }

  // --- Отправка события хосту (fire-and-forget) ---

  emit(eventName, data) {
    window.parent.postMessage({ event: eventName, data }, "*");
  }

  // --- Инициализация ---

  async init() {
    const info = await this.action("appinfo");
    return info;
  }

  // --- Обработка входящих сообщений от хоста ---

  _onMessage(event) {
    const msg = event.data;
    if (!msg || typeof msg !== "object") return;

    // RPC-ответ
    if (msg.response && this._callbacks[msg.response]) {
      const cb = this._callbacks[msg.response];
      delete this._callbacks[msg.response];
      if (msg.error) {
        cb.reject(new Error(msg.error.message || "Unknown error"));
      } else {
        cb.resolve(msg.data);
      }
      return;
    }

    // Пуш-событие от хоста
    if (msg.listener === this._listenerId && msg.key) {
      const handlers = this._listeners[msg.key] || [];
      handlers.forEach((h) => h(msg.data));
    }
  }

  _uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
  }
}
```

### Использование в миниприложении

```html
<script src="app-sdk.js"></script>
<script>
  const sdk = new AppSDK();

  // Инициализация
  sdk.init().then((info) => {
    console.log("Подключено к:", info.host);
  });

  // Вызов действия хоста
  sdk.action("get.user").then((user) => {
    document.getElementById("name").textContent = user.name;
  });

  // Подписка на события от хоста
  sdk.on("theme.changed", (data) => {
    document.body.className = data.theme;
  });

  // Сообщить хосту, что приложение загрузилось
  sdk.emit("loaded");
</script>
```

---

## Безопасность

### Проверка origin

Хост **всегда** проверяет `event.origin` входящего сообщения и игнорирует всё от неизвестных origin-ов. Список разрешённых origin-ов задан в конфигурации `apps`.

### targetOrigin при отправке

- **Хост → iframe**: использует конкретный `app.origin` (никогда `"*"`).
- **Iframe → хост**: использует `"*"`, потому что iframe не знает origin хоста заранее. Это безопасно — iframe не отправляет секретов, а хост верифицирует по origin.

### sandbox

Атрибут `sandbox` на `<iframe>` ограничивает возможности встроенного сайта:

```
sandbox="allow-scripts allow-same-origin allow-forms"
```

Не добавляйте `allow-top-navigation` — это позволит iframe перенаправить хост-страницу.

---

## Диаграмма обмена сообщениями

```
Iframe (AppSDK)                          Хост (HostBridge)
      │                                        │
      │─── { id, listener } ──────────────────>│  регистрация
      │<── { response: id, data } ─────────────│
      │                                        │
      │─── { id, action: "appinfo" } ─────────>│  RPC
      │<── { response: id, data: {...} } ──────│
      │                                        │
      │─── { event: "loaded" } ───────────────>│  fire-and-forget
      │                                        │
      │<── { listener, key: "theme", data } ───│  пуш от хоста
      │                                        │
      │─── { id, action: "get.feed", data } ──>│  RPC
      │<── { response: id, data: [...] } ──────│
      │                                        │
      │<── { listener, key: "newdata", data } ─│  пуш от хоста
```

---

## Расширение

### Добавление нового действия

На хосте:

```js
bridge.registerActions({
  "orders.list": async (data) => {
    return await db.orders.find({ userId: data.userId });
  }
});
```

В миниприложении:

```js
const orders = await sdk.action("orders.list", { userId: 42 });
```

### Добавление нового события

На хосте:

```js
bridge.registerHostEvents(["order.updated"]);

// Когда заказ обновился:
bridge.emit("shop", "order.updated", { orderId: 123, status: "shipped" });
```

В миниприложении:

```js
sdk.on("order.updated", (data) => {
  showNotification(`Заказ ${data.orderId}: ${data.status}`);
});
```

### Добавление нового миниприложения

Добавьте запись в конфигурацию `apps` и создайте `<iframe>`:

```js
apps.shop = {
  id: "shop",
  name: "Магазин",
  url: "https://shop.example.com",
  origin: "https://shop.example.com"
};
```

На стороне нового сайта — подключите `app-sdk.js` и используйте API.

---

## Таймауты и обработка ошибок

SDK не содержит встроенных таймаутов. Рекомендуется добавить обёртку:

```js
function actionWithTimeout(sdk, action, data, ms = 10000) {
  return Promise.race([
    sdk.action(action, data),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), ms)
    )
  ]);
}
```

На хосте стоит обрабатывать случай, когда iframe не отвечает на событие `loaded` в течение разумного времени (показать ошибку пользователю).

---

## Чеклист интеграции

**На хосте:**
- [ ] Подключить `host-bridge.js`
- [ ] Описать список приложений с `id`, `url`, `origin`
- [ ] Зарегистрировать RPC-действия через `registerActions()`
- [ ] Зарегистрировать пуш-события через `registerHostEvents()`
- [ ] Создать `<iframe sandbox="allow-scripts allow-same-origin allow-forms">`
- [ ] Слушать `"loaded"` от iframe, убирать спиннер

**На стороне миниприложения:**
- [ ] Подключить `app-sdk.js`
- [ ] Создать экземпляр `new AppSDK()`
- [ ] Вызвать `sdk.init()` для получения конфигурации
- [ ] Отправить `sdk.emit("loaded")` после готовности
- [ ] Использовать `sdk.action()` для вызова хоста
- [ ] Использовать `sdk.on()` для подписки на события
