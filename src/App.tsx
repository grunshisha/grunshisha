import { useState } from "react"
import GrunStory from "@/components/ui/grun-story"
import { LocationMap } from "@/components/ui/expanded-map"

export type Language = "ja" | "en"

export default function App() {
  const [language, setLanguage] = useState<Language>("en")
  return (
    <>
      <div className="story-language-switch" aria-label="Language">
        <button aria-pressed={language === "en"} onClick={() => setLanguage("en")}>EN</button>
        <button aria-pressed={language === "ja"} onClick={() => setLanguage("ja")}>日本語</button>
      </div>
      <GrunStory language={language} />
      <section className="story-map-section">
        <p>GRÜN · KYOTO</p>
        <LocationMap location="GRÜN Arabic Shisha & Silk Road Kissa · Kyoto" latitude={35.0037637} longitude={135.7713448} zoom={15} tileProvider="carto-light" />
      </section>
    </>
  )
}

import "./app-story.css"
