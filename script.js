const header = document.querySelector(".header");
const burger = document.querySelector(".header__burger");
const nav = document.querySelector(".nav");
const megamenu = document.querySelector(".megamenu");
const megamenuContent = document.querySelector(".megamenu__content");
const menuLinks = document.querySelectorAll(".megamenu a, .megamenu .column_item");
const navOriginalParent = nav?.parentElement;
const navNextSibling = nav?.nextSibling;
let scrollPosition = 0;

if (header && burger) {
    const isMobileMenu = () => window.matchMedia("(max-width: 480px)").matches;

    const moveNavToMenu = () => {
        if (!nav || !megamenu || !megamenuContent || nav.parentElement === megamenu) {
            return;
        }

        megamenu.insertBefore(nav, megamenuContent);
    };

    const restoreNav = () => {
        if (!nav || !navOriginalParent || nav.parentElement === navOriginalParent) {
            return;
        }

        navOriginalParent.insertBefore(nav, navNextSibling);
    };

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

        if (isOpen && isMobileMenu()) {
            moveNavToMenu();
        }

        header.classList.toggle("is-open", isOpen);
        burger.setAttribute("aria-expanded", String(isOpen));
        burger.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");

        if (isOpen) {
            lockScroll();
        } else {
            unlockScroll();
            restoreNav();
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
            restoreNav();
        } else if (header.classList.contains("is-open")) {
            moveNavToMenu();
        }
    });
}
