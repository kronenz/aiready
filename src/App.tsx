import { useState, useCallback } from 'react';
import { TopBar } from './components/TopBar';
import { SidePanel } from './components/SidePanel';
import { TopologyTab } from './components/tabs/TopologyTab';
import { MonitoringTab } from './components/tabs/MonitoringTab';
import { VersionTab } from './components/tabs/VersionTab';
import { AgentTab } from './components/tabs/AgentTab';
import { DeployTab } from './components/tabs/DeployTab';
import type { TabId, KubeComponent, SidePanelMode } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('topology');
  const [sidePanelMode, setSidePanelMode] = useState<SidePanelMode>(null);
  const [selectedComponent, setSelectedComponent] = useState<KubeComponent | null>(null);

  const handleComponentSelect = useCallback((component: KubeComponent) => {
    setSelectedComponent(component);
    setSidePanelMode('component');
  }, []);

  const handleAlertClick = useCallback(() => {
    setSidePanelMode(prev => prev === 'alerts' ? null : 'alerts');
  }, []);

  const handleCloseSidePanel = useCallback(() => {
    setSidePanelMode(null);
  }, []);

  return (
    <>
      <TopBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAlertClick={handleAlertClick}
      />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-hidden">
          {activeTab === 'topology' && <TopologyTab onNodeSelect={handleComponentSelect} />}
          {activeTab === 'monitoring' && <MonitoringTab onComponentSelect={handleComponentSelect} />}
          {activeTab === 'versions' && <VersionTab />}
          {activeTab === 'agent' && <AgentTab />}
          {activeTab === 'deploy' && <DeployTab />}
        </div>
        <SidePanel
          mode={sidePanelMode}
          selectedComponent={selectedComponent}
          onClose={handleCloseSidePanel}
        />
      </div>
    </>
  );
}

export default App;
