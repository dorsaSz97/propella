"use client";

import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import axios from "axios";

const RegisterForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const formSubmitHandler: SubmitHandler<FieldValues> = (values) => {
    axios.post("/api/register", values).then((res) => {
      if (res.data.user) {
        router.push("/getting-started?type=login");
      } else {
        alert(res.data.error);
      }
    });
  };

  return (
    <>
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        <Input
          registerFn={register}
          fieldName="name"
          placeholder="full name"
          errors={errors}
          errorMsg="name is required"
        />
        <Input
          registerFn={register}
          fieldName="email"
          type="email"
          placeholder="email"
          errors={errors}
          errorMsg="email is required"
        />
        <Input
          registerFn={register}
          fieldName="password"
          type="password"
          placeholder="password"
          errors={errors}
          errorMsg="password is required"
        />
        <button
          type="submit"
          className="px-2 py-4 mt-2 rounded-[1000px] bg-grassGreen text-white"
        >
          Start
        </button>
      </form>
      <button
        onClick={() => router.push("/getting-started?type=login")}
        className="block mt-3 mx-auto font-semibold"
      >
        Already have an account?
      </button>
    </>
  );
};

export default RegisterForm;
