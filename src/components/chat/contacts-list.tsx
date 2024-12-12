import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Contact } from './chat-layout';

interface ContactsListProps {
  contacts: Contact[];
  onContactClick: (contact: Contact) => void;
  currentContact: Contact | null;
}

export function ContactsList({
  contacts,
  onContactClick,
  currentContact,
}: ContactsListProps) {
  return (
    <ScrollArea className='h-[calc(100vh-4rem)]'>
      <div className='py-4'>
        <h2 className='mb-4 text-xl font-semibold font-playfair px-4'>
          Contacts
        </h2>
        <ul className='space-y-2'>
          {contacts.map((contact) => (
            <li
              key={contact.id}
              className={`flex items-center space-x-3 p-2  hover:bg-card/50 cursor-pointer ${
                currentContact?.id === contact.id ? 'bg-card/90' : ''
              }`}
              onClick={() => onContactClick(contact)}
            >
              <Avatar className='size-12'>
                <AvatarImage src={contact.avatar} alt={contact.name} />
                <AvatarFallback className='bg-[#F8F8F8]'>
                  {contact.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className='font-medium text-sm'>{contact.name}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ScrollArea>
  );
}
