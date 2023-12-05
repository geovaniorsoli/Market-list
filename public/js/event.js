function dinamic(){
    const select = document.getElementById('dinamic').value
    const selectMargin = document.getElementById('dinamic')

    const form = document.getElementById('container-form')
    const list = document.getElementById('container-list')
    const title = document.getElementById('container-title')
    

    if(select === 'inserir'){
        form.style.display = 'block'
        list.style.display = 'none'
        title.style.display = 'block'
    } else if (select === 'visualizar'){
        form.style.display = 'none'
        list.style.display = 'block'
        title.style.display = 'none'
        selectMargin.className = 'select mt-4'
    }

}

document.getElementById('dinamic').addEventListener('change', dinamic)
dinamic()