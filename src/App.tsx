import { useState } from "react"
import GrunLanding from "@/components/ui/grun-landing"

export type Language = "ja" | "en"

export default function App() {
  const [language, setLanguage] = useState<Language>("ja")
  return <GrunLanding language={language} onLanguageChange={setLanguage} />
}
