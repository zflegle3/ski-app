import axios from "axios";



//USERNAME VALIDATION
const validateUserNameFormat = (userName) => {
    return userName.match(/^[a-zA-Z0-9]+$/);
};

async function checkUserDb (usernameIn) {
    const response = await axios.post("http://localhost:8080/user/read/username", {username: usernameIn});
    if (response.data.username === usernameIn) {
        return true;
    } else {
        return false;
    }
}

async function checkEmailDb (userEmail) {
    const response = await axios.post("http://localhost:8080/user/read/email", {email: userEmail});
    if (response.data.email === userEmail) {
        return true;
    } else {
        return false;
    }
}

export const checkNewUserName = async (userNameIn) => {
    //LENGTH
    if (userNameIn.length > 2 && userNameIn.length < 16) {
        //FORMAT (Numbers and letters only 0-XX characters)
        if (validateUserNameFormat(userNameIn)) { 
            // AVAILABILITY IN DATABASE
            if ( await checkUserDb(userNameIn)) {
            //returns true if username already exists
                document.querySelector(".form-item-container.user-name-in").classList.add("invalid");
                document.getElementById("user-name-error").textContent = `Whoops! ${userNameIn} is already taken`;
                return false;
            } else {
                document.getElementById("user-name-error").className = "";
                document.getElementById("user-name-error").textContent = "Username Error";
                return true;
            };
        } else {
            document.querySelector(".form-item-container.user-name-in").classList.add("invalid");
            document.getElementById("user-name-error").textContent = `Only letter and numbers, between 3 to 15 characters`;
        }
    } else {
        if (userNameIn.length < 1) {
            document.querySelector(".form-item-container.user-name-in").classList.add("invalid");
            document.getElementById("user-name-error").textContent = "Cannot be empty";
        } else {
            document.querySelector(".form-item-container.user-name-in").classList.add("invalid");
            document.getElementById("user-name-error").textContent = `Only letter and numbers, between 3 to 15 characters`;
        }
    };
}


//EMAIL VALIDATION
const validateEmailFormat = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


export const checkNewEmail = async(emailIn) => {
    //LENGTH
    if (emailIn.length > 0) {
        //FORMAT
        if (validateEmailFormat(emailIn)) {
            //AVAILABILITY IN DATABASE
            if (await checkEmailDb(emailIn)) {
                //returns true if email already exists
                document.querySelector(".form-item-container.email-in").classList.add("invalid");
                document.getElementById("email-error").textContent = `Whoops! ${emailIn} is already taken `;
                return false;
            } else {
                document.getElementById("email-error").className = "";
                document.getElementById("email-error").textContent = "Email Error";
                return true;
            };
        } else {
            document.querySelector(".form-item-container.email-in").classList.add("invalid");
            document.getElementById("email-error").textContent = "Oops, that looks like an invalid email";
            return false;
        }
    } else {
        document.querySelector(".form-item-container.email-in").classList.add("invalid");
        document.getElementById("email-error").textContent = "Cannot be empty";
        return false;
    };
}

//PASSWORD VALIDATION
export const checkNewPass = (passwordIn) => {
    let passTest = true;
    let passErrorLen = document.getElementById("pass-error-signin-length");
    let passErrorUp = document.getElementById("pass-error-signin-upper");
    let passErrorNum = document.getElementById("pass-error-signin-number");
    let passErrorSp = document.getElementById("pass-error-signin-special");

    //8 characters
    if(passwordIn.length < 8) {
        passTest = false;
        passErrorLen.classList = "";
    } else {
        passErrorLen.classList = "valid";
    }
    //uppercase
    if(!passwordIn.match(/[A-Z]/g)) {
        passTest = false;
        passErrorUp.classList = "";
    } else {
        passErrorUp.classList = "valid";
    }
    //number
    if(!passwordIn.match(/[0-9]/g)) {
        passTest = false;
        passErrorNum.classList = "";
    } else {
        passErrorNum.classList = "valid";
    }
    // special character
    if(!passwordIn.match(/[!@#\$%\^&\*]/g)) {
        passTest = false;
        passErrorSp.classList = "";
    } else {
        passErrorSp.classList = "valid";
    }
    //handle error text output on password input
    if (!passTest) {
        document.querySelector(".form-item-container.pass-in").classList.add("invalid");
        document.getElementById("pass-error").textContent = "Password does not meet criteria";
    }
    return passTest;
};

//FIRST NAME VALIDATION
export const checkFirstName = (firstIn) => {
    console.log(firstIn);
    //validates first name is populated
    if (firstIn.length > 0) {
        document.getElementById("name-first-error").className = "";
        document.getElementById("name-first-error").textContent = "First Name Error";
        return true;
    } else {
        document.querySelector(".form-item-container.name-first").classList.add("invalid");
        document.getElementById("name-first-error").textContent = "Cannot be empty";
        return false;
    }
}

export const checkLastName = (lastIn) => {
    //validates last name is populated
    if (lastIn.length > 0) {
        document.getElementById("name-last-error").className = "";
        document.getElementById("name-last-error").textContent = "Last Name Error";
        return true;
    } else {
        document.querySelector(".form-item-container.name-last").classList.add("invalid");
        document.getElementById("name-last-error").textContent = "Cannot be empty";
        return false;
    }
}



// const validate = {
//     checkFirstName, checkLastName, checkNewUserName
// }

// export default validate;

