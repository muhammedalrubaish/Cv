export interface PersonalInfo {
  fullName: string
  jobTitle: string
  phone: string
  email: string
  city: string
  linkedin?: string
  summary: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa?: string
}

export interface Skill {
  id: string
  name: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

export interface Language {
  id: string
  name: string
  level: 'basic' | 'intermediate' | 'fluent' | 'native'
}

export interface CVData {
  personalInfo: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  languages: Language[]
  template: 'classic' | 'modern' | 'executive'
}

export interface WhatsAppMessage {
  from: string
  body: string
  timestamp: string
  messageId: string
}

export interface CustomerSession {
  phone: string
  step: ConversationStep
  cvData: Partial<CVData>
  createdAt: Date
}

// 'auto'  => follow the global availability toggle
// 'bot'   => bot always handles this conversation
// 'human' => the owner handles this conversation manually
export type ConversationMode = 'auto' | 'bot' | 'human'

export interface Conversation {
  phone: string
  name: string
  step: ConversationStep
  cvData: Partial<CVData>
  mode: ConversationMode
  unread: number
  createdAt: number
  lastMessageAt: number
}

export interface StoredMessage {
  dir: 'in' | 'out'
  actor: 'customer' | 'bot' | 'human'
  text: string
  ts: number
}

export type Availability = 'available' | 'busy'

export type ConversationStep =
  | 'greeting'
  | 'name'
  | 'job_title'
  | 'phone'
  | 'email'
  | 'city'
  | 'summary'
  | 'experience_count'
  | 'experience_details'
  | 'education'
  | 'skills'
  | 'languages'
  | 'template_choice'
  | 'confirm'
  | 'payment'
  | 'completed'
