import { useState } from "react"
import GrunLanding from "@/components/ui/grun-landing"
import { LocationMap } from "@/components/ui/expanded-map"

export type Language = "ja" | "en"

export default function App() {
  const [language, setLanguage] = useState<Language>("ja")
  return (
    <>
      <GrunLanding language={language} onLanguageChange={setLanguage} />
      <section className="flex flex-col items-center gap-5 bg-[#104c1d] px-6 py-16 text-center text-[#f8f7f2]">
        <p className="text-xs tracking-[0.2em]">京都 · GRÜN</p>
        <h2 className="text-3xl">地図で場所を確認</h2>
        <p className="max-w-md text-sm text-[#d7e3d6]">地図をタップすると拡大します。</p>
        <LocationMap
          location="GRÜN Arabic Shisha & Silk Road Kissa · Kyoto"
          latitude={35.0037637}
          longitude={135.7713448}
          zoom={15}
          tileProvider="carto-light"
        />
      </section>
    </>
  )
}
