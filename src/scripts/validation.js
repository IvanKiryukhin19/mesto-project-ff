function enableValidation(validationConfig) {
  const formList=Array.from(document.querySelectorAll(validationConfig.formList));
  formList.forEach((form)=>{
    form.addEventListener('submit', (evt)=>evt.preventDefault());
    setEventListener(form, validationConfig);
  });
}

function setEventListener(form, validationConfig) {
  const inputList=Array.from(form.querySelectorAll(validationConfig.input));
  const buttonSubmit=form.querySelector(validationConfig.button);

  inputList.forEach((input)=>{
    input.addEventListener('input',()=>{
      checkInputValidity(form, input, validationConfig);
      toggleButton(inputList, buttonSubmit);
    });
  });
}

function checkInputValidity(form, input, validationConfig) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  }else{
    input.setCustomValidity('');
  };

  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, validationConfig);
  }else{
    hideInputError(form,input,validationConfig);
  };
}

function hideInputError(form, input, validationConfig) {
  const fieldError=form.querySelector(`.${input.id}-error`);
  fieldError.textContent='';
  input.classList.remove(validationConfig.inputError);
}

function showInputError(form, input, messageError, validationConfig) {
  const fieldError=form.querySelector(`.${input.id}-error`);
  fieldError.textContent=messageError;
  input.classList.add(validationConfig.inputError);
}

function hasInvalidInput(inputList){
  return inputList.some((input)=>{
    return !input.validity.valid;
  })
}

function toggleButton(inputList, button) {
  if (hasInvalidInput(inputList)) {
    button.setAttribute('disabled', true);
  }else{
    button.removeAttribute('disabled');
  };
}

function clearValidation(form, validationConfig) {
  //красная полоса остается
  const buttonSubmit=form.querySelector(validationConfig.button);
  const inputList=Array.from(form.querySelectorAll(validationConfig.input));
  inputList.forEach((input)=>{
    const fieldError=form.querySelector(`.${input.id}-error`);
    fieldError.textContent='';
    input.classList.remove(validationConfig.inputError);
  });
  buttonSubmit.setAttribute('disabled', true);
}

export {enableValidation, clearValidation}