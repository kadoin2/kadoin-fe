export default class CustomEventHandler<T> {
    private readonly listeners: Map<string, (arg: T) => any> = new Map();
  
    add = (key: string, action: (arg: T) => any) => {
      this.listeners.set(key, action);
    }
    remove = (key: string) => {
      this.listeners.delete(key);
    }
    invoke = (arg: T) => {
      this.listeners.forEach((action) => {
        action(arg);
      });
    }
  }
  