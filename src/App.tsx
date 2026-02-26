import { Hero } from './components/Hero';
import { LoopBar } from './components/LoopBar';
import { Phase0Ontology } from './components/sections/Phase0Ontology';
import { Phase1Design } from './components/sections/Phase1Design';
import { Phase2Provisioning } from './components/sections/Phase2Provisioning';
import { Phase3Ops } from './components/sections/Phase3Ops';
import { Phase4Agent } from './components/sections/Phase4Agent';
import { Phase5Deployment } from './components/sections/Phase5Deployment';

function App() {
  return (
    <>
      <Hero />
      <div className="wrap">
        <LoopBar />
      </div>
      <div className="wrap">
        <Phase0Ontology />
        <Phase1Design />
        <Phase2Provisioning />
        <Phase3Ops />
        <Phase4Agent />
        <Phase5Deployment />
      </div>
    </>
  );
}

export default App;
