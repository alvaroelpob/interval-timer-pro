export type ArrayDB = Array<{
    id: number;
    name: string;
    prepTime: number;
    activeTime: number;
    restTime: number;
    restBetweenSets: number;
    series: number;
    sets: number;
}>;

export type NewArrayDB = Array<{
    id: number;
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
    id?: number;
    name: string;
    prepTime: number;
    activeTime: number;
    restTime: number;
    restBetweenSets: number;
    series: number;
    sets: number;
};

export type WorkoutFormated = {
    id: number;
    name: string;
    prepTime: string;
    activeTime: string;
    restTime: string;
    restBetweenSets: string;
    series: number;
    sets: number;
    totalTime: string;
};

export type SettingsT = {
    volume: number;
    vibration: number;
}