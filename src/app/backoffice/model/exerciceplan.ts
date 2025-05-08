export interface ExercicePlan {
    id?: number;
    exerciceId?: number;
    planDeTraitementId?: number;
    duree?: number;
    jour?: number;
    type?: string;
    seance?: number;
    muscles?: string;
    seriesAndRepetitions?: string;
    checkbok?: string;
    createdAt?: string;
    updatedAt?: string;
    status?:boolean;
}
