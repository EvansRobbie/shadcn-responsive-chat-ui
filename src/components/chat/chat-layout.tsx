'use client';

import { useState } from 'react';
import { ContactsList } from './contacts-list';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { MessageArea } from './message-area';
import { MessageInput } from './message-input';

export type Contact = {
  id: number;
  name: string;
  avatar: string;
  status: string;
};

export type Message = {
  id: number;
  senderId: number;
  content: string;
  timestamp: string;
};

const contacts: Contact[] = [
  {
    id: 1,
    name: 'KRASPS Support',
    avatar: '/avatars/alice.jpg',
    status: 'online',
  },
  { id: 2, name: 'Bob Smith', avatar: '/avatars/bob.jpg', status: 'offline' },
  {
    id: 3,
    name: 'Charlie Brown',
    avatar: '/avatars/charlie.jpg',
    status: 'away',
  },
];

const initialMessages: Record<number, Message[]> = {
  1: [
    {
      id: 1,
      senderId: 1,
      content:
        'Good morning Peter.We have disbursed your pension payout for the month of October 2024. Please check your account in 3 days. Thank you.',
      timestamp: '10:00 AM',
    },
    {
      id: 2,
      senderId: 1,
      content:
        'Good morning Peter.We have disbursed your pension payout for the month of November 2024. Please check your account in 3 days. Thank you.',
      timestamp: '10:02 AM',
    },
    {
      id: 3,
      senderId: 0,
      content: 'Hello, I have received the payout, thank you.',
      timestamp: '10:05 AM',
    },
  ],
  2: [
    {
      id: 1,
      senderId: 2,
      content: 'Hello! Are we still on for lunch?',
      timestamp: '11:30 AM',
    },
    {
      id: 2,
      senderId: 0,
      content: 'Yes, definitely! See you at 12:30.',
      timestamp: '11:35 AM',
    },
  ],
  3: [
    {
      id: 1,
      senderId: 3,
      content: 'Can you review my pull request?',
      timestamp: '2:00 PM',
    },
    {
      id: 2,
      senderId: 0,
      content: "Sure, I'll take a look right away.",
      timestamp: '2:05 PM',
    },
  ],
};

export default function ChatLayout() {
  const [currentContact, setCurrentContact] = useState<Contact | null>(null);
  const [messages, setMessages] =
    useState<Record<number, Message[]>>(initialMessages);
  const [isOpen, setIsOpen] = useState(false);

  const handleContactClick = (contact: Contact) => {
    setCurrentContact(contact);
    setIsOpen(false);
  };

  const handleSendMessage = (content: string) => {
    if (currentContact) {
      const newMessage: Message = {
        id: messages[currentContact.id].length + 1,
        senderId: 0, // Assuming 0 is the current user's ID
        content,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages((prev) => ({
        ...prev,
        [currentContact.id]: [...prev[currentContact.id], newMessage],
      }));
    }
  };

  return (
    <div className='flex h-screen bg-background border border-muted-foreground'>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden relative top-4 left-4 z-10'
          >
            <Menu className='h-6 w-6' />
            <span className='sr-only'>Open contacts</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='p-0 w-80'>
          <SheetTitle className='sr-only'>Contacts</SheetTitle>
          <ContactsList
            contacts={contacts}
            onContactClick={handleContactClick}
            currentContact={currentContact}
          />
        </SheetContent>
      </Sheet>

      <div className='hidden md:block w-80 min-w-80 border-r border-r-card/90'>
        <ContactsList
          contacts={contacts}
          onContactClick={handleContactClick}
          currentContact={currentContact}
        />
      </div>

      <div className='flex flex-col flex-grow'>
        <div className='flex items-center p-4 border-b border-b-card/90'>
          <h1 className='text-xl font-semibold ml-12 md:ml-0 font-playfair'>
            Chat
          </h1>
        </div>
        <div className='flex-grow overflow-hidden bg-[#FCFCFC]'>
          <MessageArea
            messages={currentContact ? messages[currentContact.id] : []}
            currentContact={currentContact}
          />
        </div>
        <div className='md:p-4 pr-4  bg-background'>
          <MessageInput
            onSendMessage={handleSendMessage}
            disabled={!currentContact}
          />
        </div>
      </div>
    </div>
  );
}
