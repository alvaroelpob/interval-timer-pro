type ArrayDB = Array<{
    id: string;
    name: string;
    prepTime: number;
    activeTime: number;
    restTime: number;
    restBetweenSets: number;
    series: number;
    sets: number;
}>;

type NewArrayDB = Array<{
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

type Workout = {
    id?: string;
    name?: string;
    prepTime: number;
    activeTime: number;
    restTime: number;
    restBetweenSets: number;
    series: number;
    sets: number;
};


function formatTime(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function calcTotalTime(workout: Workout) {
    const { prepTime, activeTime, restTime, restBetweenSets, series, sets } = workout;
    return (+prepTime + ((+activeTime + +restTime) * (+series - 1) + (+activeTime + +restBetweenSets)) * +sets) - +restBetweenSets;
}

function normalizer(arrayDB: ArrayDB): NewArrayDB {
    const newArray: NewArrayDB = [];

    arrayDB.forEach(workout => {
        const { id, name, prepTime, activeTime, restTime, restBetweenSets, series, sets } = workout;

        const newObject = {
            id: id,
            name: name,
            prepTime: formatTime(prepTime),
            activeTime: formatTime(activeTime),
            restTime: formatTime(restTime),
            restBetweenSets: formatTime(restBetweenSets),
            series: series,
            sets: sets,
            totalTime: formatTime(calcTotalTime(workout))
        }

        newArray.push(newObject)
    });

    return newArray
}

export default normalizer;
export { formatTime, calcTotalTime };
