export interface Eventos {
  target: any;
  id: number;
  devolucion: number;
  fecha_destacado: number;
  detalle: boolean;
  anterior: boolean;
  archivar: boolean;
  destacado: boolean;
  ubicacion_auto: boolean;
  descripcion: string;
  medio_pago: string;
  nombre: string;
  url: string;
  productor_id: ProductorId;
  escenario_id: EscenarioId;
  categoria_id: CategoriaId;
  campos_eventoes: CamposEventoes[];
  nps_mp_eventoes: any[];
}

export interface ProductorId {
  id: number;
  novedades: boolean;
}

export interface EscenarioId {
  id: number;
  nombre: string;
  direccion: string;
  descripcion: string;
  coordenadas: string;
  cantidad_sectores: any;
  capacidad: any;
}

export interface CategoriaId {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface CamposEventoes {
  id: number;
  nombre: string;
  tipo: string;
  valor: string;
}