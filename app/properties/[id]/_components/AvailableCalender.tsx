import { Dispatch } from "react";
import { DateRangePicker, Range } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const AvailableCalender = ({
  propertyDates,
  dateRange,
  setDateRange,
}: {
  propertyDates: Date[];

  dateRange: Range[];
  setDateRange: Dispatch<React.SetStateAction<Range[]>>;
}) => {
  console.log(propertyDates);
  return (
    <section id="dates" className="my-12">
      <h3 className="mb-6 text-head3 font-semibold">Choose Your Dates</h3>
      <div className="available-dates__calender">
        <DateRangePicker
          minDate={new Date()}
          months={2}
          direction="horizontal"
          ranges={dateRange}
          onChange={(ranges) => {
            setDateRange([ranges.selectedRange]);
          }}
          className="w-full lg:justify-center xl:justify-start"
          disabledDay={(date) =>
            !propertyDates
              .map((d) => d.toLocaleString())
              .includes(date.toLocaleString())
          }
        />
      </div>
    </section>
  );
};

export default AvailableCalender;
