import CatSvg from "/icons/Vector.svg"

const Layout = ({ children }) => {
  return (
    <>
      <header className="w-full h-26 md:px-12 px-6 max-w-7xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={CatSvg} alt="nekoSocial logo" className="p-3 w-13 h-13 bg-[#F0EAFB] rounded-2xl" />
          <h2 className="font-Poppins-SemiBold text-3xl">nekoSocial</h2>
        </div>
        <p className="text-neutral-500 hidden sm:block">A place for your kind of people</p>
      </header>
      <main className="flex flex-1 flex-col-reverse md:flex-row justify-end px-6 mt-3 gap-10 2xl:gap-20">
        {children}
      </main>
      <footer className="flex justify-between w-full text-neutral-500 text-xs px-12 py-5">
        <p>© 2026 nekoSocial</p>
        <h5 className="text-black font-Poppins-SemiBold">Developed by Reza Ghasemi</h5>
        <div className="flex gap-1">
          <a href="">Privacy </a>.
          <a href="">Terms </a>.
          <a href="">Help</a>
        </div>
      </footer>
    </>
  )
}
export default Layout