'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ISignupInputs } from '@/app/types';

const RegisterForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupInputs>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  // const formSubmitHandler: SubmitHandler<ISignupInputs> = values => {
  //   axios
  //     .post('/api/signup', values)
  //     .then(() => {
  //       router.push('/getting-started?type=login');
  //     })
  //     .catch(error => {
  //       alert(error);
  //     });
  // };

  return (
    <>
      <form className="flex flex-col gap-3">
        <input
          placeholder="full name"
          {...register('name')}
          className="bg-silverGrey p-2 text-body-lg rounded-[1000px] placeholder:capitalize"
        />
        <input
          {...register('email', { required: true })}
          type="email"
          placeholder="email"
          className="bg-silverGrey p-2 text-body-lg rounded-[1000px] placeholder:capitalize"
        />
        {errors.email && <span>Email is required</span>}
        <input
          {...register('password', { required: true })}
          type="password"
          placeholder="password"
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
      <button onClick={() => router.push('/get-started?type=login')}>
        Already have an account?
      </button>
      {/* <form onSubmit={handleSubmit(formSubmitHandler)}>
        <input {...register('name')} />
        <input {...register('email', { required: true })} type="email" />
        {errors.email && <span>Email is required</span>}
        <input {...register('password', { required: true })} type="password" />
        {errors.password && <span>Pass is required</span>}
        <button type="submit">Start</button>
      </form>
      <button onClick={() => router.push('/get-started?type=login')}>
        Already have an account?
      </button> */}
    </>
  );
};

export default RegisterForm;
