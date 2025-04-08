import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.CPWYldyF.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CFVXtXxR.js","_app/immutable/chunks/Dsl7IYrX.js","_app/immutable/chunks/DhxKS0LD.js"];
export const stylesheets = ["_app/immutable/assets/0.C2jV-X0P.css"];
export const fonts = [];
