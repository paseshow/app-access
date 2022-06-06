export interface SectorEventos {
  id: number;
  descripcion: string;
  etiqueta_sector: string;
  evento_id: any;
  fecha_funcion: number;
  fecha_limite: number;
  fijo_predio: number;
  fijo_web: number;
  invisible: boolean;
  orden: number;
  precio: number;
  sc_pf: number;
  sc_predio: number;
  sc_pv: number;
  sc_web: number;
  sector_id: string;
  venta_predio_: boolean;
  venta_pv: boolean;
  venta_web: boolean;
}

export interface SectorId {
    nombre: string;
}