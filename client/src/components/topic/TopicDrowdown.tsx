// TopicDropdown.tsx

import { fetchTopics } from "@/actions/topicAction";
import useAuth from "@/contexts/AuthContext";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

interface Topic {
  topicId: number;
  topicName: string;
  subject: "Math" | "Science" | "History" | "Art" | "Misc";
}

interface TopicDropdownProps {
    onSelectTopic: (topicId: number | null) => void; 
  }

export const TopicDropdown = ({ onSelectTopic }: TopicDropdownProps) => {
  const { user } = useAuth();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  useEffect(() => {
    const fetchUserTopics = async () => {
      try {
        if (user) {
          const response = await fetchTopics(user.id);
          const mappedTopics = response.data.map((topic: any) => ({
            topicId: topic.id,
            topicName: topic.name,
            subject: mapSubject(topic.subject),
          }));
          setTopics(mappedTopics);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching topics:", error);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };

    fetchUserTopics();
  }, [user]);
  
  const handleSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setOpen(false);
    onSelectTopic(topic.topicId); 
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedTopic
            ? `${selectedTopic.topicName} (${selectedTopic.subject})`
            : "Select topic..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search topic..." />
          <CommandList>
            <CommandEmpty>No topics found.</CommandEmpty>
            <CommandGroup>
              {topics.map((topic) => (
                <CommandItem
                  key={topic.topicId}
                  value={topic.topicName}
                  onSelect={() => {
                    handleSelect(topic);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedTopic?.topicId === topic.topicId
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {topic.topicName} - {topic.subject}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const mapSubject = (subject: string): Topic["subject"] => {
  const subjectMap: Record<string, Topic["subject"]> = {
    m: "Math",
    s: "Science",
    h: "History",
    a: "Art",
  };

  return subjectMap[subject] || "Misc";
};
