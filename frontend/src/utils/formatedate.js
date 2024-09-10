export const formateDate = (timestamp) =>{
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minitues = date.getMinutes().toString().padStart(2,"0")
    return `${hours}:${minitues}`;

}