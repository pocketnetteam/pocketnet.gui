/* --------------------------------- cordova-plugin-deeplinks Start --------------------------------- */
declare namespace UniversalLink {
  interface EventData {
    url: string;
    scheme: string;
    host: string;
    path: string;
    params: Record<string, string>;
    hash: string;
  }
  /**
   * 订阅事件
   * @param eventName default: didLaunchAppFromLink
   */
  function subscribe(
    eventName: string,
    callback: (eventData: EventData) => void
  ): void;
  /**
   * 取消订阅事件
   * @param eventName 事件名称
   */
  function unsubscribe(eventName: string): void;

  /**
   * 初始化
   */
  function initialize(): void;
}
/* --------------------------------- cordova-plugin-deeplinks End --------------------------------- */

interface Window {
  universalLinks: typeof UniversalLink;
}
