<script>
    // Add any JavaScript functionality here if necessary
  </script>
  
  <style>
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: Poppins, sans-serif;
        color: #333;
        text-align: left;
        margin-top: 40px;
        animation: fadeIn 1.5s ease-out; /* Animation for container */
    }
  
    .logo {
        width: 520px;
        height: auto;
        margin-right: -3px;
        filter: drop-shadow(10px 10px 15px rgba(0, 0, 0, 0.5));
        margin-top: -40px;
        opacity: 0;
        animation: slideIn 1.5s ease-out forwards 0.5s; /* Slide-in animation */
    }
  
    .text-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        opacity: 0;
        animation: fadeInText 1.5s ease-out forwards 1s; /* Fade-in animation */
    }
  
    .welcome-text, .title, .subtitle, .tagline {
        opacity: 0;
        animation: fadeInText 1s ease-out forwards;
    }
  
    .welcome-text {
        font-size: 58px;
        color: #000000;
        margin: 0;
        line-height: 1;
        font-weight: 600; /* Match boldness of tagline */
        animation-delay: 1s;
    }
  
    .title {
        font-size: 115px;
        font-weight: bold;
        color: #000;
        margin: 0;
        line-height: 1;
        animation-delay: 1.3s;
    }
  
    .subtitle {
        font-size: 67px;
        font-weight: 600;
        color: #000;
        margin: 0;
        line-height: 1;
        animation-delay: 1.6s;
    }
  
    .tagline {
        font-size: 25px;
        color: #e47e3e;
        margin-top: 4px;
        line-height: 1;
        font-weight: 600; /* Maintain boldness */
        animation-delay: 1.9s;
    }
  
    /* Keyframes for animations */
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
  
    @keyframes slideIn {
        from { transform: translateX(-50px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
  
    @keyframes fadeInText {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
  
    /* Responsive design adjustments */
    @media only screen and (max-width: 768px) {
        .container {
            flex-direction: column;
            margin-top: 20px;
        }
  
        .logo {
            width: 70%;
            margin-right: 0;
            margin-top: 0;
        }
  
        .text-content {
            text-align: center;
            margin-left: 0;
        }
  
        .welcome-text {
            font-size: 36px;
        }
  
        .title {
            font-size: 72px;
        }
  
        .subtitle {
            font-size: 48px;
        }
  
        .tagline {
            font-size: 22px;
        }
    }
  
    @media only screen and (max-width: 480px) {
        .welcome-text {
            font-size: 28px;
        }
  
        .title {
            font-size: 50px;
        }
  
        .subtitle {
            font-size: 36px;
        }
  
        .tagline {
            font-size: 20px;
        }
  
        .container {
            padding: 10px;
        }
  
        .logo {
            width: 80%;
        }
  
        .text-content {
            margin-left: 0;
            text-align: center;
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
  