(window._iconfont_svg_string_4558117 =
  '<svg><symbol id="icon-pause2" viewBox="0 0 1024 1024"><path d="M128 128 448 128 448 896 128 896zM576 128 896 128 896 896 576 896z" fill="#000000" ></path></symbol><symbol id="icon-play" viewBox="0 0 1024 1024"><path d="M981.184 160.096C837.568 139.456 678.848 128 512 128c-166.848 0-325.568 11.456-469.184 32.096C15.264 267.84 0 386.848 0 512c0 125.152 15.264 244.16 42.816 351.904C186.432 884.544 345.152 896 512 896c166.848 0 325.568-11.456 469.184-32.096C1008.736 756.16 1024 637.152 1024 512 1024 386.848 1008.736 267.84 981.184 160.096zM384 704 384 320l320 192L384 704z" fill="#000000" ></path></symbol><symbol id="icon-reset" viewBox="0 0 1088 1024"><path d="M576 0a511.68 511.68 0 0 0-448 264.32V160a32 32 0 0 0-32-32h-64a32 32 0 0 0-32 32v320a32 32 0 0 0 32 32h320a32 32 0 0 0 32-32v-64a32 32 0 0 0-32-32H214.336A383.744 383.744 0 0 1 960 512a384 384 0 0 1-384 384c-166.976 0-307.584-107.2-360.512-256H80.768c56.896 220.736 256.704 384 495.232 384A512 512 0 0 0 576 0z" fill="#1E2330" ></path></symbol></svg>'),
  (function (n) {
    var t = (t = document.getElementsByTagName("script"))[t.length - 1],
      e = t.getAttribute("data-injectcss"),
      t = t.getAttribute("data-disable-injectsvg");
    if (!t) {
      var o,
        i,
        a,
        c,
        d,
        s = function (t, e) {
          e.parentNode.insertBefore(t, e);
        };
      if (e && !n.__iconfont__svg__cssinject__) {
        n.__iconfont__svg__cssinject__ = !0;
        try {
          document.write(
            "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
          );
        } catch (t) {
          console && console.log(t);
        }
      }
      (o = function () {
        var t,
          e = document.createElement("div");
        (e.innerHTML = n._iconfont_svg_string_4558117),
          (e = e.getElementsByTagName("svg")[0]) &&
            (e.setAttribute("aria-hidden", "true"),
            (e.style.position = "absolute"),
            (e.style.width = 0),
            (e.style.height = 0),
            (e.style.overflow = "hidden"),
            (e = e),
            (t = document.body).firstChild ? s(e, t.firstChild) : t.appendChild(e));
      }),
        document.addEventListener
          ? ~["complete", "loaded", "interactive"].indexOf(document.readyState)
            ? setTimeout(o, 0)
            : ((i = function () {
                document.removeEventListener("DOMContentLoaded", i, !1), o();
              }),
              document.addEventListener("DOMContentLoaded", i, !1))
          : document.attachEvent &&
            ((a = o),
            (c = n.document),
            (d = !1),
            r(),
            (c.onreadystatechange = function () {
              "complete" == c.readyState && ((c.onreadystatechange = null), l());
            }));
    }
    function l() {
      d || ((d = !0), a());
    }
    function r() {
      try {
        c.documentElement.doScroll("left");
      } catch (t) {
        return void setTimeout(r, 50);
      }
      l();
    }
  })(window);
