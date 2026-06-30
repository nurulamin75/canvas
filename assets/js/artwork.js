/* Canvas Print — inline SVG icons + generated print mockups. */
(function () {
    "use strict";

    const ICON_PATHS = {
        "arrow-right": '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
        "arrow-up-right": '<line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>',
        check: '<polyline points="20 6 9 17 4 12"/>',
        zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
        award: '<circle cx="12" cy="8" r="6"/><path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.11"/>',
        tag: '<path d="M20.59 13.41 12 22l-9-9V3h10l7.59 7.59a2 2 0 0 1 0 2.82z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
        "map-pin": '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
        sparkles: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/>',
        users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
        phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
        mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
        clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
        "message-circle": '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
        star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
        menu: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
        x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
        sun: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
        moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
        shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
        leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/>',
        heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
        palette: '<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
        whatsapp: '<path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4a7.94 7.94 0 0 0-6.9 11.9L4 20l4.2-1.1a7.93 7.93 0 0 0 3.8.97h.01A7.94 7.94 0 0 0 17.6 6.32zM12.05 18.5a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.5.65.67-2.43-.16-.25a6.59 6.59 0 1 1 5.59 3.09zm3.62-4.94c-.2-.1-1.17-.58-1.35-.64-.18-.07-.31-.1-.44.1-.13.2-.5.64-.62.77-.11.13-.23.15-.43.05a5.4 5.4 0 0 1-1.59-.98 6 6 0 0 1-1.1-1.37c-.11-.2-.01-.3.09-.4.09-.09.2-.23.3-.35.1-.12.13-.2.2-.34.06-.13.03-.25-.02-.35-.05-.1-.44-1.07-.6-1.46-.16-.38-.32-.33-.44-.34h-.38c-.13 0-.34.05-.52.25-.18.2-.68.67-.68 1.63s.7 1.89.8 2.02c.1.13 1.38 2.11 3.34 2.96.47.2.83.32 1.11.41.47.15.9.13 1.24.08.38-.06 1.17-.48 1.33-.94.16-.46.16-.85.11-.94-.04-.08-.17-.13-.37-.23z"/>'
    };
    const FILL_ICONS = ["star", "whatsapp", "palette"];

    function icon(name, cls) {
        cls = cls || "icon";
        const p = ICON_PATHS[name];
        if (!p) return "";
        const filled = FILL_ICONS.includes(name);
        const fill = filled ? "currentColor" : "none";
        const stroke = filled ? "none" : "currentColor";
        return '<svg class="' + cls + '" viewBox="0 0 24 24" width="24" height="24" fill="' + fill +
            '" stroke="' + stroke + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + "</svg>";
    }

    const WHY_ICONS = ["zap", "award", "tag", "map-pin", "sparkles", "users"];
    function whyIcon(i) { return WHY_ICONS[i % WHY_ICONS.length]; }

    function stars(count) {
        let out = '<span class="stars" aria-label="' + count + ' out of 5">';
        for (let i = 0; i < count; i++) out += icon("star", "star-icon");
        return out + "</span>";
    }

    const PALETTES = {
        card: ["#1A3A2E", "#D4F75A"], flyer: ["#EA5B3A", "#FFD9CE"], brochure: ["#2563EB", "#DCE6FF"],
        stationery: ["#1A3A2E", "#F0EAD6"], packaging: ["#B5651D", "#F3E0C7"], banner: ["#EA5B3A", "#1A3A2E"],
        sticker: ["#7C3AED", "#EDE0FF"], calendar: ["#0E7490", "#CFF5FA"], notebook: ["#1A3A2E", "#D4F75A"],
        idcard: ["#2563EB", "#F0EAD6"], menu: ["#9A3412", "#FFE6C7"], invitation: ["#9D174D", "#FBD5E4"],
        certificate: ["#1A3A2E", "#F0EAD6"], poster: ["#EA5B3A", "#D4F75A"]
    };

    function hash(str) {
        let h = 0;
        for (let i = 0; i < str.length; i++) { h = (h << 5) - h + str.charCodeAt(i); h |= 0; }
        return Math.abs(h).toString(36).slice(0, 6);
    }

    function shapeFor(kind, ink, accent) {
        switch (kind) {
            case "card":
            case "idcard":
                return '<rect x="70" y="120" width="260" height="160" rx="16" fill="#fff"/>' +
                    '<rect x="92" y="146" width="70" height="70" rx="14" fill="' + accent + '"/>' +
                    '<rect x="180" y="156" width="120" height="14" rx="7" fill="' + ink + '"/>' +
                    '<rect x="180" y="184" width="90" height="10" rx="5" fill="' + ink + '" opacity="0.4"/>' +
                    '<rect x="92" y="238" width="208" height="10" rx="5" fill="' + ink + '" opacity="0.25"/>';
            case "flyer":
            case "poster":
                return '<rect x="120" y="70" width="160" height="220" rx="14" fill="#fff"/>' +
                    '<circle cx="200" cy="135" r="42" fill="' + accent + '"/>' +
                    '<rect x="150" y="196" width="100" height="14" rx="7" fill="' + ink + '"/>' +
                    '<rect x="160" y="222" width="80" height="10" rx="5" fill="' + ink + '" opacity="0.45"/>' +
                    '<rect x="150" y="252" width="100" height="20" rx="10" fill="' + accent + '"/>';
            case "brochure":
                return '<rect x="70" y="100" width="86" height="200" rx="12" fill="#fff"/>' +
                    '<rect x="160" y="100" width="86" height="200" rx="12" fill="#fff"/>' +
                    '<rect x="250" y="100" width="86" height="200" rx="12" fill="#fff"/>' +
                    '<rect x="84" y="124" width="58" height="40" rx="8" fill="' + accent + '"/>' +
                    '<rect x="174" y="124" width="58" height="40" rx="8" fill="' + ink + '" opacity="0.15"/>' +
                    '<rect x="264" y="124" width="58" height="40" rx="8" fill="' + accent + '" opacity="0.5"/>';
            case "packaging":
                return '<path d="M200 80 320 130 320 250 200 300 80 250 80 130Z" fill="#fff"/>' +
                    '<path d="M200 80 320 130 200 180 80 130Z" fill="' + accent + '"/>' +
                    '<path d="M200 180 200 300 80 250 80 130Z" fill="' + ink + '" opacity="0.12"/>' +
                    '<rect x="150" y="208" width="100" height="16" rx="8" fill="' + ink + '" opacity="0.5"/>';
            case "banner":
                return '<rect x="178" y="60" width="44" height="240" rx="8" fill="' + ink + '"/>' +
                    '<rect x="96" y="80" width="208" height="150" rx="12" fill="#fff"/>' +
                    '<rect x="118" y="104" width="120" height="16" rx="8" fill="' + accent + '"/>' +
                    '<rect x="118" y="134" width="164" height="12" rx="6" fill="' + ink + '" opacity="0.4"/>' +
                    '<rect x="118" y="160" width="140" height="12" rx="6" fill="' + ink + '" opacity="0.25"/>';
            case "sticker":
                return '<circle cx="150" cy="150" r="62" fill="#fff"/>' +
                    '<circle cx="150" cy="150" r="42" fill="' + accent + '"/>' +
                    '<rect x="210" y="180" width="110" height="110" rx="24" fill="#fff"/>' +
                    '<rect x="232" y="206" width="66" height="58" rx="14" fill="' + ink + '" opacity="0.2"/>';
            case "calendar":
                return '<rect x="96" y="96" width="208" height="180" rx="14" fill="#fff"/>' +
                    '<rect x="96" y="96" width="208" height="44" rx="14" fill="' + ink + '"/>' +
                    '<rect x="120" y="160" width="36" height="28" rx="6" fill="' + accent + '"/>' +
                    '<rect x="170" y="160" width="36" height="28" rx="6" fill="' + ink + '" opacity="0.12"/>' +
                    '<rect x="220" y="160" width="36" height="28" rx="6" fill="' + ink + '" opacity="0.12"/>' +
                    '<rect x="120" y="204" width="36" height="28" rx="6" fill="' + ink + '" opacity="0.12"/>' +
                    '<rect x="170" y="204" width="36" height="28" rx="6" fill="' + accent + '" opacity="0.6"/>' +
                    '<rect x="220" y="204" width="36" height="28" rx="6" fill="' + ink + '" opacity="0.12"/>';
            case "notebook":
                return '<rect x="120" y="80" width="160" height="220" rx="14" fill="' + ink + '"/>' +
                    '<rect x="138" y="80" width="14" height="220" fill="' + accent + '"/>' +
                    '<rect x="176" y="150" width="80" height="12" rx="6" fill="' + accent + '"/>' +
                    '<rect x="176" y="176" width="60" height="10" rx="5" fill="#fff" opacity="0.5"/>';
            case "menu":
                return '<rect x="120" y="80" width="160" height="220" rx="10" fill="#fff"/>' +
                    '<rect x="142" y="104" width="116" height="20" rx="6" fill="' + accent + '"/>' +
                    '<rect x="142" y="148" width="116" height="10" rx="5" fill="' + ink + '" opacity="0.4"/>' +
                    '<rect x="142" y="170" width="116" height="10" rx="5" fill="' + ink + '" opacity="0.4"/>' +
                    '<rect x="142" y="192" width="80" height="10" rx="5" fill="' + ink + '" opacity="0.4"/>' +
                    '<rect x="142" y="232" width="116" height="10" rx="5" fill="' + ink + '" opacity="0.4"/>';
            case "invitation":
                return '<rect x="118" y="96" width="164" height="208" rx="12" fill="#fff"/>' +
                    '<rect x="118" y="96" width="164" height="64" rx="12" fill="' + ink + '"/>' +
                    '<path d="M200 120l8 16 18 2-13 12 3 18-16-9-16 9 3-18-13-12 18-2Z" fill="' + accent + '"/>' +
                    '<rect x="150" y="196" width="100" height="12" rx="6" fill="' + ink + '" opacity="0.4"/>' +
                    '<rect x="160" y="222" width="80" height="10" rx="5" fill="' + ink + '" opacity="0.25"/>';
            case "certificate":
                return '<rect x="80" y="110" width="240" height="170" rx="12" fill="#fff"/>' +
                    '<rect x="96" y="126" width="208" height="138" rx="6" fill="none" stroke="' + ink + '" stroke-width="3" opacity="0.4"/>' +
                    '<rect x="140" y="156" width="120" height="12" rx="6" fill="' + ink + '" opacity="0.5"/>' +
                    '<rect x="160" y="182" width="80" height="10" rx="5" fill="' + ink + '" opacity="0.3"/>' +
                    '<circle cx="200" cy="226" r="22" fill="' + accent + '"/>';
            default:
                return '<rect x="96" y="90" width="150" height="200" rx="12" fill="#fff"/>' +
                    '<rect x="120" y="120" width="100" height="12" rx="6" fill="' + accent + '"/>' +
                    '<rect x="120" y="146" width="80" height="10" rx="5" fill="' + ink + '" opacity="0.35"/>' +
                    '<rect x="210" y="200" width="120" height="80" rx="12" fill="' + ink + '"/>' +
                    '<rect x="228" y="222" width="70" height="10" rx="5" fill="' + accent + '"/>';
        }
    }

    function artwork(kind, title, cls) {
        cls = cls || "artwork";
        title = title || kind;
        const pal = PALETTES[kind] || ["#1A3A2E", "#D4F75A"];
        const ink = pal[0], accent = pal[1];
        const id = kind + "-" + hash(kind + title);
        return '<svg class="' + cls + '" viewBox="0 0 400 360" role="img" aria-label="' + title +
            '" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">' +
            '<defs><linearGradient id="bg-' + id + '" x1="0" y1="0" x2="1" y2="1">' +
            '<stop offset="0" stop-color="' + accent + '"/>' +
            '<stop offset="1" stop-color="' + accent + '" stop-opacity="0.55"/></linearGradient></defs>' +
            '<rect width="400" height="360" rx="28" fill="url(#bg-' + id + ')"/>' +
            shapeFor(kind, ink, accent) + "</svg>";
    }

    window.art = { icon, artwork, stars, whyIcon };
})();
