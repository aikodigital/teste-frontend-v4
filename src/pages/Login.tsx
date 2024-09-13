import React from "react";
import Floresta from "../assets/Floresta.jpg";
import Logo from "../assets/logo.svg";
import { Input } from "../components/Input";
import { InputPassword } from "../components/InputPassword";
import { Button } from "../components/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const auth = useAuth();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email é obrigatório"),
    senha: Yup.string().required("Senha é obrigatório"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      senha: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      await auth.login(values.email, values.senha);
    },
  });

  return (
    <div className="tw-w-full tw-h-screen tw-flex">
      <div className="tw-w-full md:tw-w-1/2 xl:tw-w-1/4 tw-bg-white tw-h-full tw-p-10 md:tw-p-10 tw-flex tw-flex-col tw-justify-between">
       <div className="tw-w-full tw-flex tw-items-center tw-justify-center">
        <span className="tw-text-green-600 tw-font-bold tw-text-3xl">Operação Florestal</span>
       </div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <p className="tw-font-semibold tw-text-3xl tw-text-operacao-gray-color-100 tw-font-inter">
              Login
            </p>
            <p className="tw-font-normal tw-text-base tw-font-inter tw-text-operacao-gray-color-60 tw-flex-wrap">
              Informe os dados abaixo para acessar a nossa plataforma.
            </p>
            <div>
              <div>
                <Input
                  id="email"
                  title="Login"
                  placeholder="Digite aqui"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="tw-text-red-500">{formik.errors.email}</div>
                )}
              </div>
              <div className="tw-mt-3 tw-mb-3">
                <InputPassword
                  id="senha"
                  title="Senha"
                  placeholder="Digite aqui"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.senha}
                />
                {formik.touched.senha && formik.errors.senha && (
                  <div className="tw-text-red-500">{formik.errors.senha}</div>
                )}
              </div>
              <div>
                <Button
                  title="Acessar"
                  type="submit"
                  disabled={formik.isSubmitting}
                />
              </div>
            </div>
          </div>
        </form>
        <div className="tw-flex" />
      </div>
      <div className="tw-hidden md:tw-flex tw-w-full tw-bg-operacao-brand-color-blue-40 tw-h-full">
        <img className="tw-object-cover tw-h-full" src={Floresta} alt="" />
      </div>
    </div>
  );
};
