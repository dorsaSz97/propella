import { Property } from '@prisma/client';
import PropertyCard from './PropertyCard';
import axios from 'axios';

const PropertiesList = ({
  mapView,
  properties,
}: {
  mapView: boolean;
  properties: null | Property[];
}) => {
  if (!properties) return null;
  return (
    <ul
      className={`grid ${
        !mapView ? 'grid-cols-4 gap-10' : 'grid-cols-3 gap-7 flex-1'
      }`}
    >
      {properties.map(prop => {
        return (
          <li key={prop.id}>
            <PropertyCard property={prop} />
          </li>
        );
      })}
    </ul>
  );
};

export default PropertiesList;
