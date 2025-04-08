import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.DO9NRvi2.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CFVXtXxR.js","_app/immutable/chunks/Dsl7IYrX.js","_app/immutable/chunks/BmWFtLKB.js","_app/immutable/chunks/uUo_491z.js","_app/immutable/chunks/BCzi4U7i.js","_app/immutable/chunks/BM3bS7p_.js"];
export const stylesheets = ["_app/immutable/assets/2.Dl6pqadN.css"];
export const fonts = [];
