import { Paperclip } from 'lucide-react';
import { useState } from 'react';
// import { Icons } from '../shared/icons';
import { AutosizeTextarea } from '../ui/auto-resize-textarea';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

export function MessageInput({ onSendMessage, disabled }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex space-x-2'>
      <div className='bg-[#FAFAFA] py-4 rounded-[12px] w-16 flex items-center justify-center'>
        <Paperclip size={20} className='text-primary' />
      </div>
      <div className='border-[#D9D9D9] flex-grow border px-4 rounded-[12px] placeholder:text-[#909090] bg-[#FAFAFA] items-center flex'>
        <AutosizeTextarea
          placeholder={
            disabled
              ? 'Select a contact to start chatting'
              : 'Type a message...'
          }
          value={message}
          minHeight={10}
          maxHeight={150}
          onChange={(e) => setMessage(e.target.value)}
          className='flex-grow border-0 placeholder:text-[#909090]  bg-[#FAFAFA] shadow-none  shad-no-focus'
          disabled={disabled}
        />
        <button
          type='submit'
          // size='icon'
          className='bg-transparent border-0 shadow-none disabled:opacity-50'
          disabled={disabled || !message.trim()}
        >
          {/* <Icons.send className='size-8 text-primary' /> */}
          <span className='sr-only'>Send message</span>
        </button>
      </div>
    </form>
  );
}
