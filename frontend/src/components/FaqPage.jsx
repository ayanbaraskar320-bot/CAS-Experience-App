import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export const FAQ_SECTIONS = [
  {
    id: 'understanding-eleviq',
    number: '01',
    title: 'Understanding ElevIQ',
    badge: 'Overview & Approach',
    questions: [
      {
        id: 'q1',
        number: 1,
        question: 'What is ElevIQ Foundation?',
        answer: 'ElevIQ Foundation helps people recognize capabilities they may not have had the language or opportunity to express, then explore practical next steps in education, work, service, or entrepreneurship. Its approach brings together reflection, human guidance, and community connections. The aim is to help you understand what you bring and consider where to go next.'
      },
      {
        id: 'q2',
        number: 2,
        question: 'Who can benefit from ElevIQ?',
        answer: 'The Foundation describes pathways for young people, students, adults entering or returning to work, experienced workers considering a transition, veterans, and people rebuilding their careers. Your starting point may be a question about your interests, how to describe your experience, or which opportunities to explore. The support available depends on the program you join.'
      },
      {
        id: 'q3',
        number: 3,
        question: 'What is the ElevIQ Alignment Scan™?',
        answer: 'The scan is a scenario-based reflection experience. It invites you to consider situations and your approaches to them, helping surface patterns for discussion. It is designed to support self-understanding and pathway exploration. It should be approached as an opportunity to reflect honestly, rather than something to prepare for by memorizing answers.'
      },
      {
        id: 'q4',
        number: 4,
        question: 'Is this an exam, diagnosis, or personality test?',
        answer: 'No. ElevIQ describes the scan as nonclinical and nondiagnostic, and not a personality or hiring test. It does not provide a pass or fail result. Its insights should not be treated as a medical assessment, a psychological diagnosis, or proof that someone is qualified or unqualified for an opportunity.'
      },
      {
        id: 'q5',
        number: 5,
        question: 'How is this different from a résumé?',
        answer: 'A résumé usually summarizes formal education and work history. Reflection can help you discuss experiences that are harder to capture in job titles: organizing a community activity, solving an unfamiliar problem, or coordinating family responsibilities. These examples can enrich a conversation, although they do not automatically establish a credential or verified job skill.'
      }
    ]
  },
  {
    id: 'getting-started',
    number: '02',
    title: 'Getting Started and Completing the Scan',
    badge: 'Participation & Format',
    questions: [
      {
        id: 'q6',
        number: 6,
        question: 'Is participation free?',
        answer: 'Yes. The participant-facing ElevIQ Alignment Scan™ is always free to individuals. ElevIQ Foundation provides mission-driven services and human support around the experience, while organizational partnerships and services have separately agreed scopes. STC Innovations owns and commercializes the ElevIQ Capability Alignment System™ (CAS), including organizational licensing, configuration, and implementation. External training, credentials, or services that participants may choose to explore can have their own fees; check with those providers before enrolling.'
      },
      {
        id: 'q7',
        number: 7,
        question: 'Do I need a degree, résumé, or professional experience?',
        answer: 'You can bring experiences beyond formal employment into your reflection. Do not assume that a résumé upload or a particular qualification is required simply because another assessment asks for it. Follow the instructions for your specific program and ask the coordinator which information is required and which is optional.'
      },
      {
        id: 'q8',
        number: 8,
        question: 'How do I begin and what equipment do I need?',
        answer: 'Start through the Foundation website or the invitation provided by your school, advisor, or community program. Use the access instructions in that invitation. Ask the coordinator which devices and browsers are supported and whether an account is needed. If access to a device or an internet connection is difficult, raise that before your session.'
      },
      {
        id: 'q9',
        number: 9,
        question: 'How long does the ElevIQ Alignment Scan™ take, can I pause, and how does it track my progress?',
        intro: 'The ElevIQ Alignment Scan™ takes approximately 25 minutes to complete, with about 27 personalized questions designed to help you recognize your capabilities, strengths, and opportunities for growth.',
        subsections: [
          {
            title: 'How are my questions selected?',
            content: 'Unlike traditional assessments that ask everyone the same questions, the ElevIQ Alignment Scan™ is adaptive and personalized. Questions are selected from a library of thousands of scenarios informed by behavioral economics. Your experience is tailored to your age, education level, and the population pathway selected by the organization providing your invitation. CAS uses seven approved population pathways to help ensure the experience is appropriate for each participant. Your answers influence which questions appear next. Some questions may be reworded and presented again to explore your responses more deeply. Because the experience adapts to each person, participants do not receive identical sets of questions.'
          },
          {
            title: 'Can I pause and return later?',
            content: 'Yes. Your progress is automatically saved. You can pause the scan and return later without losing your place or the answers you have already provided.'
          },
          {
            title: 'Can I complete the scan more than once?',
            content: 'Yes. CAS supports repeated evaluations because your capabilities can develop over time. Participants can complete another scan after a minimum interval of 24 hours. However, the organization providing your invitation may establish longer intervals, such as every 30, 60, or 90 days, depending on its program. This allows your evaluations to reflect your ongoing experiences, education, training, and personal development.'
          },
          {
            title: 'How does CAS show my progress over time?',
            content: 'CAS is designed to grow with you rather than provide a one-time, static assessment. Each completed scan generates an evaluation of your Capability Signals™, helping you recognize strengths, identify Development Opportunities, and understand how your capabilities are developing. When you complete additional scans, your Capability Signals™ evaluations show how you have progressed in specific capability areas over time. As you participate in training, receive guidance, gain experience, and strengthen your capabilities, these evaluations help you and your advisor recognize your development and identify meaningful next steps.'
          },
          {
            title: 'Will I be able to see my previous results?',
            content: 'Yes. All Alignment Snapshots™ and participant reports generated through CAS are saved and remain available in your participant history. You can return to your previous reports, review earlier evaluations, and compare them with newer results to better understand how your capabilities have developed. Your previous Alignment Snapshots™ are preserved rather than replaced when you complete another scan, giving you an ongoing record of your development.'
          },
          {
            title: 'Who can see my individual answers?',
            content: 'Only you can view your individual question-by-question answers. Authorized organizational staff may access permitted evaluations, Alignment Snapshots™, and other information according to their approved permissions, but they cannot view your individual responses to each scan question. You may choose to stop participating and revoke your access at any time. The organization\'s administrator may also revoke your access to its program. Requests involving the deletion or retention of previously collected information are handled separately under the applicable privacy procedures.'
          },
          {
            title: 'The ElevIQ difference',
            content: 'The ElevIQ Alignment Scan™ is more than a one-time reflection experience. It is designed to evolve with you, recognize capability progression, preserve your developmental history, and support informed decisions about your education, career, and personal growth.'
          }
        ]
      },
      {
        id: 'q10',
        number: 10,
        question: 'How should I answer the questions?',
        answer: 'Answer from your own experience rather than trying to present an idealized version of yourself. Think about what you would usually do in the situation described. If the wording is confusing, ask for clarification instead of letting someone choose an answer for you. Specific examples can be useful during a later conversation with an advisor.'
      },
      {
        id: 'q11',
        number: 11,
        question: 'What if I need help, accommodations, or another language?',
        answer: 'Contact the program team before beginning to discuss reading, language, accessibility, or technology needs. Ask which forms of assistance are available and how they affect the session. Do not assume that translation, screen-reader compatibility, alternate formats, or assisted completion are supported until your coordinator confirms the options for your program.'
      }
    ]
  },
  {
    id: 'insights-and-next-steps',
    number: '03',
    title: 'Understanding Your Insights and Next Steps',
    badge: 'Signals & Snapshots',
    questions: [
      {
        id: 'q12',
        number: 12,
        question: 'What are Capability Signals™, and how do they show my progress?',
        intro: 'Capability Signals™ are insights generated through the ElevIQ Alignment Scan™ that help you recognize your strengths, understand your capabilities, and identify Development Opportunities. Your Capability Signals™ reflect patterns identified through your responses to personalized, scenario-based questions. They provide meaningful information about how you approach situations, solve problems, make decisions, communicate, and apply your capabilities in everyday life.',
        subsections: [
          {
            title: 'How do Capability Signals™ help me understand my development?',
            content: 'Unlike a one-time assessment, CAS allows you to complete additional evaluations over time. Each evaluation provides updated Capability Signals™ that can be compared with previous results to show how you have progressed in specific capability areas. As you participate in education, training, coaching, work experiences, or other developmental activities, your evaluations can reveal areas where your capabilities have strengthened, remained consistent, or may benefit from additional support.'
          },
          {
            title: 'How can I use this information?',
            content: 'Your Capability Signals™ can help you and your advisor:\n• Recognize existing and emerging strengths.\n• Understand how your capabilities are developing.\n• Identify areas for additional training, guidance, or experience.\n• Explore education, career, and development pathways.\n• Make informed decisions about meaningful next steps.\n\nCapability Signals™ are developmental insights, not permanent labels, clinical diagnoses, or guarantees of future performance. Their purpose is to help you recognize what you bring, understand how you are progressing, and explore where you can go next.'
          }
        ]
      },
      {
        id: 'q13',
        number: 13,
        question: 'What is an Alignment Snapshot™, when will I receive it, and can I view previous results?',
        intro: 'Your Alignment Snapshot™ is a personalized report generated when you complete the ElevIQ Alignment Scan™. It provides insight into your Capability Signals™, recognized strengths, Development Opportunities, and possible next steps for continued growth.',
        subsections: [
          {
            title: 'When will I receive my Alignment Snapshot™?',
            content: 'Your Alignment Snapshot™ is available immediately after completing your scan in your Participant Portal. You do not need to wait for an advisor or organization to release your results. You can view your report online or download and save a PDF copy for your personal records.'
          },
          {
            title: 'Can I access my previous reports?',
            content: 'Yes. Every completed Alignment Snapshot™ is saved in your Participant Portal. When you complete additional scans, your earlier reports remain available alongside your newer evaluations. This creates an ongoing history of your capability development, allowing you to revisit previous results and see how your Capability Signals™ have progressed over time.'
          },
          {
            title: 'Can my advisor see my progress?',
            content: 'Yes. Authorized advisors can access participant reports and review individual capability progression through the organization-facing Console. This helps advisors recognize developing strengths, identify areas where additional training or support may be beneficial, and work with participants to establish meaningful next steps. However, only you can view your individual question-by-question responses. Advisors have access to authorized reports and progression information, not your individual answers.\n\nYour Alignment Snapshot™ is more than a one-time report. It becomes part of your ongoing developmental record, helping you and your advisor understand how your capabilities evolve through education, experience, guidance, and personal growth.'
          }
        ]
      },
      {
        id: 'q14',
        number: 14,
        question: 'What should I do if an insight does not describe me?',
        answer: 'Identify the part that feels inaccurate or incomplete and bring examples to your advisor. For instance, a situation at home may show a capability that your work history does not reveal. Ask how the insight was generated and whether contextual information can be added or corrected. You do not need to accept every suggestion as a personal truth.'
      },
      {
        id: 'q15',
        number: 15,
        question: 'Will the scan tell me which career I must choose?',
        answer: 'No. Possible pathways are prompts for exploration, not instructions about what you must become. A useful next step is to compare a suggestion with your interests, existing qualifications, finances, available time, and local opportunities. Ask what additional training or experience a pathway would require before making a commitment.'
      },
      {
        id: 'q16',
        number: 16,
        question: 'Does ElevIQ guarantee employment or admission?',
        answer: 'No. Reflection and guidance cannot guarantee a job offer, admission, funding, placement, or future performance. A provider or employer may have separate requirements and its own decision process. Treat any suggested opportunity as something to investigate, including whether it is currently open and whether you meet its requirements.'
      },
      {
        id: 'q17',
        number: 17,
        question: 'What happens after the scan?',
        answer: 'Depending on the program, the next step may be a discussion, exploration of education or work pathways, or a connection to another service. ElevIQ calls its support toward a practical next step the ElevIQ Last Mile™. Available referrals and follow-through depend on local relationships, resources, permissions, and the approved service scope.'
      }
    ]
  },
  {
    id: 'ai-and-human-guidance',
    number: '04',
    title: 'AI and Human Guidance',
    badge: 'ARIA & CLARA Oversight',
    questions: [
      {
        id: 'q18',
        number: 18,
        question: 'How does ElevIQ use AI?',
        answer: 'Where available, ElevIQ ARIA™ is the participant-facing AI-assisted reflection companion, supporting questions and exploration of next steps. ElevIQ CLARA™ is the organization-, advisor-, and staff-facing AI assistant, where configured for a program. AI-generated suggestions are conversation starters and may miss context or make mistakes. Human professionals remain central to guidance and decisions. Verify concrete opportunity details with the relevant provider.'
      },
      {
        id: 'q19',
        number: 19,
        question: 'Does AI decide whether I am eligible or employable?',
        answer: 'ElevIQ states that AI supports interpretation and navigation rather than making final eligibility, hiring, placement, clinical, or psychological decisions. A suggested pathway should not be treated as an eligibility determination. If a partner organization uses the experience, ask how its staff will use the information and who is accountable for decisions.'
      },
      {
        id: 'q20',
        number: 20,
        question: 'Will I have a human advisor?',
        answer: 'Human guidance is central to the Foundation’s approach, but the type and availability of support can vary. Ask whether your program includes a scheduled debrief, ongoing coaching, or a referral to another guide. Also ask whom to contact if you need clarification after receiving your insights and whether follow-up appointments must be booked.'
      },
      {
        id: 'q21',
        number: 21,
        question: 'Are the insights scientifically proven or completely unbiased?',
        answer: 'Do not interpret a reflective output as a validated prediction of job performance, a clinical conclusion, or a guarantee of fairness. The reviewed pages describe directional patterns and developing features. Organizations considering a particular use should request evidence relevant to that use, the population being served, and the limits of the method.'
      },
      {
        id: 'q22',
        number: 22,
        question: 'Can I revisit my reflections or complete the ElevIQ Alignment Scan™ again?',
        intro: 'Yes. The ElevIQ Alignment Scan™ is designed to support your continued growth and development rather than provide a single, static evaluation.',
        subsections: [
          {
            title: 'How often can I complete another scan?',
            content: 'CAS allows participants to complete another scan after a minimum interval of 24 hours. However, the organization providing your invitation may establish longer intervals, such as every 30, 60, or 90 days, depending on its program structure and developmental goals. Your organization determines the schedule for additional evaluations within its program.'
          },
          {
            title: 'Will I receive the same questions each time?',
            content: 'Not necessarily. The scan draws from a library of thousands of scenario-based questions informed by behavioral economics. Questions are personalized based on your age, education level, and responses. As you answer, CAS adapts subsequent questions to explore your capabilities more deeply. Some questions may be reworded or presented again. Because the scan is adaptive, participants do not receive identical question sequences.'
          },
          {
            title: 'How will I know whether I have progressed?',
            content: 'Each completed scan generates updated Capability Signals™ evaluations and an Alignment Snapshot™. These evaluations allow you to see how your capabilities have progressed in specific areas over time. For example, after participating in training, receiving coaching, gaining work experience, or developing new skills, future evaluations can show changes in your Capability Signals™. Your advisor can also review your progression and use the information to help identify new Development Opportunities and meaningful next steps.'
          },
          {
            title: 'Will my previous results be saved?',
            content: 'Yes. All previously completed Alignment Snapshots™ and participant reports remain available in your Participant Portal while your account and retained records are accessible. You can view your historical reports, compare evaluations, and download PDF copies for your records. Earlier reports are preserved rather than replaced when you complete another scan.'
          },
          {
            title: 'Why is this important?',
            content: 'CAS is designed to grow with you. Your experiences, knowledge, and capabilities can change over time. By supporting repeated evaluations and preserving your developmental history, CAS helps you and your advisor recognize progress, identify emerging strengths, and plan meaningful next steps throughout your education, career, and personal development journey.'
          }
        ]
      }
    ]
  },
  {
    id: 'privacy-security-control',
    number: '05',
    title: 'Privacy, Security and Control of Information',
    badge: 'Confidentiality & Rights',
    questions: [
      {
        id: 'q23',
        number: 23,
        question: 'What information will I be asked to provide, and how is my scan selected?',
        intro: 'Participation in the ElevIQ Alignment Scan™ begins with an invitation from an authorized administrator or participating organization.',
        subsections: [
          {
            title: 'Getting started',
            content: 'You will need a valid email address to receive your invitation. Once you accept the invitation, you will create or use a password to securely access your Participant Portal.'
          },
          {
            title: 'How is my scan selected?',
            content: 'The professional supporting you determines the appropriate scan based on several factors, including your age, education level, current stage in your education or career journey, and what you hope to pursue. CAS then uses the selected population pathway to provide scenario-based questions appropriate to your circumstances. Your responses help determine subsequent questions and shape the information presented in your Alignment Snapshot™. This personalized approach helps ensure that your experience reflects where you are in your journey rather than placing every participant into the same assessment.'
          },
          {
            title: 'Can I add information about my experiences?',
            content: 'Yes. Your Participant Portal allows you to add information about your Experience & Context, including relevant life experiences, education, work history, and a résumé if you choose. This information can provide additional context about the capabilities and experiences you bring.'
          },
          {
            title: 'Who can see the information I upload?',
            content: 'Your uploaded Experience & Context information and résumé are not directly visible to your counselor or advisor. Authorized professionals can see that you have completed this portion of your profile, but they do not see the underlying personal details. A professional supporting you may assist you with entering information when you want or need help. You remain an active participant in your own development. The information you provide helps CAS support personalized reflection, recognize your capabilities, and guide meaningful next steps.'
          }
        ]
      },
      {
        id: 'q24',
        number: 24,
        question: 'How is my information protected?',
        answer: 'ElevIQ takes participant privacy, confidentiality, and responsible information handling seriously.\n\nThe ElevIQ Capability Alignment System™ (CAS) uses password-protected Participant Portals and defined access permissions to help protect personal information.\n\nYour individual responses to the ElevIQ Alignment Scan™ are visible only to you. Authorized advisors can access your Alignment Snapshots™, capability progression reports, and permitted developmental insights to support your journey, but they cannot view your individual question-by-question answers.\n\nInformation you choose to upload about your Experience & Context, including your résumé, is not directly visible to your counselor or advisor. They can see whether you have completed this portion of your profile without accessing the underlying personal details.\n\nAdditional technical safeguards and information-handling practices are addressed through the applicable CAS privacy and security documentation.\n\nElevIQ is committed to responsible AI use, appropriate human oversight, and respecting participant privacy throughout the experience.'
      },
      {
        id: 'q25',
        number: 25,
        question: 'Who can see my responses and Alignment Snapshot™?',
        answer: 'Your privacy is an important part of the ElevIQ experience.\n\nOnly you can view your individual answers to the ElevIQ Alignment Scan™. Your uploaded résumé and personal Experience & Context information are also private and cannot be viewed by your counselor, advisor, or organizational administrator.\n\nAuthorized professionals can see whether you have completed your Experience & Context information, but they cannot access the underlying details.\n\nYour Alignment Snapshots™, Capability Signals™ evaluations, and capability progression reports are available to you through your Participant Portal. Authorized advisors and organizational staff can also view permitted reports and capability progression through the Community Intelligence Console™ to help guide your development.\n\nYour individual question responses and private uploads remain separate from the information made available to your supporting organization.'
      },
      {
        id: 'q26',
        number: 26,
        question: 'Will an employer, school, family member, or another organization automatically receive my results?',
        answer: 'No. Your Alignment Snapshot™ and capability progression reports are not automatically shared with outside employers, schools, family members, or other organizations.\n\nOnly authorized professionals within the organization providing your CAS experience can access your permitted reports through the Community Intelligence Console™. Depending on your program, this may include an employer, school counselor, workforce advisor, or other authorized organizational professional.\n\nIf you choose to share your results with someone outside your participating organization, you may download a PDF copy of your Alignment Snapshot™, print it, or share it directly with whomever you choose.\n\nYou control whether your reports are shared outside your participating organization.\n\nYour individual scan answers, uploaded résumé, and private Experience & Context information are not visible to organizational professionals, including administrators and Owners.'
      },
      {
        id: 'q27',
        number: 27,
        question: 'Is my information sold or used to train AI?',
        answer: 'No. ElevIQ Foundation and STC Innovations do not sell your personal information to third parties or use your personal information to train their own AI models.\n\nCAS uses technology, including AI-assisted capabilities where available, to support personalized reflection, capability evaluation, and developmental guidance.\n\nThe handling of information by external technology and AI service providers is governed by the applicable privacy and data-processing arrangements. Additional details about these practices will be provided in the CAS Privacy Notice.'
      },
      {
        id: 'q28',
        number: 28,
        question: 'Can I correct, delete, or stop sharing my information?',
        answer: 'Yes. Participants can choose to stop participating in CAS and revoke their access at any time.\n\nIf you believe information in your profile is incorrect or needs updating, you can contact your program administrator for assistance.\n\nRequests to delete personal information, close an account, or restore access are handled according to the applicable CAS privacy and data-retention procedures.\n\nRevoking access and permanently deleting stored information are separate actions. Details about how information is retained or deleted are provided in the applicable Privacy Notice.'
      }
    ]
  },
  {
    id: 'families-organizations-support',
    number: '06',
    title: 'Families, Organizations and Practical Support',
    badge: 'Youth, Pilots & Support',
    questions: [
      {
        id: 'q29',
        number: 29,
        question: 'How long is information kept and where is it stored?',
        answer: 'The reviewed public information does not establish a verified retention schedule or hosting location for every deployment. Ask for the applicable retention policy, storage region, service-provider information, and handling of backups. Organizations should obtain these details for their own configuration rather than assuming that a general website statement covers their program.'
      },
      {
        id: 'q30',
        number: 30,
        question: 'Can young people participate in the ElevIQ Alignment Scan™?',
        answer: 'Yes. The ElevIQ Alignment Scan™ includes age-appropriate population pathways beginning at age 13.\n\nYoung participants receive invitations through authorized schools, educational programs, workforce organizations, or other participating organizations.\n\nThe participating organization is responsible for coordinating the appropriate parent or guardian consent, supervision, and safeguarding procedures before inviting eligible minors to participate.\n\nCAS provides a personalized scan experience based on the participant\'s age, education level, developmental stage, and selected population pathway.\n\nIndividual scan responses and private Experience & Context information remain accessible only to the participant. Authorized organizational professionals can review permitted Alignment Snapshots™ and capability progression reports to provide appropriate guidance and support.\n\nThe goal is to help young people recognize their capabilities, explore educational and career possibilities, and make informed decisions with appropriate human guidance.'
      },
      {
        id: 'q31',
        number: 31,
        question: 'How can schools and community organizations use ElevIQ?',
        answer: 'ElevIQ Foundation works with schools, workforce programs, community organizations, and other partners to help participants recognize their capabilities, explore meaningful pathways, and connect with guidance and support.\n\nThrough the ElevIQ Capability Alignment System™ (CAS), participating organizations can support personalized reflection, review Capability Signals™, identify Development Opportunities, and monitor individual capability progression over time.\n\nOrganizations can use these insights to guide coaching, education, training, workforce readiness, and next-step planning.\n\nElevIQ Foundation provides mission-driven programs and supporting services, while STC Innovations owns, develops, and provides the underlying CAS technology and organizational solutions.\n\nAvailable services and configurations are established according to each organization\'s program needs and implementation arrangements.'
      },
      {
        id: 'q32',
        number: 32,
        question: 'What should an organization expect from a pilot?',
        answer: 'A CAS pilot provides an opportunity for an organization to explore how capability alignment can support its participants, advisors, and program goals.\n\nBefore beginning, the organization and implementation team establish the participating population, timeline, available features, staff responsibilities, participant communications, and support arrangements.\n\nDepending on the approved pilot scope, the organization may evaluate participation, scan completion, participant feedback, advisor engagement, and documented next steps.\n\nWhen participants complete evaluations over time, their Capability Signals™ can also provide insight into progression in specific capability areas, helping advisors understand developmental changes and identify opportunities for continued support.\n\nEmployment, credential attainment, and other longer-term outcomes require separate follow-up and measurement.\n\nThe purpose of a pilot is to assess practical usefulness, gather feedback, and determine how CAS may support the organization\'s existing workforce, education, or participant-development activities.'
      },
      {
        id: 'q33',
        number: 33,
        question: 'Are all advertised CAS features available now?',
        answer: 'The ElevIQ Capability Alignment System™ (CAS) is an evolving platform, with capabilities available according to each organization\'s implementation and configuration.\n\nThe current CAS experience includes the ElevIQ Alignment Scan™, personalized scenario-based evaluations, Capability Signals™, and Alignment Snapshots™.\n\nParticipants can access their Alignment Snapshots™ immediately after completing a scan, download PDF reports, and review their previous evaluations through the Participant Portal.\n\nCAS also supports repeated evaluations that show capability progression over time.\n\nThrough the Community Intelligence Console™, authorized organizational professionals can review permitted participant reports, monitor capability progression, and use these insights to support guidance and developmental planning.\n\nAdditional organizational configuration and administrative capabilities are being developed and introduced as CAS evolves.\n\nSome features may be in testing, configuration, or development and may not be available in every organizational environment. The specific capabilities included in an organization\'s implementation are established during its onboarding and configuration process.\n\nCAS continues to evolve to better support participants, professionals, and organizations while maintaining human guidance at the center of decision-making.'
      },
      {
        id: 'q34',
        number: 34,
        question: 'Where can I get help or report a concern?',
        answer: 'Use the contact page at www.eleviqfoundation.org/contact or your program coordinator. Explain whether you need access help, clarification of an insight, an accommodation, or help with a privacy concern. For a technical issue, include the time and a brief description, but do not send passwords or unnecessary sensitive information. Ask for the appropriate secure route if more detail is needed.'
      }
    ]
  }
]

export default function FaqPage() {
  const [activeSection, setActiveSection] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedQuestions, setExpandedQuestions] = useState(() => {
    // Open Q1 by default for welcoming user engagement
    return { q1: true }
  })
  const [expandAll, setExpandAll] = useState(false)

  // Filter sections and questions
  const filteredSections = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return FAQ_SECTIONS.map((section) => {
      // If a specific section filter is active, skip non-matching sections
      if (activeSection !== 'all' && section.id !== activeSection) {
        return null
      }

      if (!q) return section

      const matchedQuestions = section.questions.filter((item) => {
        const inQuestion = item.question.toLowerCase().includes(q)
        const inAnswer = item.answer ? item.answer.toLowerCase().includes(q) : false
        const inIntro = item.intro ? item.intro.toLowerCase().includes(q) : false
        const inSubs = item.subsections
          ? item.subsections.some(
              (s) => s.title.toLowerCase().includes(q) || s.content.toLowerCase().includes(q)
            )
          : false
        return inQuestion || inAnswer || inIntro || inSubs
      })

      if (matchedQuestions.length === 0) return null

      return {
        ...section,
        questions: matchedQuestions
      }
    }).filter(Boolean)
  }, [activeSection, searchQuery])

  // Total question count
  const totalVisibleCount = useMemo(() => {
    return filteredSections.reduce((acc, sec) => acc + sec.questions.length, 0)
  }, [filteredSections])

  const toggleQuestion = (id) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const handleToggleExpandAll = () => {
    if (expandAll) {
      setExpandedQuestions({})
      setExpandAll(false)
    } else {
      const allOpen = {}
      FAQ_SECTIONS.forEach((s) => {
        s.questions.forEach((q) => {
          allOpen[q.id] = true
        })
      })
      setExpandedQuestions(allOpen)
      setExpandAll(true)
    }
  }

  return (
    <div className="space-y-10 max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* HERO SECTION */}
      <section className="rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-sky-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-400/40 bg-cyan-950/80 font-mono text-xs font-bold uppercase tracking-wider text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            PARTICIPANT & PARTNER GUIDE
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            ElevIQ Foundation FAQs
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans">
            A comprehensive guide for participants, families, and partner organizations. This guide explains the reflection experience, expected outcomes, human support, and questions about privacy and security.
          </p>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-cyan-500/20 pt-4">
            Availability varies by program. Use the answers to understand the experience and clarify arrangements before participating.
          </p>
        </div>

        {/* SEARCH & FILTER CONTROLS */}
        <div className="mt-8 pt-6 border-t border-cyan-500/20 grid gap-4 sm:grid-cols-[1fr_auto]">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all 34 questions and answers..."
              className="w-full rounded-2xl bg-[#07132D]/95 border border-cyan-500/30 hover:border-cyan-400/60 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/25 px-4 py-3 pl-11 text-sm text-white placeholder:text-slate-400 outline-none transition-all shadow-inner"
            />
            <svg
              className="w-5 h-5 text-cyan-400 absolute left-3.5 top-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3 text-xs text-cyan-300 hover:text-white px-2.5 py-1 rounded-lg bg-[#0B1E40] border border-cyan-500/30 transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* Expand/Collapse Toggle */}
          <button
            type="button"
            onClick={handleToggleExpandAll}
            className="px-5 py-3 rounded-2xl border border-cyan-400/40 bg-cyan-950/60 hover:bg-cyan-900/80 text-xs sm:text-sm font-semibold text-cyan-300 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shrink-0"
          >
            <span>{expandAll ? 'Collapse All' : 'Expand All'}</span>
            <span className="font-mono text-xs">{expandAll ? '↑' : '↓'}</span>
          </button>
        </div>

        {/* SECTION FILTER PILLS */}
        <div className="mt-4 flex flex-wrap gap-2 pt-2">
          <button
            type="button"
            onClick={() => setActiveSection('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
              activeSection === 'all'
                ? 'bg-[#00D2FF] text-slate-950 font-bold shadow-[0_0_15px_rgba(0,210,255,0.4)]'
                : 'bg-[#07132D]/90 border border-cyan-500/25 text-cyan-200/90 hover:border-cyan-400 hover:text-white hover:bg-[#0B1E40]'
            }`}
          >
            All Sections
          </button>
          {FAQ_SECTIONS.map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSection(sec.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                activeSection === sec.id
                  ? 'bg-[#00D2FF] text-slate-950 font-bold shadow-[0_0_15px_rgba(0,210,255,0.4)]'
                  : 'bg-[#07132D]/90 border border-cyan-500/25 text-cyan-200/90 hover:border-cyan-400 hover:text-white hover:bg-[#0B1E40]'
              }`}
            >
              Sec {sec.number}: {sec.title.split(' ')[0].replace(/,/g, '')}
            </button>
          ))}
        </div>
      </section>

      {/* SEARCH SUMMARY WHEN ACTIVE */}
      {searchQuery && (
        <div className="flex items-center justify-between text-xs font-mono text-cyan-400 bg-slate-950/80 border border-cyan-500/30 rounded-xl px-4 py-2.5 shadow-sm">
          <span>Found <strong className="text-white">{totalVisibleCount}</strong> matching questions for "{searchQuery}"</span>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="text-cyan-300 hover:text-white underline font-semibold"
          >
            Reset search
          </button>
        </div>
      )}

      {/* 6 ACCORDION SECTIONS */}
      <div className="space-y-10">
        {filteredSections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#071739]/90 via-[#05112B]/95 to-[#030B1E]/98 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6 transition-all duration-300 text-white"
          >
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-cyan-500/20 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-400/40 px-2.5 py-0.5 rounded-full shadow-[0_0_10px_rgba(0,210,255,0.2)]">
                    SECTION {section.number}
                  </span>
                  <span className="font-mono text-xs text-cyan-200/90 font-medium">
                    {section.badge}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {section.title}
                </h2>
              </div>
              <span className="text-xs font-mono text-cyan-300/80 bg-cyan-950/50 border border-cyan-500/20 px-2.5 py-1 rounded-full self-start sm:self-auto font-medium">
                {section.questions.length} Questions
              </span>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {section.questions.map((q) => {
                const isOpen = Boolean(expandedQuestions[q.id])
                return (
                  <div
                    key={q.id}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'border-cyan-400 bg-gradient-to-b from-[#0C2556] to-[#041029] shadow-[0_0_25px_rgba(0,210,255,0.18)] ring-1 ring-cyan-400/30'
                        : 'border-cyan-500/20 bg-[#0B1E40]/75 hover:border-cyan-400/60 hover:bg-[#0E2756]/90 shadow-sm'
                    }`}
                  >
                    {/* Accordion Trigger */}
                    <button
                      type="button"
                      onClick={() => toggleQuestion(q.id)}
                      className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 group"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-xs sm:text-sm font-bold text-cyan-400 shrink-0 pt-0.5">
                          {q.number < 10 ? `0${q.number}` : q.number}.
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-100 leading-snug transition-colors">
                          {q.question}
                        </h3>
                      </div>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 ${
                          isOpen
                            ? 'rotate-180 border-cyan-400 bg-cyan-500/25 text-cyan-300 shadow-[0_0_12px_rgba(0,210,255,0.4)]'
                            : 'border-cyan-500/30 bg-[#07132D] text-cyan-300/80 group-hover:border-cyan-400 group-hover:bg-cyan-500/20 group-hover:text-white'
                        }`}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    {/* Accordion Content */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-5 pb-5 pt-2 border-t border-cyan-500/20 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans space-y-4 bg-black/25">
                            {/* Standard direct answer */}
                            {q.answer && (
                              <div className="space-y-3 whitespace-pre-line text-slate-100 leading-relaxed">
                                {q.answer}
                              </div>
                            )}

                            {/* Complex question intro */}
                            {q.intro && (
                              <p className="text-cyan-100 font-medium leading-relaxed bg-cyan-950/40 p-3.5 rounded-xl border border-cyan-500/25">
                                {q.intro}
                              </p>
                            )}

                            {/* Subsections (Q9, Q12, Q13, Q22, Q23) */}
                            {q.subsections && (
                              <div className="space-y-3.5 pt-2">
                                {q.subsections.map((sub, sIdx) => (
                                  <div
                                    key={sIdx}
                                    className="p-4 rounded-xl bg-[#030B1E]/95 border border-cyan-500/25 space-y-2 shadow-inner"
                                  >
                                    <h4 className="font-sans text-xs sm:text-sm font-bold text-cyan-300 flex items-center gap-2">
                                      <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,210,255,0.7)] shrink-0" />
                                      {sub.title}
                                    </h4>
                                    <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line pl-3.5 border-l-2 border-cyan-400/50">
                                      {sub.content}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </section>
        ))}

        {filteredSections.length === 0 && (
          <div className="text-center py-12 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#071739]/95 to-[#030B1E]/98 p-8 space-y-4 text-white shadow-xl">
            <div className="w-12 h-12 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">No questions matched your search</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Try searching with different keywords or reset your filter to view all 34 questions.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setActiveSection('all')
              }}
              className="px-5 py-2.5 rounded-full bg-[#00D2FF] hover:bg-[#38BDF8] text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(0,210,255,0.4)] transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* FOOTER CALL-TO-ACTION BANNER */}
      <section className="rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-[#030B1E] via-[#071739] to-[#030B1E] p-6 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-white">
        <div className="space-y-2 text-center md:text-left">
          <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider">
            STILL HAVE QUESTIONS?
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Connect with ElevIQ Foundation
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
            Our pathway team can clarify participation details, connect you with community initiatives, or discuss organizational pilot arrangements.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center shrink-0">
          <Link
            to="/#participation-inquiry"
            className="px-6 py-3 rounded-full bg-[#00D2FF] hover:bg-[#38BDF8] text-slate-950 text-xs sm:text-sm font-bold transition-all shadow-[0_0_20px_rgba(0,210,255,0.45)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Request Scan Access
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-full border border-cyan-400/50 bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-200 hover:text-white text-xs sm:text-sm font-semibold transition-all"
          >
            Contact the Team →
          </Link>
        </div>
      </section>
    </div>
  )
}

