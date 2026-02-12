import './globals.css';
import { Header } from '@/components/Header';

interface MainLayoutProps {
    title?: string;
    children: React.ReactNode;
}

export default function MainLayout({ title, children }: MainLayoutProps) {
    return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200">
                <Header />

                {title && (
                    <h1 className="text-4xl font-mono font-bold text-center text-green-500 my-8 tracking-wider">
                        {title}
                    </h1>
                )}

                <main className="p-6">
                    {children}
                </main>
            </div>
    );
}
