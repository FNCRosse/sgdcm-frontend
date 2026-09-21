import type { ButtonHTMLAttributes } from 'react'

type Variante = 'primario' | 'secundario' | 'texto'

const estilos: Record<Variante, string> = {
  primario: 'bg-rojo text-blanco hover:bg-rojo-oscuro',
  secundario: 'border-2 border-azul text-azul bg-transparent hover:bg-fondo-suave',
  texto: 'text-azul hover:underline',
}

export function Boton({
  variante = 'primario',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variante?: Variante }) {
  return (
    <button
      {...props}
      className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-btn px-4 text-boton font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 md:min-h-10 md:w-auto ${estilos[variante]} ${className}`}
    />
  )
}
