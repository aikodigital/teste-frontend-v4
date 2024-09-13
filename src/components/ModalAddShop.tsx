import React, { useState } from "react";
import ArrowLeft from "../assets/arrow-left.svg";
import { Button } from "./Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "./Input";

export const ModalAddShop = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const validationSchema = Yup.object().shape({
    nomeLoja: Yup.string().required("Nome da loja é obrigatório"),
    cidade: Yup.string().required("Cidade é obrigatória"),
    latitude: Yup.string().required("Latitude é obrigatória"),
    longitude: Yup.string().required("Longitude é obrigatória"),
  });

  const formik = useFormik({
    initialValues: {
      nomeLoja: "",
      cidade: "",
      latitude: "",
      longitude: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <button
        className=" tw-text-operacao-gray-color-80 tw-font-medium tw-py-2 tw-px-4 tw-rounded tw-flex tw-items-center"
        onClick={openModal}
      >
        <p className="tw-text-2xl tw-font-medium tw-mr-2 tw-text-operacao-brand-color-blue-100">
          +
        </p>{" "}
        Cadastrar nova operação
      </button>

      {modalOpen && (
        <div className="tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 tw-flex tw-items-center tw-justify-end tw-bg-black tw-bg-opacity-50 tw-z-50">
          <div className="tw-bg-white tw-p-6 tw-rounded tw-shadow tw-h-screen tw-w-full md:tw-w-[20%]">
            <div className="tw-w-full tw-flex tw-items-center tw-justify-between">
              <img
                className="tw-cursor-pointer"
                onClick={closeModal}
                src={ArrowLeft}
                alt=""
              />
              <p>Cadastrar nova operação</p>
              <div />
            </div>
            <div className="tw-mt-4">
              <div className="tw-mt-3">
                <Input
                  id="nomeLoja"
                  title="Nome da operação"
                  placeholder="Digite aqui"
                  type="text"
                  {...formik.getFieldProps("nomeLoja")}
                />
                {formik.touched.nomeLoja && formik.errors.nomeLoja && (
                  <div className="tw-text-red-500">
                    {formik.errors.nomeLoja}
                  </div>
                )}
              </div>
              <div className="tw-mt-3">
                <Input
                  id="cidade"
                  title="Cidade"
                  placeholder="Digite aqui"
                  type="text"
                  {...formik.getFieldProps("cidade")}
                />
                {formik.touched.cidade && formik.errors.cidade && (
                  <div className="tw-text-red-500">{formik.errors.cidade}</div>
                )}
              </div>
              <div className="tw-mt-3">
                <Input
                  id="latitude"
                  title="Latitude"
                  placeholder="Digite aqui"
                  type="text"
                  {...formik.getFieldProps("latitude")}
                />
                {formik.touched.latitude && formik.errors.latitude && (
                  <div className="tw-text-red-500">
                    {formik.errors.latitude}
                  </div>
                )}
              </div>
              <div className="tw-mt-3">
                <Input
                  id="longitude"
                  title="Longitude"
                  placeholder="Digite aqui"
                  type="text"
                  {...formik.getFieldProps("longitude")}
                />
                {formik.touched.longitude && formik.errors.longitude && (
                  <div className="tw-text-red-500">
                    {formik.errors.longitude}
                  </div>
                )}
              </div>
          
              <div className="tw-mt-3">
                <Button
                  title="Cadastrar"
                  type="submit"
                  disabled={formik.isSubmitting}
                />
              </div>
              <button
                className="tw-h-14 tw-flex tw-justify-center tw-items-center tw-w-full"
                type="button"
                onClick={formik.handleReset}
              >
                Limpar campos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
