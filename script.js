const header = document.querySelector(".header");
const burger = document.querySelector(".header__burger");
const menuLinks = document.querySelectorAll(".megamenu a, .megamenu .column_item");
let scrollPosition = 0;

if (header && burger) {
    const getScrollPosition = () => (
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
    );

    const lockScroll = () => {
        scrollPosition = getScrollPosition();
        document.body.style.top = `-${scrollPosition}px`;
        document.body.classList.add("menu-open");
    };

    const unlockScroll = () => {
        document.body.classList.remove("menu-open");
        document.body.style.top = "";
        document.documentElement.scrollTop = scrollPosition;
        document.body.scrollTop = scrollPosition;
        window.scrollTo(0, scrollPosition);
    };

    const setMenuState = (isOpen) => {
        const wasOpen = header.classList.contains("is-open");

        if (isOpen === wasOpen) {
            return;
        }

        header.classList.toggle("is-open", isOpen);
        burger.setAttribute("aria-expanded", String(isOpen));
        burger.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");

        if (isOpen) {
            lockScroll();
        } else {
            unlockScroll();
        }
    };

    burger.addEventListener("click", () => {
        setMenuState(!header.classList.contains("is-open"));
    });

    menuLinks.forEach((link) => {
        link.addEventListener("click", () => setMenuState(false));
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setMenuState(false);
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 480) {
            setMenuState(false);
        }
    });
}
