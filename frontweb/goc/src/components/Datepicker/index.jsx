import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import "./styles.css";
import { CalendarIcon } from "../../assets/images/icon-calendar";

const DatePickerComponent = ({ onChangeDate, disabled }) => {
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateComponent, setSelectedDateComponent] = useState(null);
  return (
    <DatePicker
      locale="pt-BR"
      dateFormat="dd/MM/yyyy"
      selected={selectedDateComponent}
      onChange={(date) => {
        setSelectedDateComponent(date);
        onChangeDate(date);
      }}
      disabled={disabled}
      maxDate={new Date()}
      customInput={
        <div style={{ width: "100%", display: "flex" }}>
          <p
            className="btn-date-picker form-control d-flex justify-content-between"
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
};

export default DatePickerComponent;
