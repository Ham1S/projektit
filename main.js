function validateForm() {
    var uid = document.registration.userid;
    var salsana = document.registration.passid;
    var uname = document.registration.username;
    var uadd = document.registration.address;
    var ucountry = document.registration.country;
    var uzip = document.registration.zip;
    var uemail = document.registration.email;
    var usex = document.registration.sex; 

    if(uid_validation(uid,6) && salsana_validation(salsana,6) && allLetter(uname) 
    && alphanumeric(uadd) && countryselect(ucountry) && allnumeric(uzip) 
    && ValidateEmail(uemail) && validsex() && validate())
    return false;
}

function uid_validation(uid,my)
{
    var uid_len = uid.value.length;
    if (uid_len == 0 || uid_len <my)
{
    alert("Käyttäjätunnus on pakollinen / Käyttäjätunnuksessa täytyy olla vähintään 6 merkkiä");
    uid.focus();
    return false;
}
return true;
}

function salsana_validation(salsana,my) {
    var salsana_len = salsana.value.length;
    if (salsana_len == 0 || salsana_len <my)
{
    alert("Salasana ei voi olla tyhjä / Salasanassa täytyy olla väshintään 6 merkkiä");
    salsana.focus();
    return false;
}
return true;
}

function allLetter(uname) {
    var letters = /^[A-Öa-ö]+$/;
    if(uname.value.match(letters))
{
    return true;
}
else
{
    alert('Nimi on pakollinen / Nimessä voi olla vain aakkosia');
    uname.focus();
    return false;
}
}

function alphanumeric(uadd) {
    var uadd_len = uadd.value.length;
    var letters = /^[0-9a-öA-Ö]+$/;
    if (uadd_len >=4 && uadd.value.match(letters))
{
    return true;
}
    else
{
    alert('Osoite on pakollinen')
    uadd.focus();
    return false;
}
}

function countryselect(ucountry) {
    if(ucountry.value == "Default")
{
    alert('Valitse maasi listasta');
    ucountry.focus();
    return false;
}
    else
{
    return true;
}
}

function allnumeric(uzip) {
    var numbers = /^[0-9]+$/;
    var uzip_len = uzip.value.length;
    if(uzip_len ==5 && uzip.value.match(numbers))
{
    return true;
}
    else
{
    alert('Postinumerossa täytyy olla 5 numeroa');
    uzip.focus();
    return false;
}
}

function ValidateEmail(uemail) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(uemail.value.match(mailformat))
{
    return true;
}
    else
{
    alert('Sähköpostin täytyy olla sähköpostin muotoinen');
    uemail.focus();
    return false;
}
}

function validsex() {
    var sex = document.forms["registration"]["sex"];
    if (
        sex[0].checked == false &&
        sex[1].checked == false
    ) {
        alert("Valitse sukupuoli");
        return false;
    } else {
        return true;
    }
}

function validate() {
    var cbox = document.forms["registration"]["checkbox"];
    if (
        cbox[0].checked == false &&
        cbox[1].checked == false
    ) {
        alert("Valitse kielesi");
        return false;
    } else
    {
        alert("Lomake lähetetty onnistuneesti");
        window.location.reload()
        return true;
    }

}