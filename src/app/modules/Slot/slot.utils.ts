const generateSlots = (
    startTimeStr: string,
    endTimeStr: string,
    intervalMinutes: number
) => {
    // Parse the start and end times
    const [startHour, startMinute] = startTimeStr.split(':').map(Number);
    const [endHour, endMinute] = endTimeStr.split(':').map(Number);

    const startTime = new Date();
    startTime.setHours(startHour, startMinute, 0, 0);

    const endTime = new Date();
    endTime.setHours(endHour, endMinute, 0, 0);

    let currentTime = new Date(startTime);
    const slots = [];

    // Generate slots
    while (currentTime < endTime) {
        const slotEndTime = new Date(
            currentTime.getTime() + intervalMinutes * 60000
        );

        // Ensure the slot end time doesn't exceed the overall end time
        if (slotEndTime > endTime) {
            break;
        }

        slots.push({
            StartTime: formatTime(currentTime),
            EndTime: formatTime(slotEndTime),
        });

        // Move to the next slot start time
        currentTime = new Date(slotEndTime);
    }

    return slots;
};

// Helper function to format time as "HH:MM"
const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

export default generateSlots;
