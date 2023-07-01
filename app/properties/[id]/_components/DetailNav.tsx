const DetailNav = ({ sameUser }: { sameUser: boolean }) => {
  return (
    <nav className={`sticky top-[-2rem] py-4 height-[72px] z-40 bg-whiteLight`}>
      <ul className="flex gap-8 text-body-lg">
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
