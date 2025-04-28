export interface Medicamentplan {
    id?: number;
    medicamentId?: number;
    planDeTraitementId?: number;
    dosage?: number;
    frequence?: number;
    MomentOfTaking?: string;
    createdAt?: string;
    updatedAt?: string;
    status?:boolean;
}