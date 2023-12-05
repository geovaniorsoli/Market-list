function dinamic(){
    const select = document.getElementById('dinamic').value

    const form = document.getElementById('container-form')
    const list = document.getElementById('container-list')

    if(select === 'inserir'){
        form.style.display = 'block'
        list.style.display = 'none'
    } else if (select === 'visualizar'){
        form.style.display = 'none'
        list.style.display = 'block'
    }

}

document.getElementById('dinamic').addEventListener('change', dinamic)
dinamic()