import type { SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement>

function SheetLaserCuttingIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="6" width="18" height="12" rx="1" />
      <line x1="12" y1="2" x2="12" y2="6" stroke="#ff5b00" strokeWidth="2" strokeDasharray="2 1" />
      <path d="M12 6v12" stroke="#ff5b00" strokeWidth="1.5" strokeDasharray="3 2" />
      <circle cx="10" cy="12" r="0.5" fill="#ff5b00" stroke="none" />
      <circle cx="14" cy="10" r="0.5" fill="#ff5b00" stroke="none" />
      <circle cx="13" cy="14" r="0.5" fill="#ff5b00" stroke="none" />
    </svg>
  )
}

function TubeLaserCuttingIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <ellipse cx="5" cy="12" rx="2.5" ry="5" />
      <line x1="5" y1="7" x2="19" y2="7" />
      <line x1="5" y1="17" x2="19" y2="17" />
      <ellipse cx="19" cy="12" rx="2.5" ry="5" />
      <line x1="14" y1="3" x2="14" y2="7" stroke="#ff5b00" strokeWidth="2" strokeDasharray="2 1" />
      <ellipse cx="14" cy="12" rx="0.5" ry="5" stroke="#ff5b00" strokeWidth="1.5" strokeDasharray="3 2" />
    </svg>
  )
}

function ComboSheetTubeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="4" width="10" height="7" rx="1" />
      <line x1="11" y1="14.5" x2="13" y2="14.5" stroke="#ff5b00" strokeWidth="2" />
      <line x1="12" y1="13.5" x2="12" y2="15.5" stroke="#ff5b00" strokeWidth="2" />
      <ellipse cx="16" cy="16" rx="1.5" ry="4" />
      <line x1="16" y1="12" x2="22" y2="12" />
      <line x1="16" y1="20" x2="22" y2="20" />
      <ellipse cx="22" cy="16" rx="1.5" ry="4" />
      <line x1="7" y1="1" x2="7" y2="4" stroke="#ff5b00" strokeWidth="1.5" strokeDasharray="2 1" />
    </svg>
  )
}

function AutomationDevicesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="9" y="19" width="6" height="3" rx="0.5" />
      <line x1="12" y1="19" x2="12" y2="15" />
      <line x1="12" y1="15" x2="7" y2="10" strokeWidth="2" />
      <line x1="7" y1="10" x2="4" y2="5" strokeWidth="2" />
      <circle cx="12" cy="15" r="1.5" fill="white" />
      <circle cx="7" cy="10" r="1.5" fill="white" />
      <line x1="4" y1="5" x2="2" y2="3" />
      <line x1="4" y1="5" x2="6" y2="3" />
      <path d="M16 8a8 8 0 0 0-5-5" stroke="#ff5b00" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  )
}

function MigWeldingIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="18" cy="7" r="4" />
      <circle cx="18" cy="7" r="1.5" />
      <path d="M14 7L8 14" strokeWidth="1.5" />
      <path d="M8 14L6 17" strokeWidth="2.5" />
      <line x1="6" y1="17" x2="5" y2="20" stroke="#ff5b00" strokeWidth="1.5" />
      <line x1="6" y1="17" x2="3" y2="19" stroke="#ff5b00" strokeWidth="1" />
      <line x1="6" y1="17" x2="8" y2="20" stroke="#ff5b00" strokeWidth="1" />
      <line x1="2" y1="21" x2="11" y2="21" strokeWidth="2" />
    </svg>
  )
}

function TigWeldingIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 3L10 12" strokeWidth="2" />
      <path d="M10 12L9 14.5" strokeWidth="3" />
      <line x1="9" y1="14.5" x2="8.5" y2="16" stroke="#ff5b00" strokeWidth="1.5" />
      <path d="M5 16.5C5 14 8.5 13 8.5 16" stroke="#ff5b00" strokeWidth="1" strokeDasharray="2 1.5" />
      <path d="M12 16.5C12 14 8.5 13 8.5 16" stroke="#ff5b00" strokeWidth="1" strokeDasharray="2 1.5" />
      <line x1="3" y1="8" x2="7.5" y2="15.5" strokeWidth="1" />
      <line x1="4" y1="21" x2="14" y2="21" strokeWidth="2" />
      <path d="M6 21C6.5 19 7.5 19 8 21C8.5 19 9.5 19 10 21" stroke="#ff5b00" strokeWidth="1" />
    </svg>
  )
}

function MmaWeldingIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="14" y="2" width="4" height="6" rx="1" />
      <line x1="16" y1="8" x2="9" y2="17" strokeWidth="2.5" />
      <line x1="14" y1="10" x2="13" y2="11" strokeWidth="1" />
      <line x1="13" y1="12" x2="12" y2="13" strokeWidth="1" />
      <line x1="12" y1="14" x2="11" y2="15" strokeWidth="1" />
      <circle cx="9" cy="17" r="2" fill="#ff5b00" opacity="0.2" stroke="none" />
      <line x1="9" y1="17" x2="7" y2="19" stroke="#ff5b00" strokeWidth="1" />
      <line x1="9" y1="17" x2="11" y2="19.5" stroke="#ff5b00" strokeWidth="1" />
      <line x1="9" y1="17" x2="6" y2="17.5" stroke="#ff5b00" strokeWidth="1" />
      <line x1="4" y1="21" x2="14" y2="21" strokeWidth="2" />
    </svg>
  )
}

function SawWeldingIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="12" y1="2" x2="12" y2="12" strokeWidth="1.5" />
      <path d="M4 14C5 12 7 11 9 12C11 13 13 13 15 12C17 11 19 12 20 14" fill="white" />
      <path d="M4 14C5 12 7 11 9 12C11 13 13 13 15 12C17 11 19 12 20 14" strokeWidth="1.5" />
      <circle cx="12" cy="14" r="2" fill="#ff5b00" opacity="0.3" stroke="none" />
      <circle cx="12" cy="14" r="1" fill="#ff5b00" opacity="0.5" stroke="none" />
      <path d="M10 5L14 5L13 8L11 8Z" fill="white" strokeWidth="1" />
      <line x1="3" y1="18" x2="21" y2="18" strokeWidth="2.5" />
      <path d="M8 18v1.5h8V18" stroke="#ff5b00" strokeWidth="1" />
    </svg>
  )
}

function HandheldLaserWeldingIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="13" y="4" width="5" height="10" rx="2" />
      <path d="M15.5 14L14 18L17 18Z" strokeWidth="1.5" />
      <line x1="13" y1="8" x2="11" y2="9" strokeWidth="1.5" />
      <path d="M15.5 4C15.5 2 17 1 19 1" strokeWidth="1.5" />
      <line x1="15.5" y1="18" x2="15.5" y2="22" stroke="#ff5b00" strokeWidth="2" />
      <circle cx="15.5" cy="22" r="1.5" fill="#ff5b00" opacity="0.2" stroke="none" />
      <path d="M13 7C11.5 7 11 8 11 9C11 10 11.5 10.5 13 10.5" strokeWidth="1" />
    </svg>
  )
}

function IotSoftwareIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="3" width="16" height="11" rx="1.5" />
      <line x1="8" y1="17" x2="16" y2="17" />
      <line x1="12" y1="14" x2="12" y2="17" />
      <line x1="7" y1="11" x2="7" y2="8" stroke="#ff5b00" strokeWidth="1.5" />
      <line x1="10" y1="11" x2="10" y2="6" stroke="#ff5b00" strokeWidth="1.5" />
      <line x1="13" y1="11" x2="13" y2="9" stroke="#ff5b00" strokeWidth="1.5" />
      <line x1="16" y1="11" x2="16" y2="7" stroke="#ff5b00" strokeWidth="1.5" />
      <path d="M18 20C19.5 19 21 19 21 20.5" stroke="#ff5b00" strokeWidth="1" />
      <path d="M18 22C20.5 20 22.5 20 22.5 22.5" stroke="#ff5b00" strokeWidth="1" />
      <circle cx="18" cy="22" r="0.8" fill="#ff5b00" stroke="none" />
    </svg>
  )
}

const subCategoryIconMap: Record<string, (props: IconProps) => React.JSX.Element> = {
  "sheet-laser-cutting": SheetLaserCuttingIcon,
  "tube-laser-cutting": TubeLaserCuttingIcon,
  "combo-sheet-tube-laser-cutting": ComboSheetTubeIcon,
  "automation-devices": AutomationDevicesIcon,
  "mig-welding": MigWeldingIcon,
  "tig-welding": TigWeldingIcon,
  "mma-welding": MmaWeldingIcon,
  "submerged-arc-welding": SawWeldingIcon,
  "handheld-laser-welding": HandheldLaserWeldingIcon,
  "iot-software": IotSoftwareIcon,
}

export function SubCategoryIcon({ slug, ...props }: IconProps & { slug: string }) {
  const Icon = subCategoryIconMap[slug]
  if (!Icon) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    )
  }
  return <Icon {...props} />
}
