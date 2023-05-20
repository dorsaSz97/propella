'use client';

import { useRouter } from 'next/navigation';
import { useForm, FieldValues } from 'react-hook-form';
import Input from './Input';

const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <>
      <form className="flex flex-col gap-3">
        <Input
          registerFn={register}
          fieldName="email"
          placeholder="email"
          type="email"
          errors={errors}
          errorMsg="email is required"
        />
        <Input
          registerFn={register}
          fieldName="password"
          placeholder="password"
          type="password"
          errors={errors}
          errorMsg="password is required"
        />
        <button
          type="submit"
          className="px-2 py-4 mt-2 rounded-[1000px] bg-grassGreen text-white"
        >
          Get in
        </button>
      </form>
      <button
        onClick={() => router.push('/getting-started?type=register')}
        className="block mt-3 mx-auto font-semibold"
      >
        Dont have an account?
      </button>
    </>
  );
};

export default LoginForm;
