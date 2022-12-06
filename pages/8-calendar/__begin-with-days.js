import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  parse,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

export default function Page() {
  let [monthString, setMonthString] = useState(format(new Date(), "yyyy-MM"));
  let month = parse(monthString, "yyyy-MM", new Date());

  function nextMonth() {
    setMonthString(format(addMonths(month, 1), "yyyy-MM"));
  }

  function prevMonth() {
    setMonthString(format(subMonths(month, 1), "yyyy-MM"));
  }

  let days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  });

  return (
    <div className="flex min-h-screen  items-start bg-stone-800 pt-16">
      <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-white">
        <div>
          <div className="py-8">
            <div className="flex flex-col justify-center rounded text-center">
              <header className="relative flex justify-between px-8">
                <button
                  className="relative z-10 flex items-center justify-center rounded-full p-1.5 hover:bg-stone-100"
                  onClick={prevMonth}
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </button>
                <p className="absolute inset-0 flex items-center justify-center font-semibold">
                  {format(month, "MMMM yyyy")}
                </p>
                <button
                  className="relative z-10 flex items-center justify-center rounded-full p-1.5 hover:bg-stone-100"
                  onClick={nextMonth}
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, white 10%, transparent, white 90%)",
                  }}
                ></div>
              </header>

              <div className="mt-6 grid grid-cols-7 gap-x-2 gap-y-6 px-8 text-sm">
                <span className="font-medium text-stone-500">Su</span>
                <span className="font-medium text-stone-500">Mo</span>
                <span className="font-medium text-stone-500">Tu</span>
                <span className="font-medium text-stone-500">We</span>
                <span className="font-medium text-stone-500">Th</span>
                <span className="font-medium text-stone-500">Fr</span>
                <span className="font-medium text-stone-500">Sa</span>
              </div>

              <div className="mt-4 grid grid-cols-7 gap-x-2 gap-y-6 px-8 text-sm">
                {days.map((day) => (
                  <span
                    key={format(day, "yyyy-MM-dd")}
                    className={`${
                      isSameMonth(day, month)
                        ? "text-stone-800"
                        : "text-stone-300"
                    } font-semibold`}
                  >
                    {format(day, "d")}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}