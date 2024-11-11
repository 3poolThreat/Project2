<script lang="ts">
    import { onMount } from 'svelte';

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let days: { day: number | null, isCurrentMonth: boolean }[] = [];
    let showModal = false;
    let showOverlapModal = false;

    interface Event {
        date: number;
        month: number;
        year: number;
        name: string;
        time: string;
        endDate: Date | null;
        phoneNumber: string;
    }

    let events: Event[] = [];
    let newEventTitle = "";
    let newEventStart = "";
    let newEventEnd = "";
    let newPhoneNumber = "";
    let selectedCountryCode = "+63"; // Default to Philippines

    const countryCodes = [
        { name: "Philippines", code: "+63", maxLength: 10 },
        { name: "United States", code: "+1", maxLength: 10 },
        { name: "United Kingdom", code: "+44", maxLength: 10 },
        // Add more countries as needed
    ];

    let showOptionsFor: Event | null = null;
    let editingEvent: Event | null = null;

    $: currentMonthEvents = events.filter(event => {
        const eventStartDate = new Date(event.year, event.month, event.date);
        const eventEndDate = event.endDate ? new Date(event.endDate) : eventStartDate;
        const monthStart = new Date(currentYear, currentMonth, 1);
        const monthEnd = new Date(currentYear, currentMonth + 1, 0);
        
        return eventStartDate <= monthEnd && eventEndDate >= monthStart;
    });

    function toggleModal() {
        showModal = !showModal;
    }

    function toggleOverlapModal() {
        showOverlapModal = !showOverlapModal;
    }

    function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        
        if (!newEventStart || !newEventTitle || !newPhoneNumber) {
            alert('Please fill in required fields');
            return;
        }
        
        const startDate = new Date(newEventStart);
        const endDate = newEventEnd ? new Date(newEventEnd) : startDate;
        
        if (endDate < startDate) {
            alert('End date cannot be before start date');
            return;
        }
        
        const isOverlapping = events.some(existingEvent => {
            if (editingEvent && existingEvent === editingEvent) {
                return false; // Skip the event being edited
            }
            const existingStart = new Date(existingEvent.year, existingEvent.month, existingEvent.date);
            const existingEnd = existingEvent.endDate ? new Date(existingEvent.endDate) : existingStart;
            
            return (startDate <= existingEnd && endDate >= existingStart);
        });

        if (isOverlapping) {
            toggleOverlapModal();
            return;
        }
        
        let timeString = formatTime(startDate);
        if (endDate) {
            timeString += ` - ${formatTime(endDate)}`;
        }
        
        const updatedEvent: Event = {
            date: startDate.getDate(),
            month: startDate.getMonth(),
            year: startDate.getFullYear(),
            name: newEventTitle,
            time: timeString,
            endDate: endDate,
            phoneNumber: `${selectedCountryCode} ${newPhoneNumber}`
        };

        if (editingEvent) {
            events = events.map(e => e === editingEvent ? updatedEvent : e);
            editingEvent = null;
        } else {
            events = [...events, updatedEvent];
        }
        
        newEventTitle = "";
        newEventStart = "";
        newEventEnd = "";
        newPhoneNumber = "";
        toggleModal();
    }

    function formatTime(date: Date): string {
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
        });
    }

    function filterNumericInput(event: InputEvent) {
        const input = event.currentTarget as HTMLInputElement;
        input.value = input.value.replace(/\D/g, '');
        
        const country = countryCodes.find(c => c.code === selectedCountryCode);
        if (country && input.value.length > country.maxLength) {
            input.value = input.value.slice(0, country.maxLength); // Limit length
        }
        
        newPhoneNumber = input.value;
    }

    function getEventForDay(day: number) {
        return events.find(event => {
            const startDate = new Date(event.year, event.month, event.date);
            const endDate = event.endDate ? new Date(event.endDate) : startDate;
            const checkDate = new Date(currentYear, currentMonth, day);
            
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(0, 0, 0, 0);
            checkDate.setHours(0, 0, 0, 0);
            
            return checkDate.getTime() === startDate.getTime() || 
                   (event.endDate && checkDate.getTime() === endDate.getTime());
        });
    }

    onMount(() => {
        generateCalendar(currentMonth, currentYear);
    });

    function generateCalendar(month: number, year: number) {
        days = [];
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        for (let i = firstDay - 1; i >= 0; i--) {
            days.push({ day: daysInPrevMonth - i, isCurrentMonth: false });
        }

        for (let i = 1; i <= daysInMonth; i++) {
            days.push({ day: i, isCurrentMonth: true });
        }
    }

    function prevMonth() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar(currentMonth, currentYear);
    }

    function nextMonth() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentMonth, currentYear);
    }

    $: formattedDate = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' }) + ', ' + currentYear;

    function toggleOptions(event: Event, e: MouseEvent) {
        e.stopPropagation();
        showOptionsFor = showOptionsFor === event ? null : event;
    }

    function deleteEvent(eventToDelete: Event) {
        events = events.filter(event => event !== eventToDelete);
        showOptionsFor = null;
    }

    function editEvent(event: Event) {
        editingEvent = event;
        newEventTitle = event.name;
        
        // Adjust for time zone offset
        const startDate = new Date(event.year, event.month, event.date);
        startDate.setMinutes(startDate.getMinutes() - startDate.getTimezoneOffset());
        newEventStart = startDate.toISOString().slice(0, 16);
        
        if (event.endDate) {
            const endDate = new Date(event.endDate);
            endDate.setMinutes(endDate.getMinutes() - endDate.getTimezoneOffset());
            newEventEnd = endDate.toISOString().slice(0, 16);
        } else {
            newEventEnd = "";
        }
        
        newPhoneNumber = event.phoneNumber.split(' ')[1];
        selectedCountryCode = event.phoneNumber.split(' ')[0];
        showOptionsFor = null;
        showModal = true;
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

    .container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin: 10px;
        position: relative;
        width: 100%;
    }

    .calendar-container {
        width: 100%;
        font-family: 'Poppins', sans-serif;
        overflow-x: auto;
    }

    .weekday-header {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        background-color: #ff6f00;
        color: white;
        font-weight: 600;
        text-align: center;
        font-size: 0.75rem;
    }

    .weekday-header div {
    padding: 8px;
    border-right: 1px solid white;
    font-size: 0.9rem;
}

/* Remove the right border for the last element (Saturday) */
.weekday-header div:last-child {
    border-right: none;
}


    .days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 1px;
        background-color: white;
    }

    .day {
        min-height: 82px;
        background-color: #d3d3d3;
        padding: 6px;
        text-align: right;
        position: relative;
        font-size: 0.9rem;
        font-weight: 600;
        color: black;
    }

    .day:nth-child(even) {
        background-color: #e8e8e8;
    }

    .day.past {
        color: #888;
    }

    .events-sidebar {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;
        padding: 0 10px;
        position: relative;
        gap: 10px;
    }

    .events-sidebar h2 {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 10px;
    }

    .event-item {
        background-color: #ff8c44;
        color: white;
        margin-bottom: 5px;
        padding: 12px 16px;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.75rem;
        gap: 12px;
        position: relative;
    }

    .event-date {
        font-weight: bold;
        font-size: 1.4rem;
        margin-right: 10px;
    }

    .event-details {
        flex-grow: 1;
        font-size: 0.95rem;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .event-time {
        font-size: 0.85rem;
        opacity: 0.9;
    }

    .more-options {
        position: relative;
        cursor: pointer;
        padding: 5px;
        font-size: 1.2rem;
    }

    .options-menu {
        position: absolute;
        right: 0;
        top: 100%;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        overflow: hidden;
    }

    .options-menu button {
        display: block;
        width: 100%;
        padding: 8px 16px;
        border: none;
        background: none;
        text-align: left;
        cursor: pointer;
        color: #333;
        font-size: 0.9rem;
        transition: background-color 0.2s;
    }

    .options-menu button:hover {
        background-color: #f5f5f5;
    }

    .options-menu button:last-child {
        color: #ff4444; /* Red color for delete */
    }

    .add-event-button {
        background-color: white;
        color: #ff8c44;
        border: none;
        border-radius: 20px;
        padding: 10px 20px;
        font-size: 0.95rem;
        font-weight: 500;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        white-space: nowrap;
        width: auto;
        min-width: 200px;
    }

    .add-event-button:hover {
        background-color: #fff5ef;
    }

    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal {
        background: white;
        padding: 20px;
        border-radius: 8px;
        width: 90%;
        max-width: 400px;
    }

    .modal h2 {
        margin: 0 0 20px 0;
        font-size: 1.2rem;
    }

    .modal-form {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .form-group label {
        font-size: 0.9rem;
    }

    .form-group input,
    .form-group select {
        padding: 6px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 0.85rem;
    }

    .form-group div {
        display: flex;
        gap: 5px;
    }

    .form-group select {
        width: auto;
        padding: 4px;
        font-size: 0.85rem;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    .form-group input[type="tel"] {
        width: 60%;
    }

    .modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 20px;
    }

    .modal-actions button {
        padding: 8px 16px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
    }

    .cancel-btn {
        background: #ddd;
    }

    .save-btn {
        background: #ff6f00;
        color: white;
    }

    /* Your existing responsive styles */
    @media (min-width: 768px) {
        .container {
            flex-direction: row;
        }

        .calendar-container {
            width: 80%;
        }

        .events-sidebar {
            width: 20%;
        }

        .weekday-header div {
            padding: 10px;
            border-right: 1px solid white;
            font-size: 0.9rem;
        }

        .day {
            min-height: 82px;
            padding: 6px;
            font-size: 0.9rem;
        }
    }

    .button-wrapper {
        display: flex;
        justify-content: center;
        margin-top: 10px;
    }

    /* Update/Add these mobile responsive styles */
    @media (max-width: 768px) {
        .container {
            flex-direction: column;
            margin: 0;
            gap: 0;
            height: 100%;
            width: 100%;
        }

        .calendar-container {
            width: 100%;
            height: auto;
            overflow: visible;
        }

        .days {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 1px;
            background-color: white;
            width: 100%;
        }

        .day {
            min-height: 40px;
            font-size: 0.8rem;
            padding: 2px 4px;
            background-color: #f5f5f5;
            aspect-ratio: 1;
        }

        .weekday-header div {
            font-size: 0.7rem;
            padding: 8px 4px;
            border-right: none;
        }

        .events-sidebar {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
        }
    }

    /* Small phones */
    @media (max-width: 480px) {
        .event-scheduler-title {
            flex-direction: row;
            padding: 10px;
        }

        .title {
            font-size: 1rem;
        }

        .nav-buttons {
            justify-content: center;
            gap: 15px;
        }

        .weekday-header div {
            font-size: 0.6rem;
            padding: 8px 2px;
        }

        .day {
            min-height: 40px;
            font-size: 0.8rem;
            padding: 4px;
        }
    }

    /* Add styles for event indicators in calendar */
    .event-indicator {
        position: absolute;
        left: 4px;
        bottom: 4px;
        right: 4px;
        padding: 2px 4px;
        font-size: 0.8rem;
        text-align: left;
        border-radius: 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .event-indicator.current {
        background-color: #ff8c44;
        color: white;
    }

    .event-indicator.past {
        background-color: #808080;
        color: white;
    }

    .current-day {
        border: 2px solid orange;
        border-radius: 4px; /* Optional: slightly round the corners */
        box-sizing: border-box; /* Ensure the border is included in the element's total width and height */
    }

    .calendar-header {
        background-color: #ff6f00;
        color: black;
        padding: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Poppins', sans-serif;
    }

    .nav-buttons {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .nav-buttons button {
        background: none;
        border: none;
        color: black;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        padding: 0 5px;
    }

    .nav-buttons span {
        font-size: 0.85rem;
        font-weight: 600;
        min-width: 110px;
        text-align: center;
    }

    /* Update mobile styles */
    @media (max-width: 768px) {
        .calendar-header {
            padding: 5px;
        }

        .nav-buttons {
            gap: 8px;
        }

        .nav-buttons span {
            font-size: 0.75rem;
            min-width: 90px;
        }
    }

    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal {
        background: white;
        padding: 20px;
        border-radius: 8px;
        width: 90%;
        max-width: 400px;
    }

    .modal h2 {
        margin: 0 0 20px 0;
        font-size: 1.2rem;
    }

    .modal p {
        font-size: 1rem;
        margin-bottom: 20px;
    }

    .modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 20px;
    }

    .modal-actions button {
        padding: 8px 16px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
    }

    .cancel-btn {
        background: #ddd;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .form-group input,
        .form-group select {
            font-size: 0.8rem;
        }
    }

</style>

<div class="container">
    <div class="calendar-container">
        <div class="calendar-header">
            <div class="nav-buttons">
                <button on:click={prevMonth}>❮</button>
                <span>{formattedDate}</span>
                <button on:click={nextMonth}>❯</button>
            </div>
        </div>
        <div class="weekday-header">
            <div>SUN</div>
            <div>MON</div>
            <div>TUE</div>
            <div>WED</div>
            <div>THU</div>
            <div>FRI</div>
            <div>SAT</div>
        </div>

        <div class="days">
            {#each days as { day, isCurrentMonth }}
                <div class="day {isCurrentMonth ? '' : 'past'} {
                    isCurrentMonth && 
                    day === currentDate.getDate() && 
                    currentMonth === currentDate.getMonth() && 
                    currentYear === currentDate.getFullYear() 
                    ? 'current-day' 
                    : ''}">
                    {day}
                    {#if day !== null}
                        {@const event = getEventForDay(day)}
                        {#if event}
                            {@const eventDate = new Date(event.year, event.month, event.date)}
                            {@const currentDate = new Date()}
                            {@const isPast = eventDate < new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())}
                            <div class="event-indicator {isPast ? 'past' : 'current'}">
                                {event.name}
                            </div>
                        {/if}
                    {/if}
                </div>
            {/each}
        </div>
    </div>

    <div class="events-sidebar">
        <h2>{formattedDate}</h2>
        {#if currentMonthEvents.length === 0}
            <p>No events scheduled</p>
        {:else}
            {#each currentMonthEvents as event}
                <div class="event-item">
                    <div class="event-date">{event.date}</div>
                    <div class="event-details">
                        <div>{event.name}</div>
                        <div class="event-time">{event.time}</div>
                        <div class="event-phone">{event.phoneNumber}</div>
                    </div>
                    <div class="more-options" on:click={(e) => toggleOptions(event, e)}>
                        ...
                        {#if showOptionsFor === event}
                            <div class="options-menu" on:click|stopPropagation>
                                <button on:click={() => editEvent(event)}>Edit</button>
                                <button on:click={() => deleteEvent(event)}>Delete</button>
                            </div>
                        {/if}
                    </div>
                </div>
            {/each}
        {/if}
        <div class="button-wrapper">
            <button class="add-event-button" on:click={toggleModal}>Add an Event/Reminder</button>
        </div>
    </div>
</div>

{#if showModal}
    <div class="modal-backdrop" on:click={toggleModal}>
        <div class="modal" on:click|stopPropagation>
            <h2>{editingEvent ? 'Edit Event' : 'Add Event/Reminder'}</h2>
            <form class="modal-form" on:submit={handleSubmit}>
                <div class="form-group">
                    <label for="title">Add Title*</label>
                    <input 
                        type="text" 
                        id="title" 
                        bind:value={newEventTitle}
                        required
                        placeholder="Enter event title"
                    />
                </div>
                <div class="form-group">
                    <label for="phone">Phone Number*</label>
                    <div style="display: flex; gap: 5px;">
                        <select bind:value={selectedCountryCode}>
                            {#each countryCodes as { name, code }}
                                <option value={code}>{name} ({code})</option>
                            {/each}
                        </select>
                        <input 
                            type="tel" 
                            id="phone" 
                            bind:value={newPhoneNumber}
                            on:input={(e) => filterNumericInput(e as any)}
                            required
                            placeholder="Enter phone number"
                        />
                    </div>
                </div>
                <div class="form-group">
                    <label for="start">Start Date and Time*</label>
                    <input 
                        type="datetime-local" 
                        id="start" 
                        bind:value={newEventStart}
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="end">End Date and Time (optional)</label>
                    <input 
                        type="datetime-local" 
                        id="end" 
                        bind:value={newEventEnd}
                        min={newEventStart}
                    />
                </div>
                <div class="modal-actions">
                    <button type="button" class="cancel-btn" on:click={toggleModal}>Cancel</button>
                    <button type="submit" class="save-btn">Save</button>
                </div>
            </form>
        </div>
    </div>
{/if}

{#if showOverlapModal}
    <div class="modal-backdrop" on:click={toggleOverlapModal}>
        <div class="modal" on:click|stopPropagation>
            <h2>Event Overlap</h2>
            <p>This event overlaps with an existing event. Please choose a different time.</p>
            <div class="modal-actions">
                <button type="button" class="cancel-btn" on:click={toggleOverlapModal}>Close</button>
            </div>
        </div>
    </div>
{/if}

