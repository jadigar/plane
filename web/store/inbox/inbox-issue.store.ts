import set from "lodash/set";
import { makeObservable, observable, runInAction, action } from "mobx";
import { TIssue, TInboxIssue, TInboxIssueStatus, TInboxDuplicateIssueDetails } from "@plane/types";
// services
import { InboxIssueService } from "@/services/inbox";
// root store
import { RootStore } from "@/store/root.store";

export interface IInboxIssueStore {
  isLoading: boolean;
  id: string;
  status: TInboxIssueStatus;
  issue: Partial<TIssue>;
  snoozed_till: Date | undefined;
  duplicate_to: string | undefined;
  created_by: string | undefined;
  duplicate_issue_detail: TInboxDuplicateIssueDetails | undefined;
  // actions
  updateInboxIssueStatus: (status: TInboxIssueStatus) => Promise<void>; // accept, decline
  updateInboxIssueDuplicateTo: (issueId: string) => Promise<void>; // connecting the inbox issue to the project existing issue
  updateInboxIssueSnoozeTill: (date: Date) => Promise<void>; // snooze the issue
  updateIssue: (issue: Partial<TIssue>) => Promise<void>; // updating the issue
}

export class InboxIssueStore implements IInboxIssueStore {
  // observables
  isLoading: boolean = false;
  id: string;
  status: TInboxIssueStatus = -2;
  issue: Partial<TIssue> = {};
  snoozed_till: Date | undefined;
  duplicate_to: string | undefined;
  created_by: string | undefined;
  duplicate_issue_detail: TInboxDuplicateIssueDetails | undefined = undefined;
  workspaceSlug: string;
  projectId: string;
  // services
  inboxIssueService;

  constructor(workspaceSlug: string, projectId: string, data: TInboxIssue, private store: RootStore) {
    this.id = data.id;
    this.status = data.status;
    this.issue = data?.issue;
    this.snoozed_till = data?.snoozed_till ? new Date(data.snoozed_till) : undefined;
    this.duplicate_to = data?.duplicate_to || undefined;
    this.created_by = data?.created_by || undefined;
    this.duplicate_issue_detail = data?.duplicate_issue_detail || undefined;
    this.workspaceSlug = workspaceSlug;
    this.projectId = projectId;
    // services
    this.inboxIssueService = new InboxIssueService();
    // observable variables should be defined after the initialization of the values
    makeObservable(this, {
      id: observable,
      status: observable,
      issue: observable,
      snoozed_till: observable,
      duplicate_to: observable,
      duplicate_issue_detail: observable,
      created_by: observable,
      // actions
      updateInboxIssueStatus: action,
      updateInboxIssueDuplicateTo: action,
      updateInboxIssueSnoozeTill: action,
      updateIssue: action,
    });
  }

  updateInboxIssueStatus = async (status: TInboxIssueStatus) => {
    const previousData: Partial<TInboxIssue> = {
      status: this.status,
    };
    try {
      if (!this.issue.id) return;
      set(this, "status", status);
      await this.inboxIssueService.update(this.workspaceSlug, this.projectId, this.issue.id, {
        status: status,
      });
    } catch {
      runInAction(() => set(this, "status", previousData.status));
    }
  };

  updateInboxIssueDuplicateTo = async (issueId: string) => {
    const inboxStatus = 2;
    const previousData: Partial<TInboxIssue> = {
      status: this.status,
      duplicate_to: this.duplicate_to,
    };
    try {
      if (!this.issue.id) return;
      set(this, "status", inboxStatus);
      set(this, "duplicate_to", issueId);
      const issueResponse = await this.inboxIssueService.update(this.workspaceSlug, this.projectId, this.issue.id, {
        status: inboxStatus,
        duplicate_to: issueId,
      });
      runInAction(() => {
        this.duplicate_to = issueResponse.duplicate_to;
        this.duplicate_issue_detail = issueResponse.duplicate_issue_detail;
      });
    } catch {
      runInAction(() => {
        set(this, "status", previousData.status);
        set(this, "duplicate_to", previousData.duplicate_to);
      });
    }
  };

  updateInboxIssueSnoozeTill = async (date: Date) => {
    const inboxStatus = 0;
    const previousData: Partial<TInboxIssue> = {
      status: this.status,
      snoozed_till: this.snoozed_till,
    };
    try {
      if (!this.issue.id) return;
      set(this, "status", inboxStatus);
      set(this, "snoozed_till", date);
      await this.inboxIssueService.update(this.workspaceSlug, this.projectId, this.issue.id, {
        status: inboxStatus,
        snoozed_till: new Date(date),
      });
    } catch {
      runInAction(() => {
        set(this, "status", previousData.status);
        set(this, "snoozed_till", previousData.snoozed_till);
      });
    }
  };

  updateIssue = async (issue: Partial<TIssue>) => {
    const inboxIssue = this.issue;
    try {
      if (!this.issue.id) return;
      Object.keys(issue).forEach((key) => {
        const issueKey = key as keyof TIssue;
        set(inboxIssue, issueKey, issue[issueKey]);
      });
      await this.inboxIssueService.updateIssue(this.workspaceSlug, this.projectId, this.issue.id, issue);
      // fetching activity
      await this.store.issue.issueDetail.fetchActivities(this.workspaceSlug, this.projectId, this.issue.id);
    } catch {
      Object.keys(issue).forEach((key) => {
        const issueKey = key as keyof TIssue;
        set(inboxIssue, issueKey, inboxIssue[issueKey]);
      });
    }
  };
}
