export interface testDeSanteplan {
    id?: number;
    planDeTraitementId?: number;
    testDeSanteId?: number;
    
    poids?: number;
    taille?: number;
    sexe?: string;
    fumer?: boolean;
    alcoolique?: boolean;
    sportif?: boolean;
    symptomes?: string;
    checkbox?: string;
    createdAt?: string;
    updatedAt?: string;
    status?:boolean;
}


