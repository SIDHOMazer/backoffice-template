export interface Facture {
    id?: number;
    patientId?: number;
    date?: string|number|Date;
    description?: string;
    prix?: number;
    invoice?: string;
    
    paymentMethod?: string;
   
    total?: number;
    
    createdAt?: string;
    updatedAt?: string;
    status?:boolean;

}
