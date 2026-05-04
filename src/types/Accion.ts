export interface Accion {
  id: number;
  fondo: string;
  periodo: string;
  mes: string;
  orden: string;
  fechaRegistro: string;
  accion: string;
  tipo: 'Compra' | 'Venta';
  cantidad: number;
  precio: number;
  subTotal: number;
  estado: 'Confirmado' | 'Pendiente' | 'Anulado';
}