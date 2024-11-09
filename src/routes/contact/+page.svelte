<script lang="ts">
    let firstName = '';
    let lastName = '';
    let email = '';
    let phoneNumber = '';
    let message = '';
    
    let showModal = true; // Always open the modal initially
  
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
  
    $: if (showModal) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }
  
    const closeModal = () => {
      showModal = false;
      localStorage.setItem('modalState', 'false');
    };
  
    const filterNumericInput = (event: Event) => {
      const input = event.target as HTMLInputElement;
      input.value = input.value.replace(/\D/g, '');
      phoneNumber = input.value;
    };
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
  
      <!-- Footer with buttons pinned to the bottom -->
      <div class="button-group">
       <a href="/"><button on:click={closeModal} class="close-button">Close</button></a>
        <a href="/"><button type="button" on:click={handleSubmit} class="submit-button">Submit</button></a>
      </div>
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
    padding: 15px;
    border-radius: 8px;
    width: 700px;
    max-width: 85%;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    display: flex;
    margin-top: 80px;
    flex-direction: column;
    justify-content: space-between; /* Space form content and footer */
    text-align: center;
  }
  
  .modal-content h2 {
    font-size: 45px;
    font-weight: bold;
    margin: 0;
  }
  
  .modal-content p {
    font-size: 16px;
    color: #555;
    margin: 0;
  }
  
  .form-group {
    margin-bottom: 10px;
    text-align: left;
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
    padding: 8px;
    font-size: 15px;
    border: 1.5px solid #c2bebe;
    border-radius: 5px;
    color: #333;
    background-color: #f5f5f5;
    margin-top: 4px;
  }
  
  .modal-content textarea {
    resize: vertical;
    min-height: 60px;
  }
  
  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: auto; /* Pushes footer buttons to the bottom */
    padding-top: 15px;
    border-top: 1px solid #ddd; /* Divider line above the footer */
  }
  
  .close-button, .submit-button {
    font-size: 13px;
    padding: 6px 12px;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .close-button {
    background-color: #f02222;
  }
  
  .close-button:hover {
    background-color: #c51c1c;
  }
  
  .submit-button {
    background-color: #4CAF50;
  }
  
  .submit-button:hover {
    background-color: #45a049;
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    .modal-content {
      width: 90%;
      padding: 12px;
    }
  
    .modal-content h2 {
      font-size: 36px;
    }
  
    .modal-content p {
      font-size: 14px;
    }
  
    .form-group label {
      font-size: 13px;
    }
  
    .modal-content input[type="text"],
    .modal-content input[type="email"],
    .modal-content textarea {
      font-size: 14px;
    }
  
    .button-group {
      flex-direction: column;
      gap: 10px;
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
  </style>
  