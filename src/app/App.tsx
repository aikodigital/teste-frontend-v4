import { useInitializeApplicationHook } from '../hooks/use-initialize-application.hook';
import { AikoEquipments } from '../pages/akio-equipments.container';

export const App = () => {
  useInitializeApplicationHook();

  return <AikoEquipments />;
};
