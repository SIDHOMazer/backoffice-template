export interface PlanDeTraitement {

    id?: number;
    exercicePlanId?: number;
    testDeSantePlanId?: number;
    medicamentPlanId?: number;
    objectif?: string;
    dateDebut?: string;
    dateFin?: string;
    status?: boolean;
    patientId?: number;
    docteurId?: number;
    createdAt?: string;
    updatedAt?: string;

}