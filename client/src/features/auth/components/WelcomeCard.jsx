const WelcomeCard = ({ title1, title2, className = "" }) => {
  return (
    <section className={`relative lg:w-137.5 lg:h-180 md:w-107.5 md:h-150 bg-[#F5F3F8] rounded-3xl md:rounded-none md:bg-white p-3 md:p-0 gap-3.5 flex ${className}`}>
      <div className="w-20 h-23 md:w-full md:h-full rounded-3xl">
        <img src="/images/Coastal photo.png" alt="" className="rounded-3xl h-full w-full object-cover" />
      </div>
      <div className="md:w-full w-auto flex flex-col justify-center gap-1.5 md:gap-0 md:justify-between md:h-full md:bg-linear-to-t from-[#30283F]/91 to-[#30283F]/9 md:p-9 md:rounded-3xl md:absolute md:top-0 ">
        <p className="bg-white/70 text-sm flex hidden md:block font-Poppins-Medium w-min text-nowrap p-2 px-4 rounded-full">GOOD PEOPLE.LITTLE MOMENTS.</p>
        <div className="md:text-white flex flow-row md:flex-col text-black text-sm md:text-5xl">
          <h4>{title1}</h4>
          <h4>{title2}</h4>
          <p className="mt-6 hidden md:block text-xs text-neutral-300">For the places you find, the things you love, and the people who get you.</p>
        </div>
        <p className="text-xs md:hidden text-neutral-500">A place for your kind of people</p>
      </div>
    </section>
  )
}
export default WelcomeCard