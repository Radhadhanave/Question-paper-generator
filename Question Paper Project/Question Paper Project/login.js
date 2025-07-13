document.addEventListener('DOMContentLoaded', function() {
  const signInForm = document.querySelector('.sign-in-form');

  signInForm.addEventListener('submit', function(event) {
      event.preventDefault(); 

      const usernameInput = document.querySelector('#username');
      const passwordInput = document.querySelector('#password');

      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();

      if (username !== 'admin') {
          alert('Invalid username.');
          return; 
      }

      if (password !== '123') {
          alert('Incorrect password.');
          return; 
      }

      const isLoggedIn = true;

      if (isLoggedIn) {
          window.location.href = "question_paper.html";
          isLoggedIn = false
      } else {
          alert("Login failed. Please try again.");
      }
  });
});