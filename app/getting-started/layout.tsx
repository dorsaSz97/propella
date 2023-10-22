export const metadata = {
  title: "Getting Started | Login & Register",
  description: "Real Estate Listing`s Login/Register Page",
};

export default function GettingStartedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex items-center justify-center h-full w-full">
      <section className="flex items-center h-full xs:w-full sm:w-[80%] md:w-[90%] max-w-[1000px] p-4 bg-whiteLight rounded-2xl shadow-xl shadow-silverGrey justify-center ">
        {children}
      </section>
    </main>
  );
}
