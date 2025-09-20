import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FormField } from "@/types/form";

interface FieldTypeButtonProps {
  type: FormField["type"];
  onClick: () => void;
}

const fieldTypeLabels = {
  text: "Text Input",
  textarea: "Text Area", 
  checkbox: "Checkbox",
  radio: "Radio Button"
};

const FieldTypeButton = ({ type, onClick }: FieldTypeButtonProps) => {
  return (
    <Button
      variant="outline"
      className="h-auto p-4 flex items-center space-x-2 w-full"
      onClick={onClick}
    >
      <Plus className="h-4 w-4" />
      <span>{fieldTypeLabels[type]}</span>
    </Button>
  );
};

export default FieldTypeButton;