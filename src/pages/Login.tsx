import Floresta from "../assets/Floresta.jpg";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/authContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Login = () => {
  const auth = useAuth();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    senha: Yup.string().required("Senha é obrigatória"),
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
    <div className="relative w-full h-screen flex items-center justify-center">
      <img
        src={Floresta}
        alt="Floresta"
        className="absolute inset-0 object-cover w-full h-full z-0"
      />
      <div className="relative bg-white rounded-lg shadow-lg p-10 w-full md:w-1/2 lg:w-1/3 max-w-md z-10">
        <div className="text-center mb-6">
          <p className="font-semibold text-3xl text-green-600 font-inter">
            Login
          </p>
          <p className="font-normal text-base font-inter text-operacao-gray-color-60">
            Faça o login para acessar a plataforma
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} className="w-full">
          <div className="mb-4">
            <Input
              id="email"
              title="Login"
              placeholder="Digite seu email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full h-10 "
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 mt-1">{formik.errors.email}</div>
            )}
          </div>
          <div className="w-full mb-4">
            <Input
              id="senha"
              title="Senha"
              placeholder="Digite sua senha"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.senha}
              className="w-full h-10"
            />
            {formik.touched.senha && formik.errors.senha && (
              <div className="text-red-500 mt-1">{formik.errors.senha}</div>
            )}
          </div>
          <Button
            title="Acessar"
            type="submit"
            className="w-full bg-green-600 text-white"
          >
            Acessar
          </Button>
        </form>
      </div>
    </div>
  );
};
