//visualizar produtos
function verProdutos() {
    fetch('http://localhost:3033/Product')
        .then(response => response.json())
        .then(products => {
            const productsList = document.getElementById('products-list')
            productsList.innerHTML = ''
            products.forEach(product => {
                const productItem = document.createElement('div')
                productItem.innerHTML = `

                <div id="item">  
                <div class="dropdown">
                        <button class="dropbtn">...</button>
                        <div class="dropdown-content">
                            <a href="#" onclick="editarProduto('${product._id}')">Editar</a>
                            <a href="#" onclick="deleteProduct('${product._id}')">Deletar</a>
                        </div>
                    </div>
                    <p class="item-produto">${product.Nome}</p> 
                    <p class="item-produto-quantidade">${product.Qnt}</p>
                    <p class="item-produto-descricao">${product.Desc}</p>
                    </div>
                `
                productsList.appendChild(productItem)
            })
        })
        .catch(error => console.error('Erro ao buscar produtos:', error))
}

document.addEventListener('DOMContentLoaded', verProdutos)

function alertTimeProduto() {
    const alertproduto = document.getElementById('alertProduto')
    alertproduto.style.display = 'block'
    alertproduto.style.opacity = '1'

    setTimeout(() => {
        alertproduto.style.opacity = '0'
    }, 2000)


}


function alertTimeQuantidade() {
    const alertquantidade = document.getElementById('alertQuantidade')
    alertquantidade.style.display = 'block'
    alertquantidade.style.opacity = '1'

    setTimeout(() => {
        alertquantidade.style.opacity = '0'
    }, 2000)
}

function alertTimeExiste() {
    const alertExiste = document.getElementById('alert-existe')
    alertExiste.style.display = 'block'
    alertExiste.style.opacity = '1'

    setTimeout(() => {
        alertExiste.style.opacity = '0'
    }, 2000)
}

//validar produtos
function validarproduto(produtosExistentes) {
    const Produto = document.querySelector('#Produto').value
    const Quantidade = document.querySelector('#Qnt').value
    const Descricao = document.querySelector('#Desc').value

    const alertproduto = document.getElementById('alertProduto')
    const alertquantidade = document.getElementById('alertQuantidade')


    let valido = true

    if (Produto.trim().length == 0) {
        return alertTimeProduto()
    } else {
        alertproduto.style.display = "none"
    }

    if (Quantidade.trim().length == 0) {
        alertTimeQuantidade()
        valido = false
    } else {
        alertquantidade.style.display = "none"
    }

    const produtoExistente = produtosExistentes.find(produto => produto.Nome.toLowerCase() === Produto.toLowerCase())
    if (produtoExistente) {
        alertTimeExiste()
        return null
    }



    return valido ? { Nome: Produto, Qnt: Quantidade, Desc: Descricao } : null
}


//inserir produtos
function adicionarProduto(productData) {

    fetch('http://localhost:3033/Product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
    })

        .then(response => response.json())
        .then(data => {

            console.log('Produto adicionado:', data)
            window.location.reload()
        })
        .catch(error => console.error('Erro ao adicionar produto:', error))

}

document.getElementById('form-product').addEventListener('submit', (event) => {
    event.preventDefault()

    fetch('http://localhost:3033/Product')
        .then(response => response.json())
        .then(produtosExistentes => {
            const productData = validarproduto(produtosExistentes)
            if (productData) {
                adicionarProduto(productData)
            }
        })
        .catch(error => console.error('Erro ao buscar produtos:', error))
})

//editar product 
function editarProduto(id) {
    fetch(`http://localhost:3033/Product/${id}`)
        .then(response => response.json())
        .then(product => {
            document.getElementById('editar-produto').value = product.Nome
            document.getElementById('editar-quantidade').value = product.Qnt
            document.getElementById('editar-descricao').value = product.Desc
            document.getElementById('editar-id').value = product._id
            var modalEdit = new bootstrap.Modal(document.getElementById('modalEdit'), {})
            modalEdit.show()
        })
        .catch(error => console.error('Erro ao buscar produto:', error))
}

function EnviarEdicao() {
    const id = document.getElementById('editar-id').value
    const updatedProduct = {
        Nome: document.getElementById('editar-produto').value,
        Qnt: document.getElementById('editar-quantidade').value,
        Desc: document.getElementById('editar-descricao').value
    }

    fetch(`http://localhost:3033/Product/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Produto atualizado:', data)
            var modalEdit = new bootstrap.Modal(document.getElementById('modalEdit'), {})
            modalEdit.show()
            verProdutos()
        })
        .catch(error => console.error('Erro ao atualizar produto:', error))
}


//atualizar produto
function AtualizarProduto(id, productData) {
    fetch(`http://localhost:3033/Product/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Produto atualizado:', data)
        })
        .catch(error => console.error('Erro ao atualizar produto:', error))
}

//deletar produto

function deleteProduct(id) {
    fetch(`http://localhost:3033/Product/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                console.log('Produto deletado')
                verProdutos()
            } else {
                console.error('Erro ao deletar o produto')
            }
        })
        .catch(error => console.error('Erro ao deletar produto:', error))
}

function validarDelete(){
    const alertDelete = document.getElementById('alert-delet')
    const sim = document.getElementById('sim')
    const nao = document.getElementById('nao')

    alertDelete.style.display = 'block'

    sim.addEventListener('click', () =>{
        deleteGeral()
        alertDelete.style.display = 'none'
    })
    
    nao.addEventListener('click', () => {
        alertDelete.style.display = 'none'
    })
    

}

document.getElementById('clear').addEventListener('click', validarDelete)


async function deleteGeral() {
    try {
        const response = await fetch('http://localhost:3033/Product', {
            method: 'DELETE'
        })

        if (response.ok) {
            console.log('apagou tudo')
            window.location.reload()
        } else {
            console.log('nao deu certo apagar tudo')
        }
    } catch (error) {
        console.error('erro ao deletar os produtinhos', error)
    }
}


