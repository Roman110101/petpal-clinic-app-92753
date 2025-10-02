export interface ServicesPriceItem {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export const servicesPrices: ServicesPriceItem[] = [
  {
    id: 'services_primary_examination',
    name: 'Первичный клинический осмотр',
    price: '1 300 ₽',
    description: 'Первичный осмотр животного'
  },
  {
    id: 'services_repeat_examination',
    name: 'Повторный прием',
    price: '950 ₽',
    description: 'Повторный прием врача'
  },
  {
    id: 'services_consultation_without_animal',
    name: 'Консультация без животного',
    price: '700 ₽',
    description: 'Консультация владельца без животного'
  },
  {
    id: 'services_consultation_analyses',
    name: 'Консультация по результатам анализов',
    price: '1 000 ₽',
    description: 'Консультация по результатам исследований'
  },
  {
    id: 'services_consultation_care_feeding',
    name: 'Консультация по содержанию и кормлению',
    price: '1 100 ₽',
    description: 'Консультация по уходу и кормлению'
  },
  {
    id: 'services_oral_administration',
    name: 'Пероральное, ректальное, накожное, интраназальное и т.п введение лек. средств',
    price: '250 ₽',
    description: 'Введение лекарств различными способами'
  },
  {
    id: 'services_injection_sc_im',
    name: 'Инъекция п/к, в/м',
    price: '200 ₽',
    description: 'Подкожная или внутримышечная инъекция'
  },
  {
    id: 'services_injection_iv',
    name: 'Инъекция в/в',
    price: '550 ₽',
    description: 'Внутривенная инъекция'
  },
  {
    id: 'services_injection_iv_catheter',
    name: 'Введение в-в в катетер',
    price: '350 ₽',
    description: 'Введение препарата через внутривенный катетер'
  },
  {
    id: 'services_infusion_30min',
    name: 'Внутривенная, подкожная инфузия до 30 мин',
    price: '1 000 ₽',
    description: 'Инфузионная терапия до 30 минут'
  },
  {
    id: 'services_infusion_over_30min',
    name: 'Внутривенная, подкожная инфузия свыше 30 мин (за каждые 30 мин)',
    price: '700 ₽',
    description: 'Инфузионная терапия свыше 30 минут'
  },
  {
    id: 'services_ips_1hour',
    name: 'ИПС 1 час',
    price: '650 ₽',
    description: 'Искусственная поддержка сердца 1 час'
  },
  {
    id: 'services_bolus_administration',
    name: 'Боллюсное введение препаратов',
    price: '400 ₽',
    description: 'Быстрое введение лекарственных препаратов'
  },
  {
    id: 'services_injection_intracavitary',
    name: 'Инъекция внутриполостная/внутрисуставная',
    price: '2 000 ₽',
    description: 'Инъекция в полость тела или сустав'
  },
  {
    id: 'services_iv_catheter_placement',
    name: 'Постановка в/в катетера',
    price: '650 ₽',
    description: 'Установка внутривенного катетера'
  },
  {
    id: 'services_central_catheter_placement',
    name: 'Постановка центрального венозного катетера',
    price: '1 700 ₽',
    description: 'Установка центрального венозного катетера'
  },
  {
    id: 'services_catheter_removal',
    name: 'Снятие катетера',
    price: '300 ₽',
    description: 'Удаление катетера'
  },
  {
    id: 'services_donor_payment',
    name: 'Оплата донору в зависимости от количества крови 100 руб/мл',
    price: '100 ₽',
    description: 'Оплата донору крови за 1 мл'
  },
  {
    id: 'services_ear_nerve_block',
    name: 'Блокада комбинированная нервов уха',
    price: '1 800 ₽',
    description: 'Анестезия нервов уха'
  },
  {
    id: 'services_eye_nerve_block',
    name: 'Блокада комбинированная в области глаза: ретробульбарная, субконъюнктивальная (1 глаз)',
    price: '1 800 ₽',
    description: 'Анестезия в области глаза'
  },
  {
    id: 'services_nerve_block',
    name: 'Блокада',
    price: '1 300 ₽',
    description: 'Местная анестезия нервов'
  },
  {
    id: 'services_luminescent_diagnostics',
    name: 'Люминисцентная диагностика',
    price: '450 ₽',
    description: 'Диагностика с использованием люминесцентной лампы'
  },
  {
    id: 'services_otoscopy',
    name: 'Отоскопия инструментальная',
    price: '450 ₽',
    description: 'Инструментальный осмотр ушей'
  },
  {
    id: 'services_glucose_measurement',
    name: 'Глюкометрия (процедура) (без учета расходных материалов)',
    price: '350 ₽',
    description: 'Измерение уровня глюкозы'
  },
  {
    id: 'services_glucose_measurement_multiple',
    name: 'Глюкометрия более 2х раз (за один замер) (без учета расходных материалов)',
    price: '220 ₽',
    description: 'Повторное измерение глюкозы'
  },
  {
    id: 'services_tonometry_single',
    name: 'Тонометрия за одно измерение (до 3 измерений пациенту)',
    price: '350 ₽',
    description: 'Измерение артериального давления'
  },
  {
    id: 'services_tonometry_multiple',
    name: 'Тонометрия за одно измерение (от 3 измерений пациенту)',
    price: '300 ₽',
    description: 'Измерение давления при множественных измерениях'
  },
  {
    id: 'services_tonometry_transfusion',
    name: 'Тонометрия при гемотрансфузии',
    price: '500 ₽',
    description: 'Контроль давления при переливании крови'
  },
  {
    id: 'services_nail_trimming_15kg',
    name: 'Обрезка когтей у кош/соб до 15 кг',
    price: '400 ₽',
    description: 'Обрезка когтей животным до 15 кг'
  },
  {
    id: 'services_nail_trimming_15kg_plus',
    name: 'Обрезка когтей собаки более 15 кг',
    price: '600 ₽',
    description: 'Обрезка когтей собакам более 15 кг'
  },
  {
    id: 'services_nail_trimming_caps',
    name: 'Обрезка когтей + наклейка антицарапок',
    price: '1 300 ₽',
    description: 'Обрезка когтей с наклейкой антицарапок'
  },
  {
    id: 'services_ingrown_nail_removal',
    name: 'Удаление вросшего когтя',
    price: '650 ₽',
    description: 'Удаление вросшего когтя'
  },
  {
    id: 'services_paraanal_glands_sanitation',
    name: 'Санация параанальных желез с учетом препаратов и расходных материалов',
    price: '800 ₽',
    description: 'Очистка параанальных желез'
  },
  {
    id: 'services_ear_sanitation',
    name: 'Санация ушных раковин',
    price: '900 ₽',
    description: 'Очистка и обработка ушей'
  },
  {
    id: 'services_drainage_sanitation',
    name: 'Санация дренажа',
    price: '650 ₽',
    description: 'Обработка дренажа'
  },
  {
    id: 'services_wound_sanitation_1',
    name: 'Санация раны 1 категория',
    price: '1 100 ₽',
    description: 'Обработка раны легкой степени'
  },
  {
    id: 'services_wound_sanitation_2',
    name: 'Санация раны 2 категория',
    price: '1 700 ₽',
    description: 'Обработка раны средней степени'
  },
  {
    id: 'services_wound_sanitation_3',
    name: 'Санация раны 3 категория',
    price: '2 500 ₽',
    description: 'Обработка раны тяжелой степени'
  },
  {
    id: 'services_wound_sanitation_4',
    name: 'Санация раны 4 категория',
    price: '3 900 ₽',
    description: 'Обработка раны особо тяжелой степени'
  },
  {
    id: 'services_suture_care',
    name: 'Обработка швов',
    price: '500 ₽',
    description: 'Обработка послеоперационных швов'
  },
  {
    id: 'services_suture_removal',
    name: 'Снятие швов',
    price: '400 ₽',
    description: 'Снятие послеоперационных швов'
  },
  {
    id: 'services_bandaging',
    name: 'Перевязка',
    price: '1 200 ₽',
    description: 'Перевязка раны'
  },
  {
    id: 'services_puncture_aspiration',
    name: 'Пункция с аспирацией',
    price: '1 100 ₽',
    description: 'Пункция с отсасыванием содержимого'
  },
  {
    id: 'services_biopsy_soft_tissue',
    name: 'Биопсия мягких тканей (пункционная)',
    price: '1 700 ₽',
    description: 'Пункционная биопсия мягких тканей'
  },
  {
    id: 'services_trepan_biopsy',
    name: 'Трепан биопсия',
    price: '2 700 ₽',
    description: 'Трепанобиопсия'
  },
  {
    id: 'services_blood_collection',
    name: 'Взятие/отбор крови',
    price: '550 ₽',
    description: 'Взятие крови для анализов'
  },
  {
    id: 'services_blood_collection_exotic',
    name: 'Отбор крови у экзотического животного',
    price: '1 300 ₽',
    description: 'Взятие крови у экзотических животных'
  },
  {
    id: 'services_tick_removal',
    name: 'Удаление клеща',
    price: '400 ₽',
    description: 'Удаление одного клеща'
  },
  {
    id: 'services_tick_removal_3_5',
    name: 'Удаление клещей от 3-5 шт',
    price: '600 ₽',
    description: 'Удаление клещей от 3 до 5 штук'
  },
  {
    id: 'services_tick_removal_6_15',
    name: 'Удаление клещей от 6-15 шт',
    price: '1 500 ₽',
    description: 'Удаление клещей от 6 до 15 штук'
  },
  {
    id: 'services_tick_removal_15_plus',
    name: 'Удаление клещей свыше 15 шт',
    price: '2 400 ₽',
    description: 'Удаление клещей свыше 15 штук'
  },
  {
    id: 'services_catheterization_cat_male',
    name: 'Катетеризация мочевого пузыря кот/кобель',
    price: '2 300 ₽',
    description: 'Катетеризация мочевого пузыря у самцов'
  },
  {
    id: 'services_catheterization_cat_female',
    name: 'Катетеризация мочевого пузыря/кошка',
    price: '3 100 ₽',
    description: 'Катетеризация мочевого пузыря у кошек'
  },
  {
    id: 'services_catheterization_dog_female',
    name: 'Катетеризация мочевого пузыря сука',
    price: '3 100 ₽',
    description: 'Катетеризация мочевого пузыря у сук'
  },
  {
    id: 'services_bladder_lavage',
    name: 'Лаваж мочевого пузыря',
    price: '900 ₽',
    description: 'Промывание мочевого пузыря'
  },
  {
    id: 'services_manual_urination',
    name: 'Мануальное отведение мочи',
    price: '500 ₽',
    description: 'Ручное выведение мочи'
  },
  {
    id: 'services_artificial_vomiting',
    name: 'Искусственное вызывание рвоты',
    price: '1 500 ₽',
    description: 'Индукция рвоты'
  },
  {
    id: 'services_urethral_bougienage',
    name: 'Бужирование уретры после уретростомии',
    price: '1 700 ₽',
    description: 'Расширение уретры после операции'
  },
  {
    id: 'services_cleansing_enema',
    name: 'Очистительная клизма',
    price: '2 000 ₽',
    description: 'Очистительная клизма'
  },
  {
    id: 'services_rectal_vaginal_administration',
    name: 'Ректальное/вагинальное введение',
    price: '800 ₽',
    description: 'Ректальное или вагинальное введение препаратов'
  },
  {
    id: 'services_laparocentesis',
    name: 'Лапарацентез с удалением транссудата/эксудата',
    price: '2 000 ₽',
    description: 'Прокол брюшной полости с удалением жидкости'
  },
  {
    id: 'services_thoracocentesis',
    name: 'Торакоцентез с удалением транссудата/эксудата',
    price: '2 300 ₽',
    description: 'Прокол грудной полости с удалением жидкости'
  },
  {
    id: 'services_pericardiocentesis',
    name: 'Перикардиоцентез',
    price: '3 200 ₽',
    description: 'Прокол перикарда'
  },
  {
    id: 'services_pleural_drainage',
    name: 'Постановка плеврального дренажа',
    price: '3 000 ₽',
    description: 'Установка дренажа в плевральную полость'
  },
  {
    id: 'services_cystocentesis',
    name: 'Цистоцентез с аспирацией',
    price: '2 200 ₽',
    description: 'Прокол мочевого пузыря с отсасыванием мочи'
  },
  {
    id: 'services_cystocentesis_diagnostic',
    name: 'Цистоцентез диагностический',
    price: '1 200 ₽',
    description: 'Диагностический прокол мочевого пузыря'
  },
  {
    id: 'services_cystocentesis_uzi',
    name: 'Цистоцентез под контролем УЗИ',
    price: '2 000 ₽',
    description: 'Прокол мочевого пузыря под контролем УЗИ'
  },
  {
    id: 'services_cystourethrography',
    name: 'Цисто/уретрография',
    price: '1 700 ₽',
    description: 'Контрастное исследование мочевого пузыря и уретры'
  },
  {
    id: 'services_vaginal_douching',
    name: 'Спринцевание влагалища или препуция',
    price: '900 ₽',
    description: 'Промывание влагалища или препуция'
  },
  {
    id: 'services_hardware_removal',
    name: 'Снятие спицы/штифта/пластины',
    price: '1 300 ₽',
    description: 'Удаление металлических конструкций'
  },
  {
    id: 'services_cast_removal_10kg',
    name: 'Снятие гипсовой повязки до 10 кг',
    price: '2 000 ₽',
    description: 'Снятие гипса с животных до 10 кг'
  },
  {
    id: 'services_cast_removal_10kg_plus',
    name: 'Снятие гипсовой повязки от 10 кг',
    price: '2 300 ₽',
    description: 'Снятие гипса с животных от 10 кг'
  },
  {
    id: 'services_gastric_lavage',
    name: 'Промывание/зондирование желудка',
    price: '2 950 ₽',
    description: 'Промывание желудка через зонд'
  },
  {
    id: 'services_bronchoalveolar_lavage',
    name: 'Бронхоальвеолярный лаваж (услуга)',
    price: '4 000 ₽',
    description: 'Промывание бронхов и альвеол'
  },
  {
    id: 'services_chemotherapy_session',
    name: 'Сеанс химиотерапии 1 час',
    price: '3 100 ₽',
    description: 'Сеанс химиотерапии'
  },
  {
    id: 'services_euthanasia_10kg',
    name: 'Эвтаназия до 10 кг (без учёта анестезии 1 категории)',
    price: '2 300 ₽',
    description: 'Эвтаназия животных до 10 кг'
  },
  {
    id: 'services_euthanasia_10_30kg',
    name: 'Эвтаназия 10-30 кг (без учёта анестезии 2-ой категории)',
    price: '3 200 ₽',
    description: 'Эвтаназия животных 10-30 кг'
  },
  {
    id: 'services_euthanasia_30kg_plus',
    name: 'Эвтаназия свыше 30кг (без учёта анестезии 3й категории)',
    price: '4 100 ₽',
    description: 'Эвтаназия животных свыше 30 кг'
  },
  {
    id: 'services_animal_fixation',
    name: 'Фиксация животных персоналом',
    price: '500 ₽',
    description: 'Фиксация животного персоналом'
  },
  {
    id: 'services_passport_registration',
    name: 'Оформление паспорта',
    price: '650 ₽',
    description: 'Оформление ветеринарного паспорта'
  },
  {
    id: 'services_passport_flight',
    name: 'Оформление паспорта для вылета',
    price: '2 000 ₽',
    description: 'Оформление документов для авиаперевозки'
  },
  {
    id: 'services_flight_examination',
    name: 'Клинический осмотр перед вылетом',
    price: '1 100 ₽',
    description: 'Предполетный осмотр животного'
  },
  {
    id: 'services_procedure_reception',
    name: 'Прием процедурный',
    price: '650 ₽',
    description: 'Процедурный прием'
  },
  {
    id: 'services_ophthalmologic_administration',
    name: 'Офтальмологическое введение лекарственного средства',
    price: '200 ₽',
    description: 'Введение лекарств в глаз'
  },
  {
    id: 'services_material_sampling',
    name: 'Отбор материала для анализа',
    price: '400 ₽',
    description: 'Взятие материала для исследований'
  },
  {
    id: 'services_cyto_histo_sampling',
    name: 'Отбор проб цито/гистология',
    price: '900 ₽',
    description: 'Взятие материала для цитологии/гистологии'
  },
  {
    id: 'services_skin_scraping',
    name: 'Взятие соскоба с кожи,мазка-отпечатка',
    price: '400 ₽',
    description: 'Взятие соскоба с кожи для исследования'
  },
  {
    id: 'services_bac_culture_sampling',
    name: 'Отбор материала на бак посев',
    price: '750 ₽',
    description: 'Взятие материала для бактериологического исследования'
  },
  {
    id: 'services_vaccination_reception',
    name: 'Прием (вакцинация)',
    price: '600 ₽',
    description: 'Прием для вакцинации'
  },
  {
    id: 'services_vaccination',
    name: 'Вакцинация (вакцинация)',
    price: '8 000 ₽',
    description: 'Вакцинация животного'
  },
  {
    id: 'services_microchipping_owner',
    name: 'Чипирование(чип владельца)',
    price: '800 ₽',
    description: 'Чипирование чипом владельца'
  },
  {
    id: 'services_feeding',
    name: 'Кормление (без стоимости материалов и корма)',
    price: '300 ₽',
    description: 'Кормление животного'
  },
  {
    id: 'services_surgeon_first_reception',
    name: 'Первичный прием хирурга',
    price: '2 000 ₽',
    description: 'Первичная консультация хирурга'
  },
  {
    id: 'services_surgeon_repeat_reception',
    name: 'Повторный прием хирурга',
    price: '1 500 ₽',
    description: 'Повторная консультация хирурга'
  },
  {
    id: 'services_surgeon_external_documents',
    name: 'Прием хирурга по медицинским документам из сторонней клиники',
    price: '2 500 ₽',
    description: 'Консультация хирурга по внешним документам'
  },
  {
    id: 'services_therapist_external_documents',
    name: 'Прием терапевта по медицинским документам из сторонней клиники',
    price: '2 000 ₽',
    description: 'Консультация терапевта по внешним документам'
  },
  {
    id: 'services_chief_doctor_first',
    name: 'Первичный приём главного врача',
    price: '2 500 ₽',
    description: 'Первичная консультация главного врача'
  },
  {
    id: 'services_chief_doctor_repeat',
    name: 'Повторный приём главного врача',
    price: '1 700 ₽',
    description: 'Повторная консультация главного врача'
  },
  {
    id: 'services_first_reception_nutrition',
    name: 'Первичный приём с консультацией по питанию',
    price: '2 300 ₽',
    description: 'Первичный прием с консультацией по питанию'
  },
  {
    id: 'services_venisection',
    name: 'Венесекция',
    price: '900 ₽',
    description: 'Венесекция'
  },
  {
    id: 'services_artificial_sphincter',
    name: 'Установка искусственного сфинктера уретры',
    price: '60 000 ₽',
    description: 'Установка искусственного сфинктера уретры'
  },
  {
    id: 'services_esophagostomy',
    name: 'Постановка эзофагостомы',
    price: '2 800 ₽',
    description: 'Установка эзофагостомической трубки'
  },
  {
    id: 'services_plasmotherapy',
    name: 'Плазмотерапия 1 процедура',
    price: '2 500 ₽',
    description: 'Одна процедура плазмотерапии'
  },
  {
    id: 'services_medical_history',
    name: 'Подготовка выписки из истории болезни',
    price: '1 000 ₽',
    description: 'Подготовка выписки из медицинской документации'
  },
  {
    id: 'services_obstetric_assistance',
    name: 'Родовспоможение с учетом расходных материалов и препаратов (услуга для комбинации)',
    price: '18 000 ₽',
    description: 'Родовспоможение'
  },
  {
    id: 'services_fetal_resuscitation',
    name: 'Реанимация плода ( до 30 минут)',
    price: '1 500 ₽',
    description: 'Реанимация новорожденного'
  },
  {
    id: 'services_parrot_beak_trimming',
    name: 'Обрезка клюва попугая (средние/крупные)',
    price: '1 300 ₽',
    description: 'Обрезка клюва попугая'
  },
  {
    id: 'services_parrot_nail_trimming',
    name: 'Обрезка/коррекция когтей среднего/крупного попугая',
    price: '700 ₽',
    description: 'Обрезка когтей попугая'
  },
  {
    id: 'services_online_consultation_standard',
    name: 'Консультация онлайн до 40 минут стандартная',
    price: '2 000 ₽',
    description: 'Стандартная онлайн консультация'
  },
  {
    id: 'services_pathological_autopsy',
    name: 'Пат.вскрытие (без заключения)',
    price: '4 000 ₽',
    description: 'Патологоанатомическое вскрытие'
  }
];