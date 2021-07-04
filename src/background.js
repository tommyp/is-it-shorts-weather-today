import GlslCanvas from 'glslCanvas';
import shader from './shader';

const canvas = document.querySelector('canvas#background');

const sandbox = new GlslCanvas(canvas);

const calcSize = () => {
  const ww = window.innerWidth;
  const wh = window.innerHeight;
  const dpi = window.devicePixelRatio;

  const s = Math.max(ww, wh);

  canvas.width = ww * dpi;
  canvas.height = wh * dpi;
  canvas.style.width = `${ww}px`;
  canvas.style.height = `${wh}px`;
};

calcSize();

window.addEventListener('resize', calcSize);

sandbox.load(shader);
sandbox.setUniform('seed', Math.random());
