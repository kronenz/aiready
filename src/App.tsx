import { useState } from 'react';
import { Sidebar, type ViewId } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { DesignStudioView } from './components/views/DesignStudioView';
import { OntologyView } from './components/views/OntologyView';
import { ProvisioningView } from './components/views/ProvisioningView';
import { OperationsView } from './components/views/OperationsView';
import { AgentView } from './components/views/AgentView';

function App() {
  const [activeView, setActiveView] = useState<ViewId>('design');

  return (
    <>
      <TopBar activeView={activeView} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar active={activeView} onChange={setActiveView} />
        <div className="flex-1 overflow-hidden">
          {activeView === 'design' && <DesignStudioView />}
          {activeView === 'ontology' && <OntologyView />}
          {activeView === 'provision' && <ProvisioningView />}
          {activeView === 'ops' && <OperationsView />}
          {activeView === 'agent' && <AgentView />}
        </div>
      </div>
    </>
  );
}

export default App;
