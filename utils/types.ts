export type ArrayDB = Array<{
    id: string;
    name: string;
    prepTime: number;
    activeTime: number;
    restTime: number;
    restBetweenSets: number;
    series: number;
    sets: number;
}>;

export type NewArrayDB = Array<{
    id: string;
    name: string;
    prepTime: string;
    activeTime: string;
    restTime: string;
    restBetweenSets: string;
    series: number;
    sets: number;
    totalTime: string;
}>;

export type Workout = {
    id?: string;
    name?: string;
    prepTime: number;
    activeTime: number;
    restTime: number;
    restBetweenSets: number;
    series: number;
    sets: number;
};
