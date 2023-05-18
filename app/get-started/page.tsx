import LoginForm from '@/app/components/Forms/LoginForm';
import RegisterForm from '@/app/components/Forms/RegisterForm';
import { AiOutlineGithub, AiOutlineGoogle } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import RandomImage from '../components/RandomImage';

type searchParamsType = {
  type: 'login' | 'register';
};
export default async function GettingStartedPage({
  searchParams,
}: {
  searchParams: searchParamsType;
}) {
  const formContent =
    searchParams.type === 'login' ? <LoginForm /> : <RegisterForm />;

  return (
    <main className="h-screen w-screen py-6 px-12">
      <section className="flex h-full w-full rounded-2xl overflow-hidden">
        {/* left side: form */}
        <div className="flex-1 flex flex-col items-center justify-between">
          <h1 className="mb-8 font-bold text-grassGreen text-[20px]">
            Propella
          </h1>
          <p className="mb-20 font-extrabold text-[35px]">
            Choose your <br /> perfect place
          </p>
          <div className=" flex justify-center items-center">
            <div className="flex relative">
              <div className="rounded-full h-35 w-35 bg-silverGrey p-2 btn--search">
                <button className="rounded-full h-25 w-25  p-5 text-lg">
                  <AiOutlineGoogle />
                </button>
              </div>

              <div className="rounded-full h-35 w-35 bg-silverGrey p-2 btn--search">
                <button className="rounded-full h-25 w-25  p-5 text-lg">
                  <BsFacebook />
                </button>
              </div>

              <div className="rounded-full h-35 w-35 bg-silverGrey p-2">
                <button className="rounded-full h-25 w-25  p-5 text-lg">
                  <AiOutlineGithub />
                </button>
              </div>
            </div>
          </div>

          <span className="my-6">or</span>
          <div>{formContent}</div>
        </div>

        {/* right side: image */}
        <div className="flex-1 relative rounded-2xl overflow-hidden">
          <RandomImage />
        </div>
      </section>
    </main>
  );
}
