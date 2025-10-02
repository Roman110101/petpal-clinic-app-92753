import { DoctorCard } from "@/components/DoctorCard";
import { doctors } from "@/data/doctors";

const Team = () => {
  return (
    <div className="bg-background min-h-screen pt-16 ios-scroll-fix">
      {/* Doctors Grid */}
      <section className="px-2 pt-2">
        {/* Сетка 2 колонки как в оригинале */}
        <div className="grid grid-cols-2 gap-2">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Team;
