

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/demo/ig-story/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.DUcV82Gi.js","_app/immutable/chunks/CWj6FrbW.js"];
export const stylesheets = [];
export const fonts = [];
