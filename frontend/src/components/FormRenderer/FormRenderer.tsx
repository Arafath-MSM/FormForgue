import { useState } from "react";
import { Form, FormField, FormSubmissionData } from "@/types/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FormRendererProps {
  form: Form;
  onSubmit: (data: FormSubmissionData) => void;
  isPreview?: boolean;
}

const FormRenderer = ({ form, onSubmit, isPreview = false }: FormRendererProps) => {
  const [formData, setFormData] = useState<FormSubmissionData>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (fieldId: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => ({ ...prev, [fieldId]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    form.fields.forEach(field => {
      if (field.required) {
        const value = formData[field.id];
        if (!value || (Array.isArray(value) && value.length === 0) || 
            (typeof value === 'string' && !value.trim())) {
          newErrors[field.id] = "This field is required";
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const renderField = (field: FormField) => {
    const hasError = !!errors[field.id];
    const errorMessage = errors[field.id];

    switch (field.type) {
      case "text":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Input
              id={field.id}
              value={formData[field.id] as string || ""}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              className={hasError ? "border-destructive" : ""}
            />
            {hasError && <p className="text-sm text-destructive">{errorMessage}</p>}
          </div>
        );

      case "textarea":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Textarea
              id={field.id}
              value={formData[field.id] as string || ""}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              className={hasError ? "border-destructive" : ""}
            />
            {hasError && <p className="text-sm text-destructive">{errorMessage}</p>}
          </div>
        );

      case "checkbox":
        return (
          <div key={field.id} className="space-y-3">
            <Label>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <div className="space-y-2">
              {field.options?.map((option, index) => {
                const selectedValues = (formData[field.id] as string[]) || [];
                return (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${field.id}-${index}`}
                      checked={selectedValues.includes(option)}
                      onCheckedChange={(checked) => {
                        const currentValues = (formData[field.id] as string[]) || [];
                        let newValues;
                        if (checked) {
                          newValues = [...currentValues, option];
                        } else {
                          newValues = currentValues.filter(v => v !== option);
                        }
                        handleInputChange(field.id, newValues);
                      }}
                    />
                    <Label htmlFor={`${field.id}-${index}`} className="font-normal">
                      {option}
                    </Label>
                  </div>
                );
              })}
            </div>
            {hasError && <p className="text-sm text-destructive">{errorMessage}</p>}
          </div>
        );

      case "radio":
        return (
          <div key={field.id} className="space-y-3">
            <Label>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <RadioGroup
              value={formData[field.id] as string || ""}
              onValueChange={(value) => handleInputChange(field.id, value)}
            >
              {field.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${field.id}-${index}`} />
                  <Label htmlFor={`${field.id}-${index}`} className="font-normal">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {hasError && <p className="text-sm text-destructive">{errorMessage}</p>}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{form.title}</CardTitle>
          {form.description && (
            <p className="text-muted-foreground">{form.description}</p>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {form.fields
              .sort((a, b) => a.order - b.order)
              .map(renderField)}
            
            <div className="pt-4">
              <Button type="submit" className="w-full" size="lg">
                Submit Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormRenderer;