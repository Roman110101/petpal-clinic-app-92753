import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Calculator, 
  Users, 
  DollarSign, 
  TrendingUp,
  TrendingDown,
  Building2,
  User,
  Phone,
  Mail,
  Calendar,
  Award,
  Clock,
  Target,
  BarChart3,
  PieChart,
  FileText,
  Download,
  Plus,
  Minus,
  Percent,
  Crown,
  Shield,
  Star
} from "lucide-react";

const DirectorCabinet = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [totalSalary, setTotalSalary] = useState(0);
  const [totalTaxes, setTotalTaxes] = useState(0);
  const [netSalary, setNetSalary] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [showCalculator, setShowCalculator] = useState(false);

  // Демо-данные 50 сотрудников
  const demoEmployees = [
    { id: 1, name: "Анна Петрова", position: "Главный врач", department: "Терапия", salary: 120000, experience: 8, phone: "+7 (999) 123-45-67", email: "anna.petrova@more-clinic.ru" },
    { id: 2, name: "Михаил Сидоров", position: "Хирург", department: "Хирургия", salary: 110000, experience: 6, phone: "+7 (999) 234-56-78", email: "mikhail.sidorov@more-clinic.ru" },
    { id: 3, name: "Елена Козлова", position: "Ветеринар", department: "Терапия", salary: 95000, experience: 5, phone: "+7 (999) 345-67-89", email: "elena.kozlova@more-clinic.ru" },
    { id: 4, name: "Дмитрий Волков", position: "Анестезиолог", department: "Анестезиология", salary: 105000, experience: 7, phone: "+7 (999) 456-78-90", email: "dmitry.volkov@more-clinic.ru" },
    { id: 5, name: "Ольга Морозова", position: "Стоматолог", department: "Стоматология", salary: 100000, experience: 4, phone: "+7 (999) 567-89-01", email: "olga.morozova@more-clinic.ru" },
    { id: 6, name: "Алексей Новиков", position: "Офтальмолог", department: "Офтальмология", salary: 98000, experience: 6, phone: "+7 (999) 678-90-12", email: "alexey.novikov@more-clinic.ru" },
    { id: 7, name: "Мария Соколова", position: "Кардиолог", department: "Кардиология", salary: 115000, experience: 9, phone: "+7 (999) 789-01-23", email: "maria.sokolova@more-clinic.ru" },
    { id: 8, name: "Сергей Лебедев", position: "Невролог", department: "Неврология", salary: 108000, experience: 7, phone: "+7 (999) 890-12-34", email: "sergey.lebedev@more-clinic.ru" },
    { id: 9, name: "Наталья Орлова", position: "Дерматолог", department: "Дерматология", salary: 92000, experience: 5, phone: "+7 (999) 901-23-45", email: "natalya.orlova@more-clinic.ru" },
    { id: 10, name: "Игорь Медведев", position: "Онколог", department: "Онкология", salary: 125000, experience: 10, phone: "+7 (999) 012-34-56", email: "igor.medvedev@more-clinic.ru" },
    { id: 11, name: "Татьяна Филиппова", position: "Администратор", department: "Администрация", salary: 65000, experience: 3, phone: "+7 (999) 123-45-78", email: "tatyana.filippova@more-clinic.ru" },
    { id: 12, name: "Владимир Козлов", position: "Медсестра", department: "Терапия", salary: 55000, experience: 4, phone: "+7 (999) 234-56-89", email: "vladimir.kozlov@more-clinic.ru" },
    { id: 13, name: "Светлана Морозова", position: "Медсестра", department: "Хирургия", salary: 58000, experience: 5, phone: "+7 (999) 345-67-90", email: "svetlana.morozova@more-clinic.ru" },
    { id: 14, name: "Андрей Волков", position: "Лаборант", department: "Лаборатория", salary: 60000, experience: 3, phone: "+7 (999) 456-78-01", email: "andrey.volkov@more-clinic.ru" },
    { id: 15, name: "Екатерина Новикова", position: "Рентгенолог", department: "Диагностика", salary: 85000, experience: 6, phone: "+7 (999) 567-89-12", email: "ekaterina.novikova@more-clinic.ru" },
    { id: 16, name: "Павел Соколов", position: "УЗИ-специалист", department: "Диагностика", salary: 88000, experience: 7, phone: "+7 (999) 678-90-23", email: "pavel.sokolov@more-clinic.ru" },
    { id: 17, name: "Ирина Лебедева", position: "Акушер", department: "Акушерство", salary: 75000, experience: 4, phone: "+7 (999) 789-01-34", email: "irina.lebedeva@more-clinic.ru" },
    { id: 18, name: "Роман Орлов", position: "Фармацевт", department: "Аптека", salary: 65000, experience: 3, phone: "+7 (999) 890-12-45", email: "roman.orlov@more-clinic.ru" },
    { id: 19, name: "Юлия Медведева", position: "Регистратор", department: "Регистратура", salary: 45000, experience: 2, phone: "+7 (999) 901-23-56", email: "yulia.medvedeva@more-clinic.ru" },
    { id: 20, name: "Артем Филиппов", position: "Санитар", department: "Обслуживание", salary: 40000, experience: 1, phone: "+7 (999) 012-34-67", email: "artem.filippov@more-clinic.ru" },
    { id: 21, name: "Валентина Козлова", position: "Заведующая", department: "Администрация", salary: 95000, experience: 8, phone: "+7 (999) 123-45-89", email: "valentina.kozlova@more-clinic.ru" },
    { id: 22, name: "Геннадий Морозов", position: "Бухгалтер", department: "Бухгалтерия", salary: 70000, experience: 5, phone: "+7 (999) 234-56-90", email: "gennady.morozov@more-clinic.ru" },
    { id: 23, name: "Людмила Волкова", position: "Кассир", department: "Касса", salary: 50000, experience: 3, phone: "+7 (999) 345-67-01", email: "lyudmila.volkova@more-clinic.ru" },
    { id: 24, name: "Николай Новиков", position: "Охрана", department: "Безопасность", salary: 45000, experience: 2, phone: "+7 (999) 456-78-12", email: "nikolay.novikov@more-clinic.ru" },
    { id: 25, name: "Зоя Соколова", position: "Уборщица", department: "Обслуживание", salary: 35000, experience: 1, phone: "+7 (999) 567-89-23", email: "zoa.sokolova@more-clinic.ru" },
    { id: 26, name: "Виктор Лебедев", position: "Водитель", department: "Логистика", salary: 50000, experience: 3, phone: "+7 (999) 678-90-34", email: "viktor.lebedev@more-clinic.ru" },
    { id: 27, name: "Раиса Орлова", position: "Повар", department: "Питание", salary: 48000, experience: 4, phone: "+7 (999) 789-01-45", email: "raisa.orlova@more-clinic.ru" },
    { id: 28, name: "Станислав Медведев", position: "Инженер", department: "Техобслуживание", salary: 75000, experience: 6, phone: "+7 (999) 890-12-56", email: "stanislav.medvedev@more-clinic.ru" },
    { id: 29, name: "Галина Филиппова", position: "Психолог", department: "Психология", salary: 80000, experience: 5, phone: "+7 (999) 901-23-67", email: "galina.filippova@more-clinic.ru" },
    { id: 30, name: "Борис Козлов", position: "Маркетолог", department: "Маркетинг", salary: 85000, experience: 4, phone: "+7 (999) 012-34-78", email: "boris.kozlov@more-clinic.ru" },
    { id: 31, name: "Вера Морозова", position: "HR-менеджер", department: "HR", salary: 70000, experience: 5, phone: "+7 (999) 123-45-90", email: "vera.morozova@more-clinic.ru" },
    { id: 32, name: "Анатолий Волков", position: "IT-специалист", department: "IT", salary: 90000, experience: 6, phone: "+7 (999) 234-56-01", email: "anatoly.volkov@more-clinic.ru" },
    { id: 33, name: "Лидия Новикова", position: "Юрист", department: "Юридический", salary: 95000, experience: 7, phone: "+7 (999) 345-67-12", email: "lidia.novikova@more-clinic.ru" },
    { id: 34, name: "Евгений Соколов", position: "Логист", department: "Логистика", salary: 65000, experience: 4, phone: "+7 (999) 456-78-23", email: "evgeny.sokolov@more-clinic.ru" },
    { id: 35, name: "Нина Лебедева", position: "Контролер", department: "Контроль", salary: 60000, experience: 3, phone: "+7 (999) 567-89-34", email: "nina.lebedeva@more-clinic.ru" },
    { id: 36, name: "Максим Орлов", position: "Аналитик", department: "Аналитика", salary: 80000, experience: 5, phone: "+7 (999) 678-90-45", email: "maxim.orlov@more-clinic.ru" },
    { id: 37, name: "Тамара Медведева", position: "Архивариус", department: "Документооборот", salary: 55000, experience: 4, phone: "+7 (999) 789-01-56", email: "tamara.medvedeva@more-clinic.ru" },
    { id: 38, name: "Иван Филиппов", position: "Курьер", department: "Логистика", salary: 45000, experience: 2, phone: "+7 (999) 890-12-67", email: "ivan.filippov@more-clinic.ru" },
    { id: 39, name: "Клавдия Козлова", position: "Секретарь", department: "Администрация", salary: 50000, experience: 3, phone: "+7 (999) 901-23-78", email: "klavdia.kozlov@more-clinic.ru" },
    { id: 40, name: "Григорий Морозов", position: "Консультант", department: "Консультации", salary: 70000, experience: 6, phone: "+7 (999) 012-34-89", email: "grigory.morozov@more-clinic.ru" },
    { id: 41, name: "Фаина Волкова", position: "Координатор", department: "Координация", salary: 65000, experience: 4, phone: "+7 (999) 123-45-01", email: "faina.volkova@more-clinic.ru" },
    { id: 42, name: "Валерий Новиков", position: "Супервайзер", department: "Управление", salary: 85000, experience: 7, phone: "+7 (999) 234-56-12", email: "valery.novikov@more-clinic.ru" },
    { id: 43, name: "Римма Соколова", position: "Тренер", department: "Обучение", salary: 75000, experience: 5, phone: "+7 (999) 345-67-23", email: "rimma.sokolova@more-clinic.ru" },
    { id: 44, name: "Владислав Лебедев", position: "Аудитор", department: "Аудит", salary: 90000, experience: 8, phone: "+7 (999) 456-78-34", email: "vladislav.lebedev@more-clinic.ru" },
    { id: 45, name: "Эльвира Орлова", position: "Ревизор", department: "Ревизия", salary: 80000, experience: 6, phone: "+7 (999) 567-89-45", email: "elvira.orlova@more-clinic.ru" },
    { id: 46, name: "Тимур Медведев", position: "Инспектор", department: "Инспекция", salary: 75000, experience: 5, phone: "+7 (999) 678-90-56", email: "timur.medvedev@more-clinic.ru" },
    { id: 47, name: "Лариса Филиппова", position: "Эксперт", department: "Экспертиза", salary: 95000, experience: 9, phone: "+7 (999) 789-01-67", email: "larisa.filippova@more-clinic.ru" },
    { id: 48, name: "Руслан Козлов", position: "Специалист", department: "Специализация", salary: 80000, experience: 6, phone: "+7 (999) 890-12-78", email: "ruslan.kozlov@more-clinic.ru" },
    { id: 49, name: "Алла Морозова", position: "Мастер", department: "Мастерская", salary: 70000, experience: 7, phone: "+7 (999) 901-23-89", email: "alla.morozova@more-clinic.ru" },
    { id: 50, name: "Дмитрий Алексеевич", position: "Директор", department: "Руководство", salary: 200000, experience: 15, phone: "+7 (999) 012-34-90", email: "dmitry.alekseevich@more-clinic.ru" }
  ];

  useEffect(() => {
    setEmployees(demoEmployees);
    calculateTotals(demoEmployees);
  }, []);

  const calculateTotals = (empList: any[]) => {
    const total = empList.reduce((sum, emp) => sum + emp.salary, 0);
    const taxes = total * 0.13; // 13% подоходный налог
    const net = total - taxes;
    
    setTotalSalary(total);
    setTotalTaxes(taxes);
    setNetSalary(net);
  };

  const handleSalaryChange = (id: number, newSalary: number) => {
    const updatedEmployees = employees.map(emp => 
      emp.id === id ? { ...emp, salary: newSalary } : emp
    );
    setEmployees(updatedEmployees);
    calculateTotals(updatedEmployees);
  };

  const addBonus = (id: number, bonus: number) => {
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
      handleSalaryChange(id, employee.salary + bonus);
    }
  };

  const applyDiscount = (id: number, discount: number) => {
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
      handleSalaryChange(id, Math.max(0, employee.salary - discount));
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    }).format(amount);
  };

  const getDepartmentColor = (department: string) => {
    const colors: { [key: string]: string } = {
      'Терапия': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'Хирургия': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      'Администрация': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'Диагностика': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      'Руководство': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      'Лаборатория': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
      'Аптека': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
      'Бухгалтерия': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
    };
    return colors[department] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  };

  return (
    <div className="bg-background min-h-screen pt-16">
      {/* Header */}
      <div className="px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Кабинет директора</h1>
            <p className="text-muted-foreground">Дмитрий Алексеевич - Управление персоналом</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <section className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-green-700 dark:text-green-300">{employees.length}</div>
                <div className="text-sm text-green-600 dark:text-green-400">Сотрудников</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{formatCurrency(totalSalary)}</div>
                <div className="text-sm text-blue-600 dark:text-blue-400">Фонд оплаты</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-red-700 dark:text-red-300">{formatCurrency(totalTaxes)}</div>
                <div className="text-sm text-red-600 dark:text-red-400">Налоги</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{formatCurrency(netSalary)}</div>
                <div className="text-sm text-purple-600 dark:text-purple-400">К выплате</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Actions */}
      <section className="px-4 mb-6">
        <div className="flex gap-3">
          <Button 
            onClick={() => setShowCalculator(!showCalculator)}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Калькулятор ЗП
          </Button>
          <Button variant="outline" className="flex-1">
            <FileText className="w-4 h-4 mr-2" />
            Отчеты
          </Button>
          <Button variant="outline" className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Экспорт
          </Button>
        </div>
      </section>

      {/* Calculator */}
      {showCalculator && (
        <section className="px-4 mb-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Калькулятор зарплаты
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <Label>Выберите сотрудника</Label>
                <select 
                  value={selectedEmployee?.id || ''}
                  onChange={(e) => setSelectedEmployee(employees.find(emp => emp.id === parseInt(e.target.value)))}
                  className="w-full p-2 border rounded-md mt-1"
                >
                  <option value="">Выберите сотрудника</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <Label>Базовая зарплата</Label>
                <Input
                  type="number"
                  value={selectedEmployee?.salary || 0}
                  onChange={(e) => selectedEmployee && handleSalaryChange(selectedEmployee.id, parseInt(e.target.value))}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>Стаж (лет)</Label>
                <Input
                  type="number"
                  value={selectedEmployee?.experience || 0}
                  className="mt-1"
                  disabled
                />
              </div>
            </div>

            {selectedEmployee && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Премия</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="number"
                      placeholder="Сумма премии"
                      id="bonus"
                    />
                    <Button 
                      onClick={() => {
                        const bonus = parseInt((document.getElementById('bonus') as HTMLInputElement)?.value || '0');
                        addBonus(selectedEmployee.id, bonus);
                      }}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label>Штраф</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="number"
                      placeholder="Сумма штрафа"
                      id="discount"
                    />
                    <Button 
                      onClick={() => {
                        const discount = parseInt((document.getElementById('discount') as HTMLInputElement)?.value || '0');
                        applyDiscount(selectedEmployee.id, discount);
                      }}
                      size="sm"
                      variant="destructive"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </section>
      )}

      {/* Employee List */}
      <section className="px-4 mb-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Users className="w-5 h-5" />
              Список сотрудников ({employees.length})
            </h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <BarChart3 className="w-4 h-4 mr-1" />
                Статистика
              </Button>
              <Button variant="outline" size="sm">
                <PieChart className="w-4 h-4 mr-1" />
                Графики
              </Button>
            </div>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {employees.map((employee) => (
              <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{employee.name}</h4>
                      {employee.position === 'Директор' && <Crown className="w-4 h-4 text-yellow-500" />}
                      {employee.experience >= 10 && <Star className="w-4 h-4 text-blue-500" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{employee.position}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{employee.department}</span>
                      <span>{employee.experience} лет стажа</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    {formatCurrency(employee.salary)}
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${getDepartmentColor(employee.department)}`}>
                    {employee.department}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Summary */}
      <section className="px-4 mb-6">
        <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-green-200 dark:border-green-800">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Сводка по зарплатам
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{formatCurrency(totalSalary)}</div>
              <div className="text-sm text-muted-foreground">Общий фонд</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{formatCurrency(totalTaxes)}</div>
              <div className="text-sm text-muted-foreground">Налоги (13%)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(netSalary)}</div>
              <div className="text-sm text-muted-foreground">К выплате</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{formatCurrency(totalSalary / employees.length)}</div>
              <div className="text-sm text-muted-foreground">Средняя ЗП</div>
            </div>
          </div>
        </Card>
      </section>

      {/* Bottom Spacing */}
      <div className="h-20"></div>
    </div>
  );
};

export default DirectorCabinet;
