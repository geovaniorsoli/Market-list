function getForm(){
    const form = document.getElementById('loginForm').addEventListener('submit', function(event){
      event.preventDefault();
    
      var name = document.getElementById('name').value;
      var password = document.getElementById('password').value;
    
      fetch('https://market-list.onrender.com/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              name: name,
              password: password
          })
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Login falhou');
          }
          return response.json();
      })
      .then(data => {
          console.log('Login bem-sucedido:', data);
          localStorage.setItem('token', data.token);
          window.location.href = '/product.html';
      })
      .catch(error => {
          console.error('Erro no login:', error);
          alert('Falha no login: ' + error.message);
      });
    });
  }
  
  getForm()