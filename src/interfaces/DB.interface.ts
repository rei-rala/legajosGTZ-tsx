export interface IAnalista {
  id: string;
  nombre: string;
  nivelPredefinido: string;
  tipoAnalista: string;
  licencia: boolean;
}

export interface ILegajo {
  id: string;
  analistaAsignadoId: string;
  asignado: boolean;
  codSolicitud: number;
  estado: string;
  fechaIngresoShort: string;
  fechaIngresoFull: any;
  fechaAsignadoShort: string;
  fechaAsignadoFull: Date;
  nivelLegajo: string;
  razonSocial: string;
  analistaAsignadoNombre?: string;
  tipoAnalista?: string;
  diasGR?: number;
}