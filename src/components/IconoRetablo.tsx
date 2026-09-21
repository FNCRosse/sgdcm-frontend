/** Único ícono propio (§4). Máscara CSS sobre el SVG final para heredar `currentColor` sin tocarlo. */
export function IconoRetablo({ size = 24 }: { size?: number }) {
  const mask = 'url(/brand/icon_retablo_24.svg)'
  return (
    <span
      aria-hidden
      className="inline-block shrink-0 bg-current"
      style={{
        width: size,
        height: size,
        maskImage: mask,
        WebkitMaskImage: mask,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
      }}
    />
  )
}
