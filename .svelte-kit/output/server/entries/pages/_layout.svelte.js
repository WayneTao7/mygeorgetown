import "clsx";
function _layout($$payload, $$props) {
  let { children } = $$props;
  $$payload.out += `<!----> <main id="content">`;
  children?.($$payload);
  $$payload.out += `<!----></main>`;
}
export {
  _layout as default
};
