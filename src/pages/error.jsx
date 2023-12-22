export const metadata = {
  title: 'Errpr',
};

export default function Error() {
  return (
    <main>
      <section className="bg-white">
        <div className="layout flex min-h-screen flex-col items-center justify-center text-center text-black">
          <h1 className="mt-8 text-4xl md:text-6xl">Halaman error</h1>
          <a href="/" className="link">Kembali</a>
        </div>
      </section>
    </main>
  );
}
