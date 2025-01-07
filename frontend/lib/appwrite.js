import { Client, Account} from 'appwrite';

export const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('675d83f600117adc05d4'); // Replace with your project ID

export const account = new Account(client);
export { ID } from 'appwrite';
