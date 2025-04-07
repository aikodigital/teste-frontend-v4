import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Props {
  firstChildren: React.ReactNode;
  secondChildren: React.ReactNode;
}

const ModalTabs: React.FC<Props> = ({ firstChildren, secondChildren }) => (
  <Tabs defaultValue="first" className="w-full">
    <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger value="first" className="cursor-pointer">
        Histórico de Estados
      </TabsTrigger>
      <TabsTrigger value="second" className="cursor-pointer">
        Histórico de Posições
      </TabsTrigger>
    </TabsList>
    <TabsContent value="first" className="p-2">
      {firstChildren}
    </TabsContent>
    <TabsContent value="second" className="p-2">
      {secondChildren}
    </TabsContent>
  </Tabs>
);
export default ModalTabs;
