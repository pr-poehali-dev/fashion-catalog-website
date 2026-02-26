import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

// ─── DATA ────────────────────────────────────────────────────────────────────

const HERO_SLIDES = [
  {
    id: 1,
    title: "Новая коллекция",
    subtitle: "Весна — Лето 2026",
    desc: "Изысканные силуэты из натуральных тканей для тех, кто ценит стиль",
    cta: "Смотреть женское",
    category: "women",
    bg: "linear-gradient(135deg, #0d4a2e 0%, #1a6b42 50%, #0f3d25 100%)",
    accent: "#c9a227",
    img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80",
  },
  {
    id: 2,
    title: "Мужской стиль",
    subtitle: "Коллекция Essentials",
    desc: "Лаконичные формы, премиальные материалы — одежда для уверенных",
    cta: "Смотреть мужское",
    category: "men",
    bg: "linear-gradient(135deg, #1a2a1e 0%, #243d2a 50%, #162218 100%)",
    accent: "#c9a227",
    img: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=1200&q=80",
  },
  {
    id: 3,
    title: "Детская мода",
    subtitle: "Яркие образы для маленьких",
    desc: "Комфорт и стиль для активных детей — от 2 до 14 лет",
    cta: "Смотреть детское",
    category: "kids",
    bg: "linear-gradient(135deg, #0d4a2e 0%, #2a5e3a 60%, #1a4a2c 100%)",
    accent: "#86c67c",
    img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=1200&q=80",
  },
];

const PRODUCTS = [
  { id: 1, name: "Пальто Silk Forest", price: 18900, oldPrice: 23500, category: "women", subcategory: "clothing", size: ["XS","S","M","L"], color: "Изумрудный", material: "Шерсть", season: "Осень/Зима", tag: "sale", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80" },
  { id: 2, name: "Платье Emerald Eve", price: 12400, oldPrice: null, category: "women", subcategory: "clothing", size: ["XS","S","M","L","XL"], color: "Тёмно-зелёный", material: "Шёлк", season: "Весна/Лето", tag: "new", img: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&q=80" },
  { id: 3, name: "Туфли Velvet Step", price: 8700, oldPrice: null, category: "women", subcategory: "shoes", size: ["36","37","38","39","40"], color: "Чёрный", material: "Замша", season: "Всесезон", tag: null, img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80" },
  { id: 4, name: "Жакет Botanic", price: 14200, oldPrice: 17000, category: "women", subcategory: "clothing", size: ["S","M","L"], color: "Хаки", material: "Лён", season: "Весна/Лето", tag: "sale", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80" },
  { id: 5, name: "Сапоги Mossland", price: 16500, oldPrice: null, category: "women", subcategory: "shoes", size: ["36","37","38","39"], color: "Изумрудный", material: "Кожа", season: "Осень/Зима", tag: "new", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80" },
  { id: 6, name: "Юбка Terra", price: 7800, oldPrice: null, category: "women", subcategory: "clothing", size: ["XS","S","M","L","XL"], color: "Бежевый", material: "Хлопок", season: "Весна/Лето", tag: null, img: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80" },
  { id: 7, name: "Пальто Forest Lord", price: 22400, oldPrice: null, category: "men", subcategory: "clothing", size: ["S","M","L","XL","XXL"], color: "Тёмно-зелёный", material: "Шерсть", season: "Осень/Зима", tag: "new", img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&q=80" },
  { id: 8, name: "Костюм Sage Classic", price: 31000, oldPrice: 36000, category: "men", subcategory: "clothing", size: ["M","L","XL"], color: "Оливковый", material: "Шерсть", season: "Всесезон", tag: "sale", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" },
  { id: 9, name: "Ботинки Terrain", price: 11200, oldPrice: null, category: "men", subcategory: "shoes", size: ["40","41","42","43","44","45"], color: "Коричневый", material: "Кожа", season: "Осень/Зима", tag: null, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" },
  { id: 10, name: "Свитер Moss", price: 6900, oldPrice: null, category: "men", subcategory: "clothing", size: ["S","M","L","XL"], color: "Хаки", material: "Шерсть", season: "Осень/Зима", tag: null, img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80" },
  { id: 11, name: "Кроссовки Trail", price: 9800, oldPrice: null, category: "men", subcategory: "shoes", size: ["40","41","42","43","44"], color: "Белый", material: "Текстиль", season: "Весна/Лето", tag: "new", img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80" },
  { id: 12, name: "Рубашка Canopy", price: 5400, oldPrice: 6800, category: "men", subcategory: "clothing", size: ["S","M","L","XL"], color: "Оливковый", material: "Лён", season: "Весна/Лето", tag: "sale", img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80" },
  { id: 13, name: "Куртка Sprout", price: 7200, oldPrice: null, category: "kids", subcategory: "clothing", size: ["104","110","116","122","128"], color: "Салатовый", material: "Синтетика", season: "Весна/Лето", tag: "new", img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=80" },
  { id: 14, name: "Кроссовки Bounce", price: 4200, oldPrice: 5100, category: "kids", subcategory: "shoes", size: ["28","29","30","31","32","33"], color: "Зелёный", material: "Текстиль", season: "Весна/Лето", tag: "sale", img: "https://images.unsplash.com/photo-1555487505-8603a1a69755?w=600&q=80" },
  { id: 15, name: "Платье Petal", price: 3800, oldPrice: null, category: "kids", subcategory: "clothing", size: ["104","110","116","122"], color: "Белый", material: "Хлопок", season: "Весна/Лето", tag: null, img: "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&q=80" },
  { id: 16, name: "Джинсы Junior", price: 4600, oldPrice: null, category: "kids", subcategory: "clothing", size: ["110","116","122","128","134"], color: "Синий", material: "Хлопок", season: "Всесезон", tag: null, img: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&q=80" },
];

const BLOG_POSTS = [
  { id: 1, title: "Изумрудный — цвет сезона", date: "14 февраля 2026", category: "Тренды", img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80", excerpt: "Как носить насыщенные оттенки зелёного и не выглядеть как ёлка — наш гид по трендовому цвету." },
  { id: 2, title: "Капсульный гардероб: с чего начать", date: "5 февраля 2026", category: "Стиль", img: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80", excerpt: "10 базовых вещей, которые сделают ваш гардероб функциональным и стильным круглый год." },
  { id: 3, title: "Детская мода 2026: комфорт прежде всего", date: "28 января 2026", category: "Детское", img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=80", excerpt: "Что выбрать для активного ребёнка: советы стилиста и педиатра об одежде для детей." },
];

type IconName = "Package" | "Truck" | "RotateCcw" | "Shield" | "MapPin" | "Phone" | "Mail" | "Instagram" | "CreditCard" | "Smartphone" | "Wallet" | "Leaf" | "Award" | "Heart" | "SlidersHorizontal" | "X" | "PackageX" | "ShoppingBag" | "Trash2" | "ArrowRight" | "ArrowDown" | "CheckCircle" | "Search" | "Menu" | "Send" | "Youtube";

const DELIVERY_INFO: { icon: IconName; title: string; desc: string }[] = [
  { icon: "Package", title: "Бесплатная доставка", desc: "При заказе от 5 000 ₽ по всей России" },
  { icon: "Truck", title: "Курьером до двери", desc: "1–3 дня в Москве, 2–7 дней по России" },
  { icon: "RotateCcw", title: "Возврат 30 дней", desc: "Без лишних вопросов, если не подошло" },
  { icon: "Shield", title: "Гарантия качества", desc: "Только сертифицированные производители" },
];

const BRANDS = ["MASSIMO", "ARIDA", "LINUM", "VERDE", "FORESTA", "ECOLIN", "NATURÉ", "SOFFT"];

type Product = typeof PRODUCTS[0];
type Page = "home" | "catalog" | "cart" | "blog" | "delivery" | "contacts" | "about";

const fmt = (n: number) => n.toLocaleString("ru-RU") + " ₽";

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────

function ProductCard({ p, onAdd }: { p: Product; onAdd: (p: Product) => void }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="card-hover bg-white rounded-2xl overflow-hidden group cursor-pointer">
      <div className="product-img-wrap relative" style={{ aspectRatio: "3/4" }}>
        <img src={p.img} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
        <div className="gradient-card absolute inset-0" />
        <div className="absolute top-3 left-3 flex gap-1">
          {p.tag === "new" && <span className="tag-new">NEW</span>}
          {p.tag === "sale" && <span className="tag-sale">SALE</span>}
        </div>
        <button
          className="wishlist-btn absolute top-3 right-3"
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
        >
          <Icon name="Heart" size={16} className={liked ? "fill-red-500 text-red-500" : "text-gray-500"} />
        </button>
        <button
          className="absolute bottom-3 left-3 right-3 btn-emerald text-sm font-body font-semibold py-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
          onClick={() => onAdd(p)}
        >
          В корзину
        </button>
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-400 font-body mb-1">{p.color} · {p.material}</p>
        <h3 className="font-display text-lg font-semibold leading-tight mb-2">{p.name}</h3>
        <div className="flex items-center gap-2">
          <span className="font-body font-bold emerald-text text-base">{fmt(p.price)}</span>
          {p.oldPrice && <span className="font-body text-sm text-gray-400 line-through">{fmt(p.oldPrice)}</span>}
        </div>
        <div className="flex gap-1 mt-2 flex-wrap">
          {p.size.slice(0, 4).map(s => (
            <span key={s} className="text-xs border border-gray-200 rounded px-1.5 py-0.5 font-body text-gray-500">{s}</span>
          ))}
          {p.size.length > 4 && <span className="text-xs text-gray-400 font-body">+{p.size.length - 4}</span>}
        </div>
      </div>
    </div>
  );
}

// ─── FILTER PANEL ─────────────────────────────────────────────────────────────

function FilterPanel({ activeCategory, setActiveCategory, activeSizes, toggleSize, activeColors, toggleColor, activeMaterials, toggleMaterial, activeSeasons, toggleSeason, priceRange, setPriceRange, onReset }: {
  activeCategory: string;
  setActiveCategory: (c: string) => void;
  activeSizes: string[];
  toggleSize: (s: string) => void;
  activeColors: string[];
  toggleColor: (c: string) => void;
  activeMaterials: string[];
  toggleMaterial: (m: string) => void;
  activeSeasons: string[];
  toggleSeason: (s: string) => void;
  priceRange: number[];
  setPriceRange: (r: number[]) => void;
  onReset: () => void;
}) {
  const categories = [
    { key: "all", label: "Все товары" },
    { key: "women", label: "Женское" },
    { key: "men", label: "Мужское" },
    { key: "kids", label: "Детское" },
  ];
  const allSizes = ["XS","S","M","L","XL","XXL","36","37","38","39","40","41","42","43","44","45","104","110","116","122","128","134"];
  const allColors = ["Изумрудный","Тёмно-зелёный","Хаки","Оливковый","Салатовый","Чёрный","Белый","Бежевый","Коричневый","Синий","Зелёный"];
  const allMaterials = ["Шерсть","Шёлк","Лён","Хлопок","Кожа","Замша","Текстиль","Синтетика"];
  const allSeasons = ["Весна/Лето","Осень/Зима","Всесезон"];

  return (
    <div className="sidebar-filter space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-semibold">Фильтры</h3>
        <button onClick={onReset} className="text-xs font-body text-gray-400 hover:text-red-400 transition-colors underline">Сбросить</button>
      </div>

      <div>
        <p className="font-body text-xs uppercase tracking-widest text-gray-400 mb-3">Категория</p>
        <div className="flex flex-col gap-1">
          {categories.map(c => (
            <button key={c.key} onClick={() => setActiveCategory(c.key)}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-body transition-all ${activeCategory === c.key ? "bg-emerald-custom text-white" : "hover:bg-gray-100 text-gray-700"}`}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="font-body text-xs uppercase tracking-widest text-gray-400 mb-3">Цена</p>
        <input type="range" min={1000} max={40000} step={500}
          value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], +e.target.value])}
          className="price-slider w-full mb-2" />
        <div className="flex justify-between text-sm font-body text-gray-600">
          <span>{fmt(priceRange[0])}</span><span>{fmt(priceRange[1])}</span>
        </div>
      </div>

      <div>
        <p className="font-body text-xs uppercase tracking-widest text-gray-400 mb-3">Сезон</p>
        <div className="flex flex-wrap gap-1.5">
          {allSeasons.map(s => (
            <button key={s} onClick={() => toggleSeason(s)}
              className={`filter-chip ${activeSeasons.includes(s) ? "active" : ""}`}>{s}</button>
          ))}
        </div>
      </div>

      <div>
        <p className="font-body text-xs uppercase tracking-widest text-gray-400 mb-3">Цвет</p>
        <div className="flex flex-wrap gap-1.5">
          {allColors.map(c => (
            <button key={c} onClick={() => toggleColor(c)}
              className={`filter-chip ${activeColors.includes(c) ? "active" : ""}`}>{c}</button>
          ))}
        </div>
      </div>

      <div>
        <p className="font-body text-xs uppercase tracking-widest text-gray-400 mb-3">Материал</p>
        <div className="flex flex-wrap gap-1.5">
          {allMaterials.map(m => (
            <button key={m} onClick={() => toggleMaterial(m)}
              className={`filter-chip ${activeMaterials.includes(m) ? "active" : ""}`}>{m}</button>
          ))}
        </div>
      </div>

      <div>
        <p className="font-body text-xs uppercase tracking-widest text-gray-400 mb-3">Размер</p>
        <div className="flex flex-wrap gap-1.5">
          {allSizes.map(s => (
            <button key={s} onClick={() => toggleSize(s)}
              className={`w-10 h-10 text-xs border rounded-lg font-body transition-all ${activeSizes.includes(s) ? "bg-emerald-custom text-white border-transparent" : "border-gray-200 hover:border-emerald-custom text-gray-600"}`}>{s}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [heroIdx, setHeroIdx] = useState(0);
  const [cart, setCart] = useState<Product[]>([]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileFilters, setMobileFilters] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSizes, setActiveSizes] = useState<string[]>([]);
  const [activeColors, setActiveColors] = useState<string[]>([]);
  const [activeMaterials, setActiveMaterials] = useState<string[]>([]);
  const [activeSeasons, setActiveSeasons] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([1000, 40000]);

  useEffect(() => {
    const t = setInterval(() => setHeroIdx(i => (i + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const toggleSize = (s: string) => setActiveSizes(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);
  const toggleColor = (c: string) => setActiveColors(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c]);
  const toggleMaterial = (m: string) => setActiveMaterials(p => p.includes(m) ? p.filter(x => x !== m) : [...p, m]);
  const toggleSeason = (s: string) => setActiveSeasons(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);
  const resetFilters = () => { setActiveCategory("all"); setActiveSizes([]); setActiveColors([]); setActiveMaterials([]); setActiveSeasons([]); setPriceRange([1000, 40000]); };

  const addToCart = (p: Product) => {
    setCart(prev => [...prev, p]);
    setNotification(`«${p.name}» добавлен в корзину`);
    setTimeout(() => setNotification(null), 3000);
  };

  const removeFromCart = (idx: number) => setCart(prev => prev.filter((_, i) => i !== idx));

  const filteredProducts = PRODUCTS.filter(p => {
    if (activeCategory !== "all" && p.category !== activeCategory) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    if (activeSizes.length && !activeSizes.some(s => p.size.includes(s))) return false;
    if (activeColors.length && !activeColors.includes(p.color)) return false;
    if (activeMaterials.length && !activeMaterials.includes(p.material)) return false;
    if (activeSeasons.length && !activeSeasons.includes(p.season)) return false;
    return true;
  });

  const goTo = (p: Page) => { setPage(p); setMobileMenu(false); window.scrollTo(0, 0); };
  const gotoCatalog = (cat: string) => { setActiveCategory(cat); setPage("catalog"); window.scrollTo(0, 0); };
  const totalCart = cart.reduce((s, p) => s + p.price, 0);

  const NAV: { key: Page; label: string }[] = [
    { key: "home", label: "Главная" },
    { key: "catalog", label: "Каталог" },
    { key: "blog", label: "Блог" },
    { key: "delivery", label: "Доставка" },
    { key: "contacts", label: "Контакты" },
    { key: "about", label: "О нас" },
  ];

  // ─── HOME ─────────────────────────────────────────────────────────────────

  const renderHome = () => (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ height: "90vh", minHeight: 560 }}>
        {HERO_SLIDES.map((slide, i) => (
          <div key={slide.id} className="hero-slide" style={{ opacity: i === heroIdx ? 1 : 0 }}>
            <div className="absolute inset-0" style={{ background: slide.bg }} />
            <img src={slide.img} alt={slide.title} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-6 max-w-3xl" style={{ opacity: i === heroIdx ? 1 : 0, transition: "opacity 1s ease 0.3s" }}>
                <p className="font-body text-xs uppercase tracking-widest mb-5" style={{ color: slide.accent, letterSpacing: "0.25em" }}>{slide.subtitle}</p>
                <h1 className="font-display font-light leading-none mb-6" style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}>{slide.title}</h1>
                <p className="font-body text-lg mb-10 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>{slide.desc}</p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <button onClick={() => gotoCatalog(slide.category)} className="btn-gold font-body font-semibold px-10 py-4 rounded-full text-sm uppercase tracking-widest">{slide.cta}</button>
                  <button onClick={() => gotoCatalog("all")} className="font-body font-semibold px-10 py-4 rounded-full text-sm uppercase tracking-widest transition-all" style={{ border: "1.5px solid rgba(255,255,255,0.4)", color: "white" }}
                    onMouseEnter={e => { (e.target as HTMLElement).style.background = "white"; (e.target as HTMLElement).style.color = "#0d4a2e"; }}
                    onMouseLeave={e => { (e.target as HTMLElement).style.background = "transparent"; (e.target as HTMLElement).style.color = "white"; }}>
                    Весь каталог
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setHeroIdx(i)}
              className="rounded-full transition-all duration-300"
              style={{ background: i === heroIdx ? "#c9a227" : "rgba(255,255,255,0.4)", width: i === heroIdx ? 32 : 8, height: 8 }} />
          ))}
        </div>
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-1" style={{ color: "rgba(255,255,255,0.4)" }}>
          <span className="font-body text-xs tracking-widest" style={{ writingMode: "vertical-rl" }}>SCROLL</span>
          <Icon name="ArrowDown" size={14} />
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-emerald-custom py-3 overflow-hidden">
        <div className="animate-marquee flex gap-12 whitespace-nowrap">
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <span key={i} className="font-display text-sm tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.75)" }}>{b}</span>
          ))}
        </div>
      </div>

      {/* Categories */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="section-line mb-3">
          <p className="font-body text-xs uppercase tracking-widest gold-accent" style={{ letterSpacing: "0.2em" }}>Коллекции</p>
        </div>
        <h2 className="font-display font-light mb-16" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>Выберите свой стиль</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { key: "women", label: "Женское", sub: "Пальто, платья, обувь", img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80", count: "84 товара" },
            { key: "men", label: "Мужское", sub: "Костюмы, пальто, обувь", img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800&q=80", count: "62 товара" },
            { key: "kids", label: "Детское", sub: "От 2 до 14 лет", img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80", count: "48 товаров" },
          ].map((cat, i) => (
            <button key={cat.key} onClick={() => gotoCatalog(cat.key)}
              className={`relative overflow-hidden rounded-3xl card-hover group cursor-pointer ${i === 1 ? "md:mt-8" : ""}`}>
              <div className="relative" style={{ aspectRatio: "2/3" }}>
                <img src={cat.img} alt={cat.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="gradient-card absolute inset-0" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-left text-white">
                  <p className="font-body text-xs uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.55)" }}>{cat.count}</p>
                  <h3 className="font-display font-light mb-1" style={{ fontSize: "2.2rem" }}>{cat.label}</h3>
                  <p className="font-body text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{cat.sub}</p>
                  <div className="mt-4 flex items-center gap-2 font-body text-sm" style={{ color: "#c9a227" }}>
                    <span>Смотреть</span><Icon name="ArrowRight" size={14} />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="py-20 px-6" style={{ background: "hsl(48,30%,96%)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="section-line mb-3">
                <p className="font-body text-xs uppercase gold-accent" style={{ letterSpacing: "0.2em" }}>Топ выбор</p>
              </div>
              <h2 className="font-display font-light" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>Новинки и хиты</h2>
            </div>
            <button onClick={() => gotoCatalog("all")} className="hidden md:flex items-center gap-2 btn-outline-em px-6 py-3 rounded-full text-sm font-body font-medium">
              Весь каталог <Icon name="ArrowRight" size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {PRODUCTS.filter(p => p.tag).slice(0, 8).map(p => (
              <ProductCard key={p.id} p={p} onAdd={addToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* Delivery strip */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {DELIVERY_INFO.map((d, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-emerald-pale hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-emerald-custom rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon name={d.icon} size={22} className="text-white" />
              </div>
              <h4 className="font-display text-lg font-semibold mb-1">{d.title}</h4>
              <p className="font-body text-sm text-gray-500">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Blog teaser */}
      <section className="py-20 px-6" style={{ background: "#f8f8f6" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="section-line mb-3">
                <p className="font-body text-xs uppercase gold-accent" style={{ letterSpacing: "0.2em" }}>Наш журнал</p>
              </div>
              <h2 className="font-display font-light" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>Советы и тренды</h2>
            </div>
            <button onClick={() => goTo("blog")} className="hidden md:flex items-center gap-2 btn-outline-em px-6 py-3 rounded-full text-sm font-body font-medium">
              Все статьи <Icon name="ArrowRight" size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.map(post => (
              <div key={post.id} className="blog-card bg-white rounded-2xl overflow-hidden card-hover cursor-pointer">
                <div className="overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover blog-img" />
                </div>
                <div className="p-6">
                  <span className="font-body text-xs uppercase tracking-widest emerald-text font-semibold">{post.category}</span>
                  <h3 className="font-display text-xl font-semibold mt-2 mb-2">{post.title}</h3>
                  <p className="font-body text-sm text-gray-500 mb-4">{post.excerpt}</p>
                  <p className="font-body text-xs text-gray-400">{post.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-hero py-24 px-6 text-center text-white">
        <p className="font-body text-xs uppercase mb-4" style={{ letterSpacing: "0.3em", color: "#c9a227" }}>Специальное предложение</p>
        <h2 className="font-display font-light mb-6" style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}>Скидка 15% на первый заказ</h2>
        <p className="font-body text-lg mb-10" style={{ color: "rgba(255,255,255,0.7)" }}>Введите промокод <strong style={{ color: "#c9a227" }}>VERDURE15</strong> при оформлении</p>
        <button onClick={() => gotoCatalog("all")} className="btn-gold font-body font-semibold px-12 py-4 rounded-full text-sm uppercase tracking-widest">Начать покупки</button>
      </section>
    </div>
  );

  // ─── CATALOG ──────────────────────────────────────────────────────────────

  const renderCatalog = () => (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="section-line mb-2">
        <p className="font-body text-xs uppercase gold-accent" style={{ letterSpacing: "0.2em" }}>Наши товары</p>
      </div>
      <div className="flex items-start justify-between mb-10">
        <h1 className="font-display font-light" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
          {activeCategory === "all" && "Все товары"}
          {activeCategory === "women" && "Женская коллекция"}
          {activeCategory === "men" && "Мужская коллекция"}
          {activeCategory === "kids" && "Детская коллекция"}
        </h1>
        <div className="flex items-center gap-3 mt-3">
          <span className="font-body text-sm text-gray-400">{filteredProducts.length} товаров</span>
          <button onClick={() => setMobileFilters(true)} className="md:hidden flex items-center gap-2 btn-outline-em px-4 py-2 rounded-full text-sm font-body">
            <Icon name="SlidersHorizontal" size={14} /> Фильтры
          </button>
        </div>
      </div>
      <div className="flex gap-8">
        <div className="hidden md:block w-64 flex-shrink-0">
          <FilterPanel {...{ activeCategory, setActiveCategory, activeSizes, toggleSize, activeColors, toggleColor, activeMaterials, toggleMaterial, activeSeasons, toggleSeason, priceRange, setPriceRange, onReset: resetFilters }} />
        </div>
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-24">
              <Icon name="PackageX" size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="font-display text-2xl text-gray-400">Товары не найдены</p>
              <button onClick={resetFilters} className="mt-4 btn-emerald px-6 py-2.5 rounded-full text-sm font-body">Сбросить фильтры</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map(p => <ProductCard key={p.id} p={p} onAdd={addToCart} />)}
            </div>
          )}
        </div>
      </div>

      {mobileFilters && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFilters(false)} />
          <div className="relative ml-auto w-80 bg-white h-full overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-2xl">Фильтры</h3>
              <button onClick={() => setMobileFilters(false)}><Icon name="X" size={20} /></button>
            </div>
            <FilterPanel {...{ activeCategory, setActiveCategory, activeSizes, toggleSize, activeColors, toggleColor, activeMaterials, toggleMaterial, activeSeasons, toggleSeason, priceRange, setPriceRange, onReset: resetFilters }} />
            <button onClick={() => setMobileFilters(false)} className="mt-6 w-full btn-emerald py-3 rounded-xl font-body font-semibold">
              Показать {filteredProducts.length} товаров
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // ─── CART ─────────────────────────────────────────────────────────────────

  const renderCart = () => (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="section-line mb-3">
        <p className="font-body text-xs uppercase gold-accent" style={{ letterSpacing: "0.2em" }}>Мои покупки</p>
      </div>
      <h1 className="font-display font-light mb-12" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
        Корзина {cart.length > 0 && <span className="text-gray-400" style={{ fontSize: "2rem" }}>({cart.length})</span>}
      </h1>
      {cart.length === 0 ? (
        <div className="text-center py-24">
          <Icon name="ShoppingBag" size={64} className="mx-auto text-gray-200 mb-6" />
          <p className="font-display text-3xl text-gray-400 mb-4">Корзина пуста</p>
          <p className="font-body text-gray-400 mb-8">Добавьте товары из каталога</p>
          <button onClick={() => goTo("catalog")} className="btn-emerald px-10 py-4 rounded-full font-body font-semibold">Перейти в каталог</button>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item, idx) => (
            <div key={idx} className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm items-center">
              <img src={item.img} alt={item.name} className="w-20 h-24 object-cover rounded-xl" />
              <div className="flex-1">
                <h3 className="font-display text-xl font-semibold">{item.name}</h3>
                <p className="font-body text-sm text-gray-400">{item.color} · {item.material} · {item.season}</p>
                <p className="font-body font-bold emerald-text mt-1">{fmt(item.price)}</p>
              </div>
              <button onClick={() => removeFromCart(idx)}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-colors">
                <Icon name="Trash2" size={14} className="text-gray-400" />
              </button>
            </div>
          ))}
          <div className="bg-emerald-pale rounded-2xl p-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="font-body text-gray-600">Итого:</span>
              <span className="font-display text-3xl font-semibold">{fmt(totalCart)}</span>
            </div>
            <div className="flex justify-between items-center mb-6 text-sm font-body text-gray-500">
              <span>Доставка:</span>
              <span className="emerald-text font-semibold">{totalCart >= 5000 ? "Бесплатно" : fmt(390)}</span>
            </div>
            <button className="w-full btn-emerald py-4 rounded-xl font-body font-semibold text-base">Оформить заказ</button>
            <p className="text-center font-body text-xs text-gray-400 mt-3">Нажимая кнопку, вы соглашаетесь с условиями</p>
          </div>
        </div>
      )}
    </div>
  );

  // ─── BLOG ─────────────────────────────────────────────────────────────────

  const renderBlog = () => (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="section-line mb-3">
        <p className="font-body text-xs uppercase gold-accent" style={{ letterSpacing: "0.2em" }}>Журнал VERDURE</p>
      </div>
      <h1 className="font-display font-light mb-16" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>Советы и тренды</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_POSTS.map(post => (
          <div key={post.id} className="blog-card bg-white rounded-3xl overflow-hidden card-hover cursor-pointer">
            <div className="overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <img src={post.img} alt={post.title} className="w-full h-full object-cover blog-img" />
            </div>
            <div className="p-7">
              <span className="font-body text-xs uppercase tracking-widest emerald-text font-semibold">{post.category}</span>
              <h2 className="font-display text-2xl font-semibold mt-3 mb-3">{post.title}</h2>
              <p className="font-body text-gray-500 mb-5">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <p className="font-body text-xs text-gray-400">{post.date}</p>
                <button className="flex items-center gap-1 emerald-text font-body text-sm font-semibold">
                  Читать <Icon name="ArrowRight" size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-20 gradient-hero rounded-3xl p-12 text-center text-white">
        <h2 className="font-display font-light mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>Подписка на новости</h2>
        <p className="font-body mb-8" style={{ color: "rgba(255,255,255,0.7)" }}>Тренды, советы и эксклюзивные предложения — прямо на вашу почту</p>
        <div className="flex gap-3 max-w-md mx-auto">
          <input placeholder="Ваш email" className="flex-1 px-5 py-3 rounded-xl font-body outline-none transition-colors" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white" }} />
          <button className="btn-gold px-6 py-3 rounded-xl font-body font-semibold whitespace-nowrap">Подписаться</button>
        </div>
      </div>
    </div>
  );

  // ─── DELIVERY ─────────────────────────────────────────────────────────────

  const renderDelivery = () => (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="section-line mb-3">
        <p className="font-body text-xs uppercase gold-accent" style={{ letterSpacing: "0.2em" }}>Логистика</p>
      </div>
      <h1 className="font-display font-light mb-16" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>Доставка и оплата</h1>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {DELIVERY_INFO.map((d, i) => (
          <div key={i} className="flex gap-5 p-7 bg-white rounded-2xl shadow-sm card-hover">
            <div className="w-14 h-14 bg-emerald-custom rounded-2xl flex items-center justify-center flex-shrink-0">
              <Icon name={d.icon} size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold mb-1">{d.title}</h3>
              <p className="font-body text-gray-500">{d.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-emerald-pale rounded-2xl p-8">
          <h3 className="font-display text-2xl font-semibold mb-6">Способы доставки</h3>
          <ul className="space-y-4">
            {[
              { method: "Курьер (Москва)", time: "1–2 дня", price: "390 ₽ / бесплатно от 5 000 ₽" },
              { method: "Курьер (Россия)", time: "3–7 дней", price: "390–590 ₽" },
              { method: "СДЭК, Boxberry", time: "2–5 дней", price: "290 ₽ / бесплатно от 5 000 ₽" },
              { method: "Почта России", time: "5–14 дней", price: "250 ₽" },
            ].map((r, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-custom mt-2 flex-shrink-0" />
                <div>
                  <p className="font-body font-semibold text-sm">{r.method} <span className="text-gray-400 font-normal">· {r.time}</span></p>
                  <p className="font-body text-sm text-gray-500">{r.price}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="font-display text-2xl font-semibold mb-6">Способы оплаты</h3>
          <ul className="space-y-4">
            {[
              { icon: "CreditCard", method: "Банковская карта (Visa, MasterCard, Мир)", desc: "Онлайн через защищённый шлюз" },
              { icon: "Smartphone" as IconName, method: "СБП — Система быстрых платежей", desc: "Без комиссии" },
              { icon: "Wallet" as IconName, method: "Электронные кошельки (ЮMoney)", desc: "Мгновенно" },
              { icon: "Package" as IconName, method: "Наложенный платёж", desc: "Оплата при получении" },
            ].map((r, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-pale rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name={r.icon} size={18} className="emerald-text" />
                </div>
                <div>
                  <p className="font-body font-semibold text-sm">{r.method}</p>
                  <p className="font-body text-sm text-gray-400">{r.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  // ─── CONTACTS ─────────────────────────────────────────────────────────────

  const renderContacts = () => (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="section-line mb-3">
        <p className="font-body text-xs uppercase gold-accent" style={{ letterSpacing: "0.2em" }}>Свяжитесь с нами</p>
      </div>
      <h1 className="font-display font-light mb-16" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>Контакты</h1>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-5">
          {[
            { icon: "MapPin" as IconName, title: "Адрес шоурума", val: "Москва, ул. Петровка, 15, 2 этаж", sub: "Пн–Сб 10:00–21:00, Вс 11:00–20:00" },
            { icon: "Phone" as IconName, title: "Телефон", val: "+7 (495) 123-45-67", sub: "Ежедневно 9:00–21:00" },
            { icon: "Mail" as IconName, title: "Email", val: "hello@verdure.ru", sub: "Ответим в течение 2 часов" },
            { icon: "Instagram" as IconName, title: "Инстаграм", val: "@verdure.store", sub: "Фото, луки, новинки" },
          ].map((c, i) => (
            <div key={i} className="flex gap-4 p-5 bg-white rounded-2xl shadow-sm card-hover">
              <div className="w-12 h-12 bg-emerald-custom rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name={c.icon} size={20} className="text-white" />
              </div>
              <div>
                <p className="font-body text-xs uppercase tracking-widest text-gray-400 mb-0.5">{c.title}</p>
                <p className="font-body font-semibold">{c.val}</p>
                <p className="font-body text-sm text-gray-400">{c.sub}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h3 className="font-display text-2xl font-semibold mb-6">Задайте вопрос</h3>
          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            <input placeholder="Ваше имя" className="w-full px-4 py-3 border border-gray-200 rounded-xl font-body text-sm outline-none focus:border-emerald-custom transition-colors" style={{ outlineColor: "transparent" }} />
            <input placeholder="Email или телефон" className="w-full px-4 py-3 border border-gray-200 rounded-xl font-body text-sm outline-none transition-colors" />
            <textarea placeholder="Ваш вопрос..." rows={5} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-body text-sm outline-none transition-colors resize-none" />
            <button type="submit" className="w-full btn-emerald py-3.5 rounded-xl font-body font-semibold">Отправить сообщение</button>
          </form>
        </div>
      </div>
    </div>
  );

  // ─── ABOUT ────────────────────────────────────────────────────────────────

  const renderAbout = () => (
    <div>
      <div className="gradient-hero py-28 px-6 text-white text-center">
        <p className="font-body text-xs uppercase mb-4" style={{ letterSpacing: "0.3em", color: "#c9a227" }}>Наша история</p>
        <h1 className="font-display font-light mb-6" style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}>О VERDURE</h1>
        <p className="font-body text-xl max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>Мы создаём одежду для людей, которые ценят природу, стиль и качество</p>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div className="section-line mb-3">
              <p className="font-body text-xs uppercase gold-accent" style={{ letterSpacing: "0.2em" }}>2018 — наше начало</p>
            </div>
            <h2 className="font-display font-light mb-6" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>Мода, вдохновлённая природой</h2>
            <p className="font-body text-gray-600 leading-relaxed mb-4">VERDURE основан в 2018 году с одной простой идеей: создавать одежду, которая сочетает натуральные материалы с современным силуэтом. Наш первый шоурум открылся в Москве, и уже в первый год мы стали любимым брендом тысяч покупателей.</p>
            <p className="font-body text-gray-600 leading-relaxed">Сегодня мы предлагаем коллекции для женщин, мужчин и детей. Каждая вещь — это баланс между эстетикой, комфортом и ответственным производством.</p>
          </div>
          <div className="rounded-3xl overflow-hidden" style={{ aspectRatio: "1" }}>
            <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80" alt="О нас" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { num: "6+", label: "лет на рынке" },
            { num: "50K+", label: "довольных клиентов" },
            { num: "200+", label: "моделей в сезон" },
            { num: "100%", label: "натуральных материалов" },
          ].map((s, i) => (
            <div key={i} className="text-center p-6 bg-emerald-pale rounded-2xl">
              <p className="font-display text-4xl font-semibold emerald-text mb-1">{s.num}</p>
              <p className="font-body text-sm text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "Leaf" as IconName, title: "Экологичность", desc: "Только сертифицированные ткани. Упаковка — переработанный картон." },
            { icon: "Award" as IconName, title: "Качество", desc: "Каждая партия проходит ОТК. Гарантия на все изделия — 12 месяцев." },
            { icon: "Heart" as IconName, title: "Забота", desc: "Персональный стилист, программа лояльности и возврат без вопросов." },
          ].map((v, i) => (
            <div key={i} className="p-7 bg-white rounded-2xl shadow-sm card-hover text-center">
              <div className="w-14 h-14 bg-emerald-custom rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name={v.icon} size={24} className="text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{v.title}</h3>
              <p className="font-body text-sm text-gray-500">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ─── LAYOUT ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background font-body">

      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-custom text-white px-5 py-3 rounded-xl shadow-lg font-body text-sm flex items-center gap-2 animate-fade-in">
          <Icon name="CheckCircle" size={16} /> {notification}
        </div>
      )}

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b" style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderColor: "#eee" }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => goTo("home")} className="font-display text-2xl font-semibold tracking-wider emerald-text">VERDURE</button>
          <nav className="hidden md:flex items-center gap-7">
            {NAV.map(n => (
              <button key={n.key} onClick={() => goTo(n.key)} className={`nav-link ${page === n.key ? "active" : ""}`}>{n.label}</button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={() => goTo("cart")} className="relative">
              <Icon name="ShoppingBag" size={22} className={page === "cart" ? "emerald-text" : "text-gray-700"} />
              {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
            </button>
            <button className="hidden md:block"><Icon name="Search" size={20} className="text-gray-600" /></button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden">
              <Icon name={mobileMenu ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="md:hidden bg-white border-t px-6 py-4" style={{ borderColor: "#eee" }}>
            <nav className="flex flex-col gap-1">
              {NAV.map(n => (
                <button key={n.key} onClick={() => goTo(n.key)}
                  className={`text-left px-3 py-3 rounded-lg font-body text-sm uppercase tracking-widest transition-colors ${page === n.key ? "bg-emerald-pale emerald-text font-semibold" : "hover:bg-gray-50"}`}>
                  {n.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* PAGE */}
      <main>
        {page === "home" && renderHome()}
        {page === "catalog" && renderCatalog()}
        {page === "cart" && renderCart()}
        {page === "blog" && renderBlog()}
        {page === "delivery" && renderDelivery()}
        {page === "contacts" && renderContacts()}
        {page === "about" && renderAbout()}
      </main>

      {/* FOOTER */}
      <footer style={{ background: "hsl(150,20%,8%)", color: "white" }}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div>
              <h3 className="font-display text-3xl font-semibold emerald-text mb-3">VERDURE</h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>Одежда и обувь для женщин, мужчин и детей. Качество, стиль, природа.</p>
            </div>
            <div>
              <p className="font-body text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>Каталог</p>
              <ul className="space-y-2">
                {[["women","Женское"],["men","Мужское"],["kids","Детское"]].map(([key, label]) => (
                  <li key={key}>
                    <button onClick={() => gotoCatalog(key)} className="font-body text-sm transition-colors" style={{ color: "rgba(255,255,255,0.55)" }}
                      onMouseEnter={e => (e.target as HTMLElement).style.color = "white"}
                      onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.55)"}>{label}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-body text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>Компания</p>
              <ul className="space-y-2">
                {NAV.filter(n => n.key !== "home" && n.key !== "catalog").map(n => (
                  <li key={n.key}>
                    <button onClick={() => goTo(n.key)} className="font-body text-sm transition-colors" style={{ color: "rgba(255,255,255,0.55)" }}
                      onMouseEnter={e => (e.target as HTMLElement).style.color = "white"}
                      onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.55)"}>{n.label}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-body text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>Контакты</p>
              <p className="font-body text-sm mb-1" style={{ color: "rgba(255,255,255,0.55)" }}>+7 (495) 123-45-67</p>
              <p className="font-body text-sm mb-5" style={{ color: "rgba(255,255,255,0.55)" }}>hello@verdure.ru</p>
              <div className="flex gap-3">
                {(["Instagram","Send","Youtube"] as IconName[]).map(ic => (
                  <button key={ic} className="w-9 h-9 rounded-full flex items-center justify-center transition-colors" style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.6)" }}
                    onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = "#2d8a5e"; (e.target as HTMLElement).style.color = "#2d8a5e"; }}
                    onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; (e.target as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}>
                    <Icon name={ic} size={15} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>© 2026 VERDURE. Все права защищены.</p>
            <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>Политика конфиденциальности · Оферта · Условия использования</p>
          </div>
        </div>
      </footer>
    </div>
  );
}