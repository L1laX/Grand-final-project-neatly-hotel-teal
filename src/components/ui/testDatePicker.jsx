import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format, isValid } from "date-fns"; // Import isValid
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function DateOnlySelector({
  className,
  checkInOut,
  checkInDate,
}) {
  const [date, setDate] = useState({
    from: checkInDate ? new Date(checkInDate) : null, // Ensure there's a check for null
    to: addDays(new Date(), 20), // Use current date for demonstration
  });

  console.log("DATE", date);

  // Function to safely format dates
  const formatDate = (date) => {
    if (date && isValid(date)) {
      return format(date, "LLL dd, y");
    }
    return "";
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              checkInOut,
              "justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date?.to ? (
                <>
                  {formatDate(date?.from)} - {formatDate(date?.to)}
                </>
              ) : (
                formatDate(date?.from)
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from || new Date()}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
