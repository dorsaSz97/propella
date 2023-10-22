const DetailNav = ({ sameUser }: { sameUser: boolean }) => {
  return (
    <nav className={`lg:sticky top-[-2rem] height-[72px] z-40 bg-whiteLight`}>
      <ul className="flex gap-8 text-body-lg overflow-y-scroll lg:overflow-y-auto py-4">
        <li className="hover:text-grassGreen transition-all">
          <a href="#gallery">Gallery</a>
        </li>
        <li className="hover:text-grassGreen transition-all">
          <a href="#amenities">Amenities</a>
        </li>
        <li className="hover:text-grassGreen transition-all">
          <a href="#tour">Virtual tour</a>
        </li>
        {!sameUser && (
          <li className="hover:text-grassGreen transition-all">
            <a href="#dates">Available dates</a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default DetailNav;
