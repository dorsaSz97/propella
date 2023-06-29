import LoginForm from "@/app/getting-started/Forms/LoginForm";
import RegisterForm from "@/app/getting-started/Forms/RegisterForm";
import ProviderButton from "@/app/getting-started/Forms/ProviderButton";
import RandomImage from "@/app/getting-started/RandomImage";
import { BsFacebook } from "react-icons/bs";
import { AiOutlineGithub, AiOutlineGoogle } from "react-icons/ai";

export const metadata = {
  title: "Getting Started | Login & Register",
  description: "Real Estate Listings Login/Register Page",
};
export default async function GettingStartedPage({
  searchParams,
}: {
  searchParams: { type: "login" | "register" };
}) {
  const formContent =
    searchParams.type === "login" ? <LoginForm /> : <RegisterForm />;

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
        <div className="flex-[2] relative rounded-2xl overflow-hidden">
          <RandomImage />
        </div>
      </section>
    </main>
  );
}
