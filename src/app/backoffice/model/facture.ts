export interface Facture {
status: any;
    id?: number;
    patientId?: number;
    date?: string|number|Date;
    description?: string;
    price?: number;
    invoice?: string;
    subTotal?: number;
    paymentMethod?: string;
    tax?: number;
    total?: number;
    qty?: number;
    createdAt?: string;
    updatedAt?: string;

}
