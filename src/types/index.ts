export type TabId = 'topology' | 'monitoring' | 'versions' | 'agent' | 'deploy';

export type ComponentCategory = 'infrastructure' | 'platform' | 'observability' | 'data' | 'agent';

export type ComponentStatus = 'ok' | 'warn';

export interface KubeComponent {
  id: string;
  name: string;
  icon: string;
  category: ComponentCategory;
  version: string;
  healthScore: number;
  cpu: number;
  mem: number;
  status: ComponentStatus;
  color: string;
  isOperator: boolean;
  dependsOn: string[];
  compatibleWith: string;
  managedBy?: string;
}

export interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

export interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  time: string;
  status: 'firing' | 'resolved';
  message: string;
  component: string;
}

export interface VersionUpdate {
  id: string;
  name: string;
  icon: string;
  currentVersion: string;
  latestVersion: string;
  compatible: boolean;
  patchOnly?: boolean;
  note: string;
  date: string;
}

export interface AgentInfo {
  id: string;
  name: string;
  icon: string;
  status: 'active' | 'idle';
  description: string;
}

export interface McpServer {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
}

export interface DeployWave {
  id: number;
  name: string;
  status: 'done' | 'active' | 'pending';
}

export interface DeployLogEntry {
  time: string;
  message: string;
  status: 'done' | 'active' | 'pending';
}

export interface ArgoApp {
  name: string;
  icon: string;
  status: 'Synced' | 'Syncing';
}

export type SidePanelMode = 'component' | 'alerts' | null;
