<script lang="ts">
    import { onMount } from 'svelte';

    let firstName = '';
    let lastName = '';
    let email = '';
    let phoneNumber = '';
    let message = '';
    
    let showModal = true;

    let selectedCountry = '+63';

    const countries = [
        { code: '+63', name: 'Philippines', maxLength: 10 },
        { code: '+60', name: 'Malaysia', maxLength: 11 },
        { code: '+65', name: 'Singapore', maxLength: 8 },
        { code: '+62', name: 'Indonesia', maxLength: 11 },
        { code: '+66', name: 'Thailand', maxLength: 9 },
    ];

    const handleSubmit = (event: Event) => {
        event.preventDefault();

        if (firstName && lastName && email && phoneNumber && message) {
            console.log({ firstName, lastName, email, phoneNumber, message });
            firstName = '';
            lastName = '';
            email = '';
            phoneNumber = '';
            message = '';
            showModal = false;
            localStorage.setItem('modalState', 'false');
            window.location.href = './';
        }
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
        
        const country = countries.find(c => c.code === selectedCountry);
        if (country && input.value.length > country.maxLength) {
            input.value = input.value.slice(0, country.maxLength);
        }
        
        phoneNumber = input.value;
    };

    $: fullPhoneNumber = phoneNumber ? `${selectedCountry}${phoneNumber}` : '';

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
        
        <form on:submit={handleSubmit}>
            <div class="form-group">
                <div class="name-fields">
                    <div class="input-with-icon">
                        <i class="fas fa-user"></i>
                        <input id="firstName" type="text" placeholder="First Name" bind:value={firstName} required />
                    </div>
                    <div class="input-with-icon">
                        <i class="fas fa-user"></i>
                        <input id="lastName" type="text" placeholder="Last Name" bind:value={lastName} required />
                    </div>
                </div>
            </div>

            <div class="form-group">
                <div class="input-with-icon">
                    <i class="fas fa-envelope"></i>
                    <input id="email" type="email" placeholder="Email" bind:value={email} required />
                </div>
            </div>

            <div class="form-group">
                <div class="phone-input-container">
                    <div class="input-with-icon">
                        <select 
                            bind:value={selectedCountry}
                            class="country-select"
                            required
                        >
                            {#each countries as country}
                                <option value={country.code}>
                                    {country.name} ({country.code})
                                </option>
                            {/each}
                        </select>
                    </div>
                    <div class="input-with-icon">
                        <i class="fas fa-mobile-alt"></i>
                        <input
                            id="phoneNumber"
                            type="text"
                            placeholder="Phone Number"
                            bind:value={phoneNumber}
                            on:input={filterNumericInput}
                            class="phone-input"
                            required
                        />
                    </div>
                </div>
            </div>

            <div class="form-group">
                <textarea id="message" placeholder="Message:" bind:value={message} required></textarea>
            </div>

            <div class="button-group">
                <a href="./" class="close-button-link">
                    <button type="button" class="close-button">Close</button>
                </a>
                
                <button type="submit" class="submit-button">Submit</button>
            </div>
        </form>
    </div>
</div>
{/if}

<style>
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
        padding: 20px;
        border-radius: 8px;
        width: 600px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
        display: flex;
        margin-top: 20px;
        flex-direction: column;
        justify-content: space-between;
        text-align: center;
    }

    .modal-content h2 {
        font-size: 24px;
        margin-bottom: 10px;
    }

    .modal-content p {
        font-size: 14px;
        margin-bottom: 16px;
    }

    .form-group {
        margin-bottom: 12px;
    }

    .name-fields {
        display: flex;
        gap: 12px;
    }

    .input-with-icon {
        position: relative;
        width: 100%;
    }

    .input-with-icon i {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: #888;
    }

    .modal-content input[type="text"],
    .modal-content input[type="email"],
    .modal-content textarea {
        width: 100%;
        padding: 8px 10px;
        padding-left: 30px;
        font-size: 13px;
        border: 1.5px solid #c2bebe;
        border-radius: 5px;
        color: #333;
        background-color: #f5f5f5;
    }

    .modal-content textarea {
        resize: vertical;
        min-height: 50px;
        max-height: 150px;
    }

    .button-group {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        margin-top: 16px;
    }

    .close-button, .submit-button {
        padding: 10px 20px;
        font-size: 14px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        width: 100%; /* Ensure both buttons have the same width */
    }

    .submit-button {
        background-color: #4CAF50;
        color: white;
        width: 90px;
    }

    .submit-button:hover {
        background-color: #45a049;
    }

    .submit-button:active {
        transform: translateY(1px);
    }

    .close-button {
        background-color: #e74c3c;
        color: white;
        border: 1.5px solid #d73a32;
    }

    .close-button:hover {
        background-color: #c0392b;
    }

    .close-button:active {
        transform: translateY(1px);
    }

    .phone-input-container {
        display: flex;
        gap: 12px;
        justify-content: space-between;
        margin-top: 12px;
    }

    .country-select {
        padding: 8px;
        font-size: 13px;
        border: 1.5px solid #c2bebe;
        border-radius: 5px;
        color: #333;
        background-color: #f5f5f5;
        width: 160px;
    }

    .phone-input {
        flex: 1;
        padding-left: 30px;
        font-size: 13px;
    }

    @media (max-width: 480px) {
        .modal-content {
            width: 90%;
        }

        .phone-input-container {
            gap: 8px;
        }

        .country-select, .phone-input {
            font-size: 12px;
        }

        .modal-content h2 {
            font-size: 20px;
        }

        .modal-content p {
            font-size: 12px;
        }

        .close-button, .submit-button {
            padding: 6px 12px;
            font-size: 12px;
        }
    }
</style>
