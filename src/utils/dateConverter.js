import moment from "moment/moment";

export const dateConvert = (date) => {
    const now = new Date();
    const d = new Date(date);
    if (now.getFullYear() === d.getFullYear()) 
        return moment(date).format("MMM D")
    return moment(date).format("MMM D, YYYY")
}

export const dateConvertFull = (date) => {
    const now = new Date();
    const d = new Date(date);
    if (now.getFullYear() === d.getFullYear()) 
        return moment(date).format("MMMM D")
    return moment(date).format("MMMM D, YYYY")
}
