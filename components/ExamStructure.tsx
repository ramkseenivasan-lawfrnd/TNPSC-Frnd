import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Award, 
  Users, 
  Briefcase, 
  ChevronRight,
  Info,
  ShieldAlert,
  AlertCircle,
  FileText,
  MousePointerClick,
  Layers,
  FileSearch,
  CheckCircle,
  UserCheck,
  Zap,
  Type,
  FileSignature,
  Repeat,
  ShieldCheck,
  X,
  Check,
  Activity,
  Shield,
  Search,
  Dna,
  Scale,
  ListChecks,
  MapPin
} from 'lucide-react';
import { UI_STRINGS } from '../constants.ts';

interface ExamStructureProps {
  language: 'EN' | 'TN';
}

type TabType = 'group1' | 'group1abc' | 'group2' | 'group4' | 'group5a';

const ExamStructure: React.FC<ExamStructureProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<TabType>('group1');

  const content = {
    group1: {
      title: language === 'TN' ? 'தொகுதி 1 தேர்வு (Group 1)' : 'Group 1 Examination',
      prelims: {
        title: language === 'TN' ? 'நிலை I: முதல்நிலைத் தேர்வு (Preliminary)' : 'Stage I: Preliminary Examination (Objective)',
        desc: language === 'TN' ? 'இது ஒரு தகுதித் தேர்வு மட்டுமே. இறுதிப் பட்டியலுக்கு இந்த மதிப்பெண்கள் கணக்கிடப்படாது.' : 'This is a screening test. Marks are not counted for the final merit list, but passing is mandatory.',
        details: [
          { label: language === 'TN' ? 'வினாத்தாள் வடிவம்' : 'Format', value: 'Multiple Choice Questions (MCQs)' },
          { label: language === 'TN' ? 'எதிர்மறை மதிப்பெண்கள்' : 'Negative Marking', value: 'None' },
          { label: language === 'TN' ? 'தகுதி மதிப்பெண்கள்' : 'Qualifying Marks', value: 'Generally 90 for reserved categories and 120 for others' }
        ],
        data: [
          { section: language === 'TN' ? 'பொது அறிவு (Degree Standard)' : 'General Studies (Degree Standard)', questions: 175, marks: 262.5 },
          { section: language === 'TN' ? 'திறனறிவுத் தேர்வு (SSLC Standard)' : 'Aptitude & Mental Ability (SSLC Standard)', questions: 25, marks: 37.5 },
        ]
      },
      mains: {
        title: language === 'TN' ? 'நிலை II: முதன்மை எழுத்துத் தேர்வு (Main)' : 'Stage II: Main Written Examination (Descriptive)',
        desc: language === 'TN' ? 'நான்கு தாள்களைக் கொண்டது. தாள் I தகுதித் தாள் மட்டுமே.' : 'Consists of four papers. Paper I is qualifying, others determine rank.',
        qualifyingNote: language === 'TN' ? 'முதன்மைத் தேர்வு: குறைந்தபட்சம் 40% மதிப்பெண்கள் அவசியம்.' : 'MAINS EXAM: Minimum 40% marks required.',
        papers: [
          { id: 'I', subject: language === 'TN' ? 'தமிழ் மொழித் தகுதித் தேர்வு' : 'Tamil Eligibility Test', marks: 100, nature: language === 'TN' ? 'தகுதி மட்டும்' : 'Qualifying Only' },
          { id: 'II', subject: language === 'TN' ? 'பொது அறிவு - I' : 'General Studies - I', marks: 250, nature: language === 'TN' ? 'மதிப்பீட்டிற்குரியது' : 'Scored for Merit' },
          { id: 'III', subject: language === 'TN' ? 'பொது அறிவு - II' : 'General Studies - II', marks: 250, nature: language === 'TN' ? 'மதிப்பீட்டிற்குரியது' : 'Scored for Merit' },
          { id: 'IV', subject: language === 'TN' ? 'பொது அறிவு - III' : 'General Studies - III', marks: 250, nature: language === 'TN' ? 'மதிப்பீட்டிற்குரியது' : 'Scored for Merit' },
        ],
        breakdown: [
          { paper: 'Paper I', topics: language === 'TN' ? ['மொழிபெயர்ப்பு', 'சுருக்கி வரைதல்', 'பொருள் உணர்திறன்', 'கடிதம் வரைதல்', 'திருக்குறள் கட்டுரை'] : ['Translation', 'Precis writing', 'Comprehension', 'Letter writing', 'Essay on Thirukkural'] },
          { paper: 'Paper II', topics: language === 'TN' ? ['நவீன இந்திய வரலாறு', 'இந்திய சமூகப் பிரச்சினைகள்', 'திறனறிவு'] : ['Modern Indian History', 'Social Issues', 'Aptitude'] },
          { paper: 'Paper III', topics: language === 'TN' ? ['இந்திய அரசியல்', 'அறிவியல் மற்றும் தொழில்நுட்பம்', 'தமிழ் சமூகம்'] : ['Indian Polity', 'Science & Tech', 'Tamil Society'] },
          { paper: 'Paper IV', topics: language === 'TN' ? ['இந்திய புவியியல்', 'சுற்றுச்சூழல்', 'இந்தியப் பொருளாதாரம்'] : ['Geography of India', 'Environment', 'Indian Economy'] },
        ]
      },
      interview: {
        title: language === 'TN' ? 'நிலை III: நேர்முகத் தேர்வு' : 'Stage III: Interview & Oral Test',
        marks: 100,
        focus: language === 'TN' ? 'ஆளுமை, தகவல் தொடர்பு மற்றும் நடப்பு நிகழ்வுகள்' : 'Personality, communication, and current state/national issues'
      },
      final: { total: 850, calc: 'Mains (750) + Interview (100)' },
      posts: language === 'TN' ? 
        ['துணை ஆட்சியர்', 'காவல்துறை துணை கண்காணிப்பாளர் (DSP)', 'உதவி ஆணையர் (வணிக வரிகள்)', 'கூட்டுறவு சங்கங்களின் துணைப் பதிவாளர்'] : 
        ['Deputy Collector', 'DSP', 'Assistant Commissioner', 'Deputy Registrar']
    },
    group1abc: {
      title: language === 'TN' ? 'தொகுதி 1-A, B, C & VI பணிகள்' : 'Group 1-A, B, C & VI Services',
      subtitle: language === 'TN' ? 'சிறப்பு நிர்வாகப் பணிகள்' : 'Specialized Administrative Services',
      commonPrelims: {
        title: language === 'TN' ? 'நிலை I: முதல்நிலைத் தேர்வு (அனைவருக்கும் பொதுவானது)' : 'Stage I: Preliminary Examination (Common for All)',
        desc: language === 'TN' ? 'இது ஒரு தகுதித் தேர்வு (Screening Test).' : 'Screening test. Marks not counted for final merit.',
        questions: 200,
        marks: 300,
        duration: '3 Hours'
      },
      mains: [
        {
          id: 'I-A',
          role: language === 'TN' ? 'உதவி வனப் பாதுகாவலர்' : 'Assistant Conservator of Forests',
          papers: [
            { name: 'Paper I', desc: language === 'TN' ? 'தமிழ் (தகுதி)' : 'Tamil (Qualifying)', marks: 100 },
            { name: 'Paper II', desc: language === 'TN' ? 'பொது அறிவு' : 'General Studies', marks: 250 },
            { name: 'Paper III', desc: language === 'TN' ? 'பொது அறிவு' : 'General Studies', marks: 250 },
            { name: 'Paper IV', desc: language === 'TN' ? 'பொது அறிவு' : 'General Studies', marks: 250 }
          ],
          total: 850,
          specialized: language === 'TN' ? 'அறிவியல் மற்றும் சுற்றுச்சூழல்' : 'Science & Environment focus in GS',
          note: language === 'TN' ? 'உடல் தகுதி மற்றும் நடைப்பயிற்சித் தேர்வு கட்டாயம்.' : 'Physical standards and walking tests are mandatory.'
        },
        {
          id: 'I-B',
          role: language === 'TN' ? 'உதவி ஆணையர் (HR&CE)' : 'Assistant Commissioner (HR&CE)',
          papers: [
            { name: 'Paper I', desc: language === 'TN' ? 'தமிழ் (தகுதி)' : 'Tamil (Qualifying)', marks: 100 },
            { name: 'Paper II', desc: language === 'TN' ? 'பொது அறிவு' : 'General Studies', marks: 250 },
            { name: 'Paper III', desc: language === 'TN' ? 'இந்து சமயம் (Degree Std)' : 'Hindu Religion (Degree Std)', marks: 250 },
            { name: 'Paper IV', desc: language === 'TN' ? 'சட்டம் (Degree Std)' : 'Law (Degree Std)', marks: 250 }
          ],
          total: 850,
          specialized: language === 'TN' ? 'இந்து மதச் சட்டங்கள் & இந்தியச் சட்டம்' : 'Hindu Religious Act & Indian Law'
        },
        {
          id: 'I-C',
          role: language === 'TN' ? 'மாவட்டக் கல்வி அலுவலர் (DEO)' : 'District Educational Officer (DEO)',
          papers: [
            { name: 'Paper I', desc: language === 'TN' ? 'தமிழ் (தகுதி)' : 'Tamil (Qualifying)', marks: 100 },
            { name: 'Paper II', desc: language === 'TN' ? 'பொது அறிவு' : 'General Studies', marks: 250 },
            { name: 'Paper III', desc: language === 'TN' ? 'பொது அறிவு' : 'General Studies', marks: 250 },
            { name: 'Paper IV', desc: language === 'TN' ? 'கல்வி (B.Ed Std - கொள்குறி)' : 'Education (B.Ed. Std - Objective Type)', marks: 250 }
          ],
          total: 850,
          specialized: language === 'TN' ? 'கல்விக் கோட்பாடு & பள்ளி நிர்வாகம்' : 'Education Theory & School Administration'
        },
        {
          id: 'VI',
          role: language === 'TN' ? 'வனப் பயிற்சி அலுவலர்' : 'Forest Apprentice',
          papers: [
            { name: 'Paper I', desc: language === 'TN' ? 'தமிழ் (தகுதி)' : 'Tamil (Qualifying)', marks: 100 },
            { name: 'Paper II', desc: language === 'TN' ? 'பொது அறிவு' : 'General Studies', marks: 250 },
            { name: 'Paper III', desc: language === 'TN' ? 'பொது அறிவு' : 'General Studies', marks: 250 },
            { name: 'Paper IV', desc: language === 'TN' ? 'பொது அறிவு' : 'General Studies', marks: 250 }
          ],
          total: 850,
          specialized: language === 'TN' ? 'பொது அறிவு & உடல் தகுதி' : 'General Studies & Physical Fitness',
          note: language === 'TN' ? 'உடல் தகுதி மற்றும் நடைப்பயிற்சித் தேர்வு கட்டாயம்.' : 'Physical standards and walking tests are mandatory.'
        }
      ]
    },
    group2: {
      title: language === 'TN' ? 'தொகுதி 2 மற்றும் 2A தேர்வு' : 'Group 2 & 2A Examination',
      prelims: {
        title: language === 'TN' ? 'நிலை I: முதல்நிலைத் தேர்வு (பொதுவானது)' : 'Stage I: Preliminary Examination (Common)',
        data: [
          { section: language === 'TN' ? 'மொழி (பொதுத் தமிழ் / ஆங்கிலம்)' : 'Language (General Tamil/English)', questions: 100, marks: 150, standard: 'SSLC' },
          { section: language === 'TN' ? 'பொது அறிவு' : 'General Studies', questions: 75, marks: 112.5, standard: 'Degree' },
          { section: language === 'TN' ? 'திறனறிவுத் தேர்வு' : 'Aptitude & Mental Ability', questions: 25, marks: 37.5, standard: 'SSLC' },
        ],
        total: { qs: 200, marks: 300, duration: '3 Hours', qualifying: 90 }
      },
      mains: {
        paper1: {
          title: language === 'TN' ? 'தாள் I: கட்டாயத் தமிழ் மொழி தகுதித் தேர்வு' : 'Paper I: Mandatory Tamil Eligibility',
          marks: 100,
          pass: 40,
          duration: '1.5 Hours',
          nature: language === 'TN' ? 'தகுதி மட்டும்' : 'Qualifying Only',
          content: language === 'TN' ? 'மொழிபெயர்ப்பு, சுருக்கி வரைதல், கட்டுரை வரைதல் (திருக்குறள்), கடிதம் வரைதல்.' : 'Translation, Precis, Comprehension, Hints development, Essay (Thirukkural), Letter writing.'
        },
        paper2: {
          group2: {
            title: language === 'TN' ? 'தொகுதி 2 (நேர்முகப் பணியிடங்கள்)' : 'Group 2 (Interview Posts)',
            type: language === 'TN' ? 'விவரிக்கும் வகை (Descriptive)' : 'Descriptive Type (Pen & Paper)',
            marks: 300,
            min: 90,
            interview: 40,
            total: 340,
            roles: language === 'TN' ? ['சார்-பதிவாளர்', 'நகராட்சி ஆணையர்', 'உதவி வணிக வரி அலுவலர்'] : ['Sub-Registrar', 'Municipal Commissioner', 'Deputy Commercial Tax Officer']
          },
          group2a: {
            title: language === 'TN' ? 'தொகுதி 2A (நேர்முகமில்லா பணியிடங்கள்)' : 'Group 2A (Non-Interview Posts)',
            type: language === 'TN' ? 'கொள்குறி வகை (Objective)' : 'Objective Type (MCQ - usually CBT)',
            marks: 300,
            min: 90,
            total: 300,
            roles: language === 'TN' ? ['உதவியாளர்', 'கணக்காளர்', 'தனி உதவியாளர்'] : ['Assistant', 'Accountant', 'Personal Clerk']
          }
        }
      },
      units: language === 'TN' ? 
        ['பொது அறிவியல்', 'நடப்பு நிகழ்வுகள்', 'இந்தியப் புவியியல்', 'இந்திய வரலாறு', 'இந்திய அரசியல்', 'இந்தியப் பொருளாதாரம்', 'இந்திய தேசிய இயக்கம்', 'தமிழ்நாடு வரலாறு & பண்பாடு', 'தமிழ்நாடு வளர்ச்சி நிர்வாகம்', 'திறனறிவு'] :
        ['General Science', 'Current Events', 'Geography of India', 'History & Culture', 'Indian Polity', 'Indian Economy', 'Indian National Movement', 'TN History & Culture', 'TN Development Admin', 'Aptitude']
    },
    group4: {
      title: language === 'TN' ? 'தொகுதி 4 தேர்வு (Group 4)' : 'Group 4 Examination',
      overview: language === 'TN' ? 'ஒரே ஒரு எழுத்துத் தேர்வு மட்டுமே. நேர்முகத் தேர்வு கிடையாது.' : 'Selection is based entirely on a single-stage OMR-based written test. No Mains or Interview.',
      pattern: [
        { section: language === 'TN' ? 'பகுதி A: தமிழ் தகுதி மற்றும் மதிப்பீட்டுத் தேர்வு' : 'Part A: Tamil Eligibility-cum-Scoring Test', questions: 100, marks: 150, standard: 'SSLC' },
        { section: language === 'TN' ? 'பகுதி B: பொது அறிவு' : 'Part B: General Studies', questions: 75, marks: 112.5, standard: 'SSLC' },
        { section: language === 'TN' ? 'பகுதி B: திறனறிவுத் தேர்வு' : 'Part B: Aptitude & Mental Ability', questions: 25, marks: 37.5, standard: 'SSLC' },
      ],
      total: { qs: 200, marks: 300, qualifying: 90 },
      languageRule: language === 'TN' ? 'பகுதி A-வில் குறைந்தபட்சம் 40% (60 மதிப்பெண்கள்) பெற்றால் மட்டுமே பகுதி B மதிப்பீடு செய்யப்படும்.' : 'Min 40% (60 marks) in Part A required for Part B evaluation.',
      posts: [
        { role: 'VAO', qualification: '10th Pass', extra: language === 'TN' ? 'வயது: 21+' : 'Age: 21+ Years' },
        { role: language === 'TN' ? 'இளநிலை உதவியாளர்' : 'Junior Assistant', qualification: '10th Pass', extra: language === 'TN' ? 'நிர்வாகப் பணி' : 'General Admin' },
        { role: language === 'TN' ? 'தட்டச்சர்' : 'Typist', qualification: '10th Pass', extra: language === 'TN' ? 'தட்டச்சுத் தேர்வு' : 'Typewriting Exam' },
        { role: language === 'TN' ? 'சுருக்கெழுத்து தட்டச்சர்' : 'Steno-Typist', qualification: '10th Pass', extra: language === 'TN' ? 'தட்டச்சு & சுருக்கெழுத்து' : 'Typewriting & Shorthand' },
        { role: language === 'TN' ? 'வனக் காப்பாளர்' : 'Forest Guard', qualification: '12th Pass', extra: language === 'TN' ? 'உடல் தகுதி' : 'Physical Fitness' }
      ]
    },
    group5a: {
      title: language === 'TN' ? 'தொகுதி 5A தேர்வு (Group 5A)' : 'Group 5A Examination',
      subtitle: language === 'TN' ? 'பணி மாற்றத்தின் மூலம் நேரடி நியமனம்' : 'Direct Recruitment by Transfer',
      pattern: [
        { paper: 'Paper I', subject: language === 'TN' ? 'பொதுத் தமிழ் (விவரிக்கும் வகை)' : 'General Tamil (Descriptive)', marks: 100, duration: '3 Hours' },
        { paper: 'Paper II', subject: language === 'TN' ? 'பொது ஆங்கிலம் (விவரிக்கும் வகை)' : 'General English (Descriptive)', marks: 100, duration: '3 Hours' },
      ],
      total: 200,
      qualifying: 60,
      syllabus: {
        tamil: language === 'TN' ? ['கட்டுரை வரைதல்', 'சுருக்கி வரைதல்', 'பொருள் உணர்திறன்', 'கடிதம் வரைதல்', 'மொழிபெயர்ப்பு'] : ['Essay Writing', 'Precis Writing', 'Comprehension', 'Letter Writing', 'Translation'],
        english: ['Essay Writing (300 words)', 'Letter Writing', 'Precis Writing', 'Drafting Notification', 'Grammar']
      },
      eligibility: language === 'TN' ? 'தலைமைச் செயலகத்தில் குறைந்தபட்சம் 3-5 ஆண்டுகள் பணி அனுபவம்.' : '3-5 years experience in Ministerial services.'
    }
  };

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-700">
      {/* Header & Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-[#003366] font-scholarly tracking-tight">
            {UI_STRINGS[language].exams}
          </h2>
          <p className="text-slate-500 mt-2 font-medium max-w-lg">
            {language === 'TN' ? 'டிஎன்பிஎஸ்சி தேர்வுகளின் விரிவான பாடத்திட்டம் மற்றும் தேர்வு முறைகள்.' : 'Detailed walkthrough of various TNPSC examination patterns and syllabi.'}
          </p>
        </div>

        <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 overflow-x-auto no-scrollbar scroll-smooth">
          {[
            { id: 'group1', label: 'GRP 1' },
            { id: 'group1abc', label: 'GRP 1-ABC' },
            { id: 'group2', label: 'GRP 2' },
            { id: 'group4', label: 'GRP 4' },
            { id: 'group5a', label: 'GRP 5A' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-5 py-2.5 rounded-xl text-[11px] font-black transition-all shrink-0 uppercase tracking-widest ${
                activeTab === tab.id ? 'bg-[#003366] text-white shadow-lg' : 'text-slate-400 hover:text-[#003366]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Group 1 View */}
      {activeTab === 'group1' && (
        <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5"><Search size={80} /></div>
                <h3 className="text-xl font-bold text-[#003366] mb-6 flex items-center gap-3">
                  <CheckCircle2 size={24} className="text-blue-500" />
                  {content.group1.prelims.title}
                </h3>
                <p className="text-sm text-slate-500 mb-8 leading-relaxed">{content.group1.prelims.desc}</p>
                
                <div className="space-y-4 mb-8">
                  {content.group1.prelims.data.map((d, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center group hover:bg-white transition-all">
                      <span className="text-xs font-bold text-slate-600 max-w-[150px]">{d.section}</span>
                      <div className="text-right">
                        <p className="text-sm font-black text-[#003366]">{d.questions} Qs</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">{d.marks} Marks</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-100 grid grid-cols-1 gap-3">
                   {content.group1.prelims.details.map((item, i) => (
                     <div key={i} className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                       <span className="text-slate-400">{item.label}</span>
                       <span className="text-[#003366] text-right">{item.value}</span>
                     </div>
                   ))}
                </div>
              </div>

              <div className="bg-[#003366] p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                <Briefcase size={120} className="absolute -bottom-10 -right-10 opacity-10" />
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3"><Award className="text-[#FFD700]" /> {language === 'TN' ? 'முக்கிய பதவிகள்' : 'Key Posts'}</h3>
                <div className="space-y-3 relative z-10">
                  {content.group1.posts.map((p, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm font-semibold opacity-90 p-2 bg-white/5 rounded-lg border border-white/5">
                      <ChevronRight size={16} className="text-[#FFD700]" /> {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-slate-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                  <h3 className="text-2xl font-black text-[#003366]">{content.group1.mains.title}</h3>
                  <div className="px-4 py-2 bg-red-50 border border-red-100 text-red-700 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                    <AlertCircle size={14} /> {content.group1.mains.qualifyingNote}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.group1.mains.papers.map((p, i) => (
                    <div key={i} className="p-5 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-[#FFD700]/30 transition-all flex flex-col justify-between">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Paper {p.id}</span>
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${p.nature === 'Qualifying Only' || p.nature === 'தகுதி மட்டும்' ? 'bg-slate-200 text-slate-500' : 'bg-green-100 text-green-700'}`}>
                          {p.nature}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-[#003366] mb-4">{p.subject}</h4>
                      <p className="text-2xl font-black text-slate-800">{p.marks} <span className="text-[10px] text-slate-400 uppercase">Marks</span></p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.group1.mains.breakdown.map((b, i) => (
                    <div key={i} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                       <h5 className="text-[10px] font-black text-[#003366] uppercase tracking-[0.2em] mb-3">{b.paper} Syllabus Focus</h5>
                       <div className="flex flex-wrap gap-2">
                         {b.topics.map((t, idx) => (
                           <span key={idx} className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-500">
                             {t}
                           </span>
                         ))}
                       </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex items-center gap-5">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-amber-600 shadow-sm"><Users size={28} /></div>
                    <div>
                      <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest">{content.group1.interview.title}</p>
                      <p className="text-2xl font-black text-[#003366]">{content.group1.interview.marks} Marks</p>
                      <p className="text-[10px] font-bold text-amber-600/70 mt-1">{content.group1.interview.focus}</p>
                    </div>
                  </div>
                  <div className="p-6 bg-[#003366] text-white rounded-3xl flex items-center justify-between group overflow-hidden relative">
                    <Award size={64} className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-110 transition-transform" />
                    <div className="relative z-10">
                      <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest">Final Rank Basis</p>
                      <p className="text-3xl font-black">{content.group1.final.total} <span className="text-xs">Total</span></p>
                      <p className="text-[10px] font-bold text-blue-300 mt-1">{content.group1.final.calc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Group 1-ABC View */}
      {activeTab === 'group1abc' && (
        <div className="space-y-10 animate-in slide-in-from-bottom-6 duration-700">
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-200 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#003366] via-[#FFD700] to-[#003366]"></div>
            <div className="md:w-1/3">
              <div className="w-16 h-16 bg-blue-50 text-[#003366] rounded-3xl flex items-center justify-center mb-6 shadow-sm"><Layers size={32} /></div>
              <h3 className="text-2xl font-black text-[#003366] leading-tight">{content.group1abc.commonPrelims.title}</h3>
              <p className="text-slate-400 text-sm mt-3 font-medium leading-relaxed">{content.group1abc.commonPrelims.desc}</p>
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest"><Clock size={14} /> {content.group1abc.commonPrelims.duration}</div>
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest"><FileText size={14} /> {content.group1abc.commonPrelims.questions} Questions</div>
              </div>
            </div>
            <div className="flex-1 bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex items-center justify-center">
               <div className="text-center">
                  <p className="text-[10px] font-black text-[#003366] uppercase tracking-[0.3em] mb-2">Grand Total</p>
                  <p className="text-5xl font-black text-[#003366]">{content.group1abc.commonPrelims.marks}</p>
                  <p className="text-xs font-bold text-slate-400 mt-2">Screening Score only</p>
               </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-3 ml-2">
              <Award className="text-[#FFD700]" size={28} />
              <h3 className="text-2xl font-black text-[#003366] uppercase tracking-tight">{language === 'TN' ? 'முதன்மைத் தேர்வு மற்றும் பணிகள்' : 'Main Exams & Service Roles'}</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {content.group1abc.mains.map((service, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-200 group hover:shadow-2xl transition-all flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <span className="px-4 py-1.5 bg-[#003366] text-[#FFD700] rounded-xl text-[10px] font-black uppercase tracking-[0.2em]">Group {service.id}</span>
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                       <Activity size={14} className="text-green-500" /> {service.specialized}
                    </div>
                  </div>
                  <h4 className="text-xl font-black text-[#003366] mb-6">{service.role}</h4>
                  
                  <div className="space-y-3 mb-8 flex-1">
                    {service.papers.map((p, idx) => (
                      <div key={idx} className="flex justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-white transition-all">
                         <div>
                           <span className="text-[10px] font-black text-[#003366] uppercase block mb-1">{p.name}</span>
                           <span className="text-sm font-bold text-slate-600">{p.desc}</span>
                         </div>
                         <span className="text-xs font-black text-slate-800">{p.marks} M</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-slate-100 space-y-4">
                    <div className="flex items-center justify-between bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
                       <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">Final Selection Total</span>
                       <span className="text-xl font-black text-[#003366]">{service.total} <span className="text-xs">Marks</span></span>
                    </div>
                    {service.note && (
                      <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-xl border border-amber-100 text-[10px] font-bold text-amber-700 leading-relaxed italic">
                        <Info size={14} className="shrink-0 mt-0.5" /> {service.note}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Group 2 & 2A View */}
      {activeTab === 'group2' && (
        <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700">
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-200">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
               <div className="lg:col-span-1">
                  <div className="w-16 h-16 bg-blue-50 text-[#003366] rounded-3xl flex items-center justify-center mb-6 shadow-sm"><FileSearch size={32} /></div>
                  <h3 className="text-2xl font-black text-[#003366] mb-4">{content.group2.prelims.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    {language === 'TN' ? 'தொகுதி 2 மற்றும் 2A ஆகிய இரண்டிற்கும் பொதுவான முதல்நிலைத் தேர்வு முறை.' : 'Both Group 2 (Interview) and 2A (Non-Interview) share this initial common screening stage.'}
                  </p>
                  <div className="p-5 bg-indigo-50 rounded-2xl border border-indigo-100 flex flex-col items-center gap-2">
                    <p className="text-[10px] font-black text-indigo-700 uppercase tracking-widest">Common Pass Mark</p>
                    <p className="text-3xl font-black text-[#003366]">{content.group2.prelims.total.qualifying}</p>
                    <p className="text-[10px] font-bold text-indigo-400">All Categories</p>
                  </div>
               </div>
               <div className="lg:col-span-2 space-y-4">
                  {content.group2.prelims.data.map((item, i) => (
                    <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group hover:bg-white hover:border-[#003366]/30 transition-all">
                       <div className="flex-1">
                         <div className="flex items-center gap-2 mb-1">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.standard} Std</span>
                           <h4 className="text-sm font-bold text-slate-800">{item.section}</h4>
                         </div>
                       </div>
                       <div className="flex gap-10 text-right shrink-0">
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Questions</p>
                            <p className="text-xl font-black text-[#003366]">{item.questions}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Marks</p>
                            <p className="text-xl font-black text-[#003366]">{item.marks}</p>
                          </div>
                       </div>
                    </div>
                  ))}
                  <div className="mt-4 p-4 bg-slate-900 text-white rounded-2xl flex justify-between items-center px-8 shadow-xl">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Combined Total</span>
                    <span className="text-xl font-black">{content.group2.prelims.total.qs} Qs / {content.group2.prelims.total.marks} Marks</span>
                  </div>
               </div>
             </div>
          </div>

          <div className="space-y-8">
             <div className="flex items-center gap-3 ml-2">
                <Scale className="text-[#003366]" size={28} />
                <h3 className="text-2xl font-black text-[#003366] uppercase tracking-tight">{language === 'TN' ? 'முதன்மைத் தேர்வு வேறுபாடுகள்' : 'Main Exam Divergence'}</h3>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Common Paper I */}
                <div className="bg-white p-8 rounded-[2.5rem] border-2 border-dashed border-[#003366]/20 shadow-xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-5"><Type size={100} /></div>
                   <div className="relative z-10">
                      <span className="px-3 py-1 bg-[#003366] text-white rounded-lg text-[10px] font-black uppercase tracking-widest">{content.group2.mains.paper1.nature}</span>
                      <h4 className="text-xl font-black text-[#003366] mt-6 mb-4">{content.group2.mains.paper1.title}</h4>
                      <p className="text-sm font-bold text-slate-500 mb-6 leading-relaxed">{content.group2.mains.paper1.content}</p>
                      
                      <div className="grid grid-cols-2 gap-4">
                         <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Min Pass</p>
                            <p className="text-2xl font-black text-red-600">{content.group2.mains.paper1.pass} M</p>
                         </div>
                         <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Duration</p>
                            <p className="text-lg font-black text-slate-800">{content.group2.mains.paper1.duration}</p>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Group 2 Descriptive */}
                <div className="bg-[#003366] p-8 rounded-[2.5rem] text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
                   <MousePointerClick size={140} className="absolute -bottom-10 -right-10 opacity-5 group-hover:scale-110 transition-transform" />
                   <div className="relative z-10">
                      <h4 className="text-xl font-bold mb-2">{content.group2.mains.paper2.group2.title}</h4>
                      <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-8">{content.group2.mains.paper2.group2.type}</p>
                      <div className="space-y-4 mb-8">
                         <div className="flex justify-between items-center pb-3 border-b border-white/10">
                            <span className="text-sm font-medium opacity-70">Main Exam</span>
                            <span className="text-xl font-black">{content.group2.mains.paper2.group2.marks} M</span>
                         </div>
                         <div className="flex justify-between items-center pb-3 border-b border-white/10">
                            <span className="text-sm font-medium opacity-70">Interview</span>
                            <span className="text-xl font-black">{content.group2.mains.paper2.group2.interview} M</span>
                         </div>
                      </div>
                   </div>
                   <div className="bg-[#FFD700] p-4 rounded-2xl flex justify-between items-center text-[#003366] shadow-lg relative z-10">
                      <span className="text-[10px] font-black uppercase tracking-widest">Final Selection</span>
                      <span className="text-3xl font-black">{content.group2.mains.paper2.group2.total}</span>
                   </div>
                </div>

                {/* Group 2A Objective */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl flex flex-col justify-between group relative overflow-hidden">
                   <Layers size={140} className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:scale-110 transition-transform" />
                   <div className="relative z-10">
                      <h4 className="text-xl font-bold text-[#003366] mb-2">{content.group2.mains.paper2.group2a.title}</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">{content.group2.mains.paper2.group2a.type}</p>
                      <div className="space-y-4 mb-8">
                         <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                            <span className="text-sm font-bold text-slate-500">Main Exam (CBT)</span>
                            <span className="text-xl font-black text-[#003366]">{content.group2.mains.paper2.group2a.marks} M</span>
                         </div>
                         <div className="flex justify-between items-center pb-3 border-b border-slate-100 opacity-20">
                            <span className="text-sm font-medium text-slate-400 italic">No Interview</span>
                            <span className="text-xl font-black text-slate-400">--</span>
                         </div>
                      </div>
                   </div>
                   <div className="bg-slate-100 p-4 rounded-2xl flex justify-between items-center text-slate-800 shadow-sm relative z-10">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Final Selection</span>
                      <span className="text-3xl font-black text-[#003366]">{content.group2.mains.paper2.group2a.total}</span>
                   </div>
                </div>
             </div>

             <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-xl">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-10 text-center">Core Syllabus Units (1-10)</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                   {content.group2.units.map((unit, i) => (
                     <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center group hover:bg-[#003366] transition-all">
                       <span className="text-[10px] font-black text-slate-400 group-hover:text-blue-200 block mb-2 uppercase">Unit {i+1}</span>
                       <span className="text-xs font-bold text-slate-700 group-hover:text-white transition-colors">{unit}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Group 4 View */}
      {activeTab === 'group4' && (
        <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-700">
           <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-200 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-[0.03]"><Zap size={200} className="text-[#003366]" /></div>
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
               <div className="lg:col-span-4">
                  <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mb-6 shadow-sm"><CheckCircle size={32} /></div>
                  <h3 className="text-2xl font-black text-[#003366] mb-4">{content.group4.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8">{content.group4.overview}</p>
                  
                  <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100 mb-8">
                     <div className="flex items-center gap-3 text-[#003366] mb-3">
                        <ShieldCheck size={20} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Min Pass</span>
                     </div>
                     <p className="text-3xl font-black text-[#003366]">{content.group4.total.qualifying}</p>
                     <p className="text-[10px] font-bold text-indigo-400 mt-1">{content.group4.languageRule}</p>
                  </div>
               </div>
               
               <div className="lg:col-span-8 space-y-4">
                  {content.group4.pattern.map((p, i) => (
                    <div key={i} className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 group hover:border-[#FFD700]/50 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="max-w-[280px]">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.standard} Std</span>
                        <h4 className="text-sm font-black text-[#003366] uppercase tracking-tight mt-1">{p.section}</h4>
                      </div>
                      <div className="flex gap-10 shrink-0 text-right">
                         <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Questions</p>
                            <p className="text-2xl font-black text-slate-800">{p.questions}</p>
                         </div>
                         <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Marks</p>
                            <p className="text-2xl font-black text-slate-800">{p.marks}</p>
                         </div>
                      </div>
                    </div>
                  ))}
                  <div className="bg-[#003366] p-8 rounded-[2rem] flex justify-between items-center shadow-xl">
                     <div className="flex items-center gap-4 text-[#FFD700]">
                       <Award size={40} />
                       <div className="text-left">
                         <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200">Grand Total Score</span>
                         <p className="text-4xl font-black text-white">{content.group4.total.marks}</p>
                       </div>
                     </div>
                     <div className="text-right">
                        <span className="text-[10px] font-black text-blue-300 uppercase block mb-1">Duration</span>
                        <p className="text-xl font-bold text-white">3 Hours</p>
                     </div>
                  </div>
               </div>
             </div>
           </div>

           <div className="space-y-6">
              <div className="flex items-center gap-3 ml-2">
                 <ListChecks className="text-[#003366]" size={28} />
                 <h3 className="text-2xl font-black text-[#003366] uppercase tracking-tight">{language === 'TN' ? 'பதவி வகைகள் மற்றும் தகுதிகள்' : 'Post Categories & Requirements'}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                 {content.group4.posts.map((post, i) => (
                   <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-lg text-center group hover:bg-[#003366] transition-all flex flex-col justify-between h-full">
                      <div className="mb-4">
                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FFD700] transition-colors"><Zap size={24} className="text-[#003366]" /></div>
                        <h4 className="text-sm font-black text-slate-800 group-hover:text-white uppercase mb-2">{post.role}</h4>
                        <span className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-500 group-hover:bg-white/10 group-hover:text-white/80">{post.qualification}</span>
                      </div>
                      <div className="pt-4 border-t border-slate-100 group-hover:border-white/10">
                        <p className="text-[10px] font-black text-slate-400 group-hover:text-blue-200 uppercase tracking-widest">{post.extra}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      {/* Group 5A View */}
      {activeTab === 'group5a' && (
        <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-700">
           <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-200 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-[0.03] -rotate-12"><FileSignature size={200} className="text-[#003366]" /></div>
             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                   <div className="inline-flex items-center gap-3 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-2xl mb-8">
                      <Repeat size={20} />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">{content.group5a.subtitle}</span>
                   </div>
                   <h3 className="text-3xl font-black text-[#003366] leading-tight mb-6">{content.group5a.title}</h3>
                   <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-200 mb-8">
                      <div className="flex items-center gap-3 text-[#003366] mb-4">
                         <UserCheck size={24} />
                         <span className="text-xs font-black uppercase tracking-widest">{language === 'TN' ? 'தகுதி மற்றும் பணி அனுபவம்' : 'Eligibility & Experience'}</span>
                      </div>
                      <p className="text-sm font-bold text-slate-600 leading-relaxed">{content.group5a.eligibility}</p>
                      <div className="mt-6 flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-200">
                        <MapPin size={18} className="text-[#003366] shrink-0 mt-0.5" />
                        <p className="text-[11px] font-medium text-slate-500">{language === 'TN' ? 'தலைமைச் செயலகம் மற்றும் நீதித்துறை அமைச்சுப் பணிகள்.' : 'Targeted at Secretariat and Judicial Ministerial services staff.'}</p>
                      </div>
                   </div>
                </div>

                <div className="flex flex-col justify-center space-y-6">
                   <div className="bg-[#003366] p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                      <Award size={160} className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform" />
                      <h4 className="text-[10px] font-black text-blue-200 uppercase tracking-[0.3em] mb-10">Written Exam (Descriptive Pattern)</h4>
                      <div className="space-y-4 relative z-10">
                        {content.group5a.pattern.map((p, i) => (
                          <div key={i} className="flex justify-between items-center p-5 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-white/10 transition-all">
                             <div>
                               <p className="text-[10px] font-black text-[#FFD700] uppercase mb-1">{p.paper} - {p.duration}</p>
                               <p className="text-lg font-bold text-white">{p.subject}</p>
                             </div>
                             <span className="text-2xl font-black">{p.marks} M</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-10 flex items-center justify-between p-5 bg-[#FFD700] rounded-2xl text-[#003366] shadow-xl">
                         <span className="text-[10px] font-black uppercase tracking-widest">Aggregate Pass Mark</span>
                         <span className="text-3xl font-black">{content.group5a.qualifying} / {content.group5a.total}</span>
                      </div>
                   </div>
                </div>
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-xl">
                <h4 className="text-[10px] font-black text-[#003366] uppercase tracking-[0.2em] mb-8 border-b border-slate-100 pb-4">Paper I: General Tamil Focus</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {content.group5a.syllabus.tamil.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs font-bold text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-xl">
                <h4 className="text-[10px] font-black text-[#003366] uppercase tracking-[0.2em] mb-8 border-b border-slate-100 pb-4">Paper II: General English Focus</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {content.group5a.syllabus.english.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>
                      <span className="text-xs font-bold text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
           </div>

           <div className="p-8 bg-blue-50/50 rounded-[2.5rem] border border-dashed border-blue-200 flex flex-col md:flex-row items-center gap-6">
              <div className="p-4 bg-white rounded-3xl shadow-sm text-blue-500"><Dna size={32} /></div>
              <p className="text-xs font-bold text-blue-700 leading-relaxed max-w-2xl">
                 {language === 'TN' ? 
                    '*முக்கியக் குறிப்பு: இந்தத் தேர்வு தமிழ்நாடு அரசுப் பணியில் (Ministerial / Judicial Services) ஏற்கனவே பணியாற்றும் தகுதியுள்ள பணியாளர்களுக்கானது. இது ஒரு நேரடித் தேர்வு அல்ல, இது துறைவாரியான பணி மாற்றத் தேர்வு (Recruitment by Transfer).' : 
                    '*Note: This examination is strictly for eligible departmental candidates already serving in the Tamil Nadu Ministerial/Judicial Ministerial services. It is a recruitment by transfer, not a direct entry for general public.'}
              </p>
           </div>
        </div>
      )}
    </div>
  );
};

export default ExamStructure;