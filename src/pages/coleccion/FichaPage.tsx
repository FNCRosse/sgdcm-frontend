import { useState } from 'react'
import { ChevronLeft, ImageOff, TriangleAlert, X } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Boton } from '@/components/Boton'
import { CampoTexto } from '@/components/CampoTexto'
import { Chip } from '@/components/Chip'
import { IconoRetablo } from '@/components/IconoRetablo'
import { useSesion } from '@/hooks/useSesion'
import { useCambiarEstadoFicha, usePieza } from '@/features/fichas/usePiezas'
import type { EstadoFicha } from '@/types/pieza'
import type { Rol } from '@/types/sesion'

const PUEDE_ENVIAR: Rol[] = ['Administrador', 'Catalogador']
const PUEDE_DECIDIR: Rol[] = ['Administrador', 'Curador']

const DATOS_TECNICOS: { etiqueta: string; clave: 'coleccion' | 'subcoleccion' | 'procedencia' | 'autor' | 'material' | 'tecnica' | 'epoca' | 'estadoConservacion' | 'regimen' }[] = [
  { etiqueta: 'Colección', clave: 'coleccion' },
  { etiqueta: 'Subcolección', clave: 'subcoleccion' },
  { etiqueta: 'Procedencia', clave: 'procedencia' },
  { etiqueta: 'Autor', clave: 'autor' },
  { etiqueta: 'Material', clave: 'material' },
  { etiqueta: 'Técnica', clave: 'tecnica' },
  { etiqueta: 'Época', clave: 'epoca' },
  { etiqueta: 'Estado de conservación', clave: 'estadoConservacion' },
  { etiqueta: 'Régimen', clave: 'regimen' },
]

/** Ficha individual §8: galería izquierda + datos técnicos y aprobación derecha (HU-01..05). */
export function FichaPage() {
  const { id = '' } = useParams()
  const { usuario } = useSesion()
  const pieza = usePieza(id)
  const cambiarEstado = useCambiarEstadoFicha(id)
  const [galeriaAbierta, setGaleriaAbierta] = useState(false)
  const [rechazando, setRechazando] = useState(false)
  const [justificacion, setJustificacion] = useState('')

  if (pieza.isPending) {
    return (
      <output className="flex flex-col items-center gap-2 py-10 text-gris-1">
        <IconoRetablo size={48} />
        <span className="animate-pulse">Cargando ficha…</span>
      </output>
    )
  }

  if (pieza.isError) {
    return (
      <p role="alert" className="flex items-center gap-2 text-rojo">
        <TriangleAlert size={24} aria-hidden /> No se pudo cargar la ficha.{' '}
        <Boton variante="texto" onClick={() => pieza.refetch()}>
          Reintentar
        </Boton>
      </p>
    )
  }

  const p = pieza.data
  const rol = usuario?.rol
  const titulo = p.codigo || 'Comodato · sin código'

  const enviarRevision = () => cambiarEstado.mutate({ estado: 'En revisión' as EstadoFicha })
  const aprobar = () => cambiarEstado.mutate({ estado: 'Aprobada' as EstadoFicha })
  const confirmarRechazo = () => {
    if (!justificacion.trim()) return
    cambiarEstado.mutate(
      { estado: 'Rechazada' as EstadoFicha, justificacion },
      { onSuccess: () => setRechazando(false) },
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Migas de pan §6: en móvil, botón "volver" en su lugar */}
      <nav aria-label="Ruta" className="flex items-center gap-1 text-miga text-gris-2 md:hidden">
        <Link to="/coleccion" className="flex items-center gap-1 hover:underline">
          <ChevronLeft size={16} aria-hidden /> Colección
        </Link>
      </nav>
      <nav aria-label="Ruta" className="hidden items-center gap-1 text-miga text-gris-2 md:flex">
        <Link to="/coleccion" className="hover:underline">
          Colección
        </Link>
        <span aria-hidden>{'>'}</span>
        <span>{p.coleccion}</span>
        <span aria-hidden>{'>'}</span>
        <span className="text-azul">{titulo}</span>
      </nav>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Galería */}
        <div>
          {p.imagen ? (
            <button
              type="button"
              onClick={() => setGaleriaAbierta(true)}
              className="block aspect-square w-full overflow-hidden rounded-card bg-blanco shadow-sombra"
            >
              <img src={p.imagen} alt={`Fotografía de ${p.nombre}`} className="h-full w-full object-cover" />
            </button>
          ) : (
            <div className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-card bg-fondo-suave text-gris-2">
              <ImageOff size={48} aria-hidden />
              <span>Sin imagen</span>
            </div>
          )}
        </div>

        {/* Datos técnicos */}
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-miga font-semibold text-azul">{titulo}</p>
            <h1 className="font-acento text-h1-movil italic md:text-h1">{p.nombre}</h1>
            <div className="mt-2">
              <Chip estado={p.estadoFicha}>{p.estadoFicha}</Chip>
            </div>
          </div>

          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {DATOS_TECNICOS.map(({ etiqueta, clave }) => (
              <div key={clave}>
                <dt className="text-etiqueta uppercase text-gris-2">{etiqueta}</dt>
                <dd className="text-cuerpo-movil">{p[clave]}</dd>
              </div>
            ))}
          </dl>

          <div>
            <h2 className="text-miga font-semibold text-gris-2">Descripción</h2>
            <p>{p.descripcion}</p>
          </div>

          {/* Flujo de aprobación HU-05 */}
          <div className="flex flex-col gap-3 border-t border-gris-1 pt-4">
            {cambiarEstado.isError && (
              <p role="alert" className="flex items-center gap-2 text-rojo">
                <TriangleAlert size={20} aria-hidden /> {(cambiarEstado.error as Error).message}
              </p>
            )}

            {(p.estadoFicha === 'Borrador' || p.estadoFicha === 'Rechazada') && (
              <Boton
                variante="primario"
                disabled={!rol || !PUEDE_ENVIAR.includes(rol) || cambiarEstado.isPending}
                onClick={enviarRevision}
              >
                Enviar a revisión
              </Boton>
            )}

            {p.estadoFicha === 'En revisión' && !rechazando && (
              <div className="flex flex-col gap-2 sm:flex-row">
                <Boton
                  variante="primario"
                  disabled={!rol || !PUEDE_DECIDIR.includes(rol) || cambiarEstado.isPending}
                  onClick={aprobar}
                >
                  Aprobar
                </Boton>
                <Boton
                  variante="secundario"
                  disabled={!rol || !PUEDE_DECIDIR.includes(rol) || cambiarEstado.isPending}
                  onClick={() => setRechazando(true)}
                >
                  Rechazar
                </Boton>
              </div>
            )}

            {rechazando && (
              <div className="flex flex-col gap-2">
                <CampoTexto
                  etiqueta="Justificación del rechazo"
                  value={justificacion}
                  onChange={(e) => setJustificacion(e.target.value)}
                  error={!justificacion.trim() ? 'Obligatoria para rechazar' : undefined}
                />
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Boton
                    variante="primario"
                    disabled={!justificacion.trim() || cambiarEstado.isPending}
                    onClick={confirmarRechazo}
                  >
                    Confirmar rechazo
                  </Boton>
                  <Boton variante="texto" onClick={() => setRechazando(false)}>
                    Cancelar
                  </Boton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal galería §9: overlay azul 60%, pantalla completa en móvil */}
      {galeriaAbierta && p.imagen && (
        <dialog
          open
          aria-label={`Fotografía ampliada de ${p.nombre}`}
          className="fixed inset-0 z-50 flex max-h-none max-w-none items-center justify-center bg-azul/60 p-4"
        >
          <button
            type="button"
            aria-label="Cerrar"
            onClick={() => setGaleriaAbierta(false)}
            className="absolute inset-0 cursor-default"
          />
          <div className="relative max-h-full max-w-3xl overflow-hidden rounded-modal bg-blanco p-2">
            <button
              type="button"
              onClick={() => setGaleriaAbierta(false)}
              aria-label="Cerrar"
              className="absolute right-3 top-3 rounded-full bg-blanco p-1 text-azul"
            >
              <X size={24} aria-hidden />
            </button>
            <img
              src={p.imagen}
              alt={`Fotografía de ${p.nombre}`}
              className="max-h-[80vh] w-full object-contain"
            />
          </div>
        </dialog>
      )}
    </div>
  )
}
