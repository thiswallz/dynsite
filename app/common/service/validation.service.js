angular.module("gallery.app")


.service("formatValidateService", function(){
    this.validateMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.letterNumber = /^[0-9a-zA-Z]+$/;
    this.validatePwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/; //obligatorio ej 123Aa! uso min, may, num ,caracter
    this.validatePwd2 = /^[0-9a-zA-Z!@#\$%\^&\*]+$/; //opcionales solo acepta:  letras, numeros, y caracteres
})