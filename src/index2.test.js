import { describe, it, expect } from 'vitest';
import { validateEventForm } from './lib/formValidator2';

// Mock Event interface for testing
const existingEvents = [
    { date: 15, month: 5, year: 2023, name: 'Meeting', time: '10:00 AM', endDate: new Date(2023, 5, 15, 11, 0) }
];

describe('validateEventForm', () => {
    it('should return invalid if title is empty', () => {
        const result = validateEventForm('', '2023-06-15T10:00', '', existingEvents);
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('Event title is required.');
    });

    it('should return invalid if start date is empty', () => {
        const result = validateEventForm('New Event', '', '', existingEvents);
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('Start date and time are required.');
    });

    it('should return invalid if end date is before start date', () => {
        const result = validateEventForm('New Event', '2023-06-15T10:00', '2023-06-15T09:00', existingEvents);
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('End date cannot be before start date.');
    });

    it('should return invalid if there is a conflict with existing events', () => {
        const result = validateEventForm('New Event', '2023-06-15T10:30', '2023-06-15T11:30', existingEvents);
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('There is a conflict with an existing event.');
    });

    it('should return valid if there are no issues', () => {
        const result = validateEventForm('New Event', '2023-06-16T10:00', '', existingEvents);
        expect(result.isValid).toBe(true);
        expect(result.message).toBe('');
    });
});
