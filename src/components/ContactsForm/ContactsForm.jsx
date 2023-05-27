import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  FormField,
  Form,
  FormFieldWrapper,
  FieldStyled,
  ErrorMessage,
  BtnForm,
} from './ContactsForm.styled';
import {
  BsFillPersonPlusFill,
  BsPersonFill,
  BsFillTelephoneFill,
} from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
import { getContacts } from '../../redux/selectors';
import { toast } from 'react-hot-toast';

const ContactsSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d`Artagnan'
    )
    .required('Required field!'),
  number: Yup.string()
    .trim()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Required field!'),
});

export const ContactsForm = () => {
  const contacts = useSelector(getContacts);

  const dispatch = useDispatch();

  const isDuplicatedContact = ({ name, number }) => {
    const normalizedName = name.toLowerCase().trim();
    const normalizedNumber = number.trim();

    const duplicatedContact = contacts.find(
      contact =>
        contact.name.toLowerCase().trim === normalizedName ||
        contact.number.trim() === normalizedNumber
    );
    return Boolean(duplicatedContact);
  };

  const onAddContact = ({ name, number }) => {
    if (isDuplicatedContact({ name, number })) {
      return toast.error('Please enter something');
    }
    dispatch(addContact({ name, number }));
  };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={ContactsSchema}
      onSubmit={(values, actions) => {
        onAddContact({ ...values });
        actions.resetForm();
      }}
    >
      <Form autoComplete="off">
        <FormField htmlFor="name">
          <FormFieldWrapper>
            <BsPersonFill size="18" />
            Name
          </FormFieldWrapper>

          <FieldStyled type="text" name="name" placeholder="Name" />
          <ErrorMessage name="name" component="div" />
        </FormField>
        <FormField htmlFor="number">
          <FormFieldWrapper>
            <BsFillTelephoneFill size="14" />
            Number
          </FormFieldWrapper>

          <FieldStyled
            type="tel"
            name="number"
            placeholder="+38-XXX-XXX-XX-XX"
          />
          <ErrorMessage name="number" component="div" />
        </FormField>
        <BtnForm type="submit">
          <BsFillPersonPlusFill size="16" />
          Add contact
        </BtnForm>
      </Form>
    </Formik>
  );
};
