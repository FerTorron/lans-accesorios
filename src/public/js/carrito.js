const addButton = document.querySelectorAll(".addButton")
const deleteButton = document.querySelectorAll(".deleteButton")
const emptyButton = document.querySelector(".emptyButton")
let cartId = null

const currentUser = () => {
    const url = '/api/sessions/current';

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Error en la solicitud GET');
        })
        .catch(error => {
            console.error('Error en la solicitud GET:', error);
            throw error;
        });
};

currentUser()
    .then(userData => {
        const cartIdUser = userData.payload.cart;
        cartId = cartIdUser
        // console.log('Cart ID:', cartId);
    })
    .catch(error => {
        console.error('Error al obtener los datos del usuario:', error);
    });

currentUser()
const agregarProd = (idCart, idProduct) => {
    const url = `/api/carts/${idCart}/products/${idProduct}`
    const bodyPost = [
        {
            quantity: 1
        }
    ]

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyPost),
    })
        .then(response => {
            if (response.ok) {
                console.log('Solicitud POST exitosa');

                Swal.fire({
                    toast: true,
                    position: "top-right",
                    title: `Producto agregado al carrito`,
                    timer: 2000,
                    showConfirmButton: false,
                    icon: "info"
                })
            } else {
                console.error('Error en la solicitud POST');

                Swal.fire({
                    toast: true,
                    position: "top-right",
                    title: `Error al agregar el producto al carrito`,
                    timer: 2000,
                    showConfirmButton: false,
                    icon: "error"
                })
            }
        })
        .catch(error => {
            console.error('Error en la solicitud POST:', error);
        });
}

const eliminarProd = (idCart, idProduct) => {
    const url = `/api/carts/${idCart}/products/${idProduct}`

    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (response.ok) {
                console.log('Solicitud DELETE exitosa');

                Swal.fire({
                    toast: true,
                    position: "top-right",
                    title: `Producto eliminado del carrito`,
                    timer: 2000,
                    showConfirmButton: false,
                    icon: "info"
                })
                location.reload();
            } else {
                console.error('Error en la solicitud DELETE');

                Swal.fire({
                    toast: true,
                    position: "top-right",
                    title: `Error al eliminar el producto del carrito`,
                    timer: 2000,
                    showConfirmButton: false,
                    icon: "error"
                })
            }
        })
        .catch(error => {
            console.error('Error en la solicitud POST:', error);
        });
}

const vaciarCarrito = (idCart) => {
    const url = `/api/carts/${idCart}`

    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (response.ok) {
                console.log('Solicitud DELETE exitosa');

                Swal.fire({
                    toast: true,
                    position: "top-right",
                    title: `El Carrito fue Vaciado`,
                    timer: 2000,
                    showConfirmButton: false,
                    icon: "info"
                })
                location.reload();
            } else {
                console.error('Error en la solicitud DELETE');

                Swal.fire({
                    toast: true,
                    position: "top-right",
                    title: `Error al vaciar el carrito`,
                    timer: 2000,
                    showConfirmButton: false,
                    icon: "error"
                })
            }
        })
        .catch(error => {
            console.error('Error en la solicitud POST:', error);
        });
}

addButton.forEach(addButton => {
    addButton.addEventListener("click", (id) => {
        const idProduct = id.target.id;
        agregarProd(cartId, idProduct);
    });
});

deleteButton.forEach(deleteButton => {
    deleteButton.addEventListener("click", (id) => {
        const idProduct = id.target.id;
        eliminarProd(cartId, idProduct);
    });
});

emptyButton.addEventListener("click", () => {
    vaciarCarrito(cartId);
});