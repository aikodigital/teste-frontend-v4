import Swal from 'sweetalert2';

export function SwalAlertError (message: string) {
  return Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message
  });
}
