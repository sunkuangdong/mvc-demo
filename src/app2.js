import "./app2.css"
import $ from "jquery"

const $tabBar = $("#app2 .tab-bar");
const $tabContent = $("#app2 .tab-content");
let index = localStorage.getItem("app2-index") || 0
$tabBar.on("click", "li", e => {
    const $li = $(e.currentTarget);
    $li.addClass("selected")
        .siblings()
        .removeClass("selected");
    index = $li.index();
    localStorage.setItem("app2-index", index)
    $tabContent.children()
        .eq(index)
        .addClass("active")
        .siblings()
        .removeClass("active");
});

$tabBar.children().eq(index).trigger('click')