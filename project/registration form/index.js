//             <====Global Variables=====>

const invalidDiv = document.getElementById("invalid");//for notice if needed
const form = document.getElementById("registerForm");
const firstnameInput = form["firstname"];
const lastnameInput = form["lastname"];
const emailInput = form["email"];
const usernameInput = form["username"];
const passwordInput = form["password"];
const addressInupt = form["address"];
const maleInput = form["male"];
const femaleInput = form["female"];
const otherInput = form["other"];
const dateInput = form["date"];
const phonenumberInput = form["phonenumber"];
const fn = /^[a-zA-Z]{3,}( )?[a-zA-Z]*( )?[a-zA-Z]*$/;
const ln = /^[A-Za-z]+( )?[a-zA-Z]*$/;
const em = /^[a-z0-9]{3,}@[a-z]{3,10}\.[a-z]{2,3}$/;
const un = /^[A-Za-z]{4,}[0-9]*$/;
const pw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
// const pw = /^[a-zA-Z0-9!@#$%^&* ]{8,20}$/;
const pn = /^[6789][0-9]{9}$/;
var numberOfTrues;//for regex validitation;
const statu = document.getElementById("status");//for success notice statement



//           <======= Regexp=======>
function regularExpression(input, exp) {
    let id = document.getElementById(input);
    id.addEventListener("keyup", function () {
        let string = document.getElementById(input).value;
        let regexp = exp;
        if (regexp.test(string)) {
            id.style = 'border:2px solid rgba(94, 255, 1, 0.89)';
        } else {
            id.style = 'border:2px solid rgba(255, 116, 106, 0.89)';

        }
        if (id.value == "") {
            id.removeAttribute("style");
        }
    })
}
regularExpression("firstname", fn);
regularExpression("lastname", ln);
regularExpression("phonenumber", pn);
regularExpression("username", un);
regularExpression("email", em);
regularExpression("password", pw);


//            <=======Localstorage======> 

//      <=====geting user data from the localstorage or first time entry empty======>
const registerList = JSON.parse(localStorage.getItem("user details")) || [];
// <======adding user date to local storage and array by 'ONSUBMIT'======>
const addRegisterList = (firstname, lastname, email, username, password, address, male, female, other, date, phonenumber) => {
    registerList.push({
        firstname,
        lastname,
        email,
        username,
        password,
        address,
        male,
        female,
        other,
        date,
        phonenumber
    })
    localStorage.setItem("user details", JSON.stringify(registerList));
    return { firstname, lastname, email, username, password, address, male, female, other, date, phonenumber }
}


// <=======Getting the user data from input to to localstorage=======>


form.onsubmit = (e) => {
    e.preventDefault();
    console.log("hi")
    condition()

    //<======== this if statement checks if all values are true then it data will submit========>
    if (numberOfTrues == 6) {

        console.log(numberOfTrues)
        addRegisterList(firstnameInput.value, lastnameInput.value, emailInput.value, usernameInput.value, passwordInput.value, addressInupt.value, maleInput.checked, femaleInput.checked, otherInput.checked, dateInput.value, phonenumberInput.value)
        firstnameInput.value = "";
        lastnameInput.value = "";
        emailInput.value = "";
        usernameInput.value = "";
        passwordInput.value = "";
        addressInupt.value = "";
        maleInput.checked = false;
        femaleInput.checked = false;
        otherInput.checked = false;
        dateInput.value = "";
        phonenumberInput.value = "";
        styleRemove("firstname");
        styleRemove("lastname");
        styleRemove("email");
        styleRemove("username");
        styleRemove("password");
        styleRemove("phonenumber");

        success();
        setTimeout(removeClass, 5000);
        location.href = "/login/login.html";


    }
}


//        <==========Information of regex value to input by 'ONFOCUS' event=========>


function showHelp(div, help) {
    let chow = document.createElement("chow");
    chow.setAttribute("class", "chow");
    chow.textContent = help;
    document.getElementById(div).appendChild(chow);

}

function makeHelpCallback(div, help) {
    return function () {
        showHelp(div, help);
    };
}

function setupHelp() {
    var helpText = [
        { 'id': 'firstname', 'div': 'fn', 'help': "Must contain between min of three characters with no numbers" },
        { 'id': 'lastname', 'div': 'ln', 'help': "Must contain between min of one characters with no numbers" },
        { 'id': 'email', 'div': 'el', 'help': 'Must contain valid email address' },
        { 'id': 'username', 'div': 'un', 'help': 'Must contain min of five characters and number with no space ' },
        { 'id': 'password', 'div': 'pw', 'help': 'Must contain one uppercase,one lowercase,one numerber and one special characte of mininum eight characters ' },
        { 'id': 'address', 'div': 'ad', 'help': 'Enter your  permanent address with pin code' },

        { 'id': 'phonenumber', 'div': 'pn', 'help': 'Must enter valid mobile number' }
    ];

    for (var i = 0; i < helpText.length; i++) {
        var item = helpText[i];
        document.getElementById(item.id).onfocus = makeHelpCallback(item.div, item.help);
    }
}

setupHelp();


//      <========Removing the information of regex value to input by  'ONFOCUSOUT' event=======>


function myFunction() {
    var chow = document.getElementsByTagName("chow");
    var array = [...chow];
    for (let i = 0; i < array.length; i++) {
        array[i].remove();
    }
}


//       <======Informing the user for invaild values by alertwith reason======>
// function boolean(regexp, input, reason) {

//     if (regexp.test(input.value) == true) {
//         return true;
//     }
//     else {
//         alert(`enter valid ${reason} characters`);
//         input.focus();
//         return false;
//     }
// }
const boolean = (regexp, input, reason) => z = (regexp.test(input.value) == true) ? true : alert(`enter valid ${reason} characters`) || input.focus();

//      <======this function checks every input is true or false it assign no of trues to variable====>
function condition() {
    let z = boolean(fn, firstnameInput, 'firstname');
    let y = boolean(ln, lastnameInput, 'lastname');
    let x = boolean(em, emailInput, 'email');
    let w = boolean(un, usernameInput, 'username');
    let v = boolean(pw, passwordInput, 'password');
    let u = boolean(pn, phonenumberInput, 'phone-number');
    numberOfTrues = (u + v + w + x + y + z);
}


// removing the green border after submitting values
function styleRemove(input) {
    let id = document.getElementById(input);
    if (id.value == "") {
        id.removeAttribute("style");
    }
}
// <====after submit with correct values success will print at bottom by adding text,class=====>

function success() {
    statu.innerText = 'success';
    statu.setAttribute("class", 'success');
}
//    <=============removing the text and class properties========>
function removeClass() {
    statu.innerText = '';
    statu.removeAttribute("class");
}
