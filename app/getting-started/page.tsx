import { AiOutlineGithub, AiOutlineGoogle } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import LoginForm from '@/app/components/Forms/LoginForm';
import RegisterForm from '@/app/components/Forms/RegisterForm';
import RandomImage from '@/app/components/RandomImage';

type formTypes = {
  type: 'login' | 'register';
};
export default async function GettingStartedPage({
  searchParams,
}: {
  searchParams: formTypes;
}) {
  const formContent =
    searchParams.type === 'login' ? <LoginForm /> : <RegisterForm />;
  return (
    <main className="flex items-center justify-center h-screen w-screen bg-whiteDark">
      <section className="flex h-[90%] w-[80%] p-4 bg-whiteLight rounded-2xl shadow-xl shadow-silverGrey">
        {/* left side: form */}
        <div className="flex-1 flex flex-col px-16 py-2">
          <h1 className="text-body-lg font-extrabold text-grassGreen text-center">
            Propella
          </h1>

          <p className="mb-12 text-head1 font-bold text-center">
            Choose your <br /> perfect place
          </p>

          <div className="flex justify-center items-center relative">
            <button className="flex justify-center items-center h-[75px] w-[75px] rounded-full  bg-silverGrey btn--search">
              <AiOutlineGoogle size={20} />
            </button>

            <button className="flex justify-center items-center h-[75px] w-[75px] rounded-full  bg-silverGrey btn--search">
              <BsFacebook size={20} />
            </button>

            <button className="flex justify-center items-center h-[75px] w-[75px] rounded-full  bg-silverGrey btn--search">
              <AiOutlineGithub size={20} />
            </button>
          </div>

          <span className="my-2 text-center">or</span>

          <div className="px-4">{formContent}</div>
        </div>

        {/* right side: image */}
        <div className="flex-[2] relative rounded-2xl overflow-hidden">
          <RandomImage />
        </div>
      </section>
    </main>
  );
}
