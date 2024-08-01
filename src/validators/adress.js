const adressRules = /^[\dа-яА-ЯёЁ\s\/\-,]+$/;

export const adress = (value) => {
  return value === '' || value.match(adressRules);
};
