function displayTime(timeDifference) {
    const currentTime = new Date();
    const offsetTime = new Date(currentTime.getTime() + (timeDifference * 1000));

    const hours = offsetTime.getHours().toString().padStart(2, '0');
    const minutes = offsetTime.getMinutes().toString().padStart(2, '0');
    const seconds = offsetTime.getSeconds().toString().padStart(2, '0');

    const formattedTime = `${hours}:${minutes}:${seconds}`;

    console.log(formattedTime)
}


const timeDifference = 3600 - 3600;
displayTime(timeDifference)