import "./app1.css"
import $ from "jquery"


// 数据相关都放到m
const Module = {
    n: Number(localStorage.getItem("n"))
}
// 视图相关都放到v
const View = {
    el: null,
    html: `
    <div>
        <div class="output">
            <span id="number">{{n}}</span>
        </div>
        <div class="actions">
            <button id="add1">+1</button>
            <button id="minus1">-1</button>
            <button id="mul2">*2</button>
            <button id="divide2">÷2</button>
        </div>
    </div>
    `,
    init(container) {
        View.container = $(container)
        View.render(container)
    },
    render(container) {
        if (!View.el) {
            View.el = $(View.html.replace("{{n}}", Module.n)).appendTo($(container))
        } else {
            const newEl = $(View.html.replace("{{n}}", Module.n))
            View.el.replaceWith(newEl)
            View.el = newEl
            localStorage.setItem("n", Module.n);
        }
    },
}
// 其他都在c
const Content = {
    init(container) {
        View.init(container)
        Content.ui = {
            button1: $("#add1"),
            button2: $("#minus1"),
            button3: $("#mul2"),
            button4: $("#divide2"),
            number: $("#number"),
        }
        Content.bindEvents()
    },
    bindEvents() {
        View.container.on("click", "#add1", () => {
            Module.n += 1
            View.render()
        });
        View.container.on("click", "#minus1", () => {
            Module.n -= 1
            View.render()
        });
        View.container.on("click", "#mul2", () => {
            Module.n *= 2
            View.render()
        });
        View.container.on("click", "#divide2", () => {
            Module.n /= 2
            View.render()
        });
    }
}

export default Content;