/* eslint-disable */
import { Notify, Loading, date, copyToClipboard } from "quasar";
import axios from "axios";

const utils = {
  mensagemErro(msg) {
    Notify.create({
      message: `${msg}`,
      color: "negative",
      textColor: "white",
      position: "bottom",
      icon: "report_problem",
      timeout: 5000,
      html: true,
      actions: [
        {
          icon: "close",
          color: "yellow",
          handler: () => {
            /* ... */
          },
        },
      ],
    });
  },
  mensagemErroTimeout(msg, timeout) {
    Notify.create({
      message: `${msg}`,
      color: "negative",
      textColor: "white",
      position: "center",
      icon: "report_problem",
      timeout: timeout,
      html: true,
      actions: [
        {
          icon: "close",
          color: "yellow",
          handler: () => {
            /* ... */
          },
        },
      ],
    });
  },
  topoPagina() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // para subir scrool das modais
    const list = document.getElementsByClassName("scroll");
    for (const item of list) {
      item.scrollTo(0, 0);
    }
  },
  mensagemSucesso(msg) {
    Notify.create({
      message: msg,
      color: "positive",
      textColor: "white",
      position: "bottom",
      icon: "cloud_done",
      timeout: 1000,
      html: true,
    });
  },
  mensagemWarning(msg) {
    Notify.create({
      message: msg,
      color: "orange-10",
      textColor: "white",
      position: "bottom",
      icon: "warning",
      timeout: 5000,
      html: true,
    });
  },
  mensagemSucessoTimeout(msg, timeOut) {
    Notify.create({
      message: msg,
      color: "positive",
      textColor: "white",
      position: "top",
      icon: "cloud_done",
      timeout: timeOut,
      html: true,
    });
  },
  mensagemWarningTimeout(msg, timeOut) {
    Notify.create({
      message: msg,
      color: "warning",
      textColor: "white",
      position: "top",
      icon: "warning",
      timeout: timeOut,
      html: true,
    });
  },
  showLoading: function () {
    return Loading.show();
  },
  showLoadingWithMessage: function (msg) {
    return Loading.show({ message: msg, html: true });
  },
  hideLoading: function () {
    return Loading.hide();
  },

  generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },

  formataDataComHoras(tipoIntevalo, data, horas = "00:00:00") {
    if (tipoIntevalo === "final") horas = "23:59:59";
    const dia = data.substring(0, 2);
    const mes = data.substring(3, 5);
    const ano = data.substring(6);
    return `${ano}-${mes}-${dia}+${horas}`;
  },

  formataDataSemHoras(data) {
    const dia = data.substring(0, 2);
    const mes = data.substring(3, 5);
    const ano = data.substring(6);
    return `${ano}-${mes}-${dia}`;
  },

  formatarData(data, formato) {
    return date.formatDate(data, formato);
  },

  formatarDataGMT(data, formato) {
    const dt = new Date(data);
    dt.setHours(dt.getHours() + 3);
    return date.formatDate(dt, formato);
  },

  formatarDataUTC(data, formato) {
    let dataAtual = data;
    if (typeof data === "object")
      dataAtual = this.formatarData(data, "YYYY-MM-DD");
    const dataT = dataAtual + " 00:00:00";
    return date.formatDate(dataT, formato);
  },

  formatarDataParaDateParser(data) {
    const [dia, mes, ano, hora, minuto] = data.split(/[/ :]/);
    return `${ano}-${mes}-${dia} ${hora}:${minuto}`;
  },

  validarDadosData(dt) {
    const dateReg =
      /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
    return dt.match(dateReg);
  },

  copiarParaAreaDeTransferencia(dados) {
    if (!dados) {
      Notify.create({
        message: "Nada a copiar",
        color: "grey",
        textColor: "white",
        position: "center",
        timeout: 1000,
      });
      return;
    }
    copyToClipboard(dados)
      .then(() => {
        Notify.create({
          message: "Copiado com sucesso!",
          color: "positive",
          textColor: "white",
          position: "center",
          timeout: 1000,
        });
      })
      .catch(() => {
        Notify.create({
          message: "Falha ao copiar",
          color: "negative",
          textColor: "white",
          position: "center",
          timeout: 1000,
        });
      });
  },

  async buscaLatLong() {
    // const url = `https://viacep.com.br/ws/${cep}/json/`;
    const url =
      "https://nominatim.openstreetmap.org/search.php?q=Rua+Sebasti%C3%A3o+Moreira+Tirol&format=jsonv2";
    const response = await axios.get(`${url}`);
    return response.data;
  },
};

export default utils;
