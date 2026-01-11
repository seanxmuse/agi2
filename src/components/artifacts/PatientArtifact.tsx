import { useState } from 'react'
import {
  FileText,
  Video,
  Music,
  Smartphone,
  Globe,
  GraduationCap,
  Heart,
  Pill,
  Calendar,
  AlertTriangle,
  MessageCircle,
  Send,
  Mic,
  Settings2,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import type { PatientArtifact as PatientArtifactType, ArtifactFormat, LiteracyLevel, Language } from '@/types'
import { cn } from '@/lib/utils'

interface PatientArtifactProps {
  artifact: PatientArtifactType
  patientName: string
  isPatientView?: boolean
}

const formatOptions: { value: ArtifactFormat; label: string; icon: typeof FileText }[] = [
  { value: 'pdf', label: 'PDF Summary', icon: FileText },
  { value: 'video', label: 'Video Explainer', icon: Video },
  { value: 'tiktok', label: 'TikTok Style', icon: Smartphone },
  { value: 'audio', label: 'Audio Version', icon: Music },
]

const literacyOptions: { value: LiteracyLevel; label: string }[] = [
  { value: 5, label: '5th Grade' },
  { value: 8, label: '8th Grade' },
  { value: 12, label: '12th Grade' },
  { value: 'professional', label: 'Professional' },
]

const languageOptions: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'zh', label: '中文' },
  { value: 'other', label: 'Other' },
]

export function PatientArtifact({ artifact, patientName, isPatientView = true }: PatientArtifactProps) {
  const [selectedFormat, setSelectedFormat] = useState<ArtifactFormat>(artifact.preferences.format)
  const [selectedLiteracy, setSelectedLiteracy] = useState<LiteracyLevel>(artifact.preferences.literacyLevel)
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(artifact.preferences.language)
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const [preferencesOpen, setPreferencesOpen] = useState(false)

  const handleSendMessage = () => {
    if (!chatInput.trim()) return

    setMessages((prev) => [
      ...prev,
      { role: 'user', content: chatInput },
      {
        role: 'assistant',
        content: `Great question! A stress test is a simple procedure where we monitor your heart while you exercise on a treadmill. It helps us see how your heart handles activity. The test usually takes about 30-45 minutes, and you'll be monitored by medical staff the entire time. Is there anything specific about the stress test you'd like to know more about?`,
      },
    ])
    setChatInput('')
  }

  return (
    <div className="space-y-6">
      {/* Patient Summary */}
      <Card className="border-2 border-blue-200 overflow-hidden">
        <div className="gradient-medical px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            Your Visit Summary
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="text-white/80 hover:text-white hover:bg-white/20"
            onClick={() => setPreferencesOpen(true)}
            title="Personalization Options"
          >
            <Settings2 className="h-5 w-5" />
          </Button>
        </div>
        <CardContent className="pt-6 space-y-6">
          {/* Greeting */}
          <div>
            <p className="text-lg">{artifact.content.greeting}</p>
          </div>

          {/* What's Going On */}
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <h3 className="font-semibold text-blue-800 flex items-center gap-2 mb-2">
              <Heart className="h-5 w-5" />
              What's Going On
            </h3>
            <p className="text-blue-700">{artifact.content.summary}</p>
          </div>

          {/* Medications */}
          <div>
            <h3 className="font-semibold flex items-center gap-2 mb-3">
              <Pill className="h-5 w-5 text-purple-500" />
              Your Medications
            </h3>
            <ul className="space-y-2">
              {artifact.content.medications.map((med, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5">•</span>
                  <span>{med}</span>
                  {med.toLowerCase().includes('new') && (
                    <Badge variant="success" className="ml-1">NEW</Badge>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Next Steps */}
          <div>
            <h3 className="font-semibold flex items-center gap-2 mb-3">
              <Calendar className="h-5 w-5 text-blue-500" />
              What's Next
            </h3>
            <ol className="space-y-3">
              {artifact.content.nextSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="h-6 w-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-sm">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Warning Signs */}
          <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
            <h3 className="font-semibold text-amber-800 flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5" />
              {artifact.content.warningSignsTitle}
            </h3>
            <ul className="space-y-2">
              {artifact.content.warningSigns.map((sign, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-amber-700">
                  <span className="mt-0.5">⚠️</span>
                  <span>{sign}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ask Questions CTA - Only for patient view */}
          {isPatientView && (
            <div className="text-center pt-4 space-y-3">
              <Button
                size="lg"
                className="gap-2"
                onClick={() => document.getElementById('qa-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <MessageCircle className="h-5 w-5" />
                Click here to ask questions
              </Button>
              <p className="text-xs text-muted-foreground">
                Note: This is AI generated and not considered medical advice
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Interactive Q&A - Only for patient view */}
      {isPatientView && (
        <Card id="qa-section">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageCircle className="h-5 w-5 text-blue-500" />
              Have questions? Ask me anything about your visit
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Chat Messages */}
            {messages.length > 0 && (
              <div className="space-y-4 max-h-64 overflow-y-auto scrollbar-thin">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      'p-3 rounded-lg max-w-[85%]',
                      msg.role === 'user'
                        ? 'bg-blue-500 text-white ml-auto'
                        : 'bg-muted'
                    )}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex gap-2">
              <Input
                placeholder="What does a stress test involve?"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button variant="ghost" size="icon" title="Voice input">
                <Mic className="h-5 w-5" />
              </Button>
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* Suggested Questions */}
            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2">
                {[
                  'What is a stress test?',
                  'Why do I need blood work?',
                  'What should I eat?',
                ].map((q) => (
                  <Button
                    key={q}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setChatInput(q)
                    }}
                  >
                    {q}
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Personalization Popup */}
      <Dialog open={preferencesOpen} onOpenChange={setPreferencesOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-500 flex items-center justify-center">
                <Heart className="h-4 w-4 text-white" />
              </div>
              Personalization Options
            </DialogTitle>
            <DialogDescription>
              Customize how you'd like to view your visit summary
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5 pt-2">
            {/* Format Selection */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Format Preferences
              </p>
              <div className="grid grid-cols-2 gap-2">
                {formatOptions.map((option) => {
                  const Icon = option.icon
                  return (
                    <button
                      key={option.value}
                      onClick={() => setSelectedFormat(option.value)}
                      className={cn(
                        'flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all',
                        selectedFormat === option.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-transparent bg-muted/50 hover:bg-muted'
                      )}
                    >
                      <Icon className={cn('h-5 w-5', selectedFormat === option.value ? 'text-blue-500' : 'text-muted-foreground')} />
                      <span className={cn('text-xs font-medium', selectedFormat === option.value ? 'text-blue-600' : 'text-muted-foreground')}>
                        {option.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Literacy Level */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Literacy Level
              </p>
              <div className="flex flex-wrap gap-2">
                {literacyOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedLiteracy(option.value)}
                    className={cn(
                      'px-4 py-2 rounded-full text-sm font-medium transition-all',
                      selectedLiteracy === option.value
                        ? 'bg-blue-500 text-white'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Language */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Language
              </p>
              <div className="flex flex-wrap gap-2">
                {languageOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedLanguage(option.value)}
                    className={cn(
                      'px-4 py-2 rounded-full text-sm font-medium transition-all',
                      selectedLanguage === option.value
                        ? 'bg-blue-500 text-white'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

