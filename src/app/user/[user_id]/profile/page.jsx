// import { useState } from "react";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import DatePicker from "@/components/ui/DatePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UserProfile() {
  // const [fullname, setFullname] = useState("");
  // const [email, setEmail] = useState("");
  // const [idenNumber, setIdenNumber] = useState("");

  return (
    <section>
      <div className="flex justify-between">
        <h2>Profile</h2> <PrimaryBtn btnName="Update Profile" />
      </div>
      <form className="flex flex-col">
        <label htmlFor="fullname">
          Fullname
          <input type="text" name="fullname" id="" />
        </label>
        <label htmlFor="email">
          Email
          <input type="email" name="" id="" />
        </label>
        <label htmlFor="identitynumber">
          ID Number
          <input type="text" name="identitynumber" id="" />
        </label>
        <label htmlFor="dateofbirth">
          Date of Birth
          <DatePicker />
        </label>
        <label htmlFor="Country">
          Country
          <Select>
            <SelectTrigger className="w-[180px] text-[#9AA1B9]">
              <SelectValue placeholder="เลือก Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="country">1</SelectItem>
              <SelectItem value="thailand">thailand</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </label>
      </form>
    </section>
  );
}
