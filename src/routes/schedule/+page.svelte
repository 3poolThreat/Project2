<script lang="ts">
    import { onMount } from 'svelte';

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let days: { day: number | null, isCurrentMonth: boolean }[] = [];

    onMount(() => {
        generateCalendar(currentMonth, currentYear);
    });

    function generateCalendar(month: number, year: number) {
        days = [];
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        // Add previous month's days
        for (let i = firstDay - 1; i >= 0; i--) {
            days.push({ day: daysInPrevMonth - i, isCurrentMonth: false });
        }

        // Add current month's days
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
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

    .container {
        display: flex;
        justify-content: space-between;
        margin: 20px;
        position: relative;
        gap: 20px;
    }

    .event-scheduler-title {
        background-color: #ff6f00;
        color: black;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: 'Poppins', sans-serif;
    }

    .title {
        font-size: 20px;
        font-weight: 600;
    }

    .nav-buttons {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .nav-buttons button {
        background: none;
        border: none;
        color: black;
        cursor: pointer;
        font-size: 24px;
        font-weight: 600;
    }

    .nav-buttons span {
        font-size: 22px;
        font-weight: 600;
    }

    .icon-buttons {
        display: flex;
        gap: 15px;
    }

    .icon-buttons button {
        background: none;
        border: none;
        color: black;
        cursor: pointer;
        font-size: 24px;
        font-weight: 600;
        padding: 5px 10px;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.2);
    }

    .calendar-container {
        width: 75%;
        font-family: 'Poppins', sans-serif;
    }

    .weekday-header {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        background-color: #ff6f00;
        color: white;
        font-weight: 600;
        text-align: center;
    }

    .weekday-header div {
        padding: 8px;
        border-right: 1px solid white;
    }

    .days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 1px;
        background-color: white;
    }

    .day {
        min-height: 80px;
        background-color: #d3d3d3;
        padding: 8px;
        text-align: right;
        position: relative;
        font-size: 15px;
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
        width: 25%;
        padding: 0 20px;
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .events-sidebar h2 {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 15px;
    }

    .event-item {
        background-color: #ff8c44;
        color: white;
        margin-bottom: 12px;
        padding: 12px 15px;
        border-radius: 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
    }

    .event-item .event-date {
        font-weight: bold;
        font-size: 24px;
        margin-right: 10px;
    }

    .event-item .event-details {
        flex-grow: 1;
    }

    .event-item .event-time {
        font-size: 12px;
        opacity: 0.9;
    }

    .event-item .more-options {
        cursor: pointer;
        padding: 5px;
    }

    .add-event-button {
        position: absolute;
        left: 84%;
        transform: translateX(-50%);
        bottom: 15px;
        padding: 16px 32px;
        background-color: white;
        color: #ff8c44;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 500;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        white-space: nowrap;
        transition: all 0.3s ease;
        z-index: 10;
    }

    .add-event-button:hover {
        background-color: #fff5ef;
    }

    .day .event-indicator {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #ff8c44;
        color: white;
        padding: 4px;
        font-size: 12px;
        text-align: left;
    }

    .day.past .event-indicator {
        background-color: #888;
    }

    .weekday-header div:last-child {
        border-right: none;
    }

    .past-event {
        background-color: #888;
    }
</style>

<div class="event-scheduler-title">
    <span class="title">Event Scheduler</span>
    <div class="nav-buttons">
        <button on:click={prevMonth}>❮</button>
        <span>{formattedDate}</span>
        <button on:click={nextMonth}>❯</button>
    </div>
    <div class="icon-buttons">
        <button>◻</button>
        <button>☰</button>
    </div>
</div>

<div class="container">
    <div class="calendar-container">
        <div class="weekday-header">
            <div>SUNDAY</div>
            <div>MONDAY</div>
            <div>TUESDAY</div>
            <div>WEDNESDAY</div>
            <div>THURSDAY</div>
            <div>FRIDAY</div>
            <div>SATURDAY</div>
        </div>

        <div class="days">
            {#each days as { day, isCurrentMonth }}
                <div class="day {isCurrentMonth ? '' : 'past'}">
                    {day}
                    {#if day === 27 || day === 29 || day === 30 || day === 31}
                        <div class="event-indicator">Event Name</div>
                    {/if}
                </div>
            {/each}
        </div>
    </div>

    <div class="events-sidebar">
        <h2>{formattedDate}</h2>
        <div class="event-item">
            <div class="event-date">27</div>
            <div class="event-details">
                <div>MandoPops 3rd Day</div>
                <div class="event-time">2:00 PM</div>
            </div>
            <div class="more-options">...</div>
        </div>
        <div class="event-item">
            <div class="event-date">29</div>
            <div class="event-details">
                <div>3rd Anniversary</div>
                <div class="event-time">9:00 AM - 4:00 PM</div>
            </div>
            <div class="more-options">...</div>
        </div>
        <div class="event-item">
            <div class="event-date">30</div>
            <div class="event-details">
                <div>Championship Game</div>
                <div class="event-time">7:30 PM</div>
            </div>
            <div class="more-options">...</div>
        </div>
        <div class="event-item">
            <div class="event-date">31</div>
            <div class="event-details">
                <div>Academic Break</div>
                <div class="event-time">10:00 AM - 1:00 PM</div>
            </div>
            <div class="more-options">...</div>
        </div>
    </div>
</div>

<button class="add-event-button">Add an Event/Reminder</button>
