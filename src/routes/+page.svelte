<script>
    // Add any required functionality here if necessary
  </script>
  
  <style>
    .container {
        display: flex;
        align-items: center;
        justify-content: center; /* Center the content horizontally */
        font-family: Arial, sans-serif;
        color: #333;
        text-align: left;
        margin-top: 40px;
    }
  
    .logo {
        width: 520px; /* Adjust width as necessary */
        height: auto;
        margin-right: -3px;
        filter: drop-shadow(10px 10px 15px rgba(0, 0, 0, 0.5)); /* Black shadow */
        margin-top: -40px; /* Moves the logo up */
    }
  
    .text-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
  
    .welcome-text {
        font-size: 58px;
        color: #000000;
        margin: 0; /* Removed all margin */
        line-height: 1; /* Removed additional space between lines */
        font-weight: 1; /* Makes the text very thin */
    }
  
    .title {
        font-size: 115px;
        font-weight: bold;
        color: #000; /* Change "Event" text to black */
        margin: 0; /* Removed all margin */
        line-height: 1; /* Removed additional space between lines */
    }
  
    .subtitle {
        font-size: 67px;
        font-weight: 600;
        color: #000; /* Change "Scheduler" text to black */
        margin: 0; /* Removed all margin */
        line-height: 1; /* Removed additional space between lines */
    }
  
    .tagline {
        font-size: 25px;
        color: #e47e3e;
        margin-top: 4px;
        line-height: 1; /* Adjusted line-height to keep tight */
    }
    
    /* Responsive design for tablets and phones (max-width: 768px) */
    @media only screen and (max-width: 768px) {
        .container {
            flex-direction: column; /* Stack the logo and text vertically */
            margin-top: 20px;
        }
  
        .logo {
            width: 70%; /* Scale logo size on smaller screens */
            margin-right: 0;
            margin-top: 0; /* Reset margin-top for logo */
        }
  
        .text-content {
            text-align: center; /* Center the text */
            margin-left: 0; /* Remove left margin for smaller screens */
        }
  
        .welcome-text {
            font-size: 36px; /* Reduce font size on smaller screens */
        }
  
        .title {
            font-size: 72px; /* Reduce font size on smaller screens */
        }
  
        .subtitle {
            font-size: 48px; /* Reduce font size on smaller screens */
        }
  
        .tagline {
            font-size: 22px; /* Adjust tagline font size */
        }
    }
  
    /* Responsive adjustments for very small screens (max-width: 480px) */
    @media only screen and (max-width: 480px) {
        .welcome-text {
            font-size: 28px; /* Further reduce font size */
        }
  
        .title {
            font-size: 50px; /* Further reduce title size */
        }
  
        .subtitle {
            font-size: 36px; /* Further reduce subtitle size */
        }
  
        .tagline {
            font-size: 20px; /* Further reduce tagline font size */
        }
  
        .container {
            padding: 10px; /* Add padding to avoid edges */
        }
  
        .logo {
            width: 80%; /* Scale logo size on very small screens */
        }
  
        .text-content {
            margin-left: 0;
            text-align: center; /* Center text for very small screens */
        }
    }
  </style>
  
  <div class="container">
    <img src="Images/logo.png" alt="Event Scheduler Logo" class="logo" />
    <div class="text-content">
        <p class="welcome-text">Welcome to</p>
        <p class="title">Event</p>
        <p class="subtitle">Scheduler</p>
        <p class="tagline">where scheduling your event happens.</p>
    </div>
  </div>
  