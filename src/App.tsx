import { useState } from "react"
import GrunStory from "@/components/ui/grun-story"
import GradientMotionBackground from "@/components/ui/gradient-motion-background"
import { LocationMap } from "@/components/ui/expanded-map"
import "@/app-story.css"
import "@/global-gradient.css"

export type Language = "ja" | "en"

export default function App() {
  const [language, setLanguage] = useState<Language>("en")
  return (
    <>
      <GradientMotionBackground className="gradient-motion-background--global" />
      <GrunStory language={language} onLanguageChange={setLanguage} />
      <section className="story-map-section">
        <p>GRÜN · KYOTO</p>
        <LocationMap location="GRÜN Arabic Shisha & Silk Road Kissa · Kyoto" latitude={35.0037637} longitude={135.7713448} zoom={15} tileProvider="carto-light" />
      </section>
    </>
  )
}
