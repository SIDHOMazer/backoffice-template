export interface PlanDeTraitement {

    id?: number;
    exercicePlanId?: number;
    testDeSantePlanId?: number;
    medicamentPlanId?: number;
  
    objectif?: string;
    dateDebut?: string;
    dateFin?: string;
    patientId?: number;
    docteurId?: number;
    createdAt?: string;
    updatedAt?: string;
    checkbox?: string;
    status?: boolean;

}
