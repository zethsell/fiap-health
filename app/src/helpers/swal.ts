import Swal from "sweetalert2";

type SwalParams = {
    title?: string
    message: string
}

export const swalSuccess = async ({title = 'sucesso', message}: SwalParams) => {
    await Swal.fire({
        title: title,
        text: message,
        icon: 'success',
        confirmButtonColor: '#951b81'
    })
}
export const swalError = async ({title, message}: SwalParams) => {
    await Swal.fire({
        title: title,
        text: message,
        icon: 'error',
        confirmButtonColor: '#951b81'
    })
}
export const swalInfo = async ({title, message}: SwalParams) => {
    await Swal.fire({
        title: title,
        text: message,
        icon: 'info',
        confirmButtonColor: '#951b81'
    })
}
export const swalWarning = async ({title, message}: SwalParams) => {
    await Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        confirmButtonColor: '#951b81'
    })
}

export const swalDeleteQuestion = async () =>
    await Swal.fire({
        title: 'Deseja realmente excluir?',
        showDenyButton: true,
        confirmButtonText: "Sim",
        denyButtonText: 'Não',
        confirmButtonColor: '#951b81'
    })
