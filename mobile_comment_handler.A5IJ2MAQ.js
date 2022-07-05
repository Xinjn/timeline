var handler = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/mobile/comment/handler.js
  var require_handler = __commonJS({
    "src/mobile/comment/handler.js"(exports, module) {
      module.exports = async (ctx) => {
        const subjectId = ctx.params.subjectId;
        const json = [["event", "KVProxy", "getDocument", subjectId]];
        const res = await transferV3(ctx, json);
        const { event } = res;
        const allData = { event: _.isEmpty(event) ? null : event };
        return { allData, adKeys: [] };
      };
    }
  });
  return require_handler();
})();
