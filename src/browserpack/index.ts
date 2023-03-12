import './polyfill.js';
import webpack, { Configuration } from 'webpack';
import path from 'path';
import fs from 'memfs';

export default function browserpack(options: Configuration, callback?: (err?: Error, stats?: webpack.Stats) => void) {
  options.infrastructureLogging = {
    level: 'info',
    debug: false,
		console,
		stream: { isTTY: false } as any,
		...options.infrastructureLogging,
  };
  options.snapshot ??= {};
	options.snapshot.managedPaths ??= [];
	return webpack(options, callback);
}

export { webpack, path, fs }
