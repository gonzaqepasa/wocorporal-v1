/**
 * Capitaliza la primera letra de cada palabra en un texto.
 * @param text El texto a modificar.
 * @returns El texto con las primeras letras de cada palabra en mayúscula.
 */
export function capitalizeWords(text: string): string {
    return text
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
  
  // Aquí puedes agregar más funciones según lo necesites en el futuro.
  