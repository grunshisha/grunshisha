import { ArrowDown, ArrowRight, Instagram } from "lucide-react"
import type { Language } from "@/App"
import "./grun-story.css"

const logo = new URL("../../../GRUN LOGO.png", import.meta.url).href
const lounge = new URL("../../../Screenshot 2026-11-18 at 19.30.59.png", import.meta.url).href
const instagramUrl = "https://www.instagram.com/grun.kyoto/"
const mapsUrl = "https://www.google.com/maps/place/GR%C3%9CN+Arabic+Shisha+%EF%BC%86+Silk+Road+Kissa/@35.0037637,135.7713448,16.59z/"

const copy = {
  en: {
    about: "Our philosophy", craft: "The craft", visit: "Find us",
    heroKicker: "KYOTO · JAPAN", subtitle: "Arabic Shisha & Silk Road Kissa",
    scroll: "Discover GRÜN", philosophyLabel: "A WORLD OF STORIES IN EVERY FLAVOR",
    philosophyTitle: "Bringing Histories & Flavors Alive.",
    philosophyBody: "Across the world, generations of cooks and cultures have shaped remarkable flavors. At GRÜN, we follow those stories back to their roots—sharing thoughtful, authentic blends inspired by the kitchens and traditions of the Silk Road and beyond.",
    craftLabel: "RESEARCHED, BLENDED, PREPARED WITH CARE",
    craftTitle: "How We Prepare Our Shisha",
    craftBody: "Our team continually explores the flavor histories of Silk Road cultures, then experiments with new blends each month across five directions: fresh, fruity, spicy, floral and dessert. Prepared in Egyptian bowls, each session is designed to be smooth, full-bodied, rich and long-lasting.",
    directions: ["Fresh", "Fruity", "Spicy", "Floral", "Dessert"],
    visitTitle: "Take your time.", visitBody: "A quiet place for shisha, tea and a little discovery in the heart of Kyoto.",
    map: "Find GRÜN in Kyoto", instagram: "Follow our journey",
  },
  ja: {
    about: "哲学", craft: "シーシャへのこだわり", visit: "アクセス",
    heroKicker: "KYOTO · JAPAN", subtitle: "アラビアンシーシャとシルクロード喫茶",
    scroll: "GRÜNについて", philosophyLabel: "ひとつのフレーバーに、世界の物語を",
    philosophyTitle: "歴史と味わいを、いまへ。",
    philosophyBody: "世界各地の文化や宮廷の厨房で育まれてきた、豊か��味わい。その歴史をたどり、シルクロードをはじめとする伝統に着想を得た、誠実で丁寧なブレンドをお届けします。",
    craftLabel: "調べ、ブレンドし、丁寧に仕立てる",
    craftTitle: "GRÜNのシーシャづくり",
    craftBody: "シルクロード各地のフレーバーの歴史を探りながら、毎月新しいブレンドを研究しています。フレッシュ、フルーティー、スパイシー、フローラル、デザートの五つの方向から味わいを追求。エジプシャンボウルで、なめらかで豊かな、余韻の長い一服に仕上げます。",
    directions: ["フレッシュ", "フルーティー", "スパイシー", "フローラル", "デザート"],
    visitTitle: "ゆっくりと、お過ごしください。", visitBody: "京都の街なかで、シーシャとお茶、そして小さな発見を楽しむ場所。",
    map: "京都のGRÜNへ", instagram: "Instagramで最新情報を見る",
  },
} as const

export default function GrunStory({ language }: { language: Language }) {
  const t = copy[language]

  return (
    <div className="grun-story">
      <header className="story-header">
        <a href="#home" className="story-wordmark" aria-label="GRÜN home">GRÜN</a>
        <nav aria-label="Main navigation">
          <a href="#philosophy">{t.about}</a>
          <a href="#craft">{t.craft}</a>
          <a href="#visit">{t.visit}</a>
        </nav>
      </header>

      <main>
        <section className="story-hero" id="home" style={{ backgroundImage: `linear-gradient(180deg,rgba(8,24,12,.16),rgba(8,24,12,.48)),url("${lounge}")` }}>
          <div className="hero-brand-lockup">
            <img className="hero-logo" src={logo} alt="GRÜN" />
            <p>{t.subtitle}</p>
            <span className="hero-location">{t.heroKicker}</span>
          </div>
          <a className="hero-scroll" href="#philosophy">{t.scroll}<ArrowDown size={15} /></a>
        </section>

        <section className="story-philosophy" id="philosophy">
          <div className="story-section-inner philosophy-inner">
            <p className="story-eyebrow">{t.philosophyLabel}</p>
            <h1>{t.philosophyTitle}</h1>
            <p className="story-body">{t.philosophyBody}</p>
            <span className="story-rule" aria-hidden="true" />
          </div>
        </section>

        <section className="story-craft" id="craft">
          <div className="craft-image" role="img" aria-label={language === "ja" ? "京都のGRÜNの店内" : "Inside GRÜN in Kyoto"} style={{ backgroundImage: `url("${lounge}")` }} />
          <div className="craft-copy">
            <p className="story-eyebrow">{t.craftLabel}</p>
            <h2>{t.craftTitle}</h2>
            <p className="story-body">{t.craftBody}</p>
            <ul className="flavor-list" aria-label={language === "ja" ? "五つの味わい" : "Five flavor directions"}>
              {t.directions.map((direction) => <li key={direction}>{direction}</li>)}
            </ul>
          </div>
        </section>

        <section className="story-visit" id="visit">
          <p className="story-eyebrow">GRÜN · KYOTO</p>
          <h2>{t.visitTitle}</h2>
          <p className="story-body">{t.visitBody}</p>
          <div className="story-actions">
            <a href={mapsUrl} target="_blank" rel="noreferrer">{t.map}<ArrowRight size={15} /></a>
            <a href={instagramUrl} target="_blank" rel="noreferrer"><Instagram size={15} />{t.instagram}</a>
          </div>
        </section>
      </main>
    </div>
  )
}
