import "clsx";
import { V as head, W as attr_style, I as escape_html, F as pop, D as push, S as attr, X as stringify, M as ensure_array_like } from "../../../../chunks/index.js";
import { groups, descending } from "d3";
import { b as base } from "../../../../chunks/paths.js";
function Demo_Fonts_Sample($$payload, $$props) {
  push();
  let { id = "", family = "", size = 16, text } = $$props;
  let fontSize = `${size}px`;
  let source = "";
  const url = `${base}/assets/demo/fonts/${id}.css`;
  head($$payload, ($$payload2) => {
    $$payload2.out += `<link rel="external stylesheet"${attr("href", url)}>`;
  });
  $$payload.out += `<div${attr_style(`font-family: '${stringify(family)}';`)} class="svelte-15nxc8l"><h3 class="svelte-15nxc8l">${escape_html(family)}</h3> <p${attr_style("", { "font-size": fontSize })}>${escape_html(text)}</p> <details class="svelte-15nxc8l"><summary class="svelte-15nxc8l">CSS Snippet</summary> <code class="svelte-15nxc8l">${escape_html(source)}</code></details></div>`;
  pop();
}
const fontData = [
  {
    id: "atkinson",
    family: "Atkinson",
    type: "sans-serif"
  },
  {
    id: "atlas",
    family: "Atlas Grotesk",
    type: "sans-serif"
  },
  {
    id: "baloo-bhai",
    family: "Baloo Bhai",
    type: "sans-serif"
  },
  {
    id: "canela",
    family: "Canela",
    type: "serif"
  },
  {
    id: "computer-modern",
    family: "Computer Modern",
    type: "serif"
  },
  {
    id: "cozette",
    family: "Cozette",
    type: "other"
  },
  {
    id: "inter",
    family: "Inter",
    type: "sans-serif"
  },
  {
    id: "jamboree",
    family: "Jamboree",
    type: "other"
  },
  {
    id: "jersey",
    family: "Jersey M54",
    type: "other"
  },
  {
    id: "lyon",
    family: "Lyon Display",
    type: "serif"
  },
  {
    id: "metropolis",
    family: "Metropolis",
    type: "sans-serif"
  },
  {
    id: "national",
    family: "National 2 Web",
    type: "sans-serif"
  },
  {
    id: "publico",
    family: "Publico Text",
    type: "serif"
  },
  {
    id: "recoleta",
    family: "Recoleta",
    type: "serif"
  },
  {
    id: "rubik",
    family: "Rubik",
    type: "sans-serif"
  },
  {
    id: "inconsolata",
    family: "Inconsolata",
    type: "mono"
  },
  {
    id: "spacemono",
    family: "Space Mono",
    type: "mono"
  },
  {
    id: "tiempos",
    family: "Tiempos Text",
    type: "serif"
  }
];
function Demo_Fonts($$payload, $$props) {
  push();
  let {
    size = 18,
    text = "The quick brown fox jumps over the lazy dog."
  } = $$props;
  const grouped = groups(fontData, (d) => d.type);
  grouped.sort((a, b) => descending(a[1].length, b[1].length));
  const each_array = ensure_array_like(grouped);
  $$payload.out += `<div id="info" class="svelte-1lzc8ku"><h1>Hosted Fonts on The Pudding</h1> <p><em>Do not use fonts hosted by The Pudding without written permission.</em></p> <form><label for="size" class="svelte-1lzc8ku">font-size: ${escape_html(size)}px</label> <input id="size" type="range" min="12" max="48"${attr("value", size)}> <label for="text" class="svelte-1lzc8ku">text sample</label> <input id="text" type="text" maxlength="100"${attr("value", text)}></form></div> <article class="svelte-1lzc8ku"><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
    let [type, fonts] = each_array[$$index_1];
    const each_array_1 = ensure_array_like(fonts);
    $$payload.out += `<h2>${escape_html(type)}</h2> <section class="svelte-1lzc8ku"><!--[-->`;
    for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
      let { family, id } = each_array_1[$$index];
      Demo_Fonts_Sample($$payload, { id, family, size, text });
    }
    $$payload.out += `<!--]--></section>`;
  }
  $$payload.out += `<!--]--></article>`;
  pop();
}
function _page($$payload) {
  Demo_Fonts($$payload, {});
}
export {
  _page as default
};
