import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import styles from '@/styles/admin.module.css';
import '@/app/globals.css';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    // If not authenticated, show children (login page) without guard
    // The login page itself handles the sign-in; other admin pages use their own checks
    if (!session) {
        // Return children without sidebar (login page renders normally)
        return <>{children}</>;
    }

    return (
        <div className={styles.adminLayout}>
            <AdminSidebar adminName={session.user?.name || ''} />
            <div className={styles.mainArea}>
                {children}
            </div>
        </div>
    );
}
