export const __rspack_esm_id = "src/entry.client";
export const __rspack_esm_ids = ["src/entry.client"];
export const __webpack_modules__ = {
"./src/app.tsx"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (App)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("../node_modules/.pnpm/react@18.3.1/node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/**
 * @file 示例组件
 * @description 展示一个带有自动更新时间的页面标题，用于演示 Esmx 框架的基本功能
 */ function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}

var _s = $RefreshSig$();

function App() {
    _s();
    var _useState = _sliced_to_array((0,react__rspack_import_1.useState)(new Date().toISOString()), 2), time = _useState[0], setTime = _useState[1];
    (0,react__rspack_import_1.useEffect)(function() {
        var timer = setInterval(function() {
            setTime(new Date().toISOString());
        }, 1000);
        return function() {
            return clearInterval(timer);
        };
    }, []);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("h1", {
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("a", {
                    href: "https://esmx.dev",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: "Esmx - React"
                }, void 0, false, {
                    fileName: "/Users/dupoin/Documents/GitHub/esmx/react-demo/src/app.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "/Users/dupoin/Documents/GitHub/esmx/react-demo/src/app.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("time", {
                dateTime: time,
                children: time
            }, void 0, false, {
                fileName: "/Users/dupoin/Documents/GitHub/esmx/react-demo/src/app.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "/Users/dupoin/Documents/GitHub/esmx/react-demo/src/app.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_s(App, "dx7dHjTUh4K5kGaLx04v1fKAFss=");
_c = App;
var _c;
$RefreshReg$(_c, "App");


},

};
export const __rspack_esm_runtime = function(__webpack_require__) {
// webpack/runtime/get_full_hash
(() => {
__webpack_require__.h = () => ("179b486bc7c486a3")
})();

}
;
