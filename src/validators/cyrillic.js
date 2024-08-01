const cyrillicLetters = /^[А-Яа-яёЁ\s]+$/;
const cyrillicLettersAndNumbers = /^[А-Яа-яёЁ\s\d]+$/;

export const cyrillic = (value) => {
  return value === '' || value.match(cyrillicLetters);
};

export const cyrillicNumber = (value) => {
  return value === '' || value.match(cyrillicLettersAndNumbers);
};
