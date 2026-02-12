import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
    title: 'Train Schedule',
    description: 'Train Schedule App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <AuthProvider>{children}</AuthProvider>
        </body>
        </html>
    );
}
