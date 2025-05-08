export interface Patient {
    id?: number;
    firstname?: string;
    lastname?: string;
    adresse?: string;
    contact?: string;
    ville?: string;
    codePostal?: string;
    email?: string;
    sexe?: string;
    dateNaissance?: string;
   createdAt?: string;
    updatedAt?: string;
    status?:boolean;
}