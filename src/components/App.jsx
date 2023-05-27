import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout/Layout';
import { Section } from './Section/Section';
import { ContactsForm } from './ContactsForm/ContactsForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';

// render > didMount > getItem > setState > update > render > didUpdate > setItem

export const App = () => {
  return (
    <Layout>
      <Section title="Phonebook">
        <ContactsForm />
      </Section>
      <Section title="Contacts">
        <Filter />
        <ContactsList />
      </Section>
      <GlobalStyle />
    </Layout>
  );
};
