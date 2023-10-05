import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from "react";
import "./styles.css";
import { CalendarIcon } from "../../assets/images/icon-calendar";

const DatePickerComponent = forwardRef(
  ({ onChangeDate, disabled, selectedDateComponent, error }, ref) => {
    return (
      <DatePicker
        locale="pt-BR"
        dateFormat="dd/MM/yyyy"
        selected={selectedDateComponent}
        onChange={(date) => onChangeDate(date)}
        disabled={disabled}
        maxDate={new Date()}
        showYearDropdown
        showMonthDropdown
        ref={ref}
        customInput={
          <div style={{ width: "100%", display: "flex" }}>
            <p
              className={`btn-date-picker form-control d-flex justify-content-between ${
                error ? "is-invalid" : ""
              }`}
              style={{ cursor: "pointer" }}
            >
              {selectedDateComponent
                ? selectedDateComponent.toLocaleDateString()
                : "dd/MM/aaaa"}
              <CalendarIcon />
            </p>
          </div>
        }
      />
    );
  }
);

export default DatePickerComponent;
