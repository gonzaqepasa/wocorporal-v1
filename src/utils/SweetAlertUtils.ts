// utils/alertUtils.ts
import Swal from 'sweetalert2';

/**
 * Muestra una alerta de éxito.
 * @param message - El mensaje que se mostrará en la alerta.
 */
export const showSuccessAlert = ({ text, title }: { text: string, title: string }) => {
  Swal.fire({
    icon: 'success',
    title,
    text,
    // footer: '<a href="">¿Necesitas ayuda?</a>',
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false
  });
};

/**
 * Muestra una alerta de error.
 * @param message - El mensaje que se mostrará en la alerta.
 */
export const showErrorAlert = (message: string) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
    footer: '<a href="">¿Necesitas ayuda?</a>',
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false
  });
};

/**
 * Muestra una alerta de advertencia.
 * @param message - El mensaje que se mostrará en la alerta.
 */
export const showWarningAlert = (message: string) => {
  Swal.fire({
    icon: 'warning',
    title: 'Advertencia',
    text: message,
    confirmButtonText: 'Aceptar',
  });
};

/**
 * Muestra una alerta de información.
 * @param message - El mensaje que se mostrará en la alerta.
 */
export const showInfoAlert = (message: string) => {
  Swal.fire({
    icon: 'info',
    title: 'Información',
    text: message,
    confirmButtonText: 'Aceptar',
  });
};
