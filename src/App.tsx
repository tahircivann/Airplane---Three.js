import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei'
import Plane from './components/Plane';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
//import Terrain from './components/Terrain'; 


function App() {
  return (
    <Canvas style={{ height: '100vh', width: '100vw' }}>
    
      <OrbitControls />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <axesHelper args={[15]} />
      <gridHelper args={[1000, 1000]} />
      <fog attach="fog" args={['#b7b7b7', 0, 100]} />
      <Plane/>
      <EffectComposer>
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        <DepthOfField focusDistance={0} focalLength={5} bokehScale={2} height={300} />
      </EffectComposer>

      <Environment preset="forest" background  blur={0.7} />
      
      {/* Diğer bileşenlerinizi buraya ekleyin */}
    </Canvas>
  );
}

export default App;