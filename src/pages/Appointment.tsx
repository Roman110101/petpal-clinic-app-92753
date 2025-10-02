import { AppointmentForm } from "@/components/AppointmentForm";
import { PageHeader } from "@/components/PageHeader";
import { Calendar } from "lucide-react";

const Appointment = () => {
  return (
    <div className="bg-background min-h-screen pt-16 ios-scroll-fix">
      {/* Header */}
      <PageHeader 
        title="Запись на приём" 
        subtitle="Выберите удобное время"
        icon={<Calendar className="w-6 h-6" />}
      />

      {/* Form */}
      <section className="px-4 mt-6">
        <AppointmentForm />
      </section>
    </div>
  );
};

export default Appointment;
