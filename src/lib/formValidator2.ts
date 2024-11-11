export interface Event {
    date: number;
    month: number;
    year: number;
    name: string;
    time: string;
    endDate: Date | null;
}

export function validateEventForm(
    newEventTitle: string,
    newEventStart: string,
    newEventEnd: string,
    events: Event[]
): { isValid: boolean; message: string } {
    if (!newEventTitle.trim()) {
        return { isValid: false, message: 'Event title is required.' };
    }

    if (!newEventStart) {
        return { isValid: false, message: 'Start date and time are required.' };
    }

    const startDate = new Date(newEventStart);
    const endDate = newEventEnd ? new Date(newEventEnd) : startDate;

    if (endDate < startDate) {
        return { isValid: false, message: 'End date cannot be before start date.' };
    }

    // Check for event conflicts
    const isConflict = events.some(event => {
        const eventStartDate = new Date(event.year, event.month, event.date);
        const eventEndDate = event.endDate ? new Date(event.endDate) : eventStartDate;

        return (startDate <= eventEndDate && endDate >= eventStartDate);
    });

    if (isConflict) {
        return { isValid: false, message: 'There is a conflict with an existing event.' };
    }

    return { isValid: true, message: '' };
}
