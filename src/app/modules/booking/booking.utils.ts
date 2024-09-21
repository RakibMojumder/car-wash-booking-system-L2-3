const formattedDate = (date: string) => {
    return date.replace(
        /(\d{1,2})\/(\d{1,2})\/(\d{4})/,
        (match, month, day, year) => {
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
    );
};

export default formattedDate;
