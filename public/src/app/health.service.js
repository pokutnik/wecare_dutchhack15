export class HealthService {
  constructor($rootScope){
    'ngInject';
    this._healthUpdateRegistry = [];

    this.socket = io();

    // Subscribe to live "wecare" stream
    this.socket.on("connect",   () => { this.socket.emit('sub.live'); });
    this.socket.on("reconnect", () => { this.socket.emit('sub.live'); });

    this.socket.on('wecare', (data) => {

      this._healthUpdateRegistry.map((func)=>{
        $rootScope.$apply(()=>{
          func(data)
        });
      });
    });
  }

  subscribeForUpdates(func){
      this._healthUpdateRegistry.push(func);
  }
}
