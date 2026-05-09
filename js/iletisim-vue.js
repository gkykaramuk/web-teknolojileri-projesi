const { createApp} = Vue;
const { useForm, useField } = VeeValidate;


createApp({
  setup() {
   
    const { handleSubmit, errors, resetForm } = useForm({
      validationSchema: {
        username: (value) => {
             if (!value || !value.trim()) {
                return "Ad Soyad boş bırakılamaz.";
            }

            if (value.trim().length < 3) {
                return "Ad Soyad en az 3 karakter olmalıdır.";
            }

            return true;},

        email: (value) => {
            const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

            if (!value || !value.trim()) {
                return "E-posta boş bırakılamaz.";
            }

            if (!EMAIL_REGEX.test(value.trim())) {
                 return "Geçerli bir e-posta giriniz.";
            }

             return true;},

        phone: (value) =>{
            const cleaned = (value || "").replace(/[\s\-().]/g, "");

             if (!cleaned) {
                 return "Telefon numarası boş bırakılamaz.";
            }

            if (!/^\d{10,11}$/.test(cleaned)) {
                 return "Telefon numarası 10-11 haneli olmalı";
            }
             return true;},

        information: (value) => {       
             if (!value) {
                 return "Lütfen bir konu seçiniz";
            }
            return true;},

         date: (value) =>{
             if (!value) {
                 return "İletişim tarihi zorunludur";
            }

             const selected = new Date(value);
             const today = new Date();
            today.setHours(0, 0, 0, 0);

             if (selected < today) {
                 return "Geçmiş tarih seçilemez";
            }

            return true;},

        content: (value) => {
            if (!value) {
                return "Konu içeriği seçiniz";
            }

             return true;},

        message: (value) => {
            const text = (value || "").trim();

            if (!text) {
                return "Mesaj boş bırakılamaz.";
            }

            if (text.length < 10) {
                 return "Mesaj en az 10 karakter olmalı";
            }

            return true;},

        gender: (value) => {
            if (!value) {
                return "Cinsiyet seçimi zorunludur";
             }

             return true;},

        contact: (value) => {
            if (!value) {
                return "İletişim türü seçimi zorunludur";
            }

             return true;},

        interests: (value) => {
            if (!Array.isArray(value) || value.length === 0) {
                return "En az bir ilgi alanı seçiniz";
            }

             return true;},
      },

      initialValues: {
        username: "",
        email: "",
        phone: "",
        information: "",
        date: "",
        content: "",
        message: "",
        gender: "",
        contact: "",
        interests: [],
      },
    });

  
    const { value: username } = useField("username");
    const { value: email } = useField("email");
    const { value: phone } = useField("phone");
    const { value: information } = useField("information");
    const { value: date } = useField("date");
    const { value: content } = useField("content");
    const { value: message } = useField("message");
    const { value: gender } = useField("gender");
    const { value: contact } = useField("contact");

  
    const { value: interests } = useField("interests", undefined, {
      type: "checkbox",
    });

  
    const onSubmit = handleSubmit((values) => {   
    document.getElementById("contactForm").submit();      
    });


    const handleReset = () => {
      resetForm();
    };

    return {
      username,
      email,
      phone,
      information,
      date,
      content,
      message,
      gender,
      contact,
      interests,
      errors,
      onSubmit,
      handleReset,
    };
  },
}).mount("#app");