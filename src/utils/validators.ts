// Required
function required(value: string | number) {
    const requiredMessage = "Campo obrigatório"
    // If is a string
    if (typeof value === "string" && value.trim() === "") {
        return requiredMessage;
    }

    // If is a number
    if (typeof value === "number" && !value) {
        return requiredMessage;
    }

    // If is a boolean
    if (typeof value === "boolean" && !value) {
        return requiredMessage;
    }

    // If is a array
    if (Array.isArray(value) && value.length === 0) {
        return requiredMessage;
    }

    // Else
    if (!value) {
        return requiredMessage;
    }

    return true;
}

function email(field: string) {
    if(!field) return true
    const usuario = field.substring(0, field.indexOf("@"));
    const dominio = field.substring(field.indexOf("@") + 1, field.length);

    if (
        usuario.length >= 1 &&
        dominio.length >= 3 &&
        usuario.search("@") == -1 &&
        dominio.search("@") == -1 &&
        usuario.search(" ") == -1 &&
        dominio.search(" ") == -1 &&
        dominio.search(".") != -1 &&
        dominio.indexOf(".") >= 1 &&
        dominio.lastIndexOf(".") < dominio.length - 1
    ) {
        return true;
    } else {
        return "E-mail inválido";
    }
}

export {
    required,
    email
}