import { RiVerifiedBadgeFill } from "react-icons/ri";
import { avatorImages } from "../../constants";
import { Avator1 } from "../../../assets";

function MeetingCard() {
  return (
    <section className="bg-slate-300/50 text-black min-h-[258px] w-full shadow-lg shadow-black-300/20 rounded-[15px] p-6 flex flex-col justify-between relative">
      <article className="flex items-start gap-5 justify-start relative">
        <div className="shrink-0 relative">
          <span className="absolute bottom-0 flex items-center gap-x-2 -left-1 py-1 px-1 text-3xl text-green-800">
            <RiVerifiedBadgeFill></RiVerifiedBadgeFill>
          </span>
          <img src={Avator1} alt="avator1" className="w-24 h-24 rounded-full" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Dr. Parveen Shahid</h1>
          <h3 className="text-xl">Orthopedic Surgeon</h3>
          <p className="text-sm">
            MBBS, FCPS (Surgery), IMGSS PGT in Orthopedics
          </p>
          <button className="bg-white/15 flex items-center px-4 py-2 rounded text-black bg-gray-200 mt-2">
            Details
          </button>
        </div>
      </article>
      <article className="relative flex sm:flex-row flex-col">
        <div className="relative flex flex-grow flex-shrink-0">
          {avatorImages.slice(0, 3).map((img, index) => (
            <img
              src={img}
              alt="img"
              key={index}
              width={35}
              height={35}
              className="object-cover absolute rounded-full"
              style={{
                top: 2,
                left: index * 28,
              }}
            ></img>
          ))}
          <div
            className="absolute w-[40px] h-[40px] bg-black flex justify-center items-center rounded-full text-white"
            style={{
              top: 0,
              left: 3 * 28,
            }}
          >
            +{avatorImages.length - 3}
          </div>
        </div>
        <div className="flex gap-3 items-center justify-end">
          <button className="bg-blue-1 px-4 py-2 bg-blue-500 rounded text-white">
            Book Appointment
          </button>
        </div>
      </article>
    </section>
  );
}

export default MeetingCard;
