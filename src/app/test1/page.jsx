"use client";

import React from "react";
import DateOnlySelector from "@/components/ui/testDatePicker"; // Ensure this path is correct

function Page() {
  return (
    <div>
      <DateOnlySelector handleDateChange={(date) => console.log(date)} />
    </div>
  );
}

export default Page;
