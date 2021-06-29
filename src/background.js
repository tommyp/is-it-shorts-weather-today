import GlslCanvas from 'glslCanvas';
import shader from './shader';

const canvas = document.querySelector('canvas#background');

const sandbox = new GlslCanvas(canvas);

sandbox.load(shader);
