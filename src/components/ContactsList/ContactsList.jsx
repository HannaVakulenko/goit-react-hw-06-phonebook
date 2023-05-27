import { useDispatch, useSelector } from 'react-redux';
import { DataList, DataItem, BtnDeleteContact } from './ContactsList.styled';
import { MdDeleteForever } from 'react-icons/md';
import { Notification } from 'components/Notification/Notification';

import { deleteContact } from 'redux/contactsSlice';
import { getContacts, getFilter } from 'redux/selectors';

export const ContactsList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const filteredContacts = contacts?.filter(contact =>
    contact?.name?.toLowerCase().includes(filter.toLowerCase())
  );

  const dispatch = useDispatch();

  const onDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return filteredContacts.length > 0 ? (
    <DataList>
      {filteredContacts.map(({ name, number, id }) => {
        return (
          <DataItem key={id}>
            <span>{name}:</span>
            <span>{number}</span>
            <BtnDeleteContact type="button" onClick={() => onDeleteContact(id)}>
              <MdDeleteForever size="16" />
              Delete
            </BtnDeleteContact>
          </DataItem>
        );
      })}
    </DataList>
  ) : (
    <Notification message="There is no contacts" />
  );
};
