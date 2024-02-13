import PrimaryBtn from "@/components/common/PrimaryBtn";

// Step 2 : FormSpecialReq

const FormSpecialReq = ({ nextStep, prevStep }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form className="mr-6 rounded bg-white p-10" onSubmit={handleSubmit}>
      {/* Checkbox Standard Request */}
      <div className="Checkbox-Standard-Request pb-10">
        <h5 className=" text-[#9AA1B9]">Standard Request</h5>
        <p className=" text-[#9AA1B9]">
          These requests are not confirmed (Depend on the available room)
        </p>
        <div className="standard-req-list flex flex-col py-10">
          <label
            htmlFor="Early
            check-in"
            className="bullet-text mb-6"
          >
            <input
              type="checkbox"
              className=" mr-2 h-6 w-6 align-middle accent-[#e76b39] checked:text-[#2a2e3f]"
            ></input>
            Early check-in
          </label>
          <label htmlFor="Late check-out" className="bullet-text mb-6">
            <input
              type="checkbox"
              className=" mr-2 h-6 w-6 align-middle accent-[#e76b39] checked:text-[#2a2e3f]"
            ></input>
            Late check-out
          </label>
          <label htmlFor="Early check-in" className="bullet-text mb-6">
            <input
              type="checkbox"
              className=" mr-2 h-6 w-6 align-middle accent-[#e76b39] checked:text-[#2a2e3f]"
            ></input>
            Early check-in
          </label>
          <label htmlFor="Early check-in" className="bullet-text mb-6">
            <input
              type="checkbox"
              className=" mr-2 h-6 w-6 align-middle accent-[#e76b39] checked:text-[#2a2e3f]"
            ></input>
            Early check-in
          </label>
          <label htmlFor="Early check-in" className="bullet-text mb-6">
            <input
              type="checkbox"
              className=" mr-2 h-6 w-6 align-middle accent-[#e76b39] checked:text-[#2a2e3f]"
            ></input>
            Early check-in
          </label>
        </div>
      </div>
      {/* Checkbox Standard Request */}
      <div className="Checkbox-Special-Request pb-10">
        <h5 className=" text-[#9AA1B9]">Special Request</h5>
        <p className=" text-[#9AA1B9]">Additional charge may apply</p>
        <div className="special-req-list flex flex-col py-10">
          <label htmlFor="Baby cot" className="bullet-text mb-6">
            <input
              type="checkbox"
              className=" mr-2 h-6 w-6 align-middle accent-[#e76b39] checked:text-[#2a2e3f]"
            ></input>
            Baby cot (+THB 400)
          </label>
          <label htmlFor="Airport transfer" className="bullet-text mb-6">
            <input
              type="checkbox"
              className=" mr-2 h-6 w-6 align-middle accent-[#e76b39] checked:text-[#2a2e3f]"
            ></input>
            Airport transfer (+THB 200)
          </label>
          <label htmlFor="Extra bed" className="bullet-text mb-6">
            <input
              type="checkbox"
              className=" mr-2 h-6 w-6 align-middle accent-[#e76b39] checked:text-[#2a2e3f]"
            ></input>
            Extra bed (+THB 500)
          </label>
          <label htmlFor="Extra pilloes" className="bullet-text mb-6">
            <input
              type="checkbox"
              className=" mr-2 h-6 w-6 align-middle accent-[#e76b39] checked:text-[#2a2e3f]"
            ></input>
            Extra pilloes (+THB 100)
          </label>
          <label
            htmlFor="Phone chargers and adapters"
            className="bullet-text mb-6"
          >
            <input
              type="checkbox"
              className=" mr-2 h-6 w-6 align-middle accent-[#e76b39] checked:text-[#2a2e3f]"
            ></input>
            Phone chargers and adapters (+THB 100)
          </label>
          <label htmlFor="Breakfast" className="bullet-text mb-6">
            <input
              type="checkbox"
              className=" mr-2 h-6 w-6 align-middle accent-[#e76b39] checked:text-[#2a2e3f]"
            ></input>
            Breakfast (+THB 150)
          </label>
        </div>
      </div>

      {/* Addictional Request */}
      <div className="Checkbox-Additional-Request pb-10">
        <h5 className=" text-[#9AA1B9]">Additional Request</h5>
        <textarea
          className=" h-24 w-full rounded border-2 border-[##d6d9e4] p-2 outline-none"
          placeholder="Additional Request"
        ></textarea>
      </div>

      {/* Booking Button */}
      <div className=" flex flex-row justify-between">
        <button className="visitlink" onClick={prevStep}>
          Back
        </button>
        <PrimaryBtn btnName="Next" handleClick={nextStep}></PrimaryBtn>
      </div>
    </form>
  );
};

export default FormSpecialReq;
