export interface SurgeryPriceItem {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export const surgeryPrices: SurgeryPriceItem[] = [
  {
    id: 'surgery_skin_muscle_sutures',
    name: 'Наложение кожно-мышечных швов',
    price: '350 ₽',
    description: 'Наложение швов на кожу и мышцы'
  },
  {
    id: 'surgery_cosmetic_sutures',
    name: 'Наложение косметического шва',
    price: '1 100 ₽',
    description: 'Наложение косметических швов'
  },
  {
    id: 'surgery_abscess_opening',
    name: 'Вскрытие абсцесса',
    price: '2 000 ₽',
    description: 'Вскрытие гнойника'
  },
  {
    id: 'surgery_abscess_drainage',
    name: 'Вскрытие абсцесса с постановкой дренажа',
    price: '2 900 ₽',
    description: 'Вскрытие абсцесса с дренированием'
  },
  {
    id: 'surgery_ear_hematoma',
    name: 'Вскрытие гематомы ушной раковины',
    price: '3 500 ₽',
    description: 'Вскрытие гематомы уха'
  },
  {
    id: 'surgery_vaginal_prolapse',
    name: 'Вправление влагалища',
    price: '10 000 ₽',
    description: 'Вправление выпавшего влагалища'
  },
  {
    id: 'surgery_rectal_prolapse',
    name: 'Вправление прямой кишки при её выпадении (+кисетный шов)',
    price: '10 000 ₽',
    description: 'Вправление выпавшей прямой кишки'
  },
  {
    id: 'surgery_eyeball_repositioning',
    name: 'Вправление глазного яблока',
    price: '7 000 ₽',
    description: 'Вправление вывихнутого глазного яблока'
  },
  {
    id: 'surgery_foreign_body_eye_ear_nose',
    name: 'Удаление инородного предмета из глаза/уха/носа (от 1200)',
    price: '1 200 ₽',
    description: 'Удаление инородного тела из глаза/уха/носа'
  },
  {
    id: 'surgery_foreign_body_mouth',
    name: 'Удаление инородного предмета из ротовой полости (от 1200)',
    price: '1 200 ₽',
    description: 'Удаление инородного тела из ротовой полости'
  },
  {
    id: 'surgery_foreign_body_stomach',
    name: 'Удаление инородного тела из желудка',
    price: '14 000 ₽',
    description: 'Удаление инородного тела из желудка'
  },
  {
    id: 'surgery_foreign_body_git',
    name: 'Удаление инородного тела из ЖКТ',
    price: '17 000 ₽',
    description: 'Удаление инородного тела из ЖКТ'
  },
  {
    id: 'surgery_diagnostic_laparotomy',
    name: 'Лапаратомия диагностическая',
    price: '6 000 ₽',
    description: 'Диагностическая лапаротомия'
  },
  {
    id: 'surgery_gastric_volvulus_splenectomy',
    name: 'Операция заворот желудка и спленэктомия',
    price: '25 000 ₽',
    description: 'Операция при завороте желудка с удалением селезенки'
  },
  {
    id: 'surgery_splenectomy',
    name: 'Спленэктомия',
    price: '20 000 ₽',
    description: 'Удаление селезенки'
  },
  {
    id: 'surgery_gastric_volvulus',
    name: 'Операция заворот желудка',
    price: '21 000 ₽',
    description: 'Операция при завороте желудка'
  },
  {
    id: 'surgery_gastropexy',
    name: 'Гастропексия+ к расширению или завороту желудка',
    price: '14 000 ₽',
    description: 'Фиксация желудка к брюшной стенке'
  },
  {
    id: 'surgery_thoracocentesis',
    name: 'Торакоцентез',
    price: '2 000 ₽',
    description: 'Прокол грудной клетки'
  },
  {
    id: 'surgery_bowel_resection_1',
    name: 'Резекция кишечника 1 категории',
    price: '17 000 ₽',
    description: 'Резекция кишечника 1 категории сложности'
  },
  {
    id: 'surgery_bowel_resection_2',
    name: 'Резекция кишечника 2 категории',
    price: '22 000 ₽',
    description: 'Резекция кишечника 2 категории сложности'
  },
  {
    id: 'surgery_bowel_resection_3',
    name: 'Резекция кишечника 3 категории',
    price: '39 000 ₽',
    description: 'Резекция кишечника 3 категории сложности'
  },
  {
    id: 'surgery_mastectomy_cat_10kg',
    name: 'Тотальная мастэктомия у кошки и мелких собак (до 10 кг)',
    price: '15 000 ₽',
    description: 'Удаление молочных желез у кошек и собак до 10кг'
  },
  {
    id: 'surgery_mastectomy_dog_10kg_plus',
    name: 'Тотальная мастэктомия у собак более 10 кг',
    price: '20 000 ₽',
    description: 'Удаление молочных желез у собак более 10кг'
  },
  {
    id: 'surgery_soft_tissue_tumors',
    name: 'Удаление опухолей мягких тканей (без стоимости анестезии)',
    price: '11 000 ₽',
    description: 'Удаление новообразований мягких тканей'
  },
  {
    id: 'surgery_internal_organ_tumors',
    name: 'Удаление опухолей внутренних органов (от 14000 т.р)',
    price: '14 000 ₽',
    description: 'Удаление новообразований внутренних органов'
  },
  {
    id: 'surgery_papilloma_removal',
    name: 'Удаление папиллом (за одну)',
    price: '1 900 ₽',
    description: 'Удаление одной папилломы'
  },
  {
    id: 'surgery_papilloma_mucosa',
    name: 'Удаление папиллом на слизистой оболочке (за единицу)',
    price: '3 000 ₽',
    description: 'Удаление папилломы на слизистой'
  },
  {
    id: 'surgery_multiple_papillomas_mucosa',
    name: 'Удаление множественных папиллом на слизистой оболочке',
    price: '9 000 ₽',
    description: 'Удаление множественных папиллом на слизистой'
  },
  {
    id: 'surgery_multiple_papillomas_skin',
    name: 'Удаление множественных папиллом на коже',
    price: '9 000 ₽',
    description: 'Удаление множественных папиллом на коже'
  },
  {
    id: 'surgery_operation_1_cat',
    name: 'Операция 1 кат сложности',
    price: '10 000 ₽',
    description: 'Операция 1 категории сложности'
  },
  {
    id: 'surgery_operation_2_cat',
    name: 'Операция 2 кат сложности',
    price: '15 000 ₽',
    description: 'Операция 2 категории сложности'
  },
  {
    id: 'surgery_operation_3_cat',
    name: 'Операция 3 кат сложности',
    price: '20 000 ₽',
    description: 'Операция 3 категории сложности'
  },
  {
    id: 'surgery_operation_4_cat',
    name: 'Операция 4 кат сложности',
    price: '23 000 ₽',
    description: 'Операция 4 категории сложности'
  },
  {
    id: 'surgery_operation_5_cat',
    name: 'Операция 5 кат сложности',
    price: '27 000 ₽',
    description: 'Операция 5 категории сложности'
  },
  {
    id: 'surgery_operation_6_cat',
    name: 'Операция 6 кат сложности',
    price: '35 000 ₽',
    description: 'Операция 6 категории сложности'
  },
  {
    id: 'surgery_enucleation_cat',
    name: 'Энуклеация (удаление) глазного яблока кошки (1 глаз)',
    price: '11 000 ₽',
    description: 'Удаление глазного яблока у кошки'
  },
  {
    id: 'surgery_enucleation_dog',
    name: 'Энуклеация (удаление) глазного яблока собаки (1 глаз)',
    price: '14 000 ₽',
    description: 'Удаление глазного яблока у собаки'
  },
  {
    id: 'surgery_rudimentary_fingers_10_days',
    name: 'Ампутация рудиментар пальцев до 10 дней',
    price: '2 000 ₽',
    description: 'Ампутация прибылых пальцев до 10 дней'
  },
  {
    id: 'surgery_rudimentary_fingers_after_10_days',
    name: 'Ампутация рудиментарных пальцев после 10 дней',
    price: '2 000 ₽',
    description: 'Ампутация прибылых пальцев после 10 дней'
  },
  {
    id: 'surgery_tail_docking_10_days',
    name: 'Купирование хвоста до 10 дней',
    price: '1 800 ₽',
    description: 'Купирование хвоста до 10 дней'
  },
  {
    id: 'surgery_tail_docking_after_10_days',
    name: 'Купирование хвоста после 10 дней (+анестезия 1-2 категории)',
    price: '1 300 ₽',
    description: 'Купирование хвоста после 10 дней'
  },
  {
    id: 'surgery_tail_amputation_10_days',
    name: 'Ампутация хвоста до 10 дней',
    price: '1 900 ₽',
    description: 'Ампутация хвоста до 10 дней'
  },
  {
    id: 'surgery_tail_amputation_after_10_days',
    name: 'Ампутация хвоста старше 10 дней (+анестезия 1/2 категории)',
    price: '3 500 ₽',
    description: 'Ампутация хвоста после 10 дней'
  },
  {
    id: 'surgery_umbilical_hernia',
    name: 'Пластика пупочной грыжи',
    price: '6 000 ₽',
    description: 'Пластика пупочной грыжи'
  },
  {
    id: 'surgery_inguinal_hernia',
    name: 'Пластика паховой грыжи',
    price: '10 000 ₽',
    description: 'Пластика паховой грыжи'
  },
  {
    id: 'surgery_perineal_hernia',
    name: 'Пластика промежностной грыжи без наложения сетки',
    price: '12 000 ₽',
    description: 'Пластика промежностной грыжи без сетки'
  },
  {
    id: 'surgery_perineal_hernia_mesh',
    name: 'Пластика промежностной грыжи с наложением сетки',
    price: '16 000 ₽',
    description: 'Пластика промежностной грыжи с сеткой'
  },
  {
    id: 'surgery_hiatal_hernia',
    name: 'Пластика хиатальной грыжи',
    price: '10 000 ₽',
    description: 'Пластика диафрагмальной грыжи пищевода'
  },
  {
    id: 'surgery_diaphragmatic_hernia_cat',
    name: 'Пластика диафрагмальной грыжи кошки',
    price: '16 000 ₽',
    description: 'Пластика диафрагмальной грыжи у кошки'
  },
  {
    id: 'surgery_diaphragmatic_hernia_dog',
    name: 'Пластика диафрагмальной грыжи собаки',
    price: '20 000 ₽',
    description: 'Пластика диафрагмальной грыжи у собаки'
  },
  {
    id: 'surgery_traumatic_hernia',
    name: 'Пластика при травматической грыже',
    price: '7 000 ₽',
    description: 'Пластика травматической грыжи'
  },
  {
    id: 'surgery_skin_transplantation',
    name: 'Трансплантация кожи при замещении дефектов (от 14000)',
    price: '14 000 ₽',
    description: 'Трансплантация кожи'
  },
  {
    id: 'surgery_skin_plasty_defects',
    name: 'Пластика кожи при замещении обширных деффектов',
    price: '18 000 ₽',
    description: 'Пластика кожи при обширных дефектах'
  },
  {
    id: 'surgery_free_flap_closure',
    name: 'Закрытие деффекта при помощи свободного лоскута',
    price: '14 000 ₽',
    description: 'Закрытие дефекта свободным лоскутом'
  },
  {
    id: 'surgery_rotational_flap_closure',
    name: 'Закрытие деффекта при помощи поворотного лоскута',
    price: '12 000 ₽',
    description: 'Закрытие дефекта поворотным лоскутом'
  },
  {
    id: 'surgery_soft_palate_plasty',
    name: 'Пластика небной занавески',
    price: '17 000 ₽',
    description: 'Пластика мягкого неба'
  },
  {
    id: 'surgery_hard_palate_congenital',
    name: 'Пластика твердого неба при врожденном расхождении',
    price: '21 000 ₽',
    description: 'Пластика твердого неба при врожденной патологии'
  },
  {
    id: 'surgery_prepuce_plasty',
    name: 'Пластика препуция при фимозе/парафимозе',
    price: '6 000 ₽',
    description: 'Пластика крайней плоти'
  },
  {
    id: 'surgery_tracheostomy',
    name: 'Трахеостомия',
    price: '7 000 ₽',
    description: 'Трахеостомия'
  },
  {
    id: 'surgery_anal_atresia',
    name: 'Пластика анального отверстия при атрезии',
    price: '10 000 ₽',
    description: 'Пластика анального отверстия при атрезии'
  },
  {
    id: 'surgery_milk_tooth_removal',
    name: 'Удаление молочного зуба, кроме клыков от 500 руб',
    price: '500 ₽',
    description: 'Удаление молочного зуба'
  },
  {
    id: 'surgery_cryptorchid_castration',
    name: 'кастрация кобеля крипторха (от 6000)',
    price: '6 000 ₽',
    description: 'Кастрация кобеля-крипторха'
  },
  {
    id: 'surgery_castration_sterilization',
    name: 'Кастрация/стерилизация (УСЛУГА)',
    price: '1 500 ₽',
    description: 'Кастрация/стерилизация'
  },
  {
    id: 'surgery_ovariohysterectomy_cat_complications',
    name: 'Овариогистерэктомия при эндометрите/пиометре/беременности более 10 дней у кошек (от 5000)',
    price: '8 000 ₽',
    description: 'Стерилизация кошки при осложнениях'
  },
  {
    id: 'surgery_ovariohysterectomy_dog_complications',
    name: 'Овариогистерэктомия у собаки при эндометрите, пиометре, беременности больше 10 дней (4700-16000 т.р) (без стоимости анестезии)',
    price: '8 000 ₽',
    description: 'Стерилизация собаки при осложнениях'
  },
  {
    id: 'surgery_cesarean_cat_10kg',
    name: 'Кесарево сечение у кошек и собак до 10 кг (без учета анестезии)',
    price: '10 000 ₽',
    description: 'Кесарево сечение у животных до 10кг'
  },
  {
    id: 'surgery_cesarean_dog_10_25kg',
    name: 'Кесарево сечение у собак от 10 до 25 кг (без учета анестезии)',
    price: '11 000 ₽',
    description: 'Кесарево сечение у собак 10-25кг'
  },
  {
    id: 'surgery_cesarean_dog_25kg_plus',
    name: 'Кесарево сечение у собак от 25 кг (без учета анестезии)',
    price: '18 000 ₽',
    description: 'Кесарево сечение у собак от 25кг'
  },
  {
    id: 'surgery_cholecystectomy',
    name: 'Холецистэктомия',
    price: '18 000 ₽',
    description: 'Удаление желчного пузыря'
  },
  {
    id: 'surgery_third_eyelid_plasty',
    name: 'Пластика третьего века',
    price: '5 000 ₽',
    description: 'Пластика третьего века'
  },
  {
    id: 'surgery_rhinoplasty',
    name: 'Ринопластика (от 8000)',
    price: '8 000 ₽',
    description: 'Пластика носа'
  },
  {
    id: 'surgery_pyloric_stenosis',
    name: 'Пластика пилоруса при стенозе',
    price: '17 000 ₽',
    description: 'Пластика привратника желудка'
  },
  {
    id: 'surgery_rhinotomy',
    name: 'Ринотомия',
    price: '10 000 ₽',
    description: 'Вскрытие полости носа'
  },
  {
    id: 'surgery_ear_canal_removal_1',
    name: 'Удаление наружного слухового прохода 1 сторона',
    price: '15 000 ₽',
    description: 'Удаление наружного слухового прохода с одной стороны'
  },
  {
    id: 'surgery_ear_canal_removal_2',
    name: 'Удаление наружного слухового прохода 2 стороны',
    price: '20 000 ₽',
    description: 'Удаление наружного слухового прохода с двух сторон'
  },
  {
    id: 'surgery_ear_removal',
    name: 'Удаление ушной раковины',
    price: '14 000 ₽',
    description: 'Удаление ушной раковины'
  },
  {
    id: 'surgery_jaw_removal',
    name: 'Удаление челюсти (от 14000)',
    price: '14 000 ₽',
    description: 'Удаление челюсти'
  },
  {
    id: 'surgery_wound_treatment_1',
    name: 'ПХО (1 категория)',
    price: '1 400 ₽',
    description: 'Первичная хирургическая обработка раны 1 категории'
  },
  {
    id: 'surgery_wound_treatment_2',
    name: 'ПХО (2 категория)',
    price: '2 100 ₽',
    description: 'Первичная хирургическая обработка раны 2 категории'
  },
  {
    id: 'surgery_wound_treatment_3',
    name: 'ПХО (3 категория)',
    price: '3 200 ₽',
    description: 'Первичная хирургическая обработка раны 3 категории'
  },
  {
    id: 'surgery_wound_treatment_4',
    name: 'ПХО (4 категория)',
    price: '4 800 ₽',
    description: 'Первичная хирургическая обработка раны 4 категории'
  },
  {
    id: 'surgery_wound_treatment_5',
    name: 'ПХО (5 категория)',
    price: '6 000 ₽',
    description: 'Первичная хирургическая обработка раны 5 категории'
  },
  {
    id: 'surgery_partial_gastrectomy',
    name: 'Частичная гастротомия',
    price: '21 000 ₽',
    description: 'Частичная резекция желудка'
  },
  {
    id: 'surgery_subtotal_gastrectomy',
    name: 'Субтотальная гастротомия',
    price: '34 000 ₽',
    description: 'Субтотальная резекция желудка'
  },
  {
    id: 'surgery_pylorectomy',
    name: 'Пилорэктомия/резекция желудка по Бильрот 1-2 (резекция не более 1/3 желудка)',
    price: '43 000 ₽',
    description: 'Пилорэктомия/резекция желудка по Бильрот'
  },
  {
    id: 'surgery_perianal_sinus_1',
    name: 'Удаление одного перианального синуса',
    price: '6 000 ₽',
    description: 'Удаление одного перианального синуса'
  },
  {
    id: 'surgery_perianal_sinus_2',
    name: 'Удаление двух перианальных синусов',
    price: '11 000 ₽',
    description: 'Удаление двух перианальных синусов'
  },
  {
    id: 'surgery_nephrectomy',
    name: 'Нефрэктомия',
    price: '23 000 ₽',
    description: 'Удаление почки'
  },
  {
    id: 'surgery_lymph_node_removal',
    name: 'Удаление лимфоузла в брюшной полости (за 1 л/у)',
    price: '3 500 ₽',
    description: 'Удаление лимфатического узла в брюшной полости'
  },
  {
    id: 'surgery_rectum_colon_resection',
    name: 'Резекция прямой и дистального отдела ободочной кишки (при необходимости остеотомия таза)',
    price: '36 000 ₽',
    description: 'Резекция прямой и ободочной кишки'
  },
  {
    id: 'surgery_subtotal_colectomy',
    name: 'Субтотальная колэктомия',
    price: '32 000 ₽',
    description: 'Субтотальная резекция толстой кишки'
  },
  {
    id: 'surgery_colonopexy',
    name: 'Колонопексия',
    price: '10 000 ₽',
    description: 'Фиксация толстой кишки'
  },
  {
    id: 'surgery_prostatectomy',
    name: 'Простатэктомия',
    price: '14 000 ₽',
    description: 'Удаление предстательной железы'
  },
  {
    id: 'surgery_vaginal_wall_plasty',
    name: 'Пластика стенки влагалища при пролапсе',
    price: '16 000 ₽',
    description: 'Пластика стенки влагалища при выпадении'
  },
  {
    id: 'surgery_vagina_removal',
    name: 'Удаление влагалища',
    price: '25 000 ₽',
    description: 'Удаление влагалища'
  },
  {
    id: 'surgery_penis_amputation',
    name: 'Ампутация полового члена',
    price: '16 000 ₽',
    description: 'Ампутация полового члена'
  },
  {
    id: 'surgery_bladder_rupture',
    name: 'Ушивание мочевого пузыря при разрыве',
    price: '12 000 ₽',
    description: 'Ушивание разрыва мочевого пузыря'
  },
  {
    id: 'surgery_bladder_resection',
    name: 'Частичная резекция мочевого пузыря',
    price: '16 000 ₽',
    description: 'Частичная резекция мочевого пузыря'
  },
  {
    id: 'surgery_prostate_cyst',
    name: 'Резекция/марсупиализация кисты предстательной железы',
    price: '13 000 ₽',
    description: 'Резекция кисты предстательной железы'
  },
  {
    id: 'surgery_episiotomy',
    name: 'Эпизиопластика',
    price: '9 000 ₽',
    description: 'Пластика промежности'
  },
  {
    id: 'surgery_liver_resection_1',
    name: 'Резекция доли печени (1 категории)',
    price: '21 000 ₽',
    description: 'Резекция доли печени 1 категории'
  },
  {
    id: 'surgery_liver_resection_2',
    name: 'Резекция доли печени 2 категории',
    price: '36 000 ₽',
    description: 'Резекция доли печени 2 категории'
  },
  {
    id: 'surgery_hemoabdomen',
    name: 'Гемабдомен диагностика и устранение',
    price: '17 000 ₽',
    description: 'Диагностика и устранение кровотечения в брюшную полость'
  },
  {
    id: 'surgery_peritonitis',
    name: 'Перитонит. Хирургическое лечение с постановкой дренажа',
    price: '19 000 ₽',
    description: 'Хирургическое лечение перитонита'
  },
  {
    id: 'surgery_pancreatoduodenectomy',
    name: 'Панкреато-дуоденальная резекция',
    price: '38 000 ₽',
    description: 'Панкреато-дуоденальная резекция'
  },
  {
    id: 'surgery_esophagus_foreign_body_cervical',
    name: 'Удаление ИТ (инородного тела) из шейной части пищевода',
    price: '13 000 ₽',
    description: 'Удаление инородного тела из шейной части пищевода'
  },
  {
    id: 'surgery_esophagus_perforation_cervical',
    name: 'Ушивание перфорации шейной части пищевода',
    price: '13 000 ₽',
    description: 'Ушивание перфорации шейной части пищевода'
  },
  {
    id: 'surgery_esophagus_foreign_body_thoracic',
    name: 'Удаление ИТ (инородных тел) из грудной части пищевода',
    price: '23 000 ₽',
    description: 'Удаление инородного тела из грудной части пищевода'
  },
  {
    id: 'surgery_esophagus_perforation_thoracic',
    name: 'Ушивание перфорации грудной части пищевода',
    price: '23 000 ₽',
    description: 'Ушивание перфорации грудной части пищевода'
  },
  {
    id: 'surgery_esophagus_dilation',
    name: 'Баллонная дилатация стриктуры пищевода',
    price: '16 000 ₽',
    description: 'Баллонная дилатация стриктуры пищевода'
  },
  {
    id: 'surgery_urethrostomy',
    name: 'Уретростомия у кота/кобеля',
    price: '15 000 ₽',
    description: 'Уретростомия у самцов'
  },
  {
    id: 'surgery_cystotomy',
    name: 'Цистотомия',
    price: '10 000 ₽',
    description: 'Вскрытие мочевого пузыря'
  },
  {
    id: 'surgery_urolithiasis',
    name: 'Удаление уролитов из МП',
    price: '14 000 ₽',
    description: 'Удаление камней из мочевого пузыря'
  },
  {
    id: 'surgery_gastrostomy_10kg',
    name: 'Постановка гастростомы до 10 кг (без учета расх.материалов)',
    price: '5 000 ₽',
    description: 'Постановка гастростомы для животных до 10кг'
  },
  {
    id: 'surgery_gastrostomy_10kg_plus',
    name: 'Постановка гастростомы свыше 10 кг (без учета расх.материалов)',
    price: '5 000 ₽',
    description: 'Постановка гастростомы для животных свыше 10кг'
  },
  {
    id: 'surgery_ventral_bullotomy_bilateral',
    name: 'Вентральная буллотомия (с двух сторон)',
    price: '18 000 ₽',
    description: 'Вентральная буллотомия с двух сторон'
  },
  {
    id: 'surgery_ventral_bullotomy_unilateral',
    name: 'Вентральная буллотомия (с одной стороны)',
    price: '14 000 ₽',
    description: 'Вентральная буллotomy с одной стороны'
  },
  {
    id: 'surgery_dirofilaria_removal',
    name: 'Удаление дирофилярий из предсердия',
    price: '30 000 ₽',
    description: 'Удаление дирофилярий из предсердия'
  },
  {
    id: 'surgery_abdominal_biopsy',
    name: 'Отрытая биопсия органов брюшной полости',
    price: '7 000 ₽',
    description: 'Открытая биопсия органов брюшной полости'
  }
];