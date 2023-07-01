export const metadata = {
  title: 'Getting Started | Login & Register',
  description: 'Real Estate Listing`s Login/Register Page',
};

export default function GettingStartedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex items-center justify-center min-h-full w-full">
      <section className="flex h-[90%] w-[80%] p-4 bg-whiteLight rounded-2xl shadow-xl shadow-silverGrey">
        {children}
      </section>
    </main>
  );
}
