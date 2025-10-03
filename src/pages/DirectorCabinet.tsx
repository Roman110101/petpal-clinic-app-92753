import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as XLSX from 'xlsx';
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
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
  Star,
  Edit,
  ChevronUp,
  ChevronDown
} from "lucide-react";

const DirectorCabinet = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [totalSalary, setTotalSalary] = useState(0);
  const [totalTaxes, setTotalTaxes] = useState(0);
  const [netSalary, setNetSalary] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorInput, setCalculatorInput] = useState('0');
  const [calculatorHistory, setCalculatorHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<any>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    position: '',
    department: '',
    salary: 0,
    experience: 0,
    phone: '',
    email: ''
  });
  const [showImportModal, setShowImportModal] = useState(false);
  const [showSmartCalculator, setShowSmartCalculator] = useState(false);
  const [smartCalcEmployee, setSmartCalcEmployee] = useState<any>(null);
  const [smartCalcAmount, setSmartCalcAmount] = useState('');
  const [smartCalcOperation, setSmartCalcOperation] = useState('add');
  const [smartCalcHistory, setSmartCalcHistory] = useState<any[]>([]);
  const [editingSalaryId, setEditingSalaryId] = useState<number | null>(null);
  const [tempSalary, setTempSalary] = useState('');
  const [showEmployees, setShowEmployees] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [showCharts, setShowCharts] = useState(false);
  const [timeFilter, setTimeFilter] = useState('all');
  const [showBarChart, setShowBarChart] = useState(true);
  const [showPieChart, setShowPieChart] = useState(true);
  const [showLineChart, setShowLineChart] = useState(true);

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
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatCompactCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}М ₽`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}К ₽`;
    }
    return formatCurrency(amount);
  };

  const formatCompactNumber = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}М`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}К`;
    }
    return amount.toString();
  };

  // Калькулятор функции
  const handleCalculatorInput = (value: string) => {
    if (calculatorInput === '0' && value !== '.') {
      setCalculatorInput(value);
    } else {
      setCalculatorInput(calculatorInput + value);
    }
  };

  const handleCalculatorClear = () => {
    setCalculatorInput('0');
  };

  const handleCalculatorBackspace = () => {
    if (calculatorInput.length > 1) {
      setCalculatorInput(calculatorInput.slice(0, -1));
    } else {
      setCalculatorInput('0');
    }
  };

  const handleCalculatorCalculate = () => {
    try {
      const result = eval(calculatorInput);
      const calculation = {
        expression: calculatorInput,
        result: result,
        timestamp: new Date().toLocaleString('ru-RU')
      };
      setCalculatorHistory([calculation, ...calculatorHistory]);
      setCalculatorInput(result.toString());
      toast.success(`Результат: ${formatCurrency(result)}`);
    } catch (error) {
      toast.error('Ошибка в вычислении');
    }
  };

  // Экспорт в Excel
  const exportToExcel = () => {
    try {
      // Подготавливаем данные для экспорта
      const exportData = employees.map(emp => ({
        'ID': emp.id,
        'ФИО': emp.name,
        'Должность': emp.position,
        'Отдел': emp.department,
        'Зарплата': emp.salary,
        'Стаж': emp.experience,
        'Телефон': emp.phone,
        'Email': emp.email,
        'Налог (13%)': Math.round(emp.salary * 0.13),
        'К выплате': Math.round(emp.salary * 0.87)
      }));

      // Добавляем итоговую строку
      exportData.push({
        'ID': '',
        'ФИО': 'ИТОГО',
        'Должность': '',
        'Отдел': '',
        'Зарплата': totalSalary,
        'Стаж': '',
        'Телефон': '',
        'Email': '',
        'Налог (13%)': totalTaxes,
        'К выплате': netSalary
      });

      // Создаем рабочую книгу
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(exportData);

      // Настраиваем ширину колонок
      ws['!cols'] = [
        { wch: 5 },   // ID
        { wch: 20 },  // ФИО
        { wch: 15 },  // Должность
        { wch: 15 },  // Отдел
        { wch: 12 },  // Зарплата
        { wch: 8 },   // Стаж
        { wch: 15 },  // Телефон
        { wch: 25 },  // Email
        { wch: 12 },  // Налог
        { wch: 12 }   // К выплате
      ];

      // Добавляем лист в книгу
      XLSX.utils.book_append_sheet(wb, ws, 'Зарплатная ведомость');

      // Создаем второй лист с расчетами
      const summaryData = [
        { 'Показатель': 'Общий фонд оплаты', 'Сумма': totalSalary },
        { 'Показатель': 'Общий налог (13%)', 'Сумма': totalTaxes },
        { 'Показатель': 'К выплате', 'Сумма': netSalary },
        { 'Показатель': 'Средняя зарплата', 'Сумма': Math.round(totalSalary / employees.length) },
        { 'Показатель': 'Количество сотрудников', 'Сумма': employees.length }
      ];

      const summaryWs = XLSX.utils.json_to_sheet(summaryData);
      summaryWs['!cols'] = [{ wch: 25 }, { wch: 15 }];
      XLSX.utils.book_append_sheet(wb, summaryWs, 'Сводка');

      // Сохраняем файл
      const fileName = `Зарплатная_ведомость_${new Date().toLocaleDateString('ru-RU').replace(/\./g, '_')}.xlsx`;
      XLSX.writeFile(wb, fileName);

      toast.success(`Файл ${fileName} успешно сохранен!`);
    } catch (error) {
      console.error('Ошибка экспорта:', error);
      toast.error('Ошибка при экспорте в Excel');
    }
  };

  // Редактирование сотрудника
  const startEditEmployee = (employee: any) => {
    setEditingEmployee(employee);
    setEditForm({
      name: employee.name,
      position: employee.position,
      department: employee.department,
      salary: employee.salary,
      experience: employee.experience,
      phone: employee.phone,
      email: employee.email
    });
  };

  const saveEmployee = () => {
    if (editingEmployee) {
      const updatedEmployees = employees.map(emp => 
        emp.id === editingEmployee.id ? { ...emp, ...editForm } : emp
      );
      setEmployees(updatedEmployees);
      calculateTotals(updatedEmployees);
      setEditingEmployee(null);
      toast.success('Данные сотрудника обновлены');
    }
  };

  // Добавление нового сотрудника
  const addNewEmployee = () => {
    const newEmployee = {
      id: Math.max(...employees.map(e => e.id)) + 1,
      ...editForm
    };
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    calculateTotals(updatedEmployees);
    setEditForm({
      name: '',
      position: '',
      department: '',
      salary: 0,
      experience: 0,
      phone: '',
      email: ''
    });
    toast.success('Новый сотрудник добавлен');
  };

  // Импорт из Excel
  const handleExcelImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Обрабатываем импортированные данные
        const importedEmployees = jsonData.map((row: any, index: number) => ({
          id: employees.length + index + 1,
          name: row['ФИО'] || row['ФИО'] || `Импортированный сотрудник ${index + 1}`,
          position: row['Должность'] || row['Позиция'] || 'Сотрудник',
          department: row['Отдел'] || row['Департамент'] || 'Общий',
          salary: parseInt(row['Зарплата'] || row['Salary'] || '50000'),
          experience: parseInt(row['Стаж'] || row['Experience'] || '1'),
          phone: row['Телефон'] || row['Phone'] || '+7 (999) 000-00-00',
          email: row['Email'] || row['email'] || `imported${index + 1}@more-clinic.ru`
        }));

        const updatedEmployees = [...employees, ...importedEmployees];
        setEmployees(updatedEmployees);
        calculateTotals(updatedEmployees);
        setShowImportModal(false);
        toast.success(`Импортировано ${importedEmployees.length} сотрудников`);
      } catch (error) {
        console.error('Ошибка импорта:', error);
        toast.error('Ошибка при импорте файла');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Умный калькулятор для сотрудников
  const executeSmartCalculation = () => {
    if (!smartCalcEmployee || !smartCalcAmount) {
      toast.error('Выберите сотрудника и введите сумму');
      return;
    }

    const amount = parseFloat(smartCalcAmount);
    if (isNaN(amount)) {
      toast.error('Введите корректную сумму');
      return;
    }

    let newSalary = smartCalcEmployee.salary;
    let operationText = '';

    switch (smartCalcOperation) {
      case 'add':
        newSalary += amount;
        operationText = `+ ${formatCurrency(amount)}`;
        break;
      case 'subtract':
        newSalary = Math.max(0, newSalary - amount);
        operationText = `- ${formatCurrency(amount)}`;
        break;
      case 'multiply':
        newSalary *= amount;
        operationText = `× ${amount}`;
        break;
      case 'percent':
        newSalary += (newSalary * amount / 100);
        operationText = `+ ${amount}%`;
        break;
      case 'bonus':
        newSalary += amount;
        operationText = `Премия: ${formatCurrency(amount)}`;
        break;
      case 'penalty':
        newSalary = Math.max(0, newSalary - amount);
        operationText = `Штраф: ${formatCurrency(amount)}`;
        break;
    }

    // Сохраняем в историю
    const calculation = {
      employee: smartCalcEmployee.name,
      operation: operationText,
      oldSalary: smartCalcEmployee.salary,
      newSalary: newSalary,
      timestamp: new Date().toLocaleString('ru-RU')
    };
    setSmartCalcHistory([calculation, ...smartCalcHistory]);

    // Обновляем зарплату
    handleSalaryChange(smartCalcEmployee.id, newSalary);
    
    // Сбрасываем форму
    setSmartCalcAmount('');
    toast.success(`Зарплата ${smartCalcEmployee.name} обновлена: ${formatCurrency(newSalary)}`);
  };

  // Быстрые операции
  const applyQuickOperation = (operation: string, value: number) => {
    if (!smartCalcEmployee) {
      toast.error('Выберите сотрудника');
      return;
    }

    setSmartCalcOperation(operation);
    setSmartCalcAmount(value.toString());
    executeSmartCalculation();
  };

  // Прямое редактирование зарплаты
  const startSalaryEdit = (employeeId: number, currentSalary: number) => {
    setEditingSalaryId(employeeId);
    setTempSalary(currentSalary.toString());
  };

  const saveSalaryEdit = () => {
    if (editingSalaryId && tempSalary) {
      const newSalary = parseInt(tempSalary);
      if (newSalary >= 0) {
        handleSalaryChange(editingSalaryId, newSalary);
        setEditingSalaryId(null);
        setTempSalary('');
        toast.success('Зарплата обновлена');
      } else {
        toast.error('Зарплата не может быть отрицательной');
      }
    }
  };

  const cancelSalaryEdit = () => {
    setEditingSalaryId(null);
    setTempSalary('');
  };

  // Обработка клавиш для редактирования зарплаты
  const handleSalaryKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveSalaryEdit();
    } else if (e.key === 'Escape') {
      cancelSalaryEdit();
    }
  };

  // Статистика и графики
  const getDepartmentStats = () => {
    const departmentStats: { [key: string]: { count: number, totalSalary: number, avgSalary: number } } = {};
    
    employees.forEach(emp => {
      if (!departmentStats[emp.department]) {
        departmentStats[emp.department] = { count: 0, totalSalary: 0, avgSalary: 0 };
      }
      departmentStats[emp.department].count++;
      departmentStats[emp.department].totalSalary += emp.salary;
    });

    Object.keys(departmentStats).forEach(dept => {
      departmentStats[dept].avgSalary = Math.round(departmentStats[dept].totalSalary / departmentStats[dept].count);
    });

    return departmentStats;
  };

  const getChartData = () => {
    const stats = getDepartmentStats();
    return Object.keys(stats).map(dept => ({
      name: dept,
      employees: stats[dept].count,
      totalSalary: stats[dept].totalSalary,
      avgSalary: stats[dept].avgSalary
    }));
  };

  const getPieChartData = () => {
    const stats = getDepartmentStats();
    const colors = ['#3B82F6', '#EF4444', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899', '#6366F1', '#14B8A6', '#F97316', '#6B7280'];
    
    return Object.keys(stats).map((dept, index) => ({
      name: dept,
      value: stats[dept].count,
      color: colors[index % colors.length]
    }));
  };

  // Фильтрация по времени
  const getFilteredEmployees = () => {
    if (timeFilter === 'all') return employees;
    
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentQuarter = Math.floor(currentMonth / 3);
    const currentYear = now.getFullYear();
    
    // Для демо просто возвращаем всех сотрудников
    // В реальном приложении здесь была бы фильтрация по датам
    return employees;
  };

  const getTimeFilterLabel = () => {
    const now = new Date();
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
    
    switch (timeFilter) {
      case 'current_month':
        return `Текущий месяц: ${months[now.getMonth()]} ${now.getFullYear()}`;
      case 'current_quarter':
        return `Текущий квартал: ${quarters[Math.floor(now.getMonth() / 3)]} ${now.getFullYear()}`;
      case 'current_year':
        return `Текущий год: ${now.getFullYear()}`;
      default:
        return 'Все время';
    }
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Button 
            onClick={() => setShowSmartCalculator(!showSmartCalculator)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 col-span-2 lg:col-span-1"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Умный калькулятор
          </Button>
          <Button 
            onClick={exportToExcel}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Экспорт Excel
          </Button>
          <Button 
            onClick={() => setShowImportModal(true)}
            variant="outline"
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            Импорт Excel
          </Button>
          <Button 
            onClick={() => setEditingEmployee({ id: 0 })}
            variant="outline"
          >
            <Plus className="w-4 h-4 mr-2" />
            Добавить
          </Button>
        </div>
      </section>

      {/* Smart Calculator */}
      {showSmartCalculator && (
        <section className="px-4 mb-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Умный калькулятор зарплат
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Employee Selection */}
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Выберите сотрудника</Label>
                  <select 
                    value={smartCalcEmployee?.id || ''}
                    onChange={(e) => {
                      const employee = employees.find(emp => emp.id === parseInt(e.target.value));
                      setSmartCalcEmployee(employee);
                    }}
                    className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-base"
                  >
                    <option value="">-- Выберите сотрудника --</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} - {emp.position} ({formatCurrency(emp.salary)})
                      </option>
                    ))}
                  </select>
                </div>

                {smartCalcEmployee && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                          {smartCalcEmployee.name}
                        </h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          {smartCalcEmployee.position} • {smartCalcEmployee.department}
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                        Текущая зарплата: {formatCurrency(smartCalcEmployee.salary)}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Operations */}
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Операция</Label>
                  <select 
                    value={smartCalcOperation}
                    onChange={(e) => setSmartCalcOperation(e.target.value)}
                    className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-base"
                  >
                    <option value="add">Добавить сумму</option>
                    <option value="subtract">Вычесть сумму</option>
                    <option value="multiply">Умножить на число</option>
                    <option value="percent">Добавить процент</option>
                    <option value="bonus">Премия</option>
                    <option value="penalty">Штраф</option>
                  </select>
                </div>

                <div>
                  <Label className="text-base font-medium">Сумма</Label>
                  <Input
                    type="number"
                    value={smartCalcAmount}
                    onChange={(e) => setSmartCalcAmount(e.target.value)}
                    placeholder={smartCalcOperation === 'percent' ? 'Процент (например: 10)' : 'Введите сумму'}
                    className="text-base p-3"
                  />
                </div>

                <Button 
                  onClick={executeSmartCalculation}
                  disabled={!smartCalcEmployee || !smartCalcAmount}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-base py-3"
                >
                  Выполнить операцию
                </Button>

                {/* Quick Operations */}
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    onClick={() => applyQuickOperation('bonus', 10000)}
                    variant="outline"
                    className="text-green-600 border-green-300 hover:bg-green-50"
                  >
                    Премия 10k
                  </Button>
                  <Button 
                    onClick={() => applyQuickOperation('bonus', 25000)}
                    variant="outline"
                    className="text-green-600 border-green-300 hover:bg-green-50"
                  >
                    Премия 25k
                  </Button>
                  <Button 
                    onClick={() => applyQuickOperation('penalty', 5000)}
                    variant="outline"
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    Штраф 5k
                  </Button>
                  <Button 
                    onClick={() => applyQuickOperation('percent', 5)}
                    variant="outline"
                    className="text-blue-600 border-blue-300 hover:bg-blue-50"
                  >
                    +5%
                  </Button>
                </div>
              </div>
            </div>

            {/* Calculation History */}
            {smartCalcHistory.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold mb-3">История операций</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {smartCalcHistory.map((calc, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <div className="font-medium">{calc.employee}</div>
                        <div className="text-sm text-muted-foreground">{calc.operation}</div>
                        <div className="text-xs text-muted-foreground">{calc.timestamp}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                          {formatCurrency(calc.oldSalary)} → {formatCurrency(calc.newSalary)}
                        </div>
                        <div className="font-bold text-green-600">
                          {formatCurrency(calc.newSalary - calc.oldSalary)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </section>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-6">
            <h3 className="text-xl font-semibold mb-4">Импорт из Excel</h3>
            <p className="text-muted-foreground mb-4">
              Загрузите Excel файл с данными сотрудников. Поддерживаемые колонки: ФИО, Должность, Отдел, Зарплата, Стаж, Телефон, Email
            </p>
            
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleExcelImport}
              className="w-full p-3 border rounded-lg mb-4"
            />
            
            <div className="flex gap-3">
              <Button 
                onClick={() => setShowImportModal(false)}
                variant="outline"
                className="flex-1"
              >
                Отмена
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Real Calculator */}
      {showCalculator && (
        <section className="px-4 mb-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Профессиональный калькулятор
            </h3>
            
            {/* Calculator Display */}
            <div className="mb-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-right">
                <div className="text-3xl font-mono font-bold text-gray-900 dark:text-white">
                  {calculatorInput}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {formatCurrency(parseFloat(calculatorInput) || 0)}
                </div>
              </div>
            </div>

            {/* Calculator Buttons */}
            <div className="grid grid-cols-4 gap-2">
              {/* Row 1 */}
              <Button onClick={handleCalculatorClear} variant="outline" className="bg-red-50 hover:bg-red-100">
                C
              </Button>
              <Button onClick={handleCalculatorBackspace} variant="outline" className="bg-orange-50 hover:bg-orange-100">
                ←
              </Button>
              <Button onClick={() => handleCalculatorInput('/')} variant="outline">
                ÷
              </Button>
              <Button onClick={() => handleCalculatorInput('*')} variant="outline">
                ×
              </Button>

              {/* Row 2 */}
              <Button onClick={() => handleCalculatorInput('7')} variant="outline" className="bg-gray-50 hover:bg-gray-100">
                7
              </Button>
              <Button onClick={() => handleCalculatorInput('8')} variant="outline" className="bg-gray-50 hover:bg-gray-100">
                8
              </Button>
              <Button onClick={() => handleCalculatorInput('9')} variant="outline" className="bg-gray-50 hover:bg-gray-100">
                9
              </Button>
              <Button onClick={() => handleCalculatorInput('-')} variant="outline">
                −
              </Button>

              {/* Row 3 */}
              <Button onClick={() => handleCalculatorInput('4')} variant="outline" className="bg-gray-50 hover:bg-gray-100">
                4
              </Button>
              <Button onClick={() => handleCalculatorInput('5')} variant="outline" className="bg-gray-50 hover:bg-gray-100">
                5
              </Button>
              <Button onClick={() => handleCalculatorInput('6')} variant="outline" className="bg-gray-50 hover:bg-gray-100">
                6
              </Button>
              <Button onClick={() => handleCalculatorInput('+')} variant="outline">
                +
              </Button>

              {/* Row 4 */}
              <Button onClick={() => handleCalculatorInput('1')} variant="outline" className="bg-gray-50 hover:bg-gray-100">
                1
              </Button>
              <Button onClick={() => handleCalculatorInput('2')} variant="outline" className="bg-gray-50 hover:bg-gray-100">
                2
              </Button>
              <Button onClick={() => handleCalculatorInput('3')} variant="outline" className="bg-gray-50 hover:bg-gray-100">
                3
              </Button>
              <Button 
                onClick={handleCalculatorCalculate} 
                className="bg-blue-600 hover:bg-blue-700 row-span-2"
              >
                =
              </Button>

              {/* Row 5 */}
              <Button onClick={() => handleCalculatorInput('0')} variant="outline" className="bg-gray-50 hover:bg-gray-100 col-span-2">
                0
              </Button>
              <Button onClick={() => handleCalculatorInput('.')} variant="outline" className="bg-gray-50 hover:bg-gray-100">
                .
              </Button>
            </div>

            {/* Quick Salary Calculations */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button 
                onClick={() => setCalculatorInput('120000 * 13 / 100')}
                variant="outline"
                className="text-sm"
              >
                Налог 13%
              </Button>
              <Button 
                onClick={() => setCalculatorInput('120000 * 87 / 100')}
                variant="outline"
                className="text-sm"
              >
                К выплате
              </Button>
              <Button 
                onClick={() => setCalculatorInput('120000 + 15000')}
                variant="outline"
                className="text-sm"
              >
                + Премия
              </Button>
              <Button 
                onClick={() => setCalculatorInput('120000 - 5000')}
                variant="outline"
                className="text-sm"
              >
                - Штраф
              </Button>
            </div>
          </Card>
        </section>
      )}

      {/* History */}
      {showHistory && (
        <section className="px-4 mb-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              История вычислений
            </h3>
            
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {calculatorHistory.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  История вычислений пуста
                </p>
              ) : (
                calculatorHistory.map((calc, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <div>
                      <div className="font-mono text-sm">{calc.expression}</div>
                      <div className="text-xs text-muted-foreground">{calc.timestamp}</div>
                    </div>
                    <div className="font-bold text-green-600">
                      {formatCurrency(calc.result)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </section>
      )}

      {/* Edit Employee Modal */}
      {editingEmployee && (
        <section className="px-4 mb-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              {editingEmployee.id === 0 ? 'Добавить сотрудника' : 'Редактировать сотрудника'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>ФИО</Label>
                <Input
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  placeholder="Введите ФИО"
                />
              </div>
              
              <div>
                <Label>Должность</Label>
                <Input
                  value={editForm.position}
                  onChange={(e) => setEditForm({...editForm, position: e.target.value})}
                  placeholder="Введите должность"
                />
              </div>
              
              <div>
                <Label>Отдел</Label>
                <Input
                  value={editForm.department}
                  onChange={(e) => setEditForm({...editForm, department: e.target.value})}
                  placeholder="Введите отдел"
                />
              </div>
              
              <div>
                <Label>Зарплата</Label>
                <Input
                  type="number"
                  value={editForm.salary}
                  onChange={(e) => setEditForm({...editForm, salary: parseInt(e.target.value) || 0})}
                  placeholder="Введите зарплату"
                />
              </div>
              
              <div>
                <Label>Стаж (лет)</Label>
                <Input
                  type="number"
                  value={editForm.experience}
                  onChange={(e) => setEditForm({...editForm, experience: parseInt(e.target.value) || 0})}
                  placeholder="Введите стаж"
                />
              </div>
              
              <div>
                <Label>Телефон</Label>
                <Input
                  value={editForm.phone}
                  onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label>Email</Label>
                <Input
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  placeholder="email@more-clinic.ru"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button 
                onClick={editingEmployee.id === 0 ? addNewEmployee : saveEmployee}
                className="bg-green-600 hover:bg-green-700"
              >
                {editingEmployee.id === 0 ? 'Добавить' : 'Сохранить'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setEditingEmployee(null)}
              >
                Отмена
              </Button>
            </div>
          </Card>
        </section>
      )}

      {/* Employee List */}
      <section className="px-4 mb-6">
        <Card className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
              <Users className="w-5 h-5" />
              Список сотрудников ({employees.length})
            </h3>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowStatistics(!showStatistics)}
                className="flex-1 sm:flex-none"
              >
                <BarChart3 className="w-4 h-4 mr-1" />
                Статистика
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowCharts(!showCharts)}
                className="flex-1 sm:flex-none"
              >
                <PieChart className="w-4 h-4 mr-1" />
                Графики
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowEmployees(!showEmployees)}
                className="flex-1 sm:flex-none"
              >
                {showEmployees ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-1" />
                    Скрыть
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-1" />
                    Показать
                  </>
                )}
              </Button>
            </div>
          </div>

          {showEmployees && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {employees.map((employee) => (
              <div key={employee.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {employee.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-1">
                      <h4 className="font-semibold text-sm truncate">{employee.name}</h4>
                      {employee.position === 'Директор' && <Crown className="w-3 h-3 text-yellow-500 flex-shrink-0" />}
                      {employee.experience >= 10 && <Star className="w-3 h-3 text-blue-500 flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{employee.position}</p>
                    <div className={`inline-block text-xs px-2 py-1 rounded-full mt-1 ${getDepartmentColor(employee.department)}`}>
                      {employee.department}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs text-muted-foreground">Зарплата:</span>
                    <div className="text-right">
                      {editingSalaryId === employee.id ? (
                        <div className="space-y-1">
                          <Input
                            type="number"
                            value={tempSalary}
                            onChange={(e) => setTempSalary(e.target.value)}
                            onKeyDown={handleSalaryKeyPress}
                            className="text-xs h-7 w-20"
                            autoFocus
                          />
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              onClick={saveSalaryEdit}
                              className="h-5 px-2 text-xs bg-green-600 hover:bg-green-700"
                            >
                              ✓
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={cancelSalaryEdit}
                              className="h-5 px-2 text-xs"
                            >
                              ✕
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <span 
                            className="font-bold text-green-600 text-sm cursor-pointer hover:text-green-700 transition-colors break-words"
                            onClick={() => startSalaryEdit(employee.id, employee.salary)}
                            title={`Нажмите для редактирования: ${formatCurrency(employee.salary)}`}
                          >
                            {formatCompactCurrency(employee.salary)}
                          </span>
                          <div className="text-xs text-muted-foreground">
                            Нажмите для изменения
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Стаж:</span>
                    <span className="text-xs">{employee.experience} лет</span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => startEditEmployee(employee)}
                    className="w-full text-xs mt-2"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Изменить
                  </Button>
                </div>
              </div>
              ))}
            </div>
          )}
        </Card>
      </section>

      {/* Statistics */}
      {showStatistics && (
        <section className="px-4 mb-6">
          <Card className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Статистика по отделам
              </h3>
              
              {/* Time Filter */}
              <div className="flex gap-2">
                <select 
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="text-sm p-2 border rounded-lg bg-white dark:bg-gray-800"
                >
                  <option value="all">Все время</option>
                  <option value="current_month">Текущий месяц</option>
                  <option value="current_quarter">Текущий квартал</option>
                  <option value="current_year">Текущий год</option>
                </select>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowStatistics(false)}
                >
                  <ChevronUp className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="mb-3 text-sm text-muted-foreground">
              {getTimeFilterLabel()}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(getDepartmentStats()).map(([dept, stats]) => (
                <div key={dept} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2 truncate">{dept}</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Сотрудников:</span>
                      <span className="font-medium">{stats.count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Общий фонд:</span>
                      <span className="font-medium break-words" title={formatCurrency(stats.totalSalary)}>
                        {formatCompactCurrency(stats.totalSalary)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Средняя ЗП:</span>
                      <span className="font-medium text-green-600 break-words" title={formatCurrency(stats.avgSalary)}>
                        {formatCompactCurrency(stats.avgSalary)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>
      )}

      {/* Charts */}
      {showCharts && (
        <section className="px-4 mb-6">
          <Card className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Графики и диаграммы
              </h3>
              
              <div className="flex gap-2">
                <select 
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="text-sm p-2 border rounded-lg bg-white dark:bg-gray-800"
                >
                  <option value="all">Все время</option>
                  <option value="current_month">Текущий месяц</option>
                  <option value="current_quarter">Текущий квартал</option>
                  <option value="current_year">Текущий год</option>
                </select>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowCharts(false)}
                >
                  <ChevronUp className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="mb-3 text-sm text-muted-foreground">
              {getTimeFilterLabel()}
            </div>
            
            <div className="space-y-6">
              {/* Bar Chart */}
              {showBarChart && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Сотрудники по отделам</h4>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setShowBarChart(false)}
                    >
                      <ChevronUp className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getChartData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Bar dataKey="employees" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Pie Chart */}
              {showPieChart && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Распределение по отделам</h4>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setShowPieChart(false)}
                    >
                      <ChevronUp className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getPieChartData()}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {getPieChartData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Line Chart */}
              {showLineChart && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Средняя зарплата по отделам</h4>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setShowLineChart(false)}
                    >
                      <ChevronUp className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={getChartData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip formatter={(value) => formatCompactCurrency(Number(value))} />
                        <Line type="monotone" dataKey="avgSalary" stroke="#10B981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Chart Controls */}
              <div className="flex flex-wrap gap-2 justify-center">
                {!showBarChart && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowBarChart(true)}
                  >
                    Показать Bar Chart
                  </Button>
                )}
                {!showPieChart && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowPieChart(true)}
                  >
                    Показать Pie Chart
                  </Button>
                )}
                {!showLineChart && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowLineChart(true)}
                  >
                    Показать Line Chart
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* Summary */}
      <section className="px-4 mb-6">
        <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-green-200 dark:border-green-800">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Сводка по зарплатам
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border">
              <div className="text-sm sm:text-base lg:text-lg font-bold text-green-600 break-words" title={formatCurrency(totalSalary)}>
                {formatCompactCurrency(totalSalary)}
              </div>
              <div className="text-xs text-muted-foreground">Общий фонд</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border">
              <div className="text-sm sm:text-base lg:text-lg font-bold text-red-600 break-words" title={formatCurrency(totalTaxes)}>
                {formatCompactCurrency(totalTaxes)}
              </div>
              <div className="text-xs text-muted-foreground">Налоги (13%)</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border">
              <div className="text-sm sm:text-base lg:text-lg font-bold text-blue-600 break-words" title={formatCurrency(netSalary)}>
                {formatCompactCurrency(netSalary)}
              </div>
              <div className="text-xs text-muted-foreground">К выплате</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border">
              <div className="text-sm sm:text-base lg:text-lg font-bold text-purple-600 break-words" title={formatCurrency(totalSalary / employees.length)}>
                {formatCompactCurrency(totalSalary / employees.length)}
              </div>
              <div className="text-xs text-muted-foreground">Средняя ЗП</div>
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
