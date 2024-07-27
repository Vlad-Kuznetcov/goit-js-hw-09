const form = document.querySelector('.feedback-form');
const LOCAL_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

form.addEventListener('input', () => {
  formData = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };

  saveToLs(LOCAL_KEY, formData);
});

document.addEventListener('DOMContentLoaded', () => {
  const userData = loadFromLs(LOCAL_KEY) || {};
  console.log(userData);

  form.elements.email.value = userData.email || '';
  form.elements.message.value = userData.message || '';
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const { email, message } = formData;
  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);
  localStorage.removeItem(LOCAL_KEY);
  formData = { email: '', message: '' };
  e.target.reset();
});

function saveToLs(key, value) {
  const json = JSON.stringify(value);
  localStorage.setItem(key, json);
}

function loadFromLs(key) {
  const json = localStorage.getItem(key);
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}
