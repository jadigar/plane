import { ReactElement, useEffect } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
// components
import { PageHead } from "@/components/core";
import { EmptyState } from "@/components/empty-state";
import { ProjectInboxHeader } from "@/components/headers";
import { InboxIssueRoot } from "@/components/inbox";
// constants
import { EmptyStateType } from "@/constants/empty-state";
// hooks
import { useProject, useProjectInbox } from "@/hooks/store";
// layouts
import { AppLayout } from "@/layouts/app-layout";
// types
import { NextPageWithLayout } from "@/lib/types";

const ProjectInboxPage: NextPageWithLayout = observer(() => {
  /// router
  const router = useRouter();
  const { workspaceSlug, projectId, currentTab: navigationTab, inboxIssueId } = router.query;
  // hooks
  const { currentProjectDetails } = useProject();
  const { currentTab, handleCurrentTab } = useProjectInbox();

  if (!workspaceSlug || !projectId) return <></>;

  // No access to inbox
  if (currentProjectDetails?.inbox_view === false)
    return (
      <div className="flex items-center justify-center h-full w-full">
        <EmptyState
          type={EmptyStateType.DISABLED_PROJECT_INBOX}
          primaryButtonLink={`/${workspaceSlug}/projects/${projectId}/settings/features`}
        />
      </div>
    );

  // derived values
  const pageTitle = currentProjectDetails?.name ? `${currentProjectDetails?.name} - Inbox` : "Plane - Inbox";

  useEffect(() => {
    if (navigationTab && currentTab != navigationTab) handleCurrentTab(navigationTab === "open" ? "open" : "closed");
  }, [currentTab, navigationTab, handleCurrentTab]);

  return (
    <div className="flex h-full flex-col">
      <PageHead title={pageTitle} />
      <div className="w-full h-full overflow-hidden">
        <InboxIssueRoot
          workspaceSlug={workspaceSlug.toString()}
          projectId={projectId.toString()}
          inboxIssueId={inboxIssueId?.toString() || undefined}
          inboxAccessible={currentProjectDetails?.inbox_view || false}
        />
      </div>
    </div>
  );
});

ProjectInboxPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout header={<ProjectInboxHeader />} withProjectWrapper>
      {page}
    </AppLayout>
  );
};

export default ProjectInboxPage;
