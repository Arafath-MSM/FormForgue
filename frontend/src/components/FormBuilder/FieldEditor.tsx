import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FormField } from "@/types/form";
import { ChevronUp, ChevronDown, Trash2, Plus, X } from "lucide-react";

interface FieldEditorProps {
  field: FormField;
  onUpdate: (field: FormField) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

const FieldEditor = ({ 
  field, 
  onUpdate, 
  onDelete, 
  onMoveUp, 
  onMoveDown, 
  canMoveUp, 
  canMoveDown 
}: FieldEditorProps) => {
  const [newOption, setNewOption] = useState("");

  const updateField = (updates: Partial<FormField>) => {
    onUpdate({ ...field, ...updates });
  };

  const addOption = () => {
    const options = field.options || [];
    const optionNumber = options.length + 1;
    updateField({ options: [...options, `Option ${optionNumber}`] });
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
            <span className="font-medium">{fieldTypeNames[field.type]}</span>
            <Badge variant="secondary" className="text-xs">{field.type}</Badge>
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
                    onChange={(e) => {
                      const newOptions = [...(field.options || [])];
                      newOptions[index] = e.target.value;
                      updateField({ options: newOptions });
                    }}
                    className="flex-1" 
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeOption(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={addOption}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Option
              </Button>
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