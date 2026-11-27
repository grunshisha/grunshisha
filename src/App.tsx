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
      <div className="page-content">
        <GrunStory language={language} onLanguageChange={setLanguage} />
        <section className="story-map-section">
          <p>GRÜN · KYOTO</p>
          <LocationMap
            location="GRÜN Arabic Shisha & Silk Road Kissa · Kyoto"
            latitude={35.0042918}
            longitude={135.7735187}
            zoom={15}
            tileProvider="openstreetmap"
          />
        </section>
      </div>
    </>
  )
}
