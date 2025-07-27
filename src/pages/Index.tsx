import React, { useState, useEffect } from 'react';
import { VoiceRecorder } from '@/components/VoiceRecorder';
import { DreamEntry, Dream } from '@/components/DreamEntry';
import { DreamJournal } from '@/components/DreamJournal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Moon, BookOpen, Mic } from 'lucide-react';

const Index = () => {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [activeTab, setActiveTab] = useState('voice');
  const { toast } = useToast();

  // Load dreams from localStorage on mount
  useEffect(() => {
    const savedDreams = localStorage.getItem('dreamJournal');
    if (savedDreams) {
      try {
        setDreams(JSON.parse(savedDreams));
      } catch (error) {
        console.error('Error loading dreams:', error);
      }
    }
  }, []);

  // Save dreams to localStorage whenever dreams change
  useEffect(() => {
    localStorage.setItem('dreamJournal', JSON.stringify(dreams));
  }, [dreams]);

  const handleSaveDream = (dream: Omit<Dream, 'id'>) => {
    const newDream: Dream = {
      ...dream,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    
    setDreams(prev => [newDream, ...prev]);
    
    toast({
      title: "Dream saved!",
      description: "Your dream has been added to your journal",
    });
    
    // Switch to journal tab to show the saved dream
    setActiveTab('journal');
  };

  const handleRecordingComplete = (audioBlob: Blob, transcript: string) => {
    // For now, we'll switch to the manual entry tab with any transcript
    // In the future, we can add speech-to-text integration
    setActiveTab('manual');
    
    toast({
      title: "Recording complete",
      description: "Now add details about your dream",
    });
  };

  const handleDeleteDream = (id: string) => {
    setDreams(prev => prev.filter(dream => dream.id !== id));
    
    toast({
      title: "Dream deleted",
      description: "The dream has been removed from your journal",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-br from-dream to-mystic">
              <Moon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-dream to-mystic bg-clip-text text-transparent">
              DreamJournal
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Capture and explore your dreams with voice recording
          </p>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="voice" className="flex items-center space-x-2">
              <Mic className="w-4 h-4" />
              <span>Voice</span>
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center space-x-2">
              <Moon className="w-4 h-4" />
              <span>Write</span>
            </TabsTrigger>
            <TabsTrigger value="journal" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Journal</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="voice" className="space-y-6">
            <VoiceRecorder onRecordingComplete={handleRecordingComplete} />
          </TabsContent>

          <TabsContent value="manual" className="space-y-6">
            <DreamEntry onSave={handleSaveDream} />
          </TabsContent>

          <TabsContent value="journal" className="space-y-6">
            <DreamJournal dreams={dreams} onDeleteDream={handleDeleteDream} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
