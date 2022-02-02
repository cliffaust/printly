import ItemImageSection from "../components/ItemImageSection";
import ItemColorSection from "../components/ItemColorSection";

export default function Home() {
  return (
    <div className="">
      <div className="mt-12 px-20 flex items-center">
        <div className="w-2/4">
          <ItemImageSection></ItemImageSection>
        </div>
        <div className="w-2/4">
          <ItemColorSection></ItemColorSection>
        </div>
      </div>
    </div>
  );
}
