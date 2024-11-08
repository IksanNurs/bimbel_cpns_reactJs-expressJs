export const FormatDuration = (seconds) => {
    if (seconds < 60) {
      return `${seconds} detik`;
    }
  
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} menit`;
    }
  
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
  
    if (remainingMinutes === 0) {
      return `${hours} jam`;
    }
    return `${hours} jam ${remainingMinutes} menit`;
  };


  export function stringToBool(str) {
    return str === 'true' ? true : str === 'false' ? false : null;
}

export function formatNumber(input) {
  // Pastikan input adalah angka
  const number = parseFloat(input);

  // Cek apakah input adalah angka
  if (!isNaN(number)) {
      // Gunakan fixed(2) untuk membatasi desimal menjadi dua angka
      return number.toFixed(2);
  } else {
      // Jika input bukan angka, kembalikan input as is
      return input;
  }
}