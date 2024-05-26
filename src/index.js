import "./index.css";
import "./index.less";
import "bootstrap/dist/css/bootstrap.min.css";

document.querySelector("#content").innerHTML = `<div>Webpack</div>`;

// 前端-注入环境变量
if (process.env.NODE_ENV === "production") {
  console.log = function () {};
}
console.log("开发模式下好用，生产模式下失效");
