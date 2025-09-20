import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormContext } from "@/contexts/FormContext";
import { Form, FormField } from "@/types/form";
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
  const [fields, setFields] = useState<FormField[]>([]);

  useEffect(() => {
    if (editFormId) {
      const form = getForm(editFormId);
      if (form) {
        setFormTitle(form.title);
        setFormDescription(form.description || "");
        setFields(form.fields);
      }
    }
  }, [editFormId, getForm]);

  const addField = (type: FormField["type"]) => {
    const newField: FormField = {
      id: Date.now().toString(),
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      required: false,
      order: fields.length,
      ...(type === "checkbox" || type === "radio" ? { options: ["Option 1", "Option 2"] } : {})
    };
    setFields([...fields, newField]);
  };

  const updateField = (fieldId: string, updatedField: FormField) => {
    setFields(fields.map(field => field.id === fieldId ? updatedField : field));
  };

  const deleteField = (fieldId: string) => {
    setFields(fields.filter(field => field.id !== fieldId));
  };

  const moveField = (fieldId: string, direction: "up" | "down") => {
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

  const saveForm = async () => {
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

    try {
      if (editFormId) {
        await updateForm(editFormId, formData);
        toast({
          title: "Success",
          description: "Form updated successfully"
        });
      } else {
        await addForm(formData);
        toast({
          title: "Success", 
          description: "Form created successfully"
        });
      }

      navigate("/forms");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save form",
        variant: "destructive"
      });
    }
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
        <Card>
          <CardHeader>
            <CardTitle>Form Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Form Title *</Label>
              <Input
                id="title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Enter form title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="Enter form description"
              />
            </div>
          </CardContent>
        </Card>

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