import PrimaryBtn from "@/components/common/PrimaryBtn";
import SecondaryBtn from "@/components/common/SecondaryBtn";

export default function Home() {
  return (
    <main>
      <PrimaryBtn btnName={"Hello"} />
      <SecondaryBtn btnName={"World"} />
    </main>
  );
}
