import { TriangleAlert } from 'lucide-react'
import { useId, type InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  etiqueta: string
  error?: string
}

export function CampoTexto({ etiqueta, error, className = '', ...props }: Props) {
  const id = useId()
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={id} className="text-miga font-semibold">
        {etiqueta}
      </label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="min-h-12 rounded-btn border border-gris-1 px-3 text-cuerpo-movil focus:border-azul aria-invalid:border-rojo md:min-h-10"
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1 text-miga text-rojo" role="alert">
          <TriangleAlert size={20} aria-hidden /> {error}
        </p>
      )}
    </div>
  )
}
