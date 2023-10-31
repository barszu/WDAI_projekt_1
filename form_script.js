// import z html
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const text = document.getElementById("text");

// event listener przypisany do formularza dla "submit"
form.addEventListener("submit", (e) => {
    e.preventDefault(); //zeby nie zniklo

    if (validateInputs()) {
        window.location.href = "podziekowanie.html"; //przerzucenie na ta podstrone
    }
});

const setError = (element, message) => {
    //repr el formularza
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = message;
    //dodawanie usuwanie klas
    inputControl.classList.add("error");
    inputControl.classList.remove("success");
};

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = "";
    inputControl.classList.add("success");
    inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
    //wzorzec
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()); //czy email pasuje do wzorca
};

const validateInputs = () => {
    //usuwanie bialych znakow
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const subjectValue = subject.value.trim();
    const textValue = text.value.trim();

    let isValidData = true;

    if (usernameValue === "") {
        setError(username, "Podaj prosze swoje imie i nazwisko!");
        isValidData = false;
    } else {
        setSuccess(username);
    }

    if (emailValue === "") {
        setError(email, "Musisz podać swój e-mail!");
        isValidData = false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, "Podany adres jest niepoprawny - nie może istnieć!");
        isValidData = false;
    } else {
        setSuccess(email);
    }

    if (subjectValue === "") {
        setError(subject, "Musisz podać temat maila!");
        isValidData = false;
    } else {
        setSuccess(subject);
    }

    if (textValue.length < 8) {
        setError(text, "Musisz podać treść maila! (min 8 znaków)");
        isValidData = false;
    } else {
        setSuccess(text);
    }

    return isValidData;
};
