import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Message, Contact } from './chat-layout';

interface MessageAreaProps {
  messages: Message[];
  currentContact: Contact | null;
}

function getAvatarUrl(name: string): string {
  return `/avatars/${name.toLowerCase().replace(' ', '')}.jpg`;
}

export function MessageArea({ messages, currentContact }: MessageAreaProps) {
  if (!currentContact) {
    return (
      <div className='h-full flex items-center justify-center'>
        <p className='text-foreground '>Select a contact to start chatting</p>
      </div>
    );
  }

  return (
    <ScrollArea className='h-full p-4'>
      <div className='space-y-4 pt-8'>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === 0 ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`flex ${
                message.senderId === 0 ? 'flex-row-reverse  ' : 'flex-row '
              } items-start gap-2`}
            >
              <Avatar className='size-8'>
                <AvatarImage
                  src={
                    message.senderId === 0
                      ? '/avatars/you.jpg'
                      : getAvatarUrl(currentContact.name)
                  }
                  alt={message.senderId === 0 ? 'You' : currentContact.name}
                />
                <AvatarFallback className='bg-[#F8F8F8] text-sm'>
                  {message.senderId === 0
                    ? 'You'
                    : currentContact.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                </AvatarFallback>
              </Avatar>
              <div
                className={`rounded-lg p-3 border border-muted-foreground ${
                  message.senderId === 0
                    ? 'bg-muted-foreground text-foreground'
                    : 'bg-background'
                }`}
              >
                <p className='text-sm leading-relaxed'>{message.content}</p>
                <p className='text-xs text-[#5F5F5F] mt-1'>
                  {message.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
