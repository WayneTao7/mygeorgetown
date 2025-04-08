import "clsx";
import { M as ensure_array_like, N as element, I as escape_html, O as spread_props, D as push, J as store_get, K as unsubscribe_stores, F as pop, P as copy_payload, Q as assign_payload, R as attr_class, S as attr, T as spread_attributes, U as bind_props } from "../../../chunks/index.js";
import "d3";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function Demo_Link($$payload) {
  $$payload.out += `<section id="demo-link"><h2>Link</h2> <p><a href="elements">Default element styles demo</a></p> <p><a href="fonts">Pudding-hosted font previews</a></p></section>`;
}
function Demo_Img($$payload) {
  $$payload.out += `<section id="demo-image"><h2>Image</h2> <p>img tag</p> <img src="../assets/demo/test.jpg" alt="cat" class="svelte-o47y6s"> <p>background image</p> <div class="svelte-o47y6s"></div></section>`;
}
function Demo_SvelteElement($$payload) {
  const items = [
    { tag: "h3", text: "I am a h3 tag." },
    { tag: "p", text: "I am p tag." }
  ];
  const each_array = ensure_array_like(items);
  $$payload.out += `<section id="demo-element"><h2>Dynamic Svelte Element</h2> <!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let { tag, text } = each_array[$$index];
    element($$payload, tag, void 0, () => {
      $$payload.out += `${escape_html(text)}`;
    });
  }
  $$payload.out += `<!--]--></section>`;
}
function Demo_SvelteComponent_A($$payload, $$props) {
  let { number } = $$props;
  $$payload.out += `<p>I am component A and my favorite number is ${escape_html(number)}.</p>`;
}
function Demo_SvelteComponent_B($$payload, $$props) {
  let { name } = $$props;
  $$payload.out += `<p>I am component B and my name is ${escape_html(name)}.</p>`;
}
function Demo_SvelteComponent($$payload) {
  const components = { A: Demo_SvelteComponent_A, B: Demo_SvelteComponent_B };
  const data = [
    { component: "A", number: 42 },
    { component: "B", name: "Russell" }
  ];
  const each_array = ensure_array_like(data);
  $$payload.out += `<section id="demo-component"><h2>Dynamic Svelte Component</h2> <!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let d = each_array[$$index];
    const C = components[d.component];
    $$payload.out += `<!---->`;
    C($$payload, spread_props([d]));
    $$payload.out += `<!---->`;
  }
  $$payload.out += `<!--]--></section>`;
}
function Scrolly($$payload, $$props) {
  push();
  var $$store_subs;
  const { $$slots, $$events, ...props } = $$props;
  let value = props.value ?? 0;
  const {
    root = null,
    top = 0,
    bottom = 0,
    increments = 100,
    children
  } = props;
  $$payload.out += `<div>`;
  children?.($$payload, {
    active: store_get($$store_subs ??= {}, "$value", value)
  });
  $$payload.out += `<!----></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Demo_Scrolly($$payload) {
  let value = void 0;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<section id="scrolly"><h2 class="svelte-12sq0x6">Scrolly <span>${escape_html(value || "-")}</span></h2> <div class="spacer svelte-12sq0x6"></div> `;
    Scrolly($$payload2, {
      get value() {
        return value;
      },
      set value($$value) {
        value = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        const each_array = ensure_array_like([0, 1, 2, 3, 4]);
        $$payload3.out += `<!--[-->`;
        for (let i = 0, $$length = each_array.length; i < $$length; i++) {
          let text = each_array[i];
          const active = value === i;
          $$payload3.out += `<div${attr_class("step svelte-12sq0x6", void 0, { "active": active })}><p class="svelte-12sq0x6">${escape_html(text)}</p></div>`;
        }
        $$payload3.out += `<!--]-->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <div class="spacer svelte-12sq0x6"></div></section>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
}
const body = [{ "section": "intro", "content": [{ "type": "h4", "value": "An h4 element with no attributes" }, { "type": "text", "value": "Some random text here, followed by an img tag." }, { "type": "img", "value": { "src": "../assets/demo/test.jpg", "alt": "A cat" } }, { "type": "Test", "value": { "label": "I’m a custom component!", "value": "50" } }] }];
const copy = {
  body
};
const raw = '{\r\n	"meta": { "title": "Title TK", "description": "Description tk." },\r\n	"body": [\r\n		{\r\n			"section": "intro",\r\n			"content": [\r\n				{ "type": "h4", "value": "An h4 element with no attributes" },\r\n				{\r\n					"type": "text",\r\n					"value": "Some random text here, followed by an img tag."\r\n				},\r\n				{\r\n					"type": "img",\r\n					"value": { "src": "../assets/demo/test.jpg", "alt": "A cat" }\r\n				},\r\n				{\r\n					"type": "Test",\r\n					"value": { "label": "I’m a custom component!", "value": "50" }\r\n				}\r\n			]\r\n		}\r\n	]\r\n}\r\n';
function CMS($$payload, $$props) {
  push();
  let { components = {}, body: body2 = [] } = $$props;
  const each_array = ensure_array_like(body2);
  $$payload.out += `<!--[-->`;
  for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
    let { section, content } = each_array[$$index_1];
    const id = section.toLowerCase().replace(/[^a-z0-9]/g, "");
    const C = components[section];
    $$payload.out += `<section${attr("id", id)}>`;
    if (C) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<!---->`;
      C($$payload, spread_props([content]));
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      const each_array_1 = ensure_array_like(content);
      $$payload.out += `<!--[-->`;
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let { type, value } = each_array_1[$$index];
        const C2 = components[type];
        const isString = typeof value === "string";
        if (C2) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<!---->`;
          C2($$payload, spread_props([value]));
          $$payload.out += `<!---->`;
        } else if (type === "text") {
          $$payload.out += "<!--[1-->";
          $$payload.out += `<p>${html(value)}</p>`;
        } else if (isString) {
          $$payload.out += "<!--[2-->";
          element($$payload, type, void 0, () => {
            $$payload.out += `${html(value)}`;
          });
        } else {
          $$payload.out += "<!--[!-->";
          element($$payload, type, () => {
            $$payload.out += `${spread_attributes({ ...value })}`;
          });
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--></section>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Demo_MicroCMSTest($$payload, $$props) {
  let { label = "A", value = 0 } = $$props;
  $$payload.out += `<p>${escape_html(label)}</p> <progress${attr("value", value)} max="100"></progress>`;
}
function Demo_MicroCMS($$payload, $$props) {
  push();
  const { body: body2 } = copy;
  const components = { Test: Demo_MicroCMSTest };
  $$payload.out += `<section id="cms"><h2>MicroCMS</h2> <code><pre>${escape_html(raw.replace(/\t/g, " "))}</pre></code> `;
  CMS($$payload, { components, body: body2 });
  $$payload.out += `<!----></section>`;
  pop();
}
function person($$payload, p) {
  $$payload.out += `<div class="person svelte-1ltx6da"><p class="svelte-1ltx6da">${escape_html(p.name)}</p> <p class="svelte-1ltx6da">${escape_html(p.age)}</p></div>`;
}
function Demo_Svelte5($$payload, $$props) {
  push();
  let {
    name,
    age = 30,
    // fallback value
    renamed: renameMe,
    // rename prop (pass in as renameMe)
    value = void 0,
    // two way binding to share value with parent
    children,
    // children (previously slots)
    random,
    // dispatch event
    $$slots,
    $$events,
    ...props
    // rest of the props
  } = $$props;
  const people = [
    { name: "John", age: 30 },
    { name: "Jill", age: 45 }
  ];
  let count = 0;
  let result1 = count * 2;
  let result2 = (() => {
    return count * 2;
  })();
  let result3 = 0;
  const each_array = ensure_array_like(people);
  $$payload.out += `<h2>Svelte5</h2> <h3>Reactive variables 3 ways:</h3> <button class="svelte-1ltx6da">count++</button> <p class="svelte-1ltx6da">${escape_html(count)} doubled is ${escape_html(result1)} (derived)</p> <p class="svelte-1ltx6da">${escape_html(count)} doubled is ${escape_html(result2)} (derived by)</p> <p class="svelte-1ltx6da">${escape_html(count)} doubled is ${escape_html(result3)} ($effect)</p> <h3>Children (previously slots):</h3> <div class="children">`;
  children?.($$payload);
  $$payload.out += `<!----></div> <h3>Dispatch Event</h3> <button class="svelte-1ltx6da">Random</button>  <h3>Snippets</h3> <div class="people svelte-1ltx6da"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let p = each_array[$$index];
    person($$payload, p);
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { value });
  pop();
}
function Demo_LoadData($$payload, $$props) {
  push();
  $$payload.out += `<div class="c"><h2>Load Data</h2> <div class="response">`;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p>loading data...</p>`;
  }
  $$payload.out += `<!--]--></div></div>`;
  pop();
}
function Demo($$payload) {
  let value = 0;
  function onRandom(v) {
    console.log(v);
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div id="demo" class="svelte-m1ilu3"><h1>Demo</h1> `;
    Demo_Svelte5($$payload2, {
      random: onRandom,
      get value() {
        return value;
      },
      set value($$value) {
        value = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Demo_Link($$payload2);
    $$payload2.out += `<!----> `;
    Demo_Img($$payload2);
    $$payload2.out += `<!----> `;
    Demo_SvelteElement($$payload2);
    $$payload2.out += `<!----> `;
    Demo_SvelteComponent($$payload2);
    $$payload2.out += `<!----> `;
    Demo_MicroCMS($$payload2);
    $$payload2.out += `<!----> `;
    Demo_LoadData($$payload2);
    $$payload2.out += `<!----> `;
    Demo_Scrolly($$payload2);
    $$payload2.out += `<!----></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
}
function _page($$payload) {
  Demo($$payload);
}
export {
  _page as default
};
