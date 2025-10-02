import { AppointmentForm } from "@/components/AppointmentForm";

const Appointment = () => {
  return (
    <div className="pb-20 bg-background min-h-screen">
      {/* Header */}
      <header className="bg-[var(--gradient-hero)] text-primary-foreground px-4 py-6 rounded-b-3xl shadow-[var(--shadow-soft)]">
        <h1 className="text-2xl font-bold">Запись на приём</h1>
        <p className="text-sm opacity-90 mt-1">Выберите удобное время</p>
      </header>

      {/* Form */}
      <section className="px-4 mt-6">
        <AppointmentForm />
      </section>
    </div>
  );
};

export default Appointment;
