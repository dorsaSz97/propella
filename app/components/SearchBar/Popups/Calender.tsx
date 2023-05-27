'use client';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DateRangePicker, Range } from 'react-date-range';
import { FiltersType, PopupProps, Steps } from '@/app/types';

const Calender = ({ setFilters, setStep }: PopupProps) => {
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'reservation',
    },
  ]);

  return (
    <>
      <DateRangePicker
        minDate={new Date()}
        months={2}
        ranges={dateRange}
        onChange={ranges => {
          setDateRange([ranges.reservation]);
        }}
        direction="horizontal"
        showPreview={true}
        rangeColors={['#f3f3f3']}
        // disabledDates={[]}
      />
      <button
        onClick={() => {
          setFilters(prev => {
            return {
              ...prev,
              calender: {
                startDate: dateRange[0].startDate,
                endDate: dateRange[0].endDate,
              },
            };
          });

          setStep(Steps.Guests);
        }}
      >
        Set
      </button>
    </>
  );
};

export default Calender;
