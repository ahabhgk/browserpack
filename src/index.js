import './polyfill.js';
import webpack from 'webpack';
import path from 'path';
import fs from 'memfs';

export default function browserpack(options, callback) {
  options.infrastructureLogging = {
    level: 'info',
    debug: false,
		console,
		stream: { isTTY: false },
		...options.infrastructureLogging,
  };
  options.snapshot ??= {};
	options.snapshot.managedPaths ??= [];
	return webpack(options, callback);
}

export { webpack, path, fs }
