import { Dispatch, SetStateAction } from 'react';
import TabsItem from './TabsItem';
import { Filters } from '../PropertiesClient';

const TabsList = ({
  chosenFilters,
  setChosenFilters,
  setFilters,
}: {
  chosenFilters: Filters;
  setChosenFilters: Dispatch<SetStateAction<Filters | null>>;
  setFilters: Dispatch<SetStateAction<Filters>>;
}) => {
  return (
    <div className="flex items-center gap-2">
      <ul className="flex items-center gap-2">
        {chosenFilters.location && (
          <TabsItem>{chosenFilters.location}</TabsItem>
        )}
        {chosenFilters.duration.startDate && chosenFilters.duration.endDate && (
          <li onClick={() => {}} className="px-4 py-2 rounded-xl bg-whiteDark">
            {chosenFilters.duration.startDate.getDate()} -{' '}
            {chosenFilters.duration.endDate.getDate()}
          </li>
        )}
        {chosenFilters.guests.adults !== 0 && (
          <TabsItem>
            {chosenFilters.guests.adults !== 0
              ? `${chosenFilters.guests.adults} adult${
                  chosenFilters.guests.adults > 1 ? 's' : ''
                }`
              : null}{' '}
            {chosenFilters.guests.children !== 0
              ? `+ ${chosenFilters.guests.children} ${
                  chosenFilters.guests.children > 1 ? 'children' : 'child'
                }`
              : null}{' '}
          </TabsItem>
        )}
      </ul>
      <button
        className="px-4 py-2 rounded-xl underline"
        onClick={() => {
          setChosenFilters(null);
        }}
      >
        Clear
      </button>
    </div>
  );
};

export default TabsList;
