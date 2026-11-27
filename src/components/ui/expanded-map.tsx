import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react"
import { useMemo, useRef, useState, type MouseEvent, type KeyboardEvent } from "react"

interface LocationMapProps {
  /** Location name to display */
  location?: string
  /** Latitude coordinate */
  latitude?: number
  /** Longitude coordinate */
  longitude?: number
  /** Zoom level for the map (1-18) */
  zoom?: number
  /** Additional CSS classes */
  className?: string
  /** Map tile provider */
  tileProvider?: "openstreetmap" | "carto-light" | "carto-dark"
  /** Whether the card starts expanded */
  defaultExpanded?: boolean
}

function latLngToTile(lat: number, lng: number, zoom: number) {
  const n = 2 ** zoom
  const x = Math.floor(((lng + 180) / 360) * n)
  const latRad = (lat * Math.PI) / 180
  const y = Math.floor(
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n,
  )
  return { x, y }
}

function getTileUrl(provider: string, x: number, y: number, z: number) {
  switch (provider) {
    case "carto-light":
      return `https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/${z}/${x}/${y}.png`
    case "carto-dark":
      return `https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/${z}/${x}/${y}.png`
    default:
      return `https://tile.openstreetmap.org/${z}/${x}/${y}.png`
  }
}

function formatCoordinates(lat: number, lng: number) {
  const latDir = lat >= 0 ? "N" : "S"
  const lngDir = lng >= 0 ? "E" : "W"
  return `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lng).toFixed(4)}° ${lngDir}`
}

export function LocationMap({
  location = "San Francisco, CA",
  latitude = 37.7749,
  longitude = -122.4194,
  zoom = 14,
  className = "",
  tileProvider = "carto-light",
  defaultExpanded = false,
}: LocationMapProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-50, 50], [8, -8])
  const rotateY = useTransform(mouseX, [-50, 50], [-8, 8])
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const coordinates = useMemo(
    () => formatCoordinates(latitude, longitude),
    [latitude, longitude],
  )
  const tiles = useMemo(() => {
    const center = latLngToTile(latitude, longitude, zoom)
    return Array.from({ length: 9 }, (_, index) => {
      const dx = (index % 3) - 1
      const dy = Math.floor(index / 3) - 1
      return {
        url: getTileUrl(tileProvider, center.x + dx, center.y + dy, zoom),
        offsetX: dx,
        offsetY: dy,
      }
    })
  }, [latitude, longitude, zoom, tileProvider])

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(event.clientX - (rect.left + rect.width / 2))
    mouseY.set(event.clientY - (rect.top + rect.height / 2))
  }
  const resetTilt = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }
  const toggleExpanded = () => setIsExpanded((expanded) => !expanded)
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      toggleExpanded()
    }
  }

  return (
    <motion.div
      ref={containerRef}
      className={`relative mx-auto cursor-pointer select-none ${className}`}
      style={{ perspective: 1000, maxWidth: "100%" }}
      role="button"
      tabIndex={0}
      aria-label={`${location}. ${isExpanded ? "Collapse" : "Expand"} map`}
      aria-expanded={isExpanded}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={resetTilt}
      onClick={toggleExpanded}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-white/25 bg-[#e5e7df] text-[#173c27] shadow-xl"
        style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: "preserve-3d" }}
        animate={{ width: isExpanded ? 360 : 240, height: isExpanded ? 280 : 140 }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
      >
        {/* Keep real map imagery visible in both the compact preview and expanded card. */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[768px] w-[768px] -translate-x-1/2 -translate-y-1/2">
            {tiles.map((tile) => (
              <div
                key={tile.url}
                className="absolute h-64 w-64"
                style={{ left: `${(tile.offsetX + 1) * 256}px`, top: `${(tile.offsetY + 1) * 256}px` }}
              >
                <img src={tile.url} alt="" width={256} height={256} className="h-full w-full" draggable={false} />
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-black/5 via-transparent to-black/20" />
        <motion.div className="pointer-events-none absolute inset-0 z-10 opacity-[0.04]" animate={{ opacity: isExpanded ? 0 : 0.04 }} transition={{ duration: 0.3 }} aria-hidden="true">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs><pattern id="map-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#map-grid)" />
          </svg>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.3 }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg" aria-hidden="true">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#34D399" />
            <circle cx="12" cy="9" r="2.5" fill="#f4f3ed" />
          </svg>
        </motion.div>
        {isExpanded && (
          <>
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-[#f4f3ed]/50 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-[#f4f3ed]/80 to-transparent" />
          </>
        )}

        <div className="relative z-20 flex h-full flex-col justify-between p-5">
          <motion.svg
            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="text-emerald-700" animate={{ filter: isHovered ? "drop-shadow(0 0 8px rgba(52, 211, 153, 0.6))" : "drop-shadow(0 0 4px rgba(52, 211, 153, 0.3))" }}
            aria-hidden="true"
          >
            <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
            <line x1="9" x2="9" y1="3" y2="18" /><line x1="15" x2="15" y1="6" y2="21" />
          </motion.svg>
          <div className="space-y-1">
            <motion.h3 className="text-sm font-medium tracking-tight" animate={{ x: isHovered ? 4 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>{location}</motion.h3>
            <AnimatePresence>
              {isExpanded && (
                <motion.p className="font-mono text-xs text-[#526458]" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                  {coordinates}
                </motion.p>
              )}
            </AnimatePresence>
            <motion.div className="h-px origin-left bg-gradient-to-r from-emerald-700/60 via-emerald-600/30 to-transparent" initial={{ scaleX: 0 }} animate={{ scaleX: isHovered || isExpanded ? 1 : 0.3 }} transition={{ duration: 0.4, ease: "easeOut" }} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default LocationMap
