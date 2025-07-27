import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Moon, Save, Calendar } from 'lucide-react';

export interface Dream {
  id: string;
  title: string;
  content: string;
  date: string;
  time: string;
  audioUrl?: string;
}

interface DreamEntryProps {
  onSave: (dream: Omit<Dream, 'id'>) => void;
  initialContent?: string;
}

export const DreamEntry: React.FC<DreamEntryProps> = ({ onSave, initialContent = '' }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(initialContent);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) return;
    
    setIsSubmitting(true);
    
    const now = new Date();
    const dream: Omit<Dream, 'id'> = {
      title: title.trim(),
      content: content.trim(),
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }),
    };
    
    await onSave(dream);
    
    // Reset form
    setTitle('');
    setContent('');
    setIsSubmitting(false);
  };

  return (
    <Card className="p-6 border-mystic/20 bg-gradient-to-br from-card to-muted">
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-mystic">
          <Moon className="w-5 h-5" />
          <h2 className="text-xl font-semibold">Record Your Dream</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="dream-title" className="text-foreground">Dream Title</Label>
            <Input
              id="dream-title"
              placeholder="Give your dream a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="dream-content" className="text-foreground">Dream Description</Label>
            <Textarea
              id="dream-content"
              placeholder="Describe your dream in detail..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 min-h-[120px]"
            />
          </div>
          
          <Button
            onClick={handleSave}
            disabled={!title.trim() || !content.trim() || isSubmitting}
            className="w-full bg-mystic hover:bg-mystic/90 text-mystic-foreground"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Saving...' : 'Save Dream'}
          </Button>
        </div>
      </div>
    </Card>
  );
};