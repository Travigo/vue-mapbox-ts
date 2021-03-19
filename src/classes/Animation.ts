export type RenderFuncInput<DataType> =(timestamp:DOMHighResTimeStamp, data:DataType) => void;
export type RenderFunc = (t:DOMHighResTimeStamp) => void;

export interface AnimationOptions {
  speed: number
}

export class Animation<DataType> {
  renderFunc: RenderFuncInput<DataType>;
  animation?: number;
  running: boolean;
  startTime: number;
  progress: number;
  data: DataType;
  pauseTime: number;
  speed: number;

  constructor(data: DataType, renderFunc:RenderFuncInput<DataType>, opts:AnimationOptions = { speed: 1 }){
    this.renderFunc = renderFunc;
    this.running = false;
    this.progress = 0;
    this.data = data;
    this.startTime = performance.now();
    this.speed = opts.speed;
    this.pauseTime = 0;
  }

  start(){
    this.startTime = performance.now() - this.progress;
    this.internalRenderFunc(this.progress);
  }

  pause(){
    this.pauseTime += performance.now() - this.pauseTime;
    if(this.animation)
      cancelAnimationFrame(this.animation);
  }

  reset(){
    this.startTime = performance.now();
    this.progress = 0;
  }

  stop(){
    this.pause();
    this.reset();
    this.renderFunc(this.progress, this.data);
  }

  internalRenderFunc(timestamp:DOMHighResTimeStamp){    
    this.progress = (timestamp - this.startTime)*this.speed;    
    this.renderFunc(this.progress, this.data);
    this.animation = requestAnimationFrame(this.internalRenderFunc.bind(this));
  }
}