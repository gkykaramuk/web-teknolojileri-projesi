const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^(\+90|0)?[0-9]{10}$/;

function showError(field, message) {
  field.classList.remove("is-valid");
  field.classList.add("is-invalid");

  let feedback = field.parentElement.querySelector(".invalid-feedback");
  if (!feedback) {
    feedback = document.createElement("div");
    feedback.className = "invalid-feedback";
    field.parentElement.appendChild(feedback);
  }
  feedback.textContent = message;
}

function showSuccess(field) {
  field.classList.remove("is-invalid");
  field.classList.add("is-valid");

  const feedback = field.parentElement.querySelector(".invalid-feedback");
  if (feedback) feedback.textContent = "";
}

function showGroupError(box, message) {
  box.classList.add("border", "border-danger", "rounded", "p-1");
  let fb = box.querySelector(".group-invalid-feedback");
  if (!fb) {
    fb = document.createElement("div");
    fb.className = "group-invalid-feedback text-danger small mt-1";
    box.appendChild(fb);
  }
  fb.textContent = message;
}

function clearGroupError(box) {
  box.classList.remove("border", "border-danger", "rounded", "p-1");
  const fb = box.querySelector(".group-invalid-feedback");
  if (fb) fb.textContent = "";
}

function clearAllErrors() {
  document.querySelectorAll(".is-invalid, .is-valid").forEach(el => {
    el.classList.remove("is-invalid", "is-valid");
  });
  document.querySelectorAll(".invalid-feedback").forEach(el => el.textContent = "");
  document.querySelectorAll(".group-invalid-feedback").forEach(el => el.textContent = "");
  document.querySelectorAll(".form-box").forEach(el => {
    el.classList.remove("border", "border-danger", "rounded", "p-1");
  });
}

// --- Doğrulama fonksiyonları ---

function validateUsername(value) {
  if (!value.trim()) return "Ad Soyad boş bırakılamaz.";
  if (value.trim().length < 3) return "Ad Soyad en az 3 karakter olmalıdır.";
  return null;
}

function validateEmail(value) {
  if (!value.trim()) return "E-posta boş bırakılamaz.";
  if (!EMAIL_REGEX.test(value.trim())) return "Geçerli bir e-posta giriniz.";
  return null;
}

function validatePhone(value) {
  const cleaned = value.replace(/[\s\-().]/g, "");
  if (!cleaned) return "Telefon numarası boş bırakılamaz.";
  if (!PHONE_REGEX.test(cleaned)) return "Geçerli bir telefon numarası giriniz.";
  return null;
}

function validateSelect(value) {
  if (!value) return "Lütfen bir seçenek seçiniz.";
  return null;
}

function validateDate(value) {
  if (!value) return "Tarih boş bırakılamaz.";
  const selected = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (selected < today) return "Geçmiş bir tarih seçilemez.";
  return null;
}

function validateMessage(value) {
  if (!value.trim()) return "Mesaj boş bırakılamaz.";
  if (value.trim().length < 10) return "Mesaj en az 10 karakter olmalıdır.";
  return null;
}

function validateRadio(name) {
  if (!document.querySelector(`input[name="${name}"]:checked`)) return "Lütfen bir seçenek işaretleyiniz.";
  return null;
}

function validateCheckboxGroup(names) {
  const anyChecked = names.some(name => document.querySelector(`input[name="${name}"]:checked`));
  if (!anyChecked) return "Lütfen en az bir ilgi alanı seçiniz.";
  return null;
}

// --- Ana doğrulama ---

function validateForm() {
  let isValid = true;

  const username = document.getElementById("username");
  const usernameErr = validateUsername(username.value);
  if (usernameErr) { showError(username, usernameErr); isValid = false; }
  else showSuccess(username);

  const email = document.getElementById("email");
  const emailErr = validateEmail(email.value);
  if (emailErr) { showError(email, emailErr); isValid = false; }
  else showSuccess(email);

  const phone = document.getElementById("phone");
  const phoneErr = validatePhone(phone.value);
  if (phoneErr) { showError(phone, phoneErr); isValid = false; }
  else showSuccess(phone);

  const information = document.getElementById("information");
  const infoErr = validateSelect(information.value);
  if (infoErr) { showError(information, infoErr); isValid = false; }
  else showSuccess(information);

  const date = document.getElementById("date");
  const dateErr = validateDate(date.value);
  if (dateErr) { showError(date, dateErr); isValid = false; }
  else showSuccess(date);

  const content = document.getElementById("content");
  const contentErr = validateSelect(content.value);
  if (contentErr) { showError(content, contentErr); isValid = false; }
  else showSuccess(content);

  const message = document.getElementById("message");
  const messageErr = validateMessage(message.value);
  if (messageErr) { showError(message, messageErr); isValid = false; }
  else showSuccess(message);

  const genderBox = document.getElementById("male").closest(".form-box");
  const genderErr = validateRadio("gender");
  if (genderErr) { showGroupError(genderBox, genderErr); isValid = false; }
  else clearGroupError(genderBox);

  const contactBox = document.getElementById("eposta").closest(".form-box");
  const contactErr = validateRadio("contact");
  if (contactErr) { showGroupError(contactBox, contactErr); isValid = false; }
  else clearGroupError(contactBox);

  const checkboxNames = ["web","cyber","ai","mobile","game","data","backend","ui-ux","blockchain"];
  const interestBox = document.getElementById("web").closest(".form-box");
  const interestErr = validateCheckboxGroup(checkboxNames);
  if (interestErr) { showGroupError(interestBox, interestErr); isValid = false; }
  else clearGroupError(interestBox);

  return isValid;
}

// --- Buton olayları ---


  function jsValidate() {
  clearAllErrors();
  const valid = validateForm();
  if (valid) {
    alert("Form başarıyla gönderildi!");
  } else {
    const firstInvalid = document.querySelector(".is-invalid");
    if (firstInvalid) firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

document.addEventListener("DOMContentLoaded", function () {


  document.getElementById("reset").addEventListener("click", function () {
    clearAllErrors();
  });

  // Blur ile anlık kontrol
  document.getElementById("username").addEventListener("blur", function () {
    const err = validateUsername(this.value);
    if (err) showError(this, err); else showSuccess(this);
  });

  document.getElementById("email").addEventListener("blur", function () {
    const err = validateEmail(this.value);
    if (err) showError(this, err); else showSuccess(this);
  });

  document.getElementById("phone").addEventListener("blur", function () {
    const err = validatePhone(this.value);
    if (err) showError(this, err); else showSuccess(this);
  });

  document.getElementById("information").addEventListener("change", function () {
    const err = validateSelect(this.value);
    if (err) showError(this, err); else showSuccess(this);
  });

  document.getElementById("date").addEventListener("change", function () {
    const err = validateDate(this.value);
    if (err) showError(this, err); else showSuccess(this);
  });

  document.getElementById("content").addEventListener("change", function () {
    const err = validateSelect(this.value);
    if (err) showError(this, err); else showSuccess(this);
  });

  document.getElementById("message").addEventListener("blur", function () {
    const err = validateMessage(this.value);
    if (err) showError(this, err); else showSuccess(this);
  });

});