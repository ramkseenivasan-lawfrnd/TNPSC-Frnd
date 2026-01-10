
import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  BookOpen, 
  Zap, 
  Map, 
  Scale, 
  History, 
  Activity, 
  Atom, 
  Calculator, 
  Languages, 
  GraduationCap,
  Trees,
  Building2,
  FileSignature,
  HeartPulse,
  Briefcase
} from 'lucide-react';

interface ExamSyllabusProps {
  language: 'EN' | 'TN';
}

type SyllabusTab = 'group1' | 'group1abc' | 'group2' | 'group4' | 'group5' | 'tamil';

const ExamSyllabus: React.FC<ExamSyllabusProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<SyllabusTab>('group1');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const TAB_LABELS: Record<SyllabusTab, string> = {
    group1: 'GRP 1',
    group1abc: 'GRP 1-ABC',
    group2: 'GRP 2',
    group4: 'GRP 4',
    group5: 'GRP 5',
    tamil: 'TAMIL'
  };

  const syllabusData = {
    group1: [
      {
        id: 'g1-prelim-gs',
        title: language === 'TN' ? 'தொகுதி 1: முதல்நிலைத் தேர்வு - பொது அறிவு' : 'Group 1: Preliminary Exam - General Studies',
        units: [
          { 
            title: 'Unit I: General Science', 
            topics: [
              'Scientific knowledge, scientific temper, and power of reasoning.',
              'Nature of the universe, general scientific laws, mechanics, properties of matter, force, motion, and energy.',
              'Everyday applications of the basic principles of mechanics, electricity, magnetism, light, sound, heat, and nuclear physics.',
              'Laser, electronics, elements and compounds, acids, bases, salts, and petroleum products.',
              'Fertilizers, pesticides, main concepts of life sciences, classification of living organisms, and evolution.',
              'Genetics, physiology, nutrition, health and hygiene, human diseases, environment, and ecology.'
            ] 
          },
          { 
            title: 'Unit II: Geography of India', 
            topics: [
              'Location, physical features, monsoon, rainfall, weather, and climate.',
              'Water resources, rivers in India, soil, minerals, and natural resources.',
              'Forest and wildlife, agricultural patterns, transport, and communication.',
              'Social geography, population density and distribution, racial, linguistic groups, and major tribes.',
              'Natural calamities, disaster management, environmental pollution, and climate change.'
            ] 
          },
          { 
            title: 'Unit III: History, Culture & Movement', 
            topics: [
              'Indus Valley Civilization, Guptas, Delhi Sultans, Mughals, and Marathas.',
              'Age of Vijayanagaram and Bahmani Kingdoms, South Indian History.',
              'Change and continuity in the socio-cultural history of India.',
              'Characteristics of Indian culture, unity in diversity, and India as a secular state.',
              'Indian National Movement: Early uprisings against British rule, Indian National Congress.',
              'Emergence of leaders like B.R. Ambedkar, Bhagat Singh, Bharathiar, V.O. Chidambaranar, Nehru, Gandhi, Subhash Chandra Bose, and others.'
            ] 
          },
          { 
            title: 'Unit IV: Indian Polity', 
            topics: [
              'Constitution of India, Preamble, salient features, Union, State, and Union Territory.',
              'Citizenship, Fundamental Rights, Fundamental Duties, and Directive Principles of State Policy.',
              'Union Executive, Union Legislature, State Executive, State Legislature, and Local Governments (Panchayat Raj).',
              'Spirit of federalism: Centre-State Relationships.',
              'Election, Judiciary in India, Rule of Law, and Anti-corruption measures.',
              'Lokpal and Lok Ayukta, RTI, Empowerment of women, Consumer protection, and Human rights.'
            ] 
          },
          { 
            title: 'Unit V: Economy & TN Admin', 
            topics: [
              'Nature of Indian economy, Five-year plan models, NITI Aayog.',
              'Sources of revenue, Reserve Bank of India, Fiscal policy, Monetary policy, and GST.',
              'Structure of Indian economy and employment generation, land reforms, and agriculture.',
              'Application of science and technology in agriculture, industrial growth, and rural welfare oriented programs.',
              'Social problems: Population, education, health, employment, and poverty.',
              'Human Development Indicators in Tamil Nadu and comparative analysis.'
            ] 
          },
          { 
            title: 'Unit VI: History, Culture & Movements in TN', 
            topics: [
              'History of Tamil Society, archaeological discoveries, and Tamil literature from Sangam age to present.',
              'Thirukkural: Significance as secular literature, relevance to everyday life.',
              'Thirukkural and impact on humanity, socio-politico-economic affairs, and philosophical content.',
              'Role of Tamil Nadu in freedom struggle, early agitations against British rule.',
              'Dravidian movements and socio-political movements in Tamil Nadu.'
            ] 
          }
        ]
      },
      {
        id: 'g1-prelim-apt',
        title: language === 'TN' ? 'தொகுதி 1: முதல்நிலைத் தேர்வு - திறனறிவு' : 'Group 1: Preliminary Exam - Aptitude',
        units: [
          { 
            title: 'Unit I: Aptitude', 
            topics: [
              'Simplification, Percentage, HCF, and LCM.',
              'Ratio and Proportion, Simple Interest, and Compound Interest.',
              'Area, Volume, and Time and Work.'
            ] 
          },
          { 
            title: 'Unit II: Mental Ability & Reasoning', 
            topics: [
              'Logical reasoning, Puzzles, and Dice.',
              'Visual reasoning, Alpha-numeric reasoning, and Number series.'
            ] 
          }
        ]
      },
      {
        id: 'g1-mains-p1',
        title: language === 'TN' ? 'தொகுதி 1 முதன்மைத் தேர்வு: தாள் I' : 'Group 1 Main Exam: Paper I',
        units: [
          { 
            title: 'Compulsory Tamil Language Test', 
            topics: [
              'Translation: Tamil to English and English to Tamil.',
              'Precis writing, Comprehension, and Hints development.',
              'Official Letter writing and Tamil language proficiency.',
              'Essay writing on Thirukkural: Secular nature, Everyday life relevance, Humanism values.',
              'Tamil Grammar: Sentence formation, synonyms/antonyms, and error correction.'
            ] 
          }
        ]
      },
      {
        id: 'g1-mains-p2',
        title: language === 'TN' ? 'தொகுதி 1 முதன்மைத் தேர்வு: தாள் II' : 'Group 1 Main Exam: Paper II',
        units: [
          { 
            title: 'Unit I: Modern History of India', 
            topics: [
              'Advent of Europeans, British expansion (Carnatic Wars, Vellore Mutiny).',
              'Indian National Movement and role of Tamil Nadu leaders (Bharathiyar, V.O.C., Rajaji).',
              'Leaders like Gandhi, Nehru, Bose, Ambedkar.',
              'Indian Culture: Panorama, fine arts, and heritage.'
            ] 
          },
          { 
            title: 'Unit II: Social Issues in India & TN', 
            topics: [
              'Population explosion, poverty, illiteracy, and unemployment.',
              'Child labor, women empowerment, domestic violence, and health care disparities.',
              'Problems of marginalized groups: SC/ST, elderly, and transgender.'
            ] 
          },
          { 
            title: 'Unit III: Ethics & Integrity', 
            topics: [
              'Ethics of Indian Schools of Philosophy, Ethics of Thirukkural.',
              'Attitude, emotional intelligence, and ethics in public administration.'
            ] 
          }
        ]
      },
      {
        id: 'g1-mains-p3',
        title: language === 'TN' ? 'தொகுதி 1 முதன்மைத் தேர்வு: தாள் III' : 'Group 1 Main Exam: Paper III',
        units: [
          { 
            title: 'Unit I: Indian Polity & Global Trends', 
            topics: [
              'Constitution details, Amendments, Union/State government structures.',
              'Judiciary, Federalism, and India’s foreign policy.',
              'Emerging political trends and international organizations.'
            ] 
          },
          { 
            title: 'Unit II: Science & Technology', 
            topics: [
              'Energy (Renewable/Non-Renewable), Space research, and IT.',
              'Robotics, AI, Nano-science, and Agriculture Biotechnology.',
              'Role and impact of S&T in India’s development.'
            ] 
          },
          { 
            title: 'Unit III: Tamil Society & Heritage', 
            topics: [
              'Archaeological excavations (Keeladi, Adichanallur).',
              'Tamil literature, arts, and growth of rationalist movements.'
            ] 
          }
        ]
      },
      {
        id: 'g1-mains-p4',
        title: language === 'TN' ? 'தொகுதி 1 முதன்மைத் தேர்வு: தாள் IV' : 'Group 1 Main Exam: Paper IV',
        units: [
          { 
            title: 'Unit I: Geography of India & TN', 
            topics: [
              'Solar system, Atmosphere, Natural resources, and Agriculture.',
              'Industries, Transport, and Geospatial Technology (GIS/Remote Sensing).'
            ] 
          },
          { 
            title: 'Unit II: Environment & Disaster Management', 
            topics: [
              'Ecosystems, Biodiversity conservation, and Environmental pollution.',
              'Sustainable Development Goals (SDGs) and Climate Change.',
              'National and State Disaster Management frameworks.'
            ] 
          },
          { 
            title: 'Unit III: Indian Economy', 
            topics: [
              'National Income, Green Revolution, and Industrial growth.',
              'Banking, Public Finance (GST), and poverty alleviation programs (MGNREGA).',
              'Tamil Nadu’s specific economic trends: GSDP, population, and social infrastructure.'
            ] 
          }
        ]
      }
    ],
    group1abc: [
      {
        id: 'g1c-deo',
        title: 'District Educational Officer (Group I-C)',
        units: [
          { 
            title: 'Mains Paper II: Modern History & Culture', 
            topics: [
              'British expansion, early uprisings (Vellore 1806, South Indian 1799).',
              'National Movement: Moderates, Extremists, key leaders (Gandhi, Nehru, Bose, Ambedkar).',
              'TN Role: Bharathiyar, V.O.C., Rajaji, Periyar.',
              'Indian Admin: Civil services, state-center relations, Lokayukta, RTI.'
            ] 
          },
          { 
            title: 'Mains Paper III: Science & Tech', 
            topics: [
              'Role and impact on development.',
              'Robotics, AI, Nano Science, IT, Space Research.',
              'Agriculture Biotechnology and GM crops.'
            ] 
          },
          { 
            title: 'Mains Paper IV: Education (B.Ed Std)', 
            topics: [
              'Psychology, Philosophy (East/West), and Sociology.',
              'SSA & RMSA, Curriculum, Evaluation.',
              'ICT in education, Environmental Education, Vocational Guidance.'
            ] 
          }
        ]
      },
      {
        id: 'g1a-acf',
        title: 'Assistant Conservator of Forests (Group I-A)',
        units: [
          { 
            title: 'Paper II: GS I', 
            topics: [
              'Modern History: British expansion, Carnatic Wars, Vellore Mutiny.',
              'TN History: V.O.C, Rajaji, women in freedom struggle.',
              'Economy & Social: Budget, agriculture, poverty, women empowerment.',
              'Polity: Constitution, Executives, Judiciary, Anti-corruption.'
            ] 
          },
          { 
            title: 'Paper III: GS II', 
            topics: [
              'Science: Cell biology, physiology, biotechnology, physics (Newton, Nuclear).',
              'S&T: Energy, medicine, GIS, AI, Blockchain, Cyber Security.',
              'Environment: River systems, minerals, global warming, NDMA.'
            ] 
          },
          { 
            title: 'Paper IV: GS III (Forestry)', 
            topics: [
              'Silviculture, Agroforestry, Forest management, Engineering.',
              'Environment: Ecosystem functions, pollution laws.'
            ] 
          }
        ]
      },
      {
        id: 'g1b-hrce',
        title: 'Assistant Commissioner, HR&CE (Group I-B)',
        units: [
          { 
            title: 'Paper II: GS I', 
            topics: [
              'Modern History & Culture: Leaders, Panorama, Fine arts.',
              'Ethics & Integrity: Public admin ethics, moral judgments.',
              'Polity: Trends, Int\'l organizations, Foreign policy.',
              'Tamil Society: Excavations (Keeladi), Dravidian movements.'
            ] 
          },
          { 
            title: 'Paper III: Hindu Religion', 
            topics: [
              'Philosophy: Advaita, Vaisheshika, Yoga, Saiva Siddhanta.',
              'Literature: Vedas, Upanishads, Gita, Ramayana, Mahabharata.',
              'Saints & Festivals: Nayanmars, Alwars, Shivaratri, Navaratri.',
              'Temple Ecology: Maintenance of tanks, rivers, animals.'
            ] 
          },
          { 
            title: 'Paper IV: Law', 
            topics: [
              'Jurisprudence: Sources, schools, Social Welfare State.',
              'Constitution & Human Rights: Transformative constitutionalism.'
            ] 
          }
        ]
      }
    ],
    group2: [
      {
        id: 'g2-prelims',
        title: language === 'TN' ? 'தொகுதி 2/2A: முதல்நிலைத் தேர்வு' : 'Group 2/2A: Preliminary Exam',
        units: [
          { title: 'Unit I: General Science', topics: ['Nature of Universe', 'Scientific Laws', 'Elements & Compounds', 'Life Science', 'Environment & Ecology'] },
          { title: 'Unit II: Geography of India', topics: ['Monsoon, Rainfall', 'Water Resources', 'Social Geography', 'Disaster Management'] },
          { title: 'Unit III: History & Culture', topics: ['IVC, Guptas, Sultans, Mughals, Marathas', 'National Movement & Leaders', 'Agitation, Communalism, Partition'] },
          { title: 'Unit IV: Indian Polity', topics: ['Constitution Preamble', 'Rights, Duties, DPSP', 'Executives, Legislature, Local Govt', 'Spirit of Federalism'] },
          { title: 'Unit V: Economy & TN Admin', topics: ['Niti Aayog, RBI, Fiscal Policy, GST', 'Rural Welfare, Social Problems', 'HDI and e-Governance in TN'] },
          { title: 'Unit VI: TN History & Culture', topics: ['History of Tamil society, archaeology', 'Thirukkural secularism', 'Freedom struggle in TN'] },
          { title: 'Part B: Aptitude', topics: ['Maths: HCF/LCM, Ratio, Interest, Area, Volume', 'Reasoning: Puzzles, Dice, Number series'] },
          { title: 'Part C: Language', topics: ['English/Tamil Grammar, Vocabulary, Literature'] }
        ]
      },
      {
        id: 'g2-mains',
        title: language === 'TN' ? 'தொகுதி 2: முதன்மைத் தேர்வு (Descriptive)' : 'Group 2: Main Written Exam (Descriptive)',
        units: [
          { title: 'Unit I: History of India & TN', topics: ['British Expansion, early uprisings', 'National movements, TN leaders', 'Social Justice ideology'] },
          { title: 'Unit II: Tamil Culture', topics: ['Archaeological evidence (Keezhadi)', 'Thirukkural guidance', 'Dravidian Movement'] },
          { title: 'Unit III: Social Issues', topics: ['Population, Health, Child labour', 'Marginalized groups', 'Urbanization, Globalization'] },
          { title: 'Unit IV: Science & Tech', topics: ['Robotics, Nuclear, Broadcasting', 'Biotechnology, Nano, ICT (AI, IoT)'] },
          { title: 'Unit V: Constitution & Governance', topics: ['Federalism, Govt structures', 'Judicial activism, PIL', 'Right to Information'] }
        ]
      }
    ],
    group4: [
      {
        id: 'g4-gs',
        title: language === 'TN' ? 'தொகுதி 4: பொது அறிவு (75Q)' : 'Group 4: General Studies (75Q)',
        units: [
          { title: 'Unit I: General Science (5Q)', topics: ['Physics, Chemistry, Life Science', 'Environmental Science'] },
          { title: 'Unit II: Geography (5Q)', topics: ['Physical features, resources', 'Infrastructure in TN', 'Climate change'] },
          { title: 'Unit III: History & Movement (10Q)', topics: ['Ancient & Medieval India', 'National Renaissance', 'List of Leaders (Ambedkar to Bose)'] },
          { title: 'Unit IV: Indian Polity (15Q)', topics: ['Constitution features', 'Panchayat Raj', 'Women Empowerment', 'Human Rights'] },
          { title: 'Unit V: Economy & TN Admin (20Q)', topics: ['Planning, Niti Aayog', 'Finance, GST', 'Education & Health in TN', 'Welfare Schemes'] },
          { title: 'Unit VI: TN History & Culture (20Q)', topics: ['Heritage, Archaeological finds', 'Thirukkural significance', 'Social Reformers'] }
        ]
      },
      {
        id: 'g4-apt-lang',
        title: language === 'TN' ? 'தொகுதி 4: திறனறிவு & மொழி' : 'Group 4: Aptitude & Language',
        units: [
          { title: 'Part B: Aptitude (25Q)', topics: ['Maths: Percentage, SI/CI, Area/Vol', 'Reasoning: Puzzles, Dice, Alpha-numeric'] },
          { title: 'Part C: Tamil Eligibility (100Q)', topics: ['Grammar: Root words, sentence types', 'Vocabulary: Antonyms, Meanings', 'Literature: Scholars, biographies'] }
        ]
      }
    ],
    group5: [
      {
        id: 'g5-eng',
        title: 'General English (Code 390)',
        units: [
          { title: 'Unit I: Essay Writing', topics: ['300 words (10 Marks)', 'Argumentative, Descriptive, Persuasive'] },
          { title: 'Unit II: Letter Writing', topics: ['Demands, Enquiries, Orders'] },
          { title: 'Unit III-VI: Descriptive skills', topics: ['Precis Writing', 'Reading Comprehension', 'Translation (Tamil-English)', 'Hints Development'] },
          { title: 'Unit VII-VIII: Admin & Grammar', topics: ['Notification Drafting', 'Grammar (Voice, Speech, Tenses)'] }
        ]
      },
      {
        id: 'g5-tam',
        title: 'General Tamil (Code 389)',
        units: [
          { title: 'Unit 1: Essay Writing', topics: ['Freedom Fighters, Culture', 'Media, Environment, Social Justice'] },
          { title: 'Unit 2-5: Writing Skills', topics: ['Comprehension', 'Precis Writing', 'Hints Development', 'Translation'] },
          { title: 'Unit 6-7: Admin & Proficiency', topics: ['Official Letter Writing', 'Sentence Construction', 'Technical Terminology'] }
        ]
      }
    ],
    tamil: [
      {
        id: 'ct-eligibility',
        title: language === 'TN' ? 'கட்டாயத் தமிழ் மொழி தகுதித் தேர்வு' : 'Compulsory Tamil Language Test',
        units: [
          { 
            title: 'தேர்வுத் திட்டம் (Exam Plan)', 
            topics: [
              'Translation (English <-> Tamil)',
              'Precis Writing',
              'Comprehension',
              'Hints Expansion',
              'Official Letter Writing',
              'Language knowledge (Sentence, splitting, errors)'
            ] 
          },
          { 
            title: 'திருக்குறள் தலைப்புகள் (Thirukkural Topics)', 
            topics: [
              'Secular nature of literature.',
              'Relevance to everyday life.',
              'Impact on humanity.',
              'Equality and Humanism values.',
              'Socio-politico-economic relevance.',
              'Philosophical principles.'
            ] 
          },
          { 
            title: 'பொதுத் தலைப்புகள் (General Topics)', 
            topics: [
              'Current events & social issues.',
              'Environment & Indian Economy.',
              'Science & Technology.',
              'Arts & Culture.',
              'Rationalist movements (Dravidian, Self-Respect).',
              'Modern Tamil: Computer, Law, Admin.',
              'TN Development & Welfare schemes.'
            ] 
          }
        ]
      }
    ]
  };

  const getFilteredSyllabus = () => {
    const data = syllabusData[activeTab];
    if (!searchTerm) return data;

    return data.map(section => ({
      ...section,
      units: section.units.filter(unit => 
        unit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.topics.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    })).filter(section => section.units.length > 0);
  };

  const currentSyllabus = getFilteredSyllabus();

  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('science') || t.includes('tech') || t.includes('atom')) return <Atom size={22} className="text-blue-500" />;
    if (t.includes('geography') || t.includes('earth')) return <Map size={22} className="text-emerald-500" />;
    if (t.includes('history') || t.includes('culture') || t.includes('heritage')) return <History size={22} className="text-amber-500" />;
    if (t.includes('polity') || t.includes('constitution') || t.includes('law') || t.includes('rights')) return <Scale size={22} className="text-indigo-500" />;
    if (t.includes('economy') || t.includes('poverty') || t.includes('gsdp')) return <Building2 size={22} className="text-slate-600" />;
    if (t.includes('aptitude') || t.includes('maths') || t.includes('reasoning')) return <Calculator size={22} className="text-orange-500" />;
    if (t.includes('education') || t.includes('learning')) return <GraduationCap size={22} className="text-cyan-500" />;
    if (t.includes('tamil') || t.includes('english') || t.includes('language')) return <Languages size={22} className="text-red-500" />;
    if (t.includes('forest') || t.includes('environment') || t.includes('ecology') || t.includes('trees')) return <Trees size={22} className="text-green-600" />;
    if (t.includes('health') || t.includes('diseases') || t.includes('physiology')) return <HeartPulse size={22} className="text-rose-500" />;
    if (t.includes('administration') || t.includes('executives') || t.includes('governance')) return <Briefcase size={22} className="text-gray-500" />;
    return <Zap size={22} className="text-yellow-500" />;
  };

  return (
    <div className="space-y-8 pb-24 animate-in fade-in duration-500">
      {/* Search & Tabs Header */}
      <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-slate-200">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          <div className="w-full lg:max-w-md">
            <h2 className="text-xl font-black text-[#003366] mb-4 flex items-center gap-2">
              <FileSignature size={24} className="text-[#FFD700]" />
              {language === 'TN' ? 'பாடத்திட்ட தேடல்' : 'Syllabus Browser'}
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder={language === 'TN' ? 'தலைப்புகள், அலகுகள் அல்லது பாடங்களைத் தேடுங்கள்...' : 'Search units, topics or keywords...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#003366]/5 focus:border-[#003366]/20 outline-none transition-all font-medium text-slate-700"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            </div>
          </div>

          <div className="flex bg-slate-100 p-1.5 rounded-2xl shadow-inner border border-slate-200 overflow-x-auto no-scrollbar scroll-smooth w-full lg:w-auto">
            {(Object.keys(TAB_LABELS) as SyllabusTab[]).map((tabId) => (
              <button
                key={tabId}
                onClick={() => { setActiveTab(tabId); setExpandedSection(null); }}
                className={`px-5 py-2.5 rounded-xl text-[11px] font-black transition-all shrink-0 uppercase tracking-widest ${
                  activeTab === tabId ? 'bg-[#003366] text-white shadow-lg' : 'text-slate-400 hover:text-[#003366]'
                }`}
              >
                {TAB_LABELS[tabId]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Syllabus Content Display */}
      <div className="grid grid-cols-1 gap-10">
        {currentSyllabus.length > 0 ? currentSyllabus.map((section) => (
          <div key={section.id} className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 ml-2 border-b border-slate-200 pb-3">
              <div className="px-3 py-1 bg-slate-200 text-slate-600 rounded-full flex items-center justify-center font-black text-[10px] uppercase tracking-widest">
                {TAB_LABELS[activeTab]}
              </div>
              <h3 className="text-lg font-black text-[#003366] uppercase tracking-tight">
                {section.title}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {section.units.map((unit, idx) => {
                const unitId = `${section.id}-${idx}`;
                const isExpanded = expandedSection === unitId;
                
                return (
                  <div 
                    key={unitId}
                    className={`bg-white border transition-all rounded-[2rem] overflow-hidden flex flex-col ${
                      isExpanded ? 'border-[#003366]/30 shadow-2xl ring-4 ring-[#003366]/5' : 'border-slate-200 shadow-sm hover:border-[#003366]/20'
                    }`}
                  >
                    <button
                      onClick={() => toggleSection(unitId)}
                      className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3.5 rounded-2xl transition-all ${isExpanded ? 'bg-[#003366] text-white shadow-lg scale-110' : 'bg-slate-50 text-[#003366] group-hover:bg-blue-50'}`}>
                          {getIcon(unit.title)}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                            {language === 'TN' ? 'அலகு' : 'Unit Detail'}
                          </span>
                          <h4 className={`font-black transition-colors ${
                            isExpanded ? 'text-[#003366]' : 'text-slate-800 group-hover:text-[#003366]'
                          } ${language === 'TN' ? 'text-sm' : 'text-[15px]'}`}>
                            {unit.title}
                          </h4>
                        </div>
                      </div>
                      <div className={`p-2 rounded-full transition-all ${isExpanded ? 'bg-[#003366] text-white rotate-180' : 'bg-slate-100 text-slate-400'}`}>
                        <ChevronDown size={18} />
                      </div>
                    </button>
                    
                    {isExpanded && (
                      <div className="px-8 pb-8 pt-2 animate-in slide-in-from-top-4 duration-500 border-t border-slate-50 bg-slate-50/30">
                        <div className="space-y-4 mt-4">
                          {unit.topics.map((topic, tIdx) => (
                            <div key={tIdx} className="flex gap-4 group/topic">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] mt-2 shrink-0 group-hover/topic:scale-150 transition-transform shadow-sm" />
                              <p className={`text-slate-600 leading-relaxed font-medium transition-colors group-hover/topic:text-[#003366] ${
                                language === 'TN' ? 'text-sm' : 'text-sm'
                              }`}>
                                {topic}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )) : (
          <div className="bg-white p-24 rounded-[3rem] border-2 border-dashed border-slate-200 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mb-6">
              <Search size={40} />
            </div>
            <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-sm">
              {language === 'TN' ? 'உங்கள் தேடலுக்குரிய பாடங்கள் ஏதுமில்லை' : 'No matching units found for your search'}
            </p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-6 text-[#003366] font-bold hover:underline underline-offset-4"
            >
              {language === 'TN' ? 'தேடலைத் தவிர்க்கவும்' : 'Clear search results'}
            </button>
          </div>
        )}
      </div>

      {/* Footer Guidance */}
      <div className="p-10 bg-[#003366] text-white rounded-[3rem] shadow-2xl relative overflow-hidden group">
        <BookOpen size={180} className="absolute -bottom-10 -right-10 opacity-5 group-hover:scale-110 transition-transform duration-700" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="p-5 bg-white/10 rounded-3xl border border-white/20 backdrop-blur-sm text-[#FFD700]">
            <Zap size={40} />
          </div>
          <div>
            <h4 className="text-xl font-black mb-2 flex items-center gap-2">
              {language === 'TN' ? 'முக்கியக் குறிப்பு' : 'Strategic Guidance'}
            </h4>
            <p className="text-blue-100/80 text-sm leading-relaxed max-w-3xl font-medium">
              {language === 'TN' ? 
                'இந்த பாடத்திட்டம் டிஎன்பிஎஸ்சி-யின் அதிகாரப்பூர்வ அறிவிப்புகளின் அடிப்படையில் தொகுக்கப்பட்டுள்ளது. ஒவ்வொரு தேர்விற்கும் மாறுபட்ட முக்கியத்துவம் இருக்கும் (எ.கா: குரூப் 4-ல் 10th தர நிலை, குரூப் 1-ல் டிகிரி தர நிலை). விரிவான வினாத்தாள் பகுப்பாய்விற்கு "PYQ Analyzer" கருவியைப் பயன்படுத்தவும்.' : 
                'This syllabus is structured based on official TNPSC notifications. Note the standard differences (e.g., SSLC Standard for Group 4 vs. Degree Standard for Group 1/2). For practical application and identifying high-weightage topics, use our "PYQ Analyzer" or "Future Predictor" tools.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamSyllabus;
