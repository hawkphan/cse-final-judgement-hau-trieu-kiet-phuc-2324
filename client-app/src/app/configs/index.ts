
import { configs } from './app';
import { AWS_CONFIG, CUSTOM_AWS_CONFIG } from './aws';
import { IMAGES } from './images';
import { PERMISSIONS } from './permission';
export * from './error';
export default {
  ...configs,
  PERMISSIONS,
  AWS_CONFIG,
  CUSTOM_AWS_CONFIG,
  IMAGES,
};
