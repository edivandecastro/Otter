import { Container } from '@/src/components/Container';
import { FabAdd } from '@/src/components/FabAdd';
import { Sidebar } from '@/src/components/Sidebar';
import { Toaster } from '@/src/components/Toaster';
import { TopBar } from '@/src/components/TopBar';
import { UserProvider } from '@/src/components/UserProvider';
import { UserProfile } from '@/src/types/db';
import { Database } from '@/src/types/supabase';
import { getDbMetadata } from '@/src/utils/fetching/meta';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';

import './layout.css';

interface LayoutProps {
  children?: ReactNode;
}

export default async function AppLayout({ children }: LayoutProps) {
  const supabaseClient = createServerComponentClient<Database>({ cookies });
  const dbMeta = await getDbMetadata(supabaseClient);
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();
  const userProfile = await supabaseClient
    .from('profiles')
    .select('*')
    .match({ id: user?.id })
    .single();

  return (
    <UserProvider profile={userProfile?.data as UserProfile} id={user?.id}>
      <div className="otter-app-container">
        <TopBar serverDbMeta={dbMeta} />
        <div className="otter-primary-pane">
          <Sidebar serverDbMeta={dbMeta} />
          <div className="otter-sidebar-pane-overlay" />
          <div className="otter-content-pane">
            <div className="otter-content-pane-inner">
              <Container>{children}</Container>
            </div>
          </div>
        </div>
        <FabAdd />
        <Toaster />
      </div>
    </UserProvider>
  );
}
