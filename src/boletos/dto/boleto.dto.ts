export class BoletoDto {
    id_boleto: number;  // ID del boleto
  
    numero_asiento: number;  // Número de asiento
  
    precio: number;  // Precio del boleto
  
    fecha_compra: string;  // Fecha y hora de compra
  
    usuario: string;  // Nombre del usuario que compró el boleto
  
    bus_placa: string;  // Placa del bus
  
    ruta: string;  // Nombre de la ruta
  
    constructor(boleto: any) {
      this.id_boleto = boleto.id_boleto;
      this.numero_asiento = boleto.numero_asiento;
      this.precio = boleto.precio;
      this.fecha_compra = boleto.fecha_compra;
      this.usuario = boleto.usuario;
      this.bus_placa = boleto.bus_placa;
      this.ruta = boleto.ruta;
    }
  }
  