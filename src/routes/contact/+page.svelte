<script lang="ts">
    import { onMount } from 'svelte';

    let firstName = '';
    let lastName = '';
    let email = '';
    let phoneNumber = '';
    let message = '';
    
    let showModal = true;

    const handleSubmit = (event: Event) => {
        event.preventDefault();
        console.log({ firstName, lastName, email, phoneNumber, message });
        firstName = '';
        lastName = '';
        email = '';
        phoneNumber = '';
        message = '';
        showModal = false;
        localStorage.setItem('modalState', 'false');
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            showModal = false;
            localStorage.setItem('modalState', 'false');
        }
    };

    const closeModal = () => {
        showModal = false;
        localStorage.setItem('modalState', 'false');
    };

    const filterNumericInput = (event: Event) => {
        const input = event.target as HTMLInputElement;
        input.value = input.value.replace(/\D/g, '');
        phoneNumber = input.value;
    };

    onMount(() => {
        if (showModal) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });
</script>

{#if showModal}
<div class="modal show">
    <div class="modal-content">
        <h2>Contact Form</h2>
        <p>Got any questions you want us to answer?<br>Just write us a message here</p>
        
        <div class="form-group">
            <label for="firstName">Full Name:</label>
            <div class="name-fields">
                <input id="firstName" type="text" placeholder="First Name" bind:value={firstName} />
                <input id="lastName" type="text" placeholder="Last Name" bind:value={lastName} />
            </div>
        </div>
        <div class="form-group">
            <label for="email">Email:</label>
            <input id="email" type="email" placeholder="Email" bind:value={email} />
        </div>
        <div class="form-group">
            <label for="phoneNumber">Phone Number:</label>
            <input
                id="phoneNumber"
                type="text"
                placeholder="Phone Number"
                bind:value={phoneNumber}
                on:input={filterNumericInput}
            />
        </div>
        <div class="form-group">
            <label for="message">Message:</label>
            <textarea id="message" placeholder="Message" bind:value={message}></textarea>
        </div>

        <div class="button-group">
            <a href="/"><button on:click={closeModal} class="close-button">Close</button></a>
            <a href="/"><button type="button" on:click={handleSubmit} class="submit-button">Submit</button></a>
        </div>
    </div>
</div>
{/if}

<style>
    /* Base Styles */
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .modal.show {
        visibility: visible;
        opacity: 1;
    }

    .modal-content {
        background-color: white;
        padding: clamp(15px, 3vw, 20px);
        border-radius: 8px;
        width: clamp(300px, 35vw, 380px);
        max-width: 90%;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
        display: flex;
        margin-top: clamp(15px, 4vh, 25px);
        flex-direction: column;
        justify-content: space-between;
        text-align: center;
    }

    .modal-content h2 {
        font-size: clamp(18px, 2.5vw, 22px);
        font-weight: bold;
        margin: 0 0 8px 0;
    }

    .modal-content p {
        font-size: clamp(13px, 1.5vw, 15px);
        margin-bottom: 12px;
    }

    .form-group {
        margin-bottom: 10px;
    }

    .form-group label {
        font-size: 15px;
        color: #333;
        font-weight: 500;
        display: block;
        margin-bottom: 4px;
    }

    .name-fields {
        display: flex;
        gap: 8px;
    }

    .modal-content input[type="text"],
    .modal-content input[type="email"],
    .modal-content textarea {
        width: 100%;
        padding: 8px 10px;
        font-size: clamp(13px, 1.5vw, 15px);
        border: 1.5px solid #c2bebe;
        border-radius: 5px;
        color: #333;
        background-color: #f5f5f5;
        margin-top: 3px;
    }

    .modal-content textarea {
        resize: vertical;
        min-height: clamp(45px, 8vh, 60px);
        max-height: 150px;
    }

    .button-group {
        display: flex;
        justify-content: space-between;
        padding-top: 12px;
        gap: 10px;
        margin-top: 8px;
    }

    .close-button, .submit-button {
        padding: 9px 16px;
        font-size: 14px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        flex: 1;
        text-transform: capitalize;
        letter-spacing: 0.3px;
        position: relative;
        overflow: hidden;
    }

    .submit-button {
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        color: white;
        box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2),
                    inset 0 1px 1px rgba(255, 255, 255, 0.2);
    }

    .submit-button:hover {
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(37, 99, 235, 0.25),
                    inset 0 1px 1px rgba(255, 255, 255, 0.2);
    }

    .submit-button:active {
        transform: translateY(1px);
        box-shadow: 0 1px 2px rgba(37, 99, 235, 0.2);
    }

    .close-button {
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        color: #475569;
        border: 1px solid #e2e8f0;
    }

    .close-button:hover {
        background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
        color: #334155;
        transform: translateY(-1px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }

    .close-button:active {
        transform: translateY(1px);
        background: #e2e8f0;
    }

    /* Button ripple effect */
    .submit-button::after,
    .close-button::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 5px;
        height: 5px;
        background: rgba(255, 255, 255, 0.5);
        opacity: 0;
        border-radius: 100%;
        transform: scale(1, 1) translate(-50%);
        transform-origin: 50% 50%;
    }

    .submit-button:focus:not(:active)::after,
    .close-button:focus:not(:active)::after {
        animation: ripple 0.5s ease-out;
    }

    @keyframes ripple {
        0% {
            transform: scale(0, 0);
            opacity: 0.5;
        }
        100% {
            transform: scale(40, 40);
            opacity: 0;
        }
    }

    /* PC Styles */
    @media (min-width: 769px) {
        .modal-content {
            width: 700px;
        }
    }

    /* Mobile Styles */
    @media (max-width: 768px) {
        .modal-content {
            width: 85%;
            padding: 15px;
            margin-top: 15px;
        }

        .button-group {
            flex-direction: column-reverse;
            gap: 8px;
        }

        .close-button, .submit-button {
            width: 100%;
            padding: 11px;
            font-size: 14px;
        }
    }

    @media (max-width: 480px) {
        .modal-content h2 {
            font-size: 28px;
        }

        .modal-content p {
            font-size: 12px;
        }

        .form-group label {
            font-size: 12px;
        }

        .modal-content input[type="text"],
        .modal-content input[type="email"],
        .modal-content textarea {
            font-size: 13px;
            padding: 6px;
        }

        .name-fields {
            flex-direction: column;
        }

        .button-group {
            flex-direction: column;
            gap: 8px;
        }
    }

    /* Disable hover effects on touch devices but keep active state */
    @media (hover: none) {
        .close-button:hover, .submit-button:hover {
            transform: none;
            box-shadow: none;
        }
        
        .close-button:active, .submit-button:active {
            transform: scale(0.98);
            transition: transform 0.1s;
        }
    }
</style>
  