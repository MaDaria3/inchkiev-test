const phoneNumbers = /^\(\d{3}\) \d{3}-\d{4}$/;

export const phone = (value) => {
  return value === '' || value.match(phoneNumbers);
};
