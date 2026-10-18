console.log("IT'S ALIVE");

function $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}

// Lab 3, step 3
let pages = [
    { url: "", title: "Home" },
    { url: "projects/", title: "Projects" },
    { url: "contact/", title: "Contact" },
    { url: "resume/", title: "Resume" },
]

let nav = document.createElement("nav");
document.body.prepend(nav)

const BASE_PATH = location.hostname === "localhost" || location.hostname === "127.0.0.1" ? "/" : "/portfolio/"

for (let p of pages) {
    // Set URL based on local or GitHub pages
    let url = p.url;
    url = !url.startsWith("http") ? BASE_PATH + url : url;

    let title = p.title;
    
    // Create nav bar
    let a = document.createElement("a");
    a.href = url;
    a.textContent = title;
    nav.append(a);

    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add("current");
    };

    if (a.host !== location.host) {
		a.target = "_blank";
	}
}

// Automatic, light, dark mode
document.body.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="theme-selector">
        <label for="color-scheme" class="color-scheme">Theme:</label>
        <select id="color-scheme" name="color-scheme">
            <option value="light dark">Automatic</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
        </select>
    </div>
    `
);

let select = document.querySelector("select");
select.addEventListener("input", function (event) {
	setColorScheme(event.target.value);
});

function setColorScheme (colorScheme) {
	select.value = colorScheme;
	document.documentElement.style.setProperty("color-scheme", colorScheme);
	localStorage.colorScheme = colorScheme;
}

if (localStorage.colorScheme) {
	setColorScheme(localStorage.colorScheme);
}