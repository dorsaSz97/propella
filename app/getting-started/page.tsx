import { BsFacebook } from "react-icons/bs";
import { AiOutlineGithub, AiOutlineGoogle } from "react-icons/ai";
import LoginForm from "./_components/LoginForm";
import RegisterForm from "./_components/RegisterForm";
import ProviderButton from "./_components/ProviderButton";
import RandomImage from "./_components/RandomImage";

type Props = {
  searchParams: { type: "login" | "register" };
};
export default async function GettingStartedPage({ searchParams }: Props) {
  const formContent =
    searchParams.type === "login" ? <LoginForm /> : <RegisterForm />;

  return (
    <>
      {/* left side: form */}
      <div className="flex-1 flex flex-col md:px-16 px-2 py-2 md:max-w-none max-w-[400px]">
        <h1 className="text-body-sm leading-snug md:leading-normal md:text-body-lg font-extrabold text-grassGreen text-center">
          Propella
        </h1>

        <p className="mb-12 text-head1 font-bold text-center">
          Choose your <br /> perfect place
        </p>

        <div className="flex justify-center items-center relative">
          <ProviderButton
            providerName="facebook"
            btnIcon={<BsFacebook size={20} />}
          />
          <ProviderButton
            providerName="github"
            btnIcon={<AiOutlineGithub size={20} />}
          />
          <ProviderButton
            providerName="google"
            btnIcon={<AiOutlineGoogle size={20} />}
          />
        </div>

        <span className="my-2 text-center">or</span>

        <div className="px-4">{formContent}</div>
      </div>

      {/* right side: image */}
      <div className="hidden md:block h-full flex-[2] relative rounded-2xl overflow-hidden">
        <RandomImage />
      </div>
    </>
  );
}
