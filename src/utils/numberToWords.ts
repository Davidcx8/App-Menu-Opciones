export function numberToWords(num: number): string {
  if (num === 0) return 'cero';
  if (num < 0) return 'menos ' + numberToWords(Math.abs(num));
  if (num > 1000) return 'Número fuera de rango (máximo 1000)';

  const unidades = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
  const decenas = ['', 'diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
  const especiales = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
  const veintes = ['veinte', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve'];
  const centenas = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

  if (num === 1000) return 'mil';
  if (num === 100) return 'cien';

  let words = '';

  const c = Math.floor(num / 100);
  const d = Math.floor((num % 100) / 10);
  const u = num % 10;

  if (c > 0) {
    words += centenas[c] + ' ';
  }

  if (d === 1) {
    words += especiales[u] + ' ';
  } else if (d === 2) {
    words += veintes[u] + ' ';
  } else if (d > 2) {
    words += decenas[d];
    if (u > 0) {
      words += ' y ' + unidades[u] + ' ';
    } else {
      words += ' ';
    }
  } else if (u > 0 && d !== 1 && d !== 2) {
    words += unidades[u] + ' ';
  }

  return words.trim();
}
