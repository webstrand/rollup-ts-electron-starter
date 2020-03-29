import { Plugin as RollupPlugin } from "rollup";
import commonJS, { RollupCommonJSOptions } from "@rollup/plugin-commonjs";
import nodeResolve, { Options as RollupNodeResolveOptions } from "@rollup/plugin-node-resolve";

type Options = {
	nodeResolve?: RollupNodeResolveOptions;
	commonJS?: RollupCommonJSOptions;
}

const plugins = (options?: Options): RollupPlugin[] => [
	nodeResolve(options?.nodeResolve),
	commonJS(options?.commonJS),
];

export default [
	{
		input: "build/client/index.js",
		output: {
			format: "iife",
			file: "dist/client.js",
			name: "client",
			sourcemap: true,
		},
		plugins: plugins({
			nodeResolve: {
				browser: true,
				preferBuiltins: true,
			},
		}),
	},
	{
		input: "build/electron/index.js",
		external: [ "path", "electron" ],
		output: {
			format: "cjs",
			file: "dist/electron.js",
			name: "electron",
			sourcemap: true,
		},
		plugins: plugins({
			nodeResolve: { preferBuiltins: false },
		}),
	},
];
