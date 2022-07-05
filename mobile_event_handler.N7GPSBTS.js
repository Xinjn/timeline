var handler = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/mobile/event/handler.js
  var require_handler = __commonJS({
    "src/mobile/event/handler.js"(exports, module) {
      module.exports = async (ctx) => {
        const _redirect = ({ url, cacheTime = 120, status = 302 }) => {
          ctx.status = status;
          ctx.setCacheTime(cacheTime);
          ctx.redirect(url);
          return { next: false };
        };
        const { domain, sourcePath } = ctx;
        const isTest = domain.includes("test");
        const protocol = isTest ? "http://" : "https://";
        if (domain.includes("news.ifeng.com")) {
          return _redirect({ url: `${protocol}${domain.replace("news.ifeng.com", "ishare.ifeng.com")}${sourcePath}` });
        }
        const id = ctx.params.id;
        const json = [["event", "KVProxy", "getDocument", id]];
        const res = await transferV3(ctx, json);
        const { event } = res;
        if (!_.isEmpty(event) && event.status === 1) {
          const { content } = event;
          const { clientDisplayFormat, h5DisplayFormat } = content;
          if (domain.includes("timeline.ifeng.com")) {
            if (clientDisplayFormat === 0) {
              return _redirect({ url: `${protocol}${domain}/loc/timeline/page404` });
            } else if (clientDisplayFormat === 2) {
              return _redirect({
                url: `${isTest ? "http://test." : "https://"}news.ifeng.com/c/${id}`,
                cacheTime: 5
              });
            }
          } else if (domain.includes("ishare.ifeng.com")) {
            if (h5DisplayFormat === 0) {
              return _redirect({ url: `${protocol}${domain}/loc/timeline/page404` });
            } else if (h5DisplayFormat === 2) {
              return _redirect({
                url: `${isTest ? "http://test." : "https://"}ishare.ifeng.com/c/s/${id}`,
                cacheTime: 5
              });
            }
          }
        } else {
          return _redirect({ url: `${protocol}${domain}/loc/timeline/page404` });
        }
        return { allData: {}, adKeys: [] };
      };
    }
  });
  return require_handler();
})();
