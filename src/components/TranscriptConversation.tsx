import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface Message {
  speaker: 'doctor' | 'patient'
  name: string
  text: string
  timestamp: string
}

interface TranscriptConversationProps {
  transcript: string
  doctorName: string
  patientName: string
}

// Parse raw transcript text into conversation messages
function parseTranscript(transcript: string, doctorName: string, patientName: string): Message[] {
  // For demo purposes, we'll convert the clinical note into a conversation format
  // In a real app, this would come from actual audio transcription with speaker labels
  
  const conversationData: { speaker: 'doctor' | 'patient'; text: string; time: string }[] = [
    { speaker: 'doctor', text: `Good morning, Robert! How's the knee doing? I see you're here because the pain has been getting worse.`, time: '10:00' },
    { speaker: 'patient', text: `Hi Dr. Miller. Yeah, it's been rough the past few weeks. The pain is really bothering me, especially in the afternoons after I've been standing at work.`, time: '10:01' },
    { speaker: 'doctor', text: `I'm sorry to hear that. Can you tell me more about where exactly the pain is?`, time: '10:02' },
    { speaker: 'patient', text: `It's mainly on the inside part of my left knee. By the end of my shift, it's really aching.`, time: '10:03' },
    { speaker: 'doctor', text: `And you've been taking ibuprofen for it - is that helping at all anymore?`, time: '10:04' },
    { speaker: 'patient', text: `Not really. The 400mg used to take the edge off, but now it barely does anything.`, time: '10:05' },
    { speaker: 'doctor', text: `Have you had any falls or injuries to the knee recently? Or does it ever lock up or feel like it's going to give way?`, time: '10:06' },
    { speaker: 'patient', text: `No, nothing like that. No injuries. It just aches and hurts when I put weight on it.`, time: '10:07' },
    { speaker: 'doctor', text: `Any fever, chills, or other symptoms?`, time: '10:08' },
    { speaker: 'patient', text: `No, nothing else. Just the knee.`, time: '10:09' },
    { speaker: 'doctor', text: `Okay, I reviewed your X-rays from last month. They do show that the arthritis in the inner part of your knee has progressed compared to your previous imaging. Let me examine you.`, time: '10:10' },
    { speaker: 'doctor', text: `Your vitals look good - blood pressure 138/88, heart rate 72. Now let me take a look at the knee.`, time: '10:12' },
    { speaker: 'doctor', text: `I can feel some tenderness right along the medial joint line. You have full range of motion which is good. No swelling. Your stability tests are negative - that's good news, your ligaments are intact.`, time: '10:15' },
    { speaker: 'patient', text: `So what's causing all this pain then?`, time: '10:16' },
    { speaker: 'doctor', text: `It's the osteoarthritis progressing. The cartilage cushion in your knee is wearing down, and that's causing the pain, especially with prolonged standing.`, time: '10:17' },
    { speaker: 'patient', text: `What can we do about it?`, time: '10:18' },
    { speaker: 'doctor', text: `I have a plan. First, let's switch you from ibuprofen to Naproxen - it's a stronger anti-inflammatory. Take 500mg twice a day with food.`, time: '10:19' },
    { speaker: 'patient', text: `Okay, I can do that.`, time: '10:20' },
    { speaker: 'doctor', text: `Second, I'm referring you to physical therapy. They'll work with you on exercises to strengthen the muscles around your knee, which will help support it and reduce pain.`, time: '10:21' },
    { speaker: 'patient', text: `That makes sense. How long until I feel better?`, time: '10:22' },
    { speaker: 'doctor', text: `Give it about 6 weeks with the medication and PT. If you're not improving by then, we'll order an MRI to get a more detailed look at the cartilage and soft tissues.`, time: '10:23' },
    { speaker: 'patient', text: `And if PT doesn't help?`, time: '10:24' },
    { speaker: 'doctor', text: `There are other options we can discuss - injections, bracing, and if needed down the road, surgical options. But let's see how you respond to conservative treatment first. Also, try to avoid standing for long periods. Take sitting breaks when you can.`, time: '10:25' },
    { speaker: 'patient', text: `Got it. Anything I should watch out for with the new medication?`, time: '10:26' },
    { speaker: 'doctor', text: `Take it with food to protect your stomach. If you notice any stomach pain, black stools, or unusual bleeding, stop the medication and call us right away.`, time: '10:27' },
    { speaker: 'patient', text: `Will do. Thanks, Dr. Miller.`, time: '10:28' },
    { speaker: 'doctor', text: `You're welcome, Robert. The PT office will call you to schedule. I'll see you back in 6 weeks to see how you're doing. Take care!`, time: '10:29' },
  ]

  return conversationData.map((msg) => ({
    speaker: msg.speaker,
    name: msg.speaker === 'doctor' ? doctorName : patientName,
    text: msg.text,
    timestamp: msg.time,
  }))
}

export function TranscriptConversation({ transcript, doctorName, patientName }: TranscriptConversationProps) {
  const messages = parseTranscript(transcript, doctorName, patientName)

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto scrollbar-thin p-4">
      {messages.map((message, idx) => (
        <div
          key={idx}
          className={cn(
            'flex gap-3',
            message.speaker === 'patient' ? 'flex-row-reverse' : 'flex-row'
          )}
        >
          {/* Avatar */}
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarFallback
              className={cn(
                'text-sm font-medium',
                message.speaker === 'doctor'
                  ? 'bg-blue-500 text-white'
                  : 'bg-purple-500 text-white'
              )}
            >
              {message.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>

          {/* Message Bubble */}
          <div
            className={cn(
              'flex flex-col max-w-[75%]',
              message.speaker === 'patient' ? 'items-end' : 'items-start'
            )}
          >
            {/* Name and Timestamp */}
            <div
              className={cn(
                'flex items-center gap-2 mb-1',
                message.speaker === 'patient' ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              <span className="text-xs font-medium text-muted-foreground">
                {message.name}
              </span>
              <span className="text-xs text-muted-foreground/70">
                {message.timestamp}
              </span>
            </div>

            {/* Bubble */}
            <div
              className={cn(
                'px-4 py-2.5 rounded-2xl text-sm leading-relaxed',
                message.speaker === 'doctor'
                  ? 'bg-blue-50 text-blue-900 rounded-tl-md border border-blue-100'
                  : 'bg-purple-50 text-purple-900 rounded-tr-md border border-purple-100'
              )}
            >
              {message.text}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

