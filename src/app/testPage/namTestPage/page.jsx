"use client";

import React from "react";
import { DatePicker, Space } from "antd";
import en from "antd/es/date-picker/locale/en_US";
import enUS from "antd/es/locale/en_US";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

// Component level locale
const buddhistLocale = {
  ...en,
  lang: {
    ...en.lang,
    fieldDateFormat: "BBBB-MM-DD",
    fieldDateTimeFormat: "BBBB-MM-DD HH:mm:ss",
    yearFormat: "BBBB",
    cellYearFormat: "BBBB",
  },
};

// ConfigProvider level locale
const globalBuddhistLocale = {
  ...enUS,
  DatePicker: {
    ...enUS.DatePicker,
    lang: buddhistLocale.lang,
  },
};
const defaultValue = dayjs("2024-01-01");

const NamTestPage = () => {
  const onChange = (_, dateStr) => {
    console.log("onChange:", dateStr);
  };
  return (
    <div>
      <DatePicker
        defaultValue={defaultValue}
        locale={buddhistLocale}
        onChange={onChange}
      />
    </div>
  );
};

export default NamTestPage;
