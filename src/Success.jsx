const Success = () => {
  return (
    <div class="success-container">
      <div class="success-card">
        <div class="success-icon">
          <svg
            viewBox="0 0 24 24"
            width="64"
            height="64"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>

        <h1 class="success-title" id="successTitle">
          Login Successful!
        </h1>
        <p class="success-message" id="successMessage">
          You have successfully logged into your account. Welcome back!
        </p>

        <div class="redirect-info">
          <p>
            You will be automatically redirected in{" "}
            <span id="countdown">5</span> seconds...
          </p>
        </div>

        <div class="action-buttons">
          <button class="btn btn-secondary" id="backBtn">
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Go Back
          </button>
          <button class="btn btn-primary" id="homeBtn">
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Go to Dashboard
          </button>
        </div>

        <div class="additional-info">
          <div class="info-item">
            <strong>Last login:</strong>
            <span id="lastLogin">Just now</span>
          </div>
          <div class="info-item">
            <strong>Account type:</strong>
            <span id="accountType">Premium Member</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
