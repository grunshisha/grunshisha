import { useState } from "react"
import GrunStory from "@/components/ui/grun-story"
import GradientMotionBackground from "@/components/ui/gradient-motion-background"
import "@/app-story.css"
import "@/global-gradient.css"

export type Language = "ja" | "en"

export default function App() {
  const [language, setLanguage] = useState<Language>("en")
  return (
    <>
      <GradientMotionBackground className="gradient-motion-background--global" />
      <div className="page-content">
        <div className="story-language-switch" aria-label="Language">
          <button aria-pressed={language === "en"} onClick={() => setLanguage("en")}>EN</button>
          <button aria-pressed={language === "ja"} onClick={() => setLanguage("ja")}>日本語</button>
        </div>
        <GrunStory language={language} onLanguageChange={setLanguage} />
        <section className="story-map-section">
          <p>GRÜN · KYOTO</p>
          <iframe
            title="Map showing GRÜN Arabic Shisha & Silk Road Kissa in Kyoto"
            src="https://www.openstreetmap.org/export/embed.html?bbox=135.755%2C34.995%2C135.788%2C35.012&layer=mapnik&marker=35.0037637%2C135.7713448"
            width="100%"
            height="420"
            loading="lazy"
            style={{ maxWidth: 900, border: 0, borderRadius: 16 }}
          />
        </section>
      </div>
    </>
  )
}
