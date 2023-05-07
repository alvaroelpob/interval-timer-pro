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

export type BackgroundColors = {
    prepTime: string;
    activeTime: string;
    restTime: string;
}

export const DEFAULT_COLORS: BackgroundColors = {
    prepTime: "#0076BE",
    activeTime: "#DE2B00",
    restTime: "#017A10",
}