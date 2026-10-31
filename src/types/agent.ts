
export type AgentStatus =
  | "planned"
  | "inactive"
  | "idle"
  | "working"
  | "paused"
  | "error";

export type AgentCategory =
  | "Operations"
  | "Growth"
  | "Development"
  | "Creative"
  | "Quality"
  | "Support";

export type AgentDefinition = {
  id: string;
  name: string;
  department: string;
  category: AgentCategory;
  role: string;
  description: string;

  responsibilities: string[];

  capabilities: string[];

  status: AgentStatus;

  configuration: {
    modelProvider: string | null;
    modelName: string | null;
    temperature: number;
    maxRetries: number;
  };

  permissions: {
    canAccessKnowledge: boolean;
    canUseExternalTools: boolean;
    requiresApprovalForExternalActions: boolean;
  };

  createdAt: string;
  updatedAt: string;
};
