import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FormFieldBuilder } from "@/types/form";
import { ChevronUp, ChevronDown, Trash2, Plus, Trash, Copy } from "lucide-react";

interface FieldEditorProps {
  field: FormFieldBuilder;
  onUpdate: (field: FormFieldBuilder) => void;
  onDelete: () => void;
  onCopy: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

const FieldEditor = ({ 
  field, 
  onUpdate, 
  onDelete, 
  onCopy,
  onMoveUp, 
  onMoveDown, 
  canMoveUp, 
  canMoveDown 
}: FieldEditorProps) => {
  const [newOption, setNewOption] = useState("");
  const [showAddOptionInput, setShowAddOptionInput] = useState(false);

  const updateField = (updates: Partial<FormFieldBuilder>) => {
    onUpdate({ ...field, ...updates });
  };

  const addOption = () => {
    if (newOption.trim()) {
      const options = field.options || [];
      updateField({ options: [...options, newOption.trim()] });
      setNewOption("");
      setShowAddOptionInput(false);
    }
  };

  const handleAddOptionClick = () => {
    setShowAddOptionInput(true);
  };

  const updateOption = (index: number, value: string) => {
    const options = field.options || [];
    const newOptions = [...options];
    newOptions[index] = value;
    updateField({ options: newOptions });
  };

  const removeOption = (index: number) => {
    const options = field.options || [];
    updateField({ options: options.filter((_, i) => i !== index) });
  };

  const fieldTypeNames = {
    text: "Text Input",
    textarea: "Text Area", 
    checkbox: "Checkbox",
    radio: "Radio Button"
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">{fieldTypeNames[field.type]}</Badge>
            <span className="text-sm text-muted-foreground">{field.type}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMoveUp}
              disabled={!canMoveUp}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onMoveDown}
              disabled={!canMoveDown}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCopy}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`label-${field.id}`}>Label</Label>
          <Input
            id={`label-${field.id}`}
            value={field.label}
            onChange={(e) => updateField({ label: e.target.value })}
            placeholder="Enter field label"
          />
        </div>

        {(field.type === "checkbox" || field.type === "radio") && (
          <div className="space-y-3">
            <Label>Options</Label>
            <div className="space-y-2">
              {field.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input 
                    value={option} 
                    onChange={(e) => updateOption(index, e.target.value)}
                    className="flex-1" 
                    placeholder="Enter option text"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeOption(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              {!showAddOptionInput ? (
                <div className="flex justify-start">
                  <Button 
                    onClick={handleAddOptionClick} 
                    variant="ghost" 
                    size="sm" 
                    className="text-primary hover:text-primary/80 p-0 h-auto font-normal"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Option
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Input
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    placeholder="Enter new option"
                    onKeyPress={(e) => e.key === "Enter" && addOption()}
                    className="flex-1"
                    autoFocus
                  />
                  <Button onClick={addOption} variant="outline" size="sm" disabled={!newOption.trim()}>
                    Add
                  </Button>
                  <Button 
                    onClick={() => {
                      setShowAddOptionInput(false);
                      setNewOption("");
                    }} 
                    variant="ghost" 
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Checkbox
            id={`required-${field.id}`}
            checked={field.required}
            onCheckedChange={(checked) => updateField({ required: !!checked })}
          />
          <Label htmlFor={`required-${field.id}`}>Required field</Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default FieldEditor;