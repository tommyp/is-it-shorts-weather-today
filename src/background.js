import GlslCanvas from 'glslCanvas';
import shader from './shader';

const canvas = document.querySelector('canvas#background');

const sandbox = new GlslCanvas(canvas);

const calcSize = () => {
  const ww = window.innerWidth;
  const wh = window.innerHeight;
  const dpi = window.devicePixelRatio;

  const s = Math.max(ww + 400, wh);

  canvas.width = s * dpi;
  canvas.height = s * dpi;
  canvas.style.width = `${s}px`;
  canvas.style.height = `${s}px`;
};

calcSize();

window.addEventListener('resize', calcSize);

sandbox.load(shader);
