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
  fechaIngresoFull: string;
  fechaAsignadoShort: string;
  fechaAsignadoFull: string;
  nivelLegajo: string;
  razonSocial: string;
}