const editRoleUser = document.querySelector(".editRoleUser")
const deleteUserBtn = document.querySelector(".deleteUser")

const editUser = (idUser) => {
    const url = `/api/users/premium/${idUser}`

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (response.ok) {
                console.log('Solicitud PUT exitosa');

                Swal.fire({
                    toast: true,
                    position: "top-right",
                    title: `Rol Actualizado`,
                    timer: 2000,
                    showConfirmButton: false,
                    icon: "info"
                })
                location.reload();
            } else {
                console.error('Error en la solicitud PUT');

                Swal.fire({
                    toast: true,
                    position: "top-right",
                    title: `Error al actualizar el Rol`,
                    timer: 2000,
                    showConfirmButton: false,
                    icon: "error"
                })
            }
        })
        .catch(error => {
            console.error('Error en la solicitud PUT:', error);
        });
}

const deleteUser = (idUser) => {
    const url = `/api/users/${idUser}`

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
                    title: `Usuario Eliminado`,
                    timer: 2000,
                    showConfirmButton: false,
                    icon: "info"
                })
                window.location.replace('/')
            } else {
                console.error('Error en la solicitud DELETE');

                Swal.fire({
                    toast: true,
                    position: "top-right",
                    title: `Error al eliminar el Usuario`,
                    timer: 2000,
                    showConfirmButton: false,
                    icon: "error"
                })
            }
        })
        .catch(error => {
            console.error('Error en la solicitud DELETE:', error);
        });
}

editRoleUser.addEventListener("click", () => {
    const idUser = event.target.id;
    editUser(idUser);
});

deleteUserBtn.addEventListener("click", () => {
    const idUser = event.target.id;
    deleteUser(idUser);
});