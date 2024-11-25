import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

import logo from "../../assets/global-logo.png";
import {
  FormDataType,
  FormErrors,
  PageRoutesEnum,
  ReactElementType,
  RegisterPropsType,
  RenderInputElementType,
  VoidFunctionType,
} from "../../types";
import {
  MINIMUM_PASSWORD_LENGTH,
  REGISTER_INPUT_NAMES,
  REGISTER_INPUT_TYPES,
} from "../../constants";
import PasswordStrengthBar from "../../components/passwordStrengthBar/PasswordStrengthBar";
import Loader from "../../components/loader/Loader";
import { useTranslation } from "react-i18next";
import Input from "../../components/inputComponents/Input";

const Register: React.FC<RegisterPropsType> = ({
  formData,
  handleInputChange,
  handleSubmit,
  errors,
  registerLoading,
  passwordStrength,
}) => {
  const navigate: NavigateFunction = useNavigate();
  const { t } = useTranslation();
  const tPath = "pages.register";

  const renderInputElement: RenderInputElementType = (type, inputType) => {
    const inputValue = formData[type as keyof FormDataType];
    const error = errors[type as keyof FormErrors];
    return (
      <Input
        type={type}
        inputType={inputType}
        error={error}
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        tPath="pages.register"
      />
    );
  };
  const navigateLogin: VoidFunctionType = () => {
    navigate(PageRoutesEnum.LOGIN_PAGE);
  };

  const renderButtonText = (): React.ReactElement | string => {
    if (registerLoading) {
      return <Loader />;
    }
    return t(tPath + ".buttons.signup");
  };

  const renderSubmitButton: ReactElementType = () => {
    return (
      <>
        <button
          type="submit"
          className="bg-primary hover:bg-blue-600 text-white font-semibold h-[40px] px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {renderButtonText()}
        </button>
        <p
          onClick={navigateLogin}
          className="mt-8 text-sm text-center text-general"
        >
          {t(tPath + ".note")}
          <span className="text-primary hover:text-blue-600 ml-1 font-medium cursor-pointer">
            {t(tPath + ".buttons.login")}
          </span>
        </p>
      </>
    );
  };

  const renderPasswordStrengthBar: ReactElementType = () => {
    if (formData.password.length >= MINIMUM_PASSWORD_LENGTH) {
      return <PasswordStrengthBar passwordStrength={passwordStrength} />;
    }
    return <></>;
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#F1F7FF]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white shadow-md rounded-lg px-20 pt-6 pb-8 w-full max-w-lg"
      >
        <img src={logo} className="w-[90px] h-[90px] self-center" alt="Logo" />
        <h2 className="text-3xl self-center my-6 mb-9 text-general">
          {t(tPath + ".title")}
        </h2>
        {renderInputElement(
          REGISTER_INPUT_NAMES.username,
          REGISTER_INPUT_TYPES.text
        )}
        {renderInputElement(
          REGISTER_INPUT_NAMES.password,
          REGISTER_INPUT_TYPES.password
        )}
        {renderPasswordStrengthBar()}
        {renderInputElement(
          REGISTER_INPUT_NAMES.confirmPassword,
          REGISTER_INPUT_TYPES.password
        )}
        {renderSubmitButton()}
      </form>
    </div>
  );
};

export default Register;