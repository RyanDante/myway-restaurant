import { Client, Databases, Account } from 'appwrite';

const client = new Client();

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

if (!endpoint || !projectId) {
  console.warn(
    'Appwrite environment variables NEXT_PUBLIC_APPWRITE_ENDPOINT or NEXT_PUBLIC_APPWRITE_PROJECT_ID are missing.'
  );
} else {
  client.setEndpoint(endpoint).setProject(projectId);
}

export const databases = new Databases(client);
export const account = new Account(client);
export { client };
