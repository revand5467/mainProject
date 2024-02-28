import { proxy } from 'valtio';
import logo from '../assets/temp.png'
const state = proxy({
  intro: true,
  color: '#f7c52b',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: logo,
  fullDecal: './threejs.png',
});

export default state;