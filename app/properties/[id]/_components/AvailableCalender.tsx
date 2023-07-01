import { Dispatch } from 'react';
import { DateRangePicker, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const AvailableCalender = ({
  dateRange,
  setDateRange,
}: {
  dateRange: Range[];
  setDateRange: Dispatch<React.SetStateAction<Range[]>>;
}) => {
  return (
    <section id="dates" className="my-12">
      <h3 className="mb-6 text-head3 font-semibold">Choose Your Dates</h3>
      <div className="available-dates__calender">
        <DateRangePicker
          minDate={new Date()}
          months={2}
          direction="horizontal"
          ranges={dateRange}
          onChange={ranges => {
            setDateRange([ranges.selectedRange]);
          }}
        />
      </div>
    </section>
  );
};

export default AvailableCalender;
