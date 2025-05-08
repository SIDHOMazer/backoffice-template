export interface Rapport {
    id?: number;
    file?: string;
    patientId?: number;
    docteurId?: number;
    auteur?: string;
    description?: string;
    type?: string;
    date?: string;
    heure?: string;
    createdAt?: string;
    updatedAt?: string;
    status?:boolean;
}

