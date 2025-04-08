import adapterStatic from "@sveltejs/adapter-static";
import { sveltePreprocess } from "svelte-preprocess";
import autoprefixer from "autoprefixer";

const preprocess = sveltePreprocess({
	postcss: {
		plugins: [autoprefixer]
	}
});

const config = {
	compilerOptions: {
		runes: true
	},
	preprocess,
	kit: {
		adapter: adapterStatic({ strict: false }),
		prerender: {
			entries: ['*'],
			handleMissingId: 'warn' // ✅ 忽略不存在的锚点错误
		}
	}
};

export default config;
