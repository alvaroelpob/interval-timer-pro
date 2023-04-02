import type { ArrayDB, NewArrayDB, Workout } from "./types";

function formatTime(totalSeconds: number, withHours?: boolean): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const time = [];

    if (withHours) {
        const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
        time.push(formattedHours);
    }

    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    time.push(formattedMinutes);

    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    time.push(formattedSeconds);

    let finalTime = "";
    for (let i = 0; i < time.length; i++) {
        finalTime += time[i]
        if (i !== time.length - 1) {
            finalTime += ":";
        }
    }
    return finalTime;
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
            totalTime: formatTime(calcTotalTime(workout), true)
        }

        newArray.push(newObject)
    });

    return newArray
}

export default normalizer;
export { formatTime, calcTotalTime };
