
    const btnview = document.getElementById('view')
    const btninserir = document.getElementById('inserir')

    const form = document.getElementById('container-form')
    const list = document.getElementById('container-list')
    const title = document.getElementById('container-title')
    

    function view(){
        form.style.display = 'none';  
        list.style.display = 'block'; 
    }
    
    function insert(){
        form.style.display = 'block'; 
        list.style.display = 'none'; 
    }
    
    btnview.addEventListener('click', view);
    btninserir.addEventListener('click', insert);
