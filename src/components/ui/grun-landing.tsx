import { ArrowDown, ArrowRight, Instagram, MapPin, Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import type { Language } from "@/App"

const logo = new URL("../../../GRUN LOGO.png", import.meta.url).href
const lounge = new URL("../../../Screenshot 2026-11-18 at 19.30.59.png", import.meta.url).href
const gallery = [
  new URL("../../../Screenshot 2026-11-18 at 19.25.44.png", import.meta.url).href,
  new URL("../../../Screenshot 2026-11-18 at 19.27.12.png", import.meta.url).href,
  new URL("../../../Screenshot 2026-11-18 at 19.28.26.png", import.meta.url).href,
  new URL("../../../Screenshot 2026-11-18 at 19.29.03.png", import.meta.url).href,
  new URL("../../../Screenshot 2026-11-18 at 19.30.17.png", import.meta.url).href,
]
const maps = "https://www.google.com/maps/place/GR%C3%9CN+Arabic+Shisha+%EF%BC%86+Silk+Road+Kissa/@35.0037637,135.7713448,16.59z/data=!3m1!5s0x600108c1d31bb8e9:0xf1cb1b1775eca5ae!4m6!3m5!1s0x6001096fb7e6c483:0x21b6558739505341!8m2!3d35.0042918!4d135.7735187!16s%2Fg%2F11t0tdb1z0"
const instagramUrl = "https://www.instagram.com/grun.kyoto/"

const words = {
  ja: {
    about: "お店について", menu: "メニュー", space: "店内", access: "アクセス", map: "地図を見る",
    kicker: "KYOTO · ARABIC SHISHA & SILK ROAD KISSA", title: "京都の街に、\n静かなひとときを。",
    description: "シーシャとお茶、ゆっくりとした会話を楽しむ場所。GRÜNで、自分だけの時間をお過ごしください。",
    discover: "GRÜNについて", slow: "心をゆるめる場所", introTitle: "飾らない楽しみを、\nゆっくりと。",
    intro: "シルクロードの文化や物語に着想を得た、京都のくつろぎの喫茶空間。ふらりと立ち寄り、思い思いの時間をお過ごしください。",
    ourSpace: "店内について", storyTitle: "自分らしく過ごす、\n小さな居場所。",
    story: "木のぬくもりと柔らかなクッション、窓から差し込む自然光。いつもより少しゆっくりとした時間をお過ごしいただけます。",
    table: "AT THE TABLE", menuTitle: "心地よい一杯とひととき。", shisha: "シーシャ", shishaText: "本日のフレーバーはスタッフにお尋ねください。", tea: "お茶", teaText: "ゆっくり味わう、くつろぎの一杯。", coffee: "コーヒー", coffeeText: "会話とともにお楽しみください。", sweets: "スイーツ・軽食", sweetsText: "内容はスタッフにお尋ねください。",
    galleryTitle: "GRÜNの店内", follow: "最新情報をお届け", instaTitle: "InstagramでGRÜNを", instaText: "店内の新しい風景や、京都のGRÜNでのひとときをご覧ください。",
    visit: "京都でお待ちしています", visitTitle: "ぜひお越しください。\nごゆっくり。", visitText: "道順や最新の店舗情報はGoogle マップでご確認ください。", location: "場所", hours: "営業時間", hoursText: "最新の営業時間はGoogle マップでご確認ください。", directions: "アクセス", footer: "アラビアンシーシャ＆シルクロード喫茶 · 京都",
    scenario: "GRÜNのひととき", alert: "京都の街なかで、少しひと休みしませんか？", reply: "もちろん。お茶とシーシャをご用意して、ゆっくりお過ごしいただけます。", voice: "ここで少しのんびりしよう。",
  },
  en: {
    about: "About", menu: "Menu", space: "Space", access: "Access", map: "Google Maps",
    kicker: "KYOTO · ARABIC SHISHA & SILK ROAD KISSA", title: "A quiet pause\nin the heart of Kyoto.",
    description: "A welcoming space for shisha, tea and unhurried conversation. Find your moment at GRÜN.", discover: "DISCOVER GRÜN", slow: "A PLACE TO SLOW DOWN", introTitle: "Simple pleasures.\nTime well spent.",
    intro: "Inspired by the cultures and stories of the Silk Road, GRÜN brings a relaxed, thoughtful cafe experience to Kyoto. Drop in, settle down and stay as long as you like.",
    ourSpace: "OUR SPACE", storyTitle: "A little room\nto call your own.", story: "Warm wood, soft cushions and natural light make room for a different pace. Come on your own or share the space with friends.",
    table: "AT THE TABLE", menuTitle: "A few good things.", shisha: "Shisha", shishaText: "Ask us about today's flavors.", tea: "Tea", teaText: "A comforting cup to take your time over.", coffee: "Coffee", coffeeText: "Enjoy a cup alongside conversation.", sweets: "Sweets & light bites", sweetsText: "Please ask our team about the current selection.",
    galleryTitle: "Inside GRÜN", follow: "FOLLOW OUR JOURNEY", instaTitle: "GRÜN on Instagram", instaText: "See the latest from the lounge and everyday life at GRÜN Kyoto.",
    visit: "FIND US IN KYOTO", visitTitle: "Come by.\nStay a while.", visitText: "Find directions and the latest shop details on Google Maps.", location: "LOCATION", hours: "HOURS", hoursText: "Please check current hours on Google Maps.", directions: "DIRECTIONS", footer: "Arabic Shisha & Silk Road Kissa · Kyoto",
    scenario: "A moment at GRÜN", alert: "Looking for a quiet pause in the heart of Kyoto?", reply: "Of course. Settle in with tea and shisha, and take your time.", voice: "Let's slow down for a while.",
  },
}

export default function GrunLanding({ language, onLanguageChange }: { language: Language; onLanguageChange: (language: Language) => void }) {
  const t = words[language]
  const [menuOpen, setMenuOpen] = useState(false)
  const [scenario, setScenario] = useState(0)

  useEffect(() => {
    document.documentElement.lang = language
    document.title = language === "ja" ? "GRÜN | Kyoto" : "GRÜN | Kyoto Silk Road Kissa"
  }, [language])

  const nav = [
    ["#story", t.about], ["#menu", t.menu], ["#gallery", t.space], ["#visit", t.access],
  ]

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="GRÜN home"><img src={logo} alt="GRÜN" /></a>
        <button className="menu-button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          {nav.map(([href, label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a href={instagramUrl} target="_blank" rel="noreferrer" className="nav-instagram"><Instagram size={16} /> Instagram</a>
          <div className="language-switch" aria-label="Language">
            <button className={language === "ja" ? "selected" : ""} aria-pressed={language === "ja"} onClick={() => onLanguageChange("ja")}>日本語</button>
            <button className={language === "en" ? "selected" : ""} aria-pressed={language === "en"} onClick={() => onLanguageChange("en")}>EN</button>
          </div>
          <a className="nav-map" href={maps} target="_blank" rel="noreferrer">{t.map} <ArrowRight size={14} /></a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home" style={{ backgroundImage: `linear-gradient(90deg,rgba(8,24,12,.65),rgba(8,24,12,.08)),linear-gradient(0deg,rgba(8,24,12,.48),transparent 58%),url("${lounge}")` }}>
          <div className="hero-copy">
            <p className="eyebrow">{t.kicker}</p>
            <h1>{t.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
            <p className="hero-description">{t.description}</p>
            <a className="text-link light-link" href="#story">{t.discover} <ArrowDown size={14} /></a>
          </div>
          <div className="hero-card" aria-live="polite">
            <p className="card-label"><i />{t.scenario}</p>
            <div className="chat-bubble alert-bubble">{t.alert}</div>
            <div className="chat-bubble reply-bubble"><span className="reply-dot" />{t.reply}</div>
            <div className="voice-pill"><span className="sound-bars"><i/><i/><i/><i/></span>{t.voice}</div>
            <div className="scenario-controls" aria-label="Select scene">
              {[0, 1, 2].map((item) => <button key={item} className={scenario === item ? "active" : ""} aria-label={`Scene ${item + 1}`} aria-pressed={scenario === item} onClick={() => setScenario(item)} />)}
            </div>
          </div>
          <a className="scroll-hint" href="#intro" aria-label="Scroll to explore"><span>SCROLL TO EXPLORE</span><ArrowDown size={15}/></a>
        </section>

        <section className="section intro" id="intro"><div className="narrow"><p className="eyebrow">{t.slow}</p><h2>{t.introTitle.split("\n").map(line => <span key={line}>{line}</span>)}</h2><p className="body-copy">{t.intro}</p></div></section>

        <section className="story-section" id="story"><div className="story-image"><img src={gallery[0]} alt={language === "ja" ? "GRÜNの窓辺の席" : "A window seat inside GRÜN"} loading="lazy" /></div><div className="story-copy"><p className="eyebrow">{t.ourSpace}</p><h2>{t.storyTitle.split("\n").map(line => <span key={line}>{line}</span>)}</h2><p>{t.story}</p><a className="text-link" href="#gallery">{t.galleryTitle} <ArrowRight size={14}/></a></div></section>

        <section className="section menu-section" id="menu"><div className="section-heading"><p className="eyebrow">{t.table}</p><h2>{t.menuTitle}</h2></div><div className="menu-list">
          {[[t.shisha, t.shishaText], [t.tea, t.teaText], [t.coffee, t.coffeeText], [t.sweets, t.sweetsText]].map(([name, text], i) => <article className="menu-item" key={name}><span className="menu-number">0{i + 1}</span><div><h3>{name}</h3><p>{text}</p></div><span className="menu-mark">+</span></article>)}
        </div><p className="menu-note">{language === "ja" ? "メニューや提供状況は変更になる場合があります。" : "Menu and availability may change."}</p></section>

        <section className="section gallery-section" id="gallery"><div className="section-heading"><p className="eyebrow">GRÜN · KYOTO</p><h2>{t.galleryTitle}</h2></div><div className="photo-grid">{gallery.map((image, i) => <figure className={`photo photo-${i + 1}`} key={image}><img src={image} alt={language === "ja" ? `GRÜN店内の写真 ${i + 1}` : `Inside GRÜN, photo ${i + 1}`} loading="lazy" /></figure>)}</div></section>

        <section className="instagram-section" id="instagram"><div><p className="eyebrow">{t.follow}</p><h2>{t.instaTitle}</h2><p>{t.instaText}</p><a className="outline-button" href={instagramUrl} target="_blank" rel="noreferrer"><Instagram size={17} /> @grun.kyoto <ArrowRight size={15}/></a></div></section>

        <section className="visit-section" id="visit"><div className="visit-content"><p className="eyebrow">{t.visit}</p><h2>{t.visitTitle.split("\n").map(line => <span key={line}>{line}</span>)}</h2><p className="visit-copy">{t.visitText}</p><dl className="visit-details"><div><dt>{language === "ja" ? "店舗" : "SHOP"}</dt><dd>GRÜN Arabic Shisha ＆ Silk Road Kissa</dd></div><div><dt>{t.location}</dt><dd>{language === "ja" ? "京都、日本" : "Kyoto, Japan"}</dd></div><div><dt>{t.hours}</dt><dd>{t.hoursText}</dd></div></dl><a className="solid-button" href={maps} target="_blank" rel="noreferrer"><MapPin size={16}/>{t.map}<ArrowRight size={15}/></a></div><div className="visit-image"><img src={gallery[4]} alt={language === "ja" ? "GRÜNの店内" : "GRÜN lounge"} loading="lazy" /></div></section>
      </main>

      <footer className="footer"><a className="footer-brand" href="#home"><img src={logo} alt="GRÜN" /></a><p>{t.footer}</p><a className="footer-social" href={instagramUrl} target="_blank" rel="noreferrer"><Instagram size={16}/> @grun.kyoto</a><span className="copyright">© GRÜN Kyoto</span></footer>
    </div>
  )
}
