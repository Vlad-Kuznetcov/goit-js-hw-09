const refs = {
  formEl: document.querySelector('.feedback-form'),
};

const LOCAL_KEY = 'feedback-form-state';
const formData = JSON.parse(localStorage.getItem(LOCAL_KEY)) || {
  email: '',
  message: '',
};

refs.formEl.addEventListener('input', e => {
  formData[e.target.name] = e.target.value.trim();
  saveToLocalStorage(LOCAL_KEY, formData);
});

refs.formEl.addEventListener('submit', e => {
  e.preventDefault();

  const { email, message } = formData;
  if (!email || !message) {
    alert('Please fill out all fields');
    return;
  }

  console.log('Form Submitted:', formData);

  localStorage.removeItem(LOCAL_KEY);
  refs.formEl.reset();

  formData.email = '';
  formData.message = '';
});

function saveToLocalStorage(key, value) {
  const json = JSON.stringify(value);
  localStorage.setItem(key, json);
}

function loadFromLocalStorage(key) {
  const json = localStorage.getItem(key);
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function setDataToForm() {
  const storedData = loadFromLocalStorage(LOCAL_KEY);
  if (storedData) {
    Object.keys(storedData).forEach(key => {
      refs.formEl.elements[key].value = storedData[key];
      formData[key] = storedData[key];
    });
  }
}

setDataToForm();
