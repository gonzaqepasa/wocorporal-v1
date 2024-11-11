// utils/alertUtils.ts
import Swal from 'sweetalert2';

/**
 * Muestra una alerta de éxito.
 * @param message - El mensaje que se mostrará en la alerta.
 */
export const showSuccessAlert = (message: string) => {
  Swal.fire({
    icon: 'success',
    title: 'Éxito',
    text: message,
    confirmButtonText: 'Aceptar',
  });
};

/**
 * Muestra una alerta de error.
 * @param message - El mensaje que se mostrará en la alerta.
 */
export const showErrorAlert = (message: string) => {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message,
    confirmButtonText: 'Aceptar',
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
