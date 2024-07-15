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

  function saveToLocalStorage(key, value) {
    const json = JSON.stringify(value);
    localStorage.setItem(key, json);
    console.log(json);
  }
});

function loadForms(key) {
  const json = localStorage.getItem(key);
  try {
    const data = JSON.parse(json);
    return data;
  } catch {
    return json;
  }
}

function setDataToForm() {
  const loadStorage = loadForms('feedback-form-state');
  if (loadStorage === null) return;
  const keys = Object.keys(formData);

  keys.forEach(key => {
    refs.formEl.elements[key].value = loadStorage[key];
  });
}
setDataToForm();
