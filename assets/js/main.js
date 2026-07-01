/* Canvas Print — app bootstrap: includes, i18n, rendering, interactions. */
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
        const links = window.NAV.map((n) =>
            `<a href="${n.href}" class="${isActive(n.href) ? "is-active" : ""}">${esc(t("nav." + n.key))}</a>`
        ).join("");
        const desktop = $("[data-nav]");
        const mobile = $("[data-nav-mobile]");
        if (desktop) desktop.innerHTML = links;
        if (mobile) mobile.innerHTML = window.NAV.map((n) => `<a href="${n.href}">${esc(t("nav." + n.key))}</a>`).join("");
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
    function serviceCardHTML(s) {
        return `<a href="/services.html#${s.slug}" class="card service-card reveal">
            <div class="art">${artwork(s.kind, L(s.name))}</div>
            <div class="body">
                <h3>${esc(L(s.name))}</h3>
                <p class="tagline">${esc(L(s.tagline))}</p>
                <div class="foot">
                    <span class="price"><small>${esc(t("common.from"))}</small> ${esc(s.priceFrom)}</span>
                    <span class="link-arrow">${icon("arrow-up-right")}</span>
                </div>
            </div></a>`;
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
        services(c) {
            let list = window.SERVICES;
            if (c.dataset.home === "true") list = list.filter((s) => s.home);
            if (c.dataset.limit) list = list.slice(0, +c.dataset.limit);
            c.innerHTML = list.map(serviceCardHTML).join("");
        },
        why(c) {
            c.innerHTML = tlist("why.items").map((item, i) =>
                `<div class="card why-card reveal" data-delay="${(i % 3) + 1}">
                    <div class="why-ico">${icon(whyIcon(i))}</div>
                    <h3>${esc(item.title)}</h3><p class="muted">${esc(item.description)}</p></div>`).join("");
        },
        work(c) {
            let list = window.PORTFOLIO;
            if (c.dataset.limit) list = list.slice(0, +c.dataset.limit);
            c.innerHTML = list.map((item, i) =>
                `<a href="/portfolio.html" class="masonry-item reveal" data-delay="${(i % 4) + 1}" style="margin:0;">
                    <div class="art">${artwork(item.kind, L(item.title))}</div>
                    <div class="ov"><span class="cat">${esc(item.category)}</span><h3>${esc(L(item.title))}</h3></div></a>`).join("");
        },
        process(c) {
            c.innerHTML = tlist("process.steps").map((step, i) =>
                `<div class="card process-step reveal" data-delay="${i + 1}">
                    <div class="num">${String(i + 1).padStart(2, "0")}</div>
                    <h3>${esc(step.title)}</h3><p>${esc(step.description)}</p></div>`).join("");
        },
        reviews(c) {
            const colors = ["var(--tomato)", "var(--forest)", "var(--blue)", "#9d174d", "#0e7490", "#7c3aed"];
            c.innerHTML = window.TESTIMONIALS.map((r, i) =>
                `<div class="card review-card">${stars(r.rating)}
                    <p class="quote">“${esc(L(r.quote))}”</p>
                    <div class="review-author"><span class="ava" style="background:${colors[i % colors.length]}">${esc(r.name[0])}</span>
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
                        <span class="eyebrow">${esc(L(s.tagline))}</span>
                        <h2 class="h2" style="margin:12px 0 14px;">${esc(L(s.name))}</h2>
                        <p class="muted">${esc(L(s.description))}</p>
                        <ul class="service-feats">${s.features.map((f) => `<li><span class="ico">${icon("check")}</span> ${esc(f)}</li>`).join("")}</ul>
                        <div class="flex gap-md wrap" style="margin-top:24px;align-items:center;">
                            <a href="/quote.html" class="btn btn-primary">${esc(t("common.getQuote"))} ${icon("arrow-right")}</a>
                            <span class="price" style="font-family:var(--font-display);font-weight:700;font-size:1.4rem;">${esc(t("common.from"))} ${esc(s.priceFrom)}</span>
                        </div></div></div>`).join("");
        },
        portfolio(c) {
            const cats = `<div class="filter-bar reveal" data-filter-bar>` + window.PORTFOLIO_CATEGORIES.map((cat, i) =>
                `<button class="chip${i === 0 ? " is-active" : ""}" type="button" data-filter="${esc(cat)}">${esc(cat)}</button>`).join("") + `</div>`;
            const grid = `<div class="masonry reveal" data-gallery>` + window.PORTFOLIO.map((item) =>
                `<div class="masonry-item" data-category="${esc(item.category)}" data-title="${esc(L(item.title))}">
                    <div class="art">${artwork(item.kind, L(item.title))}</div>
                    <div class="ov"><span class="cat">${esc(item.category)}</span><h3>${esc(L(item.title))}</h3></div></div>`).join("") + `</div>`;
            c.innerHTML = cats + grid;
        },
        pricing(c) {
            c.innerHTML = window.PRICING.map((p) =>
                `<div class="card price-card${p.featured ? " featured" : ""}">
                    ${p.featured ? `<span class="featured-badge">${esc(t("pricing.mostPopular"))}</span>` : ""}
                    <h3 class="h3">${esc(L(p.name))}</h3>
                    <div class="price-tag">${esc(p.price)}</div>
                    <p class="muted" style="margin-bottom:6px;">${esc(L(p.description))}</p>
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
                `<div class="card why-card reveal" data-delay="${i + 1}">
                    <div class="why-ico">${icon(icons[i % icons.length])}</div>
                    <h3 style="font-size:1.2rem;">${esc(v.title)}</h3><p class="muted">${esc(v.description)}</p></div>`).join("");
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
            if (!track || root.dataset.bound) return;
            root.dataset.bound = "1";
            let index = 0;
            const perView = () => (window.innerWidth >= 760 ? 2 : 1);
            const maxIndex = () => Math.max(0, track.children.length - perView());
            const update = () => {
                index = Math.min(index, maxIndex());
                const card = track.children[0];
                if (!card) return;
                const gap = parseFloat(getComputedStyle(track).gap) || 20;
                track.style.transition = "transform 0.5s cubic-bezier(0.2,0.7,0.2,1)";
                track.style.transform = `translateX(-${(card.offsetWidth + gap) * index}px)`;
            };
            root.querySelector("[data-prev]")?.addEventListener("click", () => { index = index <= 0 ? maxIndex() : index - 1; update(); });
            root.querySelector("[data-next]")?.addEventListener("click", () => { index = index >= maxIndex() ? 0 : index + 1; update(); });
            window.addEventListener("resize", update);
            update();
        });
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
        initHeaderScroll();
        initAccordion();
        initCarousel();
        initFilter();
        initLightbox();
        initMultiStep();
        initForms();
        initReveal();
        initCounters();
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
    function productCardHTML(p) {
        const price = p.variants[0].price;
        return `<a href="/product.html?slug=${esc(p.slug)}" class="card product-card reveal">
            <div class="prod-art">${artwork(p.kind || "card", L(p.name))}${p.badge ? `<span class="prod-badge">${esc(t("shop.badge." + p.badge))}</span>` : ""}</div>
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
                : `<p class="no-products">${esc(t("common.noProducts"))}</p>`;
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
            wrap.innerHTML = `<div class="section-inner" style="text-align:center;padding:80px 0;">
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

        function updatePriceDisplay() {
            const el = $("#priceAmount");
            if (el) el.textContent = "৳" + selectedVariant.price.toLocaleString();
            const sumVariant = $("#sumVariant");
            if (sumVariant) sumVariant.textContent = L(selectedVariant.label);
            const sumOption = $("#sumOption");
            if (sumOption) sumOption.textContent = getOptionLabel();
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
                `<button class="variant-pill${i === 0 ? " is-active" : ""}" type="button" data-variant-idx="${i}">${esc(L(v.label))}</button>`
            ).join("")}</div></div>`;

        const optionsHTML = p.options.map((opt) =>
            `<div class="option-group">
                <label>${esc(L(opt.label))}</label>
                <div class="option-pills">${opt.choices.map((ch, i) =>
                    `<button class="option-pill${i === 0 ? " is-active" : ""}" type="button" data-opt-id="${esc(opt.id)}" data-choice-id="${esc(ch.id)}">${esc(L(ch.label))}</button>`
                ).join("")}</div></div>`
        ).join("");

        wrap.innerHTML = `
        <div class="section-inner">
            <a href="/shop.html" class="eyebrow" style="text-decoration:none;margin-bottom:24px;display:inline-flex;align-items:center;gap:6px;">${icon("arrow-left")} <span>${esc(t("common.backToShop"))}</span></a>
            <div class="product-detail">
                <div class="prod-detail-art reveal">${artwork(p.kind || "card", L(p.name))}</div>
                <div class="prod-detail-body reveal" data-delay="1">
                    <span class="prod-cat-label">${esc(t("shop.cats." + p.category))}</span>
                    <h1>${esc(L(p.name))}</h1>
                    <p class="prod-tagline">${esc(L(p.tagline))}</p>
                    <p class="prod-desc">${esc(L(p.description))}</p>
                    <ul class="prod-feats">${p.features.map((f) =>
                        `<li><span class="ico">${icon("check")}</span>${esc(f)}</li>`).join("")}</ul>
                    ${variantHTML}
                    ${optionsHTML}
                    <div class="price-display">
                        <span class="amount" id="priceAmount">৳${p.variants[0].price.toLocaleString()}</span>
                        <div class="price-note">${esc(t("common.orderTotal"))}
                            <span class="delivery-note">${esc(t("common.delivery"))}: ${esc(L(p.delivery))}</span>
                        </div>
                    </div>
                    <a href="#orderForm" class="btn btn-primary">${esc(t("common.orderNow"))} ${icon("arrow-down")}</a>
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
                    <input type="text" name="_hp" style="display:none;" tabindex="-1" autocomplete="off">
                    <div class="field">
                        <label for="f-name">${esc(t("common.yourName"))} *</label>
                        <input id="f-name" type="text" name="name" required autocomplete="name">
                    </div>
                    <div class="field">
                        <label for="f-phone">${esc(t("common.yourPhone"))} *</label>
                        <input id="f-phone" type="tel" name="phone" required autocomplete="tel">
                    </div>
                    <div class="field" style="grid-column:1/-1;">
                        <label for="f-address">${esc(t("common.yourAddress"))} *</label>
                        <input id="f-address" type="text" name="address" required autocomplete="street-address">
                    </div>
                    <div class="field" style="grid-column:1/-1;">
                        <label for="f-notes">${esc(t("common.orderNotes"))}</label>
                        <textarea id="f-notes" name="notes" rows="3"></textarea>
                    </div>
                    <div style="grid-column:1/-1;">
                        <button type="submit" class="btn btn-primary">${esc(t("common.placeOrder"))} ${icon("arrow-right")}</button>
                        <p class="form-msg" aria-live="polite"></p>
                    </div>
                </form>
                <div class="success-panel" data-success style="display:none;text-align:center;padding:40px 0;">
                    <div data-icon="check-circle" style="color:var(--forest);margin-bottom:12px;"></div>
                    <h3>${esc(t("common.orderSuccess"))}</h3>
                    <a href="/shop.html" class="btn btn-primary" style="margin-top:20px;">${esc(t("common.backToShop"))}</a>
                </div>
            </div>
        </div>`;

        const sumTotal = $("#sumTotal");

        wrap.addEventListener("click", (e) => {
            const vp = e.target.closest(".variant-pill");
            if (vp) {
                const idx = +vp.dataset.variantIdx;
                selectedVariant = p.variants[idx];
                $$(".variant-pill", wrap).forEach((b) => b.classList.toggle("is-active", b === vp));
                if (sumTotal) sumTotal.textContent = "৳" + selectedVariant.price.toLocaleString();
                updatePriceDisplay();
            }
            const op = e.target.closest(".option-pill");
            if (op) {
                const optId = op.dataset.optId;
                selectedOptions[optId] = op.dataset.choiceId;
                $$(".option-pill[data-opt-id='" + optId + "']", wrap).forEach((b) => b.classList.toggle("is-active", b === op));
                updatePriceDisplay();
            }
        });

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
                el.innerHTML = await res.text();
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
