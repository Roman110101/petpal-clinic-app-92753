import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";
import { Award, Download, Eye } from "lucide-react";

const Certificates = () => {
  const certificates = [
    {
      id: 1,
      title: "Лицензия на ветеринарную деятельность",
      number: "ВЕТ-2024-001",
      issuer: "Департамент ветеринарии г. Москвы",
      date: "15 января 2024",
      validUntil: "15 января 2029",
      type: "license"
    },
    {
      id: 2,
      title: "Сертификат качества ISO 9001",
      number: "ISO-2024-VET-001",
      issuer: "Международная организация по стандартизации",
      date: "10 февраля 2024",
      validUntil: "10 февраля 2027",
      type: "certificate"
    },
    {
      id: 3,
      title: "Аккредитация ветеринарной клиники",
      number: "АКК-2024-МСК-001",
      issuer: "Российская ветеринарная ассоциация",
      date: "5 марта 2024",
      validUntil: "5 марта 2026",
      type: "accreditation"
    }
  ];

  const doctorCertificates = [
    {
      id: 1,
      doctor: "Иванова Анна Сергеевна",
      title: "Сертификат ветеринарного врача-терапевта",
      specialty: "Терапия мелких домашних животных",
      date: "2023",
      validUntil: "2028"
    },
    {
      id: 2,
      doctor: "Петров Владимир Иванович",
      title: "Сертификат ветеринарного хирурга",
      specialty: "Хирургия и травматология",
      date: "2022",
      validUntil: "2027"
    },
    {
      id: 3,
      doctor: "Сидорова Мария Петровна",
      title: "Сертификат ветеринарного дерматолога",
      specialty: "Дерматология и аллергология",
      date: "2023",
      validUntil: "2028"
    }
  ];

  return (
    <div className="bg-background min-h-screen pt-16 ios-scroll-fix">
      {/* Header */}
      <PageHeader 
        title="Сертификаты и лицензии" 
        subtitle="Документы, подтверждающие нашу квалификацию"
        icon={<Award className="w-6 h-6" />}
      />

      {/* Clinic Certificates */}
      <section className="px-4 mt-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Документы клиники</h2>
        <div className="space-y-4">
          {certificates.map((cert) => (
            <Card key={cert.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{cert.title}</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>№ {cert.number}</div>
                    <div>Выдан: {cert.issuer}</div>
                    <div>Дата выдачи: {cert.date}</div>
                    <div>Действителен до: {cert.validUntil}</div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm">
                      <Eye className="w-4 h-4" />
                      Просмотр
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1 bg-muted/50 text-foreground rounded-lg text-sm">
                      <Download className="w-4 h-4" />
                      Скачать
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Doctor Certificates */}
      <section className="px-4 mt-8 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Сертификаты врачей</h2>
        <div className="space-y-4">
          {doctorCertificates.map((cert) => (
            <Card key={cert.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{cert.doctor}</h3>
                  <div className="text-sm font-medium text-primary mb-1">{cert.title}</div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Специализация: {cert.specialty}</div>
                    <div>Год получения: {cert.date}</div>
                    <div>Действителен до: {cert.validUntil}</div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm">
                      <Eye className="w-4 h-4" />
                      Просмотр
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Trust Badge */}
      <section className="px-4 mt-6 mb-6">
        <Card className="p-4 text-center bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
          <Award className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
          <div className="font-semibold text-green-800 dark:text-green-200 mb-1">
            Лицензированная клиника
          </div>
          <div className="text-sm text-green-700 dark:text-green-300">
            Все наши врачи имеют действующие сертификаты и регулярно проходят повышение квалификации
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Certificates;
