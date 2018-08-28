const anyGlobal = global as any;

const raf = (anyGlobal.requestAnimationFrame = (cb: any) => {
  setTimeout(cb, 0);
});

export default raf;
