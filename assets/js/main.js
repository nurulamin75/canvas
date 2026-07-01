/* ===================================================================
   Canvas Print — main application script

   CONTENTS (search for section name)
   ────────────────────────────────────────────────────────────────
   Theme              applyThemeToggle
   Icons & artwork    fillIcons, fillArt
   i18n               applyI18n
   Chrome             renderNav, renderFooter
   Section render     renderSections, RENDERERS
   Interactions       menu, dropdown, search, carousel, forms…
   Shop               bootShop, productCardHTML
   Product detail     bootProduct
   Boot               init on DOMContentLoaded
   =================================================================== */
(function () {
    "use strict";

    const { t, tlist, getLang, setLang } = window.i18n;
    const { icon, artwork, stars, whyIcon } = window.art;
    const SITE = window.SITE;

    const $ = (sel, root) => (root || document).querySelector(sel);
    const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
    const L = (v) => (v && typeof v === "object" && "en" in v ? v[getLang()] || v.en : v);
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    const waLink = "https://wa.me/" + SITE.whatsapp;

    /* ----------------------------- Theme ----------------------------- */
    function applyThemeToggle() {
        const toggle = $("#themeToggle");
        if (!toggle || toggle.dataset.bound) return;
        toggle.dataset.bound = "1";
        toggle.addEventListener("click", () => {
            const root = document.documentElement;
            const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
            root.setAttribute("data-theme", next);
            try { localStorage.setItem("theme", next); } catch (e) {}
        });
    }

    /* ------------------------------ Icons ---------------------------- */
    function fillIcons(root) {
        $$("[data-icon]", root).forEach((el) => {
            const name = el.dataset.icon;
            if (el.dataset.iconDone !== name) {
                el.innerHTML = icon(name);
                el.dataset.iconDone = name;
            }
        });
    }

    function fillArt(root) {
        $$("[data-art]", root).forEach((el) => {
            if (el.dataset.artDone) return;
            el.innerHTML = artwork(el.dataset.art, el.dataset.artTitle || el.dataset.art);
            el.dataset.artDone = "1";
        });
    }

    /* ------------------------------ i18n ----------------------------- */
    function applyI18n(root) {
        root = root || document;
        $$("[data-i18n]", root).forEach((el) => { el.textContent = t(el.dataset.i18n); });
        $$("[data-i18n-html]", root).forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
        $$("[data-i18n-attr]", root).forEach((el) => {
            el.dataset.i18nAttr.split(";").forEach((pair) => {
                const [key, attr] = pair.split(":");
                if (key && attr) el.setAttribute(attr.trim(), t(key.trim()));
            });
        });
        document.documentElement.lang = getLang();
        $$("[data-lang]").forEach((b) => b.classList.toggle("is-active", b.dataset.lang === getLang()));
    }

    /* --------------------------- Chrome render ------------------------ */
    function renderNav() {
        const path = location.pathname.replace(/index\.html$/, "") || "/";
        const isActive = (href) => href === "/" ? path === "/" : path.startsWith(href.replace(".html", ""));
        const desktop = $("[data-nav]");
        const mobile = $("[data-nav-mobile]");
        if (desktop) {
            desktop.innerHTML = window.NAV.map((n) => {
                if (n.children) {
                    const childActive = n.children.some((c) => isActive(c.href));
                    const items = n.children.map((c) =>
                        `<a href="${c.href}" class="${isActive(c.href) ? "is-active" : ""}">${esc(t("nav." + c.key))}</a>`
                    ).join("");
                    return `<div class="nav-dropdown${childActive ? " is-active" : ""}" data-dropdown>
                        <button type="button" class="nav-dropdown-trigger" data-dropdown-trigger aria-expanded="false">
                            <span>${esc(t("nav." + n.key))}</span><span data-icon="chevron-down"></span>
                        </button>
                        <div class="nav-dropdown-panel" data-dropdown-panel>${items}</div>
                    </div>`;
                }
                return `<a href="${n.href}" class="${isActive(n.href) ? "is-active" : ""}">${esc(t("nav." + n.key))}</a>`;
            }).join("");
            fillIcons(desktop);
        }
        if (mobile) {
            mobile.innerHTML = window.NAV.map((n) => {
                if (n.children) return n.children.map((c) => `<a href="${c.href}">${esc(t("nav." + c.key))}</a>`).join("");
                return `<a href="${n.href}">${esc(t("nav." + n.key))}</a>`;
            }).join("");
        }
    }

    function renderFooter() {
        const socials = $("[data-socials]");
        if (socials) {
            socials.innerHTML =
                `<a href="${SITE.socials.facebook}" aria-label="Facebook" target="_blank" rel="noopener">${icon("message-circle")}</a>` +
                `<a href="${SITE.socials.instagram}" aria-label="Instagram" target="_blank" rel="noopener">${icon("heart")}</a>` +
                `<a href="${SITE.socials.linkedin}" aria-label="LinkedIn" target="_blank" rel="noopener">${icon("users")}</a>` +
                `<a href="${waLink}" aria-label="WhatsApp" target="_blank" rel="noopener">${icon("whatsapp")}</a>`;
        }
        const cols = $("[data-footer-cols]");
        if (cols) {
            cols.innerHTML = window.FOOTER_GROUPS.map((g) =>
                `<div class="footer-col"><h4>${esc(t("footer." + g.titleKey))}</h4><ul>` +
                g.links.map((l) => `<li><a href="${l.href}">${esc(L(l.label))}</a></li>`).join("") +
                `</ul></div>`
            ).join("");
        }
        const cp = $("[data-copyright]");
        if (cp) cp.textContent = `© ${new Date().getFullYear()} ${SITE.legalName}. ${t("footer.rights")}`;
        const addr = $("[data-address]");
        if (addr) addr.textContent = SITE.address;
        $$("[data-wa]").forEach((a) => (a.href = waLink));
    }

    /* --------------------------- Section render ----------------------- */
    function serviceCardHTML(s, i) {
        return `<a href="/services.html#${s.slug}" class="service-row reveal" data-delay="${((i || 0) % 4) + 1}">
            <span class="sr-num idx-num">${String((i || 0) + 1).padStart(2, "0")}</span>
            <span class="sr-art hover-zoom">${artwork(s.kind, L(s.name))}</span>
            <span class="sr-body">
                <span class="sr-title">${esc(L(s.name))}</span>
                <span class="sr-tag">${esc(L(s.tagline))}</span>
            </span>
            <span class="sr-price"><small>${esc(t("common.from"))}</small>${esc(s.priceFrom)}</span>
            <span class="sr-arrow">${icon("arrow-up-right")}</span></a>`;
    }

    const RENDERERS = {
        stats(c) {
            c.innerHTML = `<div class="stat-row reveal">` + window.STATS.map((s) =>
                `<div class="stat-cell"><div class="stat-num"><span class="counter" data-target="${s.value}">0</span><span class="suffix">${s.suffix}</span></div>
                <div class="stat-label">${esc(t("stats." + s.key))}</div></div>`).join("") + `</div>`;
        },
        trusted(c) {
            c.innerHTML = `<p>${esc(t("trusted.title"))}</p><div class="trusted-logos">` +
                window.TRUSTED.map((l) => `<span>${esc(l)}</span>`).join("") + `</div>`;
        },
        "featured-products"(c) {
            const all = window.PRODUCTS || [];
            const featured = all.filter((p) => p.badge === "popular");
            const list = (featured.length ? featured : all).slice(0, 4);
            c.innerHTML = list.map(productCardHTML).join("");
        },
        services(c) {
            let list = window.SERVICES;
            if (c.dataset.home === "true") list = list.filter((s) => s.home);
            if (c.dataset.limit) list = list.slice(0, +c.dataset.limit);
            c.innerHTML = list.map(serviceCardHTML).join("");
        },
        why(c) {
            c.innerHTML = tlist("why.items").map((item, i) =>
                `<div class="why-row reveal" data-delay="${(i % 3) + 1}">
                    <span class="idx-num">${String(i + 1).padStart(2, "0")}</span>
                    <div class="why-ico">${icon(whyIcon(i))}</div>
                    <h3>${esc(item.title)}</h3><p class="muted">${esc(item.description)}</p></div>`).join("");
        },
        work(c) {
            let list = window.PORTFOLIO;
            if (c.dataset.limit) list = list.slice(0, +c.dataset.limit);
            c.innerHTML = list.map((item, i) =>
                `<a href="/portfolio.html" class="masonry-item reveal m-0" data-delay="${(i % 4) + 1}">
                    <div class="art">${portfolioArtHTML(item)}</div>
                    <div class="ov"><span class="cat">${esc(item.category)}</span><h3>${esc(L(item.title))}</h3></div></a>`).join("");
        },
        process(c) {
            c.innerHTML = tlist("process.steps").map((step, i) =>
                `<div class="process-step reveal" data-delay="${i + 1}">
                    <div class="num idx-num">${String(i + 1).padStart(2, "0")}</div>
                    <h3>${esc(step.title)}</h3><p>${esc(step.description)}</p></div>`).join("");
        },
        reviews(c) {
            c.innerHTML = window.TESTIMONIALS.map((r, i) =>
                `<div class="review-card">${stars(r.rating)}
                    <p class="quote">${esc(L(r.quote))}</p>
                    <div class="review-author"><span class="ava">${esc(r.name[0])}</span>
                    <div><div class="name">${esc(r.name)}</div><div class="role">${esc(L(r.role))}</div></div></div></div>`).join("");
        },
        faq(c) {
            let list = window.FAQS;
            if (c.dataset.limit) list = list.slice(0, +c.dataset.limit);
            c.innerHTML = list.map((f, i) =>
                `<div class="acc-item${i === 0 ? " open" : ""}">
                    <button class="acc-trigger" type="button" aria-expanded="${i === 0 ? "true" : "false"}">
                        <span>${esc(L(f.q))}</span><span class="pm" aria-hidden="true"></span></button>
                    <div class="acc-body"${i === 0 ? ' style="max-height:500px"' : ""}><div class="acc-body-inner">${esc(L(f.a))}</div></div>
                </div>`).join("");
        },
        "service-blocks"(c) {
            c.innerHTML = window.SERVICES.filter((s) => s.home).map((s, i) =>
                `<div class="service-block${i % 2 ? " flip" : ""} reveal" id="${s.slug}">
                    <div class="art-wrap">${artwork(s.kind, L(s.name))}</div>
                    <div>
                        <h2 class="h2 mb-3">${esc(L(s.name))}</h2>
                        <p class="tagline mb-4">${esc(L(s.tagline))}</p>
                        <p class="muted">${esc(L(s.description))}</p>
                        <ul class="service-feats">${s.features.map((f) => `<li><span class="ico">${icon("check")}</span> ${esc(f)}</li>`).join("")}</ul>
                        <div class="flex gap-md wrap items-center mt-6">
                            <a href="/quote.html" class="btn btn-primary">${esc(t("common.getQuote"))} ${icon("arrow-right")}</a>
                            <span class="price">${esc(t("common.from"))} ${esc(s.priceFrom)}</span>
                        </div></div></div>`).join("");
        },
        portfolio(c) {
            const cats = `<div class="filter-bar reveal" data-filter-bar>` + window.PORTFOLIO_CATEGORIES.map((cat, i) =>
                `<button class="chip${i === 0 ? " is-active" : ""}" type="button" data-filter="${esc(cat)}">${esc(cat)}</button>`).join("") + `</div>`;
            const grid = `<div class="masonry reveal" data-gallery>` + window.PORTFOLIO.map((item) =>
                `<div class="masonry-item" data-category="${esc(item.category)}" data-title="${esc(L(item.title))}">
                    <div class="art">${portfolioArtHTML(item)}</div>
                    <div class="ov"><span class="cat">${esc(item.category)}</span><h3>${esc(L(item.title))}</h3></div></div>`).join("") + `</div>`;
            c.innerHTML = cats + grid;
        },
        pricing(c) {
            c.innerHTML = window.PRICING.map((p) =>
                `<div class="price-card${p.featured ? " featured" : ""}">
                    ${p.featured ? `<span class="featured-badge">${esc(t("pricing.mostPopular"))}</span>` : ""}
                    <h3 class="h3">${esc(L(p.name))}</h3>
                    <div class="price-tag">${esc(p.price)}</div>
                    <p class="muted mb-2">${esc(L(p.description))}</p>
                    <ul class="price-feats">${L(p.features).map((f) => `<li><span class="ico">${icon("check")}</span> ${esc(f)}</li>`).join("")}</ul>
                    <a href="/quote.html" class="btn ${p.featured ? "btn-accent" : "btn-primary"} btn-block">${esc(t("common." + p.cta))}</a>
                </div>`).join("");
        },
        "price-table"(c) {
            c.innerHTML = `<div class="price-table-wrap"><table class="price-table"><thead><tr>
                <th>${esc(t("pricing.product"))}</th><th>${esc(t("pricing.spec"))}</th><th>${esc(t("pricing.startingFrom"))}</th></tr></thead><tbody>` +
                window.PRICE_TABLE.map((r) => `<tr><td>${esc(L(r.product))}</td><td>${esc(L(r.spec))}</td><td>${esc(r.from)}</td></tr>`).join("") +
                `</tbody></table></div>`;
        },
        "service-options"(c) {
            c.innerHTML = `<option value="">${esc(t("quote.selectProduct"))}</option>` +
                window.SERVICES.map((s) => `<option value="${esc(L(s.name))}">${esc(L(s.name))}</option>`).join("");
        },
        "about-values"(c) {
            const icons = ["palette", "heart", "clock", "leaf"];
            c.innerHTML = tlist("about.values").map((v, i) =>
                `<div class="why-row reveal" data-delay="${i + 1}">
                    <span class="idx-num">${String(i + 1).padStart(2, "0")}</span>
                    <div class="why-ico">${icon(icons[i % icons.length])}</div>
                    <h3>${esc(v.title)}</h3><p class="muted">${esc(v.description)}</p></div>`).join("");
        },
        "quote-perks"(c) {
            c.innerHTML = tlist("quote.perks").map((p) =>
                `<li><span class="ico">${icon("check")}</span> ${esc(p)}</li>`).join("");
        },
        "contact-details"(c) {
            const item = (ic, head, body) =>
                `<div class="contact-item"><span class="ico">${icon(ic)}</span><div><h4>${esc(head)}</h4>${body}</div></div>`;
            const hours = SITE.hours.map((h) => `${esc(L(h.day))}: ${esc(h.time)}`).join("<br>");
            c.innerHTML =
                item("phone", t("contact.phone"), `<a href="tel:${SITE.phoneHref}">${esc(SITE.phone)}</a>`) +
                item("mail", t("contact.email"), `<a href="mailto:${SITE.email}">${esc(SITE.email)}</a>`) +
                item("map-pin", t("contact.address"), `<p>${esc(SITE.address)}</p>`) +
                item("clock", t("contact.hours"), `<p>${hours}</p>`);
        }
    };

    function renderSections(root) {
        $$("[data-render]", root).forEach((c) => {
            const fn = RENDERERS[c.dataset.render];
            if (fn) fn(c);
        });
    }

    /* --------------------------- Interactions ------------------------- */
    function initMenu() {
        const menu = $("#mobileMenu"), open = $("#menuOpen"), close = $("#menuClose");
        if (!menu || !open || open.dataset.bound) return;
        open.dataset.bound = "1";
        const setOpen = (state) => {
            menu.classList.toggle("open", state);
            menu.setAttribute("aria-hidden", String(!state));
            open.setAttribute("aria-expanded", String(state));
            document.body.style.overflow = state ? "hidden" : "";
        };
        open.addEventListener("click", () => setOpen(true));
        close && close.addEventListener("click", () => setOpen(false));
        $$("a", menu).forEach((a) => a.addEventListener("click", () => setOpen(false)));
        document.addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false));
    }

    function closeNavDropdowns() {
        $$(".nav-dropdown.open").forEach((d) => {
            d.classList.remove("open");
            d.querySelector("[data-dropdown-trigger]")?.setAttribute("aria-expanded", "false");
        });
    }

    function initNavDropdown() {
        if (document.body.dataset.navDropdownBound) return;
        document.body.dataset.navDropdownBound = "1";
        document.addEventListener("click", (e) => {
            const trigger = e.target.closest("[data-dropdown-trigger]");
            if (trigger) {
                const dropdown = trigger.closest("[data-dropdown]");
                const wasOpen = dropdown.classList.contains("open");
                closeNavDropdowns();
                if (!wasOpen) { dropdown.classList.add("open"); trigger.setAttribute("aria-expanded", "true"); }
                return;
            }
            if (!e.target.closest("[data-dropdown]")) closeNavDropdowns();
        });
        document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeNavDropdowns(); });
    }

    function initHeaderScroll() {
        const header = $("#siteHeader");
        if (!header || header.dataset.bound) return;
        header.dataset.bound = "1";
        const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
    }

    function initReveal() {
        const items = $$(".reveal").filter((el) => !el.dataset.revealBound);
        if (!items.length) return;
        if (!("IntersectionObserver" in window)) { items.forEach((el) => el.classList.add("is-visible")); return; }
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
        items.forEach((el) => { el.dataset.revealBound = "1"; io.observe(el); });
    }

    function initCounters() {
        const counters = $$(".counter").filter((el) => !el.dataset.bound);
        if (!counters.length) return;
        const animate = (el) => {
            const target = parseInt(el.dataset.target || "0", 10);
            const start = performance.now(), duration = 1400;
            const step = (now) => {
                const p = Math.min((now - start) / duration, 1);
                el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target).toLocaleString();
                if (p < 1) requestAnimationFrame(step); else el.textContent = target.toLocaleString();
            };
            requestAnimationFrame(step);
        };
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => { if (entry.isIntersecting) { animate(entry.target); io.unobserve(entry.target); } });
        }, { threshold: 0.5 });
        counters.forEach((el) => { el.dataset.bound = "1"; io.observe(el); });
    }

    function initAccordion() {
        $$("[data-accordion]").forEach((acc) => {
            if (acc.dataset.bound) return;
            acc.dataset.bound = "1";
            acc.addEventListener("click", (e) => {
                const trigger = e.target.closest(".acc-trigger");
                if (!trigger) return;
                const item = trigger.closest(".acc-item");
                const body = item.querySelector(".acc-body");
                const isOpen = item.classList.contains("open");
                $$(".acc-item", acc).forEach((other) => {
                    other.classList.remove("open");
                    other.querySelector(".acc-trigger").setAttribute("aria-expanded", "false");
                    other.querySelector(".acc-body").style.maxHeight = null;
                });
                if (!isOpen) {
                    item.classList.add("open");
                    trigger.setAttribute("aria-expanded", "true");
                    body.style.maxHeight = body.scrollHeight + "px";
                }
            });
        });
    }

    function initCarousel() {
        $$("[data-carousel]").forEach((root) => {
            const track = root.querySelector("[data-track]");
            const dotsWrap = root.querySelector("[data-dots]");
            if (!track || root.dataset.bound) return;
            root.dataset.bound = "1";
            let page = 0;
            const perView = () => (window.innerWidth >= 760 ? 2 : 1);
            const pageCount = () => Math.max(1, Math.ceil(track.children.length / perView()));
            const renderDots = () => {
                if (!dotsWrap) return;
                const count = pageCount();
                dotsWrap.innerHTML = Array.from({ length: count })
                    .map((_, i) => `<button type="button" class="carousel-dot" data-dot aria-label="Go to slide ${i + 1}"></button>`)
                    .join("");
                $$("[data-dot]", dotsWrap).forEach((dot, i) => dot.addEventListener("click", () => { page = i; update(); }));
            };
            const update = () => {
                page = Math.min(page, pageCount() - 1);
                const card = track.children[0];
                if (!card) return;
                const gap = parseFloat(getComputedStyle(track).gap) || 20;
                const step = card.offsetWidth + gap;
                const maxOffset = Math.max(0, track.children.length - perView());
                const offset = Math.min(page * perView(), maxOffset);
                track.style.transition = "transform 0.5s cubic-bezier(0.2,0.7,0.2,1)";
                track.style.transform = `translateX(-${offset * step}px)`;
                $$("[data-dot]", dotsWrap).forEach((d, i) => d.classList.toggle("is-active", i === page));
            };
            root.querySelector("[data-prev]")?.addEventListener("click", () => { page = page <= 0 ? pageCount() - 1 : page - 1; update(); });
            root.querySelector("[data-next]")?.addEventListener("click", () => { page = page >= pageCount() - 1 ? 0 : page + 1; update(); });
            window.addEventListener("resize", () => { renderDots(); update(); });
            renderDots();
            update();
        });
    }

    function buildSearchIndex() {
        const index = [];
        window.NAV.forEach((n) => {
            if (n.children) {
                n.children.forEach((c) => index.push({ type: t("common.categoryPage"), label: t("nav." + c.key), href: c.href }));
            } else if (n.href !== "/") {
                index.push({ type: t("common.categoryPage"), label: t("nav." + n.key), href: n.href });
            }
        });
        (window.SERVICES || []).forEach((s) =>
            index.push({ type: t("common.categoryService"), label: L(s.name), sub: L(s.tagline), href: "/services.html#" + s.slug }));
        (window.PRODUCTS || []).forEach((p) =>
            index.push({ type: t("common.categoryProduct"), label: L(p.name), sub: L(p.tagline), href: "/product.html?slug=" + p.slug }));
        return index;
    }

    function initSearch() {
        const toggle = $("#searchOpen");
        const overlay = $("#searchOverlay");
        const input = $("#searchInput");
        const closeBtn = $("#searchClose");
        const resultsEl = $("#searchResults");
        if (!toggle || !overlay || overlay.dataset.bound) return;
        overlay.dataset.bound = "1";

        const renderResults = (query) => {
            const q = query.trim().toLowerCase();
            const index = buildSearchIndex();
            const matches = q
                ? index.filter((item) => item.label.toLowerCase().includes(q) || (item.sub || "").toLowerCase().includes(q))
                : index.filter((item) => item.type === t("common.categoryPage"));
            resultsEl.innerHTML = matches.length
                ? matches.slice(0, 12).map((item) =>
                    `<a class="search-result" href="${item.href}">
                        <span class="sr-info"><span class="sr-title">${esc(item.label)}</span>${item.sub ? `<span class="sr-sub">${esc(item.sub)}</span>` : ""}</span>
                        <span class="sr-type">${esc(item.type)}</span>
                    </a>`).join("")
                : `<div class="search-empty">${esc(t("common.searchNoResults"))}</div>`;
        };

        const open = () => {
            overlay.classList.add("open");
            overlay.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
            renderResults("");
            setTimeout(() => input?.focus(), 60);
        };
        const close = () => {
            overlay.classList.remove("open");
            overlay.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "";
            if (input) input.value = "";
        };

        toggle.addEventListener("click", open);
        closeBtn?.addEventListener("click", close);
        overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
        input?.addEventListener("input", (e) => renderResults(e.target.value));
        document.addEventListener("keydown", (e) => { if (e.key === "Escape" && overlay.classList.contains("open")) close(); });
    }

    function initFilter() {
        const bar = $("[data-filter-bar]"), grid = $("[data-gallery]");
        if (!bar || !grid || bar.dataset.bound) return;
        bar.dataset.bound = "1";
        bar.addEventListener("click", (e) => {
            const chip = e.target.closest(".chip");
            if (!chip) return;
            $$(".chip", bar).forEach((c) => c.classList.remove("is-active"));
            chip.classList.add("is-active");
            const filter = chip.dataset.filter;
            $$(".masonry-item", grid).forEach((item) => {
                item.style.display = filter === "All" || item.dataset.category === filter ? "" : "none";
            });
        });
    }

    function initLightbox() {
        const box = $("#lightbox");
        if (!box) return;
        const content = box.querySelector("[data-lightbox-content]");
        const title = box.querySelector("[data-lightbox-title]");
        const cat = box.querySelector("[data-lightbox-cat]");
        const close = () => { box.classList.remove("open"); document.body.style.overflow = ""; };
        const gallery = $("[data-gallery]");
        if (gallery && !gallery.dataset.lbBound) {
            gallery.dataset.lbBound = "1";
            gallery.addEventListener("click", (e) => {
                const item = e.target.closest(".masonry-item");
                if (!item) return;
                e.preventDefault();
                const art = item.querySelector(".art");
                if (content && art) content.innerHTML = art.innerHTML;
                if (title) title.textContent = item.dataset.title || "";
                if (cat) cat.textContent = item.dataset.category || "";
                box.classList.add("open");
                document.body.style.overflow = "hidden";
            });
        }
        if (!box.dataset.bound) {
            box.dataset.bound = "1";
            box.addEventListener("click", (e) => { if (e.target === box || e.target.closest("[data-lightbox-close]")) close(); });
            document.addEventListener("keydown", (e) => e.key === "Escape" && close());
        }
    }

    function initMultiStep() {
        const form = $("[data-multistep]");
        if (!form || form.dataset.bound) return;
        form.dataset.bound = "1";
        const steps = $$(".form-step", form), pills = $$(".step-pill", form);
        let current = 0;
        const validStep = (step) => {
            let ok = true;
            $$("input[required], select[required], textarea[required]", step).forEach((f) => {
                const wrap = f.closest(".field");
                if (!f.checkValidity()) { ok = false; wrap && wrap.classList.add("invalid"); }
                else wrap && wrap.classList.remove("invalid");
            });
            return ok;
        };
        const show = (i) => {
            steps.forEach((s, idx) => s.classList.toggle("active", idx === i));
            pills.forEach((p, idx) => { p.classList.toggle("active", idx === i); p.classList.toggle("done", idx < i); });
            current = i;
            form.scrollIntoView({ behavior: "smooth", block: "start" });
        };
        $$("[data-next-step]", form).forEach((b) => b.addEventListener("click", () => { if (validStep(steps[current]) && current < steps.length - 1) show(current + 1); }));
        $$("[data-prev-step]", form).forEach((b) => b.addEventListener("click", () => current > 0 && show(current - 1)));
        $$("input, select, textarea", form).forEach((f) => f.addEventListener("input", () => {
            const wrap = f.closest(".field");
            wrap && f.checkValidity() && wrap.classList.remove("invalid");
        }));
    }

    function initForms() {
        $$("form[data-ajax], form[data-newsletter]").forEach((form) => {
            if (form.dataset.bound) return;
            form.dataset.bound = "1";
            form.addEventListener("submit", async (e) => {
                e.preventDefault();
                const btn = form.querySelector("button[type=submit]");
                const msg = form.querySelector(".form-msg");
                const successPanel = $("[data-success]");
                const original = btn ? btn.innerHTML : "";
                const invalid = $$("[required]", form).some((f) => !f.checkValidity());
                if (invalid) {
                    $$("[required]", form).forEach((f) => { const w = f.closest(".field"); w && w.classList.toggle("invalid", !f.checkValidity()); });
                    return;
                }
                if (btn) { btn.disabled = true; btn.innerHTML = "…"; }
                if (msg) msg.textContent = "";
                try {
                    const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { "X-Requested-With": "fetch" } });
                    const data = await res.json().catch(() => ({ ok: res.ok }));
                    if (data.ok) {
                        form.reset();
                        if (successPanel && form.hasAttribute("data-ajax")) {
                            form.style.display = "none";
                            successPanel.style.display = "block";
                            successPanel.scrollIntoView({ behavior: "smooth", block: "center" });
                        } else if (msg) { msg.textContent = data.message || "Done!"; msg.style.color = "var(--lime)"; }
                    } else if (msg) { msg.textContent = data.message || "Something went wrong."; msg.style.color = "var(--tomato)"; }
                } catch (err) {
                    if (msg) { msg.textContent = "Network error. Please try again."; msg.style.color = "var(--tomato)"; }
                } finally {
                    if (btn) { btn.disabled = false; btn.innerHTML = original; }
                }
            });
        });
    }

    function initInteractions() {
        applyThemeToggle();
        initMenu();
        initNavDropdown();
        initHeaderScroll();
        initAccordion();
        initCarousel();
        initFilter();
        initLightbox();
        initMultiStep();
        initForms();
        initReveal();
        initCounters();
        initSearch();
    }

    /* ------------------------- Language switching --------------------- */
    function bindLangToggle() {
        $$("[data-lang]").forEach((b) => {
            if (b.dataset.bound) return;
            b.dataset.bound = "1";
            b.addEventListener("click", () => {
                if (b.dataset.lang === getLang()) return;
                setLang(b.dataset.lang);
                rerender();
            });
        });
    }

    function rerender() {
        renderNav();
        renderFooter();
        renderSections(document);
        fillIcons(document);
        fillArt(document);
        applyI18n(document);
        initInteractions();
        bootShop();
        bootProduct();
    }

    /* ========================== Shop page ============================= */
    function portfolioArtHTML(item) {
        const src = item.image || (window.PORTFOLIO_IMAGES && item.id && window.PORTFOLIO_IMAGES[item.id]);
        if (src) {
            return `<img src="${esc(src)}" alt="${esc(L(item.title))}" loading="lazy" width="800" height="675">`;
        }
        return artwork(item.kind, L(item.title));
    }

    function productArtHTML(p) {
        const src = p.image || (window.PRODUCT_IMAGES && window.PRODUCT_IMAGES[p.slug]);
        if (src) {
            return `<img src="${esc(src)}" alt="${esc(L(p.name))}" loading="lazy" width="800" height="600">`;
        }
        return artwork(p.kind || "card", L(p.name));
    }

    function productCardHTML(p) {
        const price = p.variants[0].price;
        return `<a href="/product.html?slug=${esc(p.slug)}" class="product-card reveal">
            <div class="prod-art">${productArtHTML(p)}${p.badge ? `<span class="prod-badge">${esc(t("shop.badge." + p.badge))}</span>` : ""}</div>
            <div class="prod-body">
                <h3>${esc(L(p.name))}</h3>
                <p class="prod-tag">${esc(L(p.tagline))}</p>
                <div class="prod-foot">
                    <div class="prod-price"><small>${esc(t("common.priceFrom"))}</small>৳${esc(String(price))}</div>
                    <span class="prod-arrow">${icon("arrow-up-right")}</span>
                </div>
            </div></a>`;
    }

    function bootShop() {
        const grid = $("#shopGrid");
        const catsEl = $("#shopCats");
        const searchEl = $("#shopSearch");
        if (!grid) return;

        const products = window.PRODUCTS || [];
        let activeCat = "all";
        let searchQ = "";

        function filterRender() {
            const filtered = products.filter((p) => {
                const matchCat = activeCat === "all" || p.category === activeCat;
                const q = searchQ.toLowerCase();
                const matchSearch = !q || L(p.name).toLowerCase().includes(q) || L(p.tagline).toLowerCase().includes(q);
                return matchCat && matchSearch;
            });
            grid.innerHTML = filtered.length
                ? filtered.map(productCardHTML).join("")
                : `<div class="no-products"><span data-icon="search"></span><p>${esc(t("common.noProducts"))}</p></div>`;
            fillArt(grid);
            fillIcons(grid);
            initReveal();
        }

        if (catsEl) {
            catsEl.innerHTML = window.PRODUCT_CATEGORIES.map((cat) =>
                `<button class="shop-cat${cat === "all" ? " is-active" : ""}" type="button" data-cat="${esc(cat)}">${esc(t("shop.cats." + cat))}</button>`
            ).join("");
            catsEl.addEventListener("click", (e) => {
                const btn = e.target.closest(".shop-cat");
                if (!btn) return;
                activeCat = btn.dataset.cat;
                $$(".shop-cat", catsEl).forEach((b) => b.classList.toggle("is-active", b.dataset.cat === activeCat));
                filterRender();
            });
        }

        if (searchEl) {
            searchEl.addEventListener("input", (e) => { searchQ = e.target.value; filterRender(); });
        }

        filterRender();
    }

    /* ======================== Product detail page ==================== */
    function bootProduct() {
        const wrap = $("#productWrap");
        if (!wrap) return;

        const params = new URLSearchParams(location.search);
        const slug = params.get("slug");
        const products = window.PRODUCTS || [];
        const p = products.find((x) => x.slug === slug);

        if (!p) {
            wrap.innerHTML = `<div class="section-inner text-center py-10">
                <p class="muted">Product not found. <a href="/shop.html">${esc(t("common.backToShop"))}</a></p></div>`;
            return;
        }

        document.title = L(p.name) + " — Canvas Print";
        const meta = document.querySelector('meta[name="description"]');
        if (meta) meta.content = L(p.description);

        let selectedVariant = p.variants[0];
        let selectedOptions = {};
        p.options.forEach((o) => { selectedOptions[o.id] = o.choices[0].id; });

        function getOptionLabel() {
            return p.options.map((o) => {
                const ch = o.choices.find((c) => c.id === selectedOptions[o.id]);
                return ch ? L(ch.label) : "";
            }).join(", ");
        }

        function pulseEl(el) {
            if (!el) return;
            el.style.transform = "scale(1.15)";
            setTimeout(() => { el.style.transform = "scale(1)"; }, 180);
        }

        function updatePriceDisplay() {
            const el = $("#priceAmount");
            if (el) el.textContent = "৳" + selectedVariant.price.toLocaleString();
            const sumVariant = $("#sumVariant");
            if (sumVariant) { sumVariant.textContent = L(selectedVariant.label); pulseEl(sumVariant); }
            const sumOption = $("#sumOption");
            if (sumOption) { sumOption.textContent = getOptionLabel(); pulseEl(sumOption); }
            const formVariant = $("#formVariant");
            if (formVariant) formVariant.value = L(selectedVariant.label);
            const formOption = $("#formOption");
            if (formOption) formOption.value = getOptionLabel();
            const formPrice = $("#formPrice");
            if (formPrice) formPrice.value = "৳" + selectedVariant.price.toLocaleString();
        }

        const variantHTML = `<div class="variant-group">
            <label>${esc(t("common.selectVariant"))}</label>
            <div class="variant-pills">${p.variants.map((v, i) =>
                `<button class="variant-pill${i === 0 ? " is-active" : ""}" type="button" data-variant-idx="${i}">
                    <span class="v-label">${esc(L(v.label))}</span><span class="v-price">৳${v.price.toLocaleString()}</span>
                </button>`
            ).join("")}</div></div>`;

        const optionsHTML = p.options.map((opt) =>
            `<div class="option-group">
                <label>${esc(L(opt.label))}</label>
                <div class="option-pills">${opt.choices.map((ch, i) =>
                    `<button class="option-pill${i === 0 ? " is-active" : ""}" type="button" data-opt-id="${esc(opt.id)}" data-choice-id="${esc(ch.id)}">${esc(L(ch.label))}</button>`
                ).join("")}</div></div>`
        ).join("");

        const trustHTML = `<div class="trust-row">
            <div class="trust-item">${icon("map-pin")}<span>${esc(t("common.trustCod"))}</span></div>
            <div class="trust-item">${icon("clock")}<span>${esc(L(p.delivery))}</span></div>
            <div class="trust-item">${icon("shield")}<span>${esc(t("common.trustQuality"))}</span></div>
        </div>`;

        wrap.innerHTML = `
        <div class="container">
            <nav class="breadcrumb" aria-label="Breadcrumb">
                <a href="/shop.html">${esc(t("common.browseShop"))}</a>
                <span class="sep">/</span>
                <a href="/shop.html">${esc(t("shop.cats." + p.category))}</a>
                <span class="sep">/</span>
                <span class="current">${esc(L(p.name))}</span>
            </nav>
            <div class="product-detail">
                <div class="prod-detail-art-wrap reveal">
                    <div class="prod-detail-art">${productArtHTML(p)}</div>
                </div>
                <div class="prod-detail-body reveal" data-delay="1">
                    <span class="prod-cat-label">${esc(t("shop.cats." + p.category))}</span>
                    <h1>${esc(L(p.name))}</h1>
                    <p class="prod-tagline">${esc(L(p.tagline))}</p>
                    <p class="prod-desc">${esc(L(p.description))}</p>
                    <ul class="prod-feats">${p.features.map((f) =>
                        `<li><span class="ico">${icon("check")}</span>${esc(f)}</li>`).join("")}</ul>
                    ${variantHTML}
                    ${optionsHTML}
                    <div class="price-display" id="priceDisplay">
                        <span class="amount" id="priceAmount">৳${p.variants[0].price.toLocaleString()}</span>
                        <div class="price-note">${esc(t("common.orderTotal"))}
                            <span class="delivery-note">${esc(t("common.delivery"))}: ${esc(L(p.delivery))}</span>
                        </div>
                    </div>
                    <a href="#orderForm" class="btn btn-primary btn-lg" id="orderNowBtn">${esc(t("common.orderNow"))} ${icon("arrow-down")}</a>
                    ${trustHTML}
                </div>
            </div>

            <div class="order-form-section" id="orderForm">
                <h2>${esc(t("shop.orderFormTitle"))}</h2>
                <p class="sub">${esc(t("shop.orderFormSubtitle"))}</p>
                <div class="order-summary-bar">
                    <div class="sum-item"><span class="sum-label">${esc(t("common.orderProduct"))}</span><span class="sum-val">${esc(L(p.name))}</span></div>
                    <div class="sum-item"><span class="sum-label">${esc(t("common.orderVariant"))}</span><span class="sum-val" id="sumVariant">${esc(L(p.variants[0].label))}</span></div>
                    ${p.options.length ? `<div class="sum-item"><span class="sum-label">${esc(t("common.orderOption"))}</span><span class="sum-val" id="sumOption">${getOptionLabel()}</span></div>` : ""}
                    <div class="sum-item"><span class="sum-label">${esc(t("common.orderTotal"))}</span><span class="sum-val" id="sumTotal">৳${p.variants[0].price.toLocaleString()}</span></div>
                </div>
                <div class="cod-notice">${icon("info")} <span>${esc(t("common.codNotice"))}</span></div>
                <form class="form-grid" action="/forms/order.php" method="POST" novalidate data-ajax id="orderFormEl">
                    <input type="hidden" name="product" value="${esc(L(p.name))}">
                    <input type="hidden" name="variant" id="formVariant" value="${esc(L(p.variants[0].label))}">
                    <input type="hidden" name="option" id="formOption" value="${getOptionLabel()}">
                    <input type="hidden" name="price" id="formPrice" value="৳${p.variants[0].price.toLocaleString()}">
                    <input type="text" name="_hp" class="hidden" tabindex="-1" autocomplete="off">
                    <div class="field">
                        <label for="f-name">${esc(t("common.yourName"))} *</label>
                        <input id="f-name" type="text" name="name" required autocomplete="name">
                    </div>
                    <div class="field">
                        <label for="f-phone">${esc(t("common.yourPhone"))} *</label>
                        <input id="f-phone" type="tel" name="phone" required autocomplete="tel">
                    </div>
                    <div class="field col-span-full">
                        <label for="f-address">${esc(t("common.yourAddress"))} *</label>
                        <input id="f-address" type="text" name="address" required autocomplete="street-address">
                    </div>
                    <div class="field col-span-full">
                        <label for="f-notes">${esc(t("common.orderNotes"))}</label>
                        <textarea id="f-notes" name="notes" rows="3"></textarea>
                    </div>
                    <div class="col-span-full">
                        <button type="submit" class="btn btn-primary btn-lg">${esc(t("common.placeOrder"))} ${icon("arrow-right")}</button>
                        <p class="form-msg" aria-live="polite"></p>
                    </div>
                </form>
                <div class="success-panel hidden text-center py-8" data-success>
                    <div class="success-icon" data-icon="check-circle"></div>
                    <h3>${esc(t("common.orderSuccess"))}</h3>
                    <a href="/shop.html" class="btn btn-primary mt-5">${esc(t("common.backToShop"))}</a>
                </div>
            </div>
        </div>
        <div class="sticky-buy-bar" id="stickyBuyBar">
            <div class="sb-price"><span class="label">${esc(t("common.orderTotal"))}</span><span class="amount" id="sbAmount">৳${p.variants[0].price.toLocaleString()}</span></div>
            <a href="#orderForm" class="btn btn-primary">${esc(t("common.orderNow"))}</a>
        </div>`;

        const sumTotal = $("#sumTotal");
        const sbAmount = $("#sbAmount");
        const priceAmountEl = $("#priceAmount");

        function pulsePrice() {
            if (!priceAmountEl) return;
            priceAmountEl.classList.remove("pop");
            requestAnimationFrame(() => priceAmountEl.classList.add("pop"));
        }

        wrap.addEventListener("click", (e) => {
            const vp = e.target.closest(".variant-pill");
            if (vp) {
                const idx = +vp.dataset.variantIdx;
                selectedVariant = p.variants[idx];
                $$(".variant-pill", wrap).forEach((b) => b.classList.toggle("is-active", b === vp));
                if (sumTotal) { sumTotal.textContent = "৳" + selectedVariant.price.toLocaleString(); pulseEl(sumTotal); }
                if (sbAmount) sbAmount.textContent = "৳" + selectedVariant.price.toLocaleString();
                updatePriceDisplay();
                pulsePrice();
            }
            const op = e.target.closest(".option-pill");
            if (op) {
                const optId = op.dataset.optId;
                selectedOptions[optId] = op.dataset.choiceId;
                $$(".option-pill[data-opt-id='" + optId + "']", wrap).forEach((b) => b.classList.toggle("is-active", b === op));
                updatePriceDisplay();
            }
        });

        /* Sticky mobile buy bar: visible once the inline price box scrolls out of view */
        const buyBar = $("#stickyBuyBar");
        const priceDisplay = $("#priceDisplay");
        if (buyBar && priceDisplay && "IntersectionObserver" in window) {
            const io = new IntersectionObserver(([entry]) => {
                buyBar.classList.toggle("is-visible", !entry.isIntersecting && entry.boundingClientRect.top < 0);
            }, { threshold: 0 });
            io.observe(priceDisplay);
        }
        $$("#stickyBuyBar a, #orderNowBtn").forEach((a) => a.addEventListener("click", () => {
            setTimeout(() => $("#f-name")?.focus({ preventScroll: true }), 500);
        }));

        fillIcons(wrap);
        fillArt(wrap);
        applyI18n(wrap);
        initReveal();
        initForms();
    }

    /* ------------------------------ Boot ----------------------------- */
    async function loadIncludes() {
        const targets = $$("[data-include]");
        await Promise.all(targets.map(async (el) => {
            try {
                const res = await fetch(el.dataset.include);
                const html = await res.text();
                const tpl = document.createElement("template");
                tpl.innerHTML = html;
                el.replaceWith(...tpl.content.childNodes);
            } catch (e) {}
        }));
    }

    async function boot() {
        await loadIncludes();
        renderNav();
        renderFooter();
        renderSections(document);
        fillIcons(document);
        fillArt(document);
        applyI18n(document);
        bindLangToggle();
        initInteractions();
        bootShop();
        bootProduct();
    }

    if (document.readyState !== "loading") boot();
    else document.addEventListener("DOMContentLoaded", boot);
})();
