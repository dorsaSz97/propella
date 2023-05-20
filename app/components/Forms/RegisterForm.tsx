'use client';

import { useRouter } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';
import Input from './Input';

const RegisterForm = () => {
  const router = useRouter();

  const {
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  return (
    <>
      <form className="flex flex-col gap-3">
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
        onClick={() => router.push('/getting-started?type=login')}
        className="block mt-3 mx-auto font-semibold"
      >
        Already have an account?
      </button>
    </>
  );
};

export default RegisterForm;
