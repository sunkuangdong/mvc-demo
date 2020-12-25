import "./app1.css"
import $ from "jquery"

const eventBus = $(window)
// 数据相关都放到m
const Module = {
    n: Number(localStorage.getItem("n")),
    updated(data) {
        Object.assign(Module, data)
        eventBus.trigger("m:updata")
    },
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
    init(el) {
        View.el = $(el)
    },
    render(n) {
        if (!!View.el.children.length) {
            View.el.empty()
        }
        $(View.html.replace("{{n}}", n)).appendTo($(View.el))
        localStorage.setItem("n", n)
    },
}
// 其他都在c
const Content = {
    init(el) {
        View.init(el)
        View.render(Module.n)
        Content.bindEvents()
        eventBus.on("m:updata", () => {
            View.render(Module.n)
        })
    },
    events: {
        "click #add1": "add",
        "click #minus1": "minus1",
        "click #mul2": "mul2",
        "click #divide2": "divide2",
    },
    add() {
        Module.updated({
            n: Module.n + 1
        })
    },
    minus1() {
        Module.updated({
            n: Module.n - 1
        })
    },
    mul2() {
        Module.updated({
            n: Module.n * 2
        })
    },
    divide2() {
        Module.updated({
            n: Module.n / 2
        })
    },
    bindEvents() {
        for (let key in Content.events) {
            const spaceIndex = key.indexOf(" ")
            const part1 = key.slice(0, spaceIndex)
            const part2 = key.slice(spaceIndex + 1)
            View.el.on(part1, part2, Content[Content.events[key]]);
        }
    }
}

export default Content;