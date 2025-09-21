import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormContext } from "@/contexts/FormContext";
import { Form, FormField, FormFieldBuilder } from "@/types/form";
import FieldTypeButton from "@/components/FormBuilder/FieldTypeButton";
import FieldEditor from "@/components/FormBuilder/FieldEditor";
import { useToast } from "@/hooks/use-toast";

const FormBuilder = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addForm, updateForm, getForm } = useFormContext();
  const { toast } = useToast();
  
  const editFormId = searchParams.get("edit");
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [fields, setFields] = useState<FormFieldBuilder[]>([]);

  useEffect(() => {
    if (editFormId) {
      const form = getForm(parseInt(editFormId));
      if (form) {
        setFormTitle(form.title);
        setFormDescription(form.description || "");
        // Convert FormField to FormFieldBuilder
        const builderFields: FormFieldBuilder[] = form.fields.map(field => ({
          id: field.id,
          type: field.type,
          label: field.label,
          required: field.required,
          options: field.options,
          order: field.order
        }));
        setFields(builderFields);
      }
    }
  }, [editFormId, getForm]);

  const addField = (type: FormFieldBuilder["type"]) => {
    const newField: FormFieldBuilder = {
      id: Date.now(), // Use numeric ID for new fields
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      required: false,
      order: fields.length,
      ...(type === "checkbox" || type === "radio" ? { options: ["Option 1", "Option 2"] } : {})
    };
    setFields([...fields, newField]);
  };

  const updateField = (fieldId: number, updatedField: FormFieldBuilder) => {
    setFields(fields.map(field => field.id === fieldId ? updatedField : field));
  };

  const deleteField = (fieldId: number) => {
    setFields(fields.filter(field => field.id !== fieldId));
  };

  const moveField = (fieldId: number, direction: "up" | "down") => {
    const index = fields.findIndex(field => field.id === fieldId);
    if (index === -1) return;

    const newFields = [...fields];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newFields.length) {
      [newFields[index], newFields[targetIndex]] = [newFields[targetIndex], newFields[index]];
      // Update order property
      newFields.forEach((field, i) => {
        field.order = i;
      });
      setFields(newFields);
    }
  };

  const copyField = (fieldId: number) => {
    const fieldToCopy = fields.find(field => field.id === fieldId);
    if (fieldToCopy) {
      const newField: FormFieldBuilder = {
        ...fieldToCopy,
        id: Date.now(),
        label: `${fieldToCopy.label} (Copy)`,
        order: fields.length
      };
      setFields([...fields, newField]);
    }
  };

  const saveForm = () => {
    if (!formTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a form title",
        variant: "destructive"
      });
      return;
    }

    const formData = {
      title: formTitle,
      description: formDescription,
      fields: fields.map((field, index) => ({ ...field, order: index }))
    };

    if (editFormId) {
      updateForm(parseInt(editFormId), formData);
      toast({
        title: "Success",
        description: "Form updated successfully"
      });
    } else {
      addForm(formData);
      toast({
        title: "Success", 
        description: "Form created successfully"
      });
    }

    navigate("/forms");
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {editFormId ? "Edit Form" : "Create Form"}
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => navigate("/forms")}>
            Cancel
          </Button>
          <Button onClick={saveForm}>
            {editFormId ? "Update Form" : "Save Form"}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Form Title *</Label>
          <Input
            id="title"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder="Enter form title"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Add Fields</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <FieldTypeButton type="text" onClick={() => addField("text")} />
            <FieldTypeButton type="textarea" onClick={() => addField("textarea")} />
            <FieldTypeButton type="checkbox" onClick={() => addField("checkbox")} />
            <FieldTypeButton type="radio" onClick={() => addField("radio")} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Form Fields</CardTitle>
          </CardHeader>
          <CardContent>
            {fields.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No fields added yet. Use the buttons above to add fields.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <FieldEditor
                    key={field.id}
                    field={field}
                    onUpdate={(updatedField) => updateField(field.id, updatedField)}
                    onDelete={() => deleteField(field.id)}
                    onCopy={() => copyField(field.id)}
                    onMoveUp={() => moveField(field.id, "up")}
                    onMoveDown={() => moveField(field.id, "down")}
                    canMoveUp={index > 0}
                    canMoveDown={index < fields.length - 1}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FormBuilder;