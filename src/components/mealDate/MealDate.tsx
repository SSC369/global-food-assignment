import dayjs from "dayjs";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Calendar, { CalendarProps } from "react-calendar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { DATE_FORMAT } from "../../constants";
import { VoidFunctionType } from "../../types";
import "react-calendar/dist/Calendar.css";

interface MealDatePropsType {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}

const MealDate: React.FC<MealDatePropsType> = ({
  currentDate,
  setCurrentDate,
}) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const { t } = useTranslation();

  const tPath = "pages.adminHome.scheduleMeal.mealDate";
  const today: boolean = currentDate.getDate() == new Date().getDate();

  const handleNextDate: VoidFunctionType = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(nextDate);
  };

  const handlePreviousDate: VoidFunctionType = () => {
    if (today) {
      return;
    }
    const prevDate = new Date(currentDate);
    prevDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(prevDate);
  };

  const renderDayText = (): string => {
    switch (currentDate.getDate()) {
      case new Date().getDate():
        return t(tPath + ".today");
      case new Date().getDate() + 1:
        return t(tPath + ".tomorrow");
      default:
        return dayjs(currentDate).format(DATE_FORMAT);
    }
  };

  const handleDateClick = () => {
    setIsCalendarVisible((prev) => !prev);
  };

  const onDateChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) {
      setCurrentDate(value);
    }
    setIsCalendarVisible(false);
  };
  return (
    <div className="flex items-center relative">
      <button
        onClick={handlePreviousDate}
        className={`p-3 border-2 border-r-0 rounded-l`}
      >
        <FaChevronLeft
          className={`h-3 w-3 ${today ? "opacity-50 pointer-events-none" : ""}`}
        />
      </button>
      <div
        onClick={handleDateClick}
        className="py-2 border-2 w-[140px] cursor-pointer"
      >
        <p className="text-sm text-secondary text-center">{renderDayText()}</p>
      </div>
      <button
        onClick={handleNextDate}
        className="p-3 border-2 border-l-0 rounded-r"
      >
        <FaChevronRight className="h-3 w-3" />
      </button>

      {isCalendarVisible && (
        <Calendar
          className="rounded absolute top-10 text-xs shadow-lg"
          onChange={onDateChange}
          value={currentDate}
        />
      )}
    </div>
  );
};

export default MealDate;
