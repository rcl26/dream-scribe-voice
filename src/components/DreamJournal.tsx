import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Moon, Calendar, Clock, Trash2 } from 'lucide-react';
import { Dream } from './DreamEntry';

interface DreamJournalProps {
  dreams: Dream[];
  onDeleteDream: (id: string) => void;
}

export const DreamJournal: React.FC<DreamJournalProps> = ({ dreams, onDeleteDream }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const groupedDreams = dreams.reduce((groups, dream) => {
    const date = dream.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(dream);
    return groups;
  }, {} as Record<string, Dream[]>);

  if (dreams.length === 0) {
    return (
      <Card className="p-8 text-center border-dream/20">
        <Moon className="w-16 h-16 mx-auto mb-4 text-dream opacity-50" />
        <h3 className="text-xl font-semibold mb-2 text-foreground">No Dreams Yet</h3>
        <p className="text-muted-foreground">
          Start recording your dreams to build your personal dream journal
        </p>
      </Card>
    );
  }

  return (
    <Card className="border-dream/20">
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Moon className="w-5 h-5 text-dream" />
          <h2 className="text-xl font-semibold text-foreground">Dream Journal</h2>
          <Badge variant="secondary" className="ml-auto">
            {dreams.length} {dreams.length === 1 ? 'dream' : 'dreams'}
          </Badge>
        </div>
      </div>
      
      <ScrollArea className="h-[400px]">
        <div className="p-4 space-y-6">
          {Object.entries(groupedDreams)
            .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
            .map(([date, dateDreams]) => (
              <div key={date} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-mystic" />
                  <h3 className="text-sm font-medium text-mystic">
                    {formatDate(date)}
                  </h3>
                </div>
                
                {dateDreams.map((dream, index) => (
                  <Card key={dream.id} className="p-4 bg-muted/50 border-muted">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-foreground line-clamp-1">
                          {dream.title}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{dream.time}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDeleteDream(dream.id)}
                            className="text-destructive hover:text-destructive h-6 w-6 p-0"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {dream.content}
                      </p>
                    </div>
                  </Card>
                ))}
                
                {Object.keys(groupedDreams).length > 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
        </div>
      </ScrollArea>
    </Card>
  );
};