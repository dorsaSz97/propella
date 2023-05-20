'use client';
import { useRouter } from 'next/navigation';
// import { signIn } from 'next-auth/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ISigninInputs } from '@/app/types';

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISigninInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // const formSubmitHandler: SubmitHandler<ISigninInputs> = values => {
  //   signIn('credentials', {
  //     ...values,
  //     redirect: false,
  //   })
  //     .then(() => {
  //       router.push('/');
  //     })
  //     .catch(error => {
  //       alert(error);
  //     });
  // };
  return (
    <>
      {/* <form onSubmit={handleSubmit(formSubmitHandler)}>
        <input {...register('email', { required: true })} type="email" />
        {errors.email && <span>Email is required</span>}
        <input {...register('password', { required: true })} type="password" />
        {errors.password && <span>Pass is required</span>}
        <button type="submit">Start</button>
      </form>
      <button onClick={() => router.push('/getting-started?type=register')}>
        Wanna create an account?
      </button> */}
      <form className="flex flex-col gap-3">
        <input
          {...register('email', { required: true })}
          type="email"
          className="bg-silverGrey p-2 text-body-lg rounded-[1000px] placeholder:capitalize"
        />
        {errors.email && <span>Email is required</span>}
        <input
          {...register('password', { required: true })}
          type="password"
          className="bg-silverGrey p-2 text-body-lg rounded-[1000px] placeholder:capitalize"
        />
        {errors.password && <span>Pass is required</span>}
        <button
          type="submit"
          className="bg-grassGreen p-2 rounded-[1000px] text-white"
        >
          Start
        </button>
      </form>
      <button
        onClick={() => router.push('/get-started?type=register')}
        className="mt-3 mx-auto block"
      >
        Wanna create an account?
      </button>
    </>
  );
};

export default LoginForm;
