export interface OrdemServico {
    id?: number;
    idcliente: number;
    placa: string;
    modelo: string;
    cliente: string;
    quantidade: number;
    descricaoservico: string;
    vrunitario: number;
    vrtotal:number;
}
