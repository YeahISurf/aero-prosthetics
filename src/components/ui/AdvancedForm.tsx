import React, { useState } from 'react';

// Removed unused FormFieldValue type

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'select' | 'checkbox' | 'textarea';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

interface AdvancedFormProps {
  title: string;
  description?: string;
  fields: FormField[];
  submitLabel?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: Record<string, any>) => void;
}

export default function AdvancedForm({
  title,
  description,
  fields,
  submitLabel = 'Submit',
  onSubmit,
}: AdvancedFormProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    fields.forEach((field) => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = `${field.label} is required`;
      }
      
      if (field.type === 'email' && formData[field.id] && 
          typeof formData[field.id] === 'string' && 
          !/\S+@\S+\.\S+/.test(formData[field.id] as string)) {
        newErrors[field.id] = 'Please enter a valid email address';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      // Reset form on success if needed
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl rounded-lg border bg-white p-6 shadow-sm">
      <h2 className="mb-2 text-xl font-semibold">{title}</h2>
      {description && <p className="mb-6 text-gray-600">{description}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.id} className="form-group">
            <label 
              htmlFor={field.id}
              className="mb-1 block text-sm font-medium text-gray-800"
            >
              {field.label}
              {field.required && <span className="ml-1 text-primary-600">*</span>}
            </label>
            
            {field.type === 'select' ? (
              <select
                id={field.id}
                name={field.id}
                value={formData[field.id] || ''}
                onChange={handleChange}
                required={field.required}
                className="block w-full rounded-md border border-gray-300 p-2 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-500"
                aria-invalid={!!errors[field.id]}
              >
                <option value="">Select an option</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                id={field.id}
                name={field.id}
                value={formData[field.id] || ''}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={field.required}
                className="block w-full rounded-md border border-gray-300 p-2 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-500"
                rows={4}
                aria-invalid={!!errors[field.id]}
              />
            ) : field.type === 'checkbox' ? (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={field.id}
                  name={field.id}
                  checked={!!formData[field.id]}
                  onChange={handleChange}
                  required={field.required}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 aria-checked:bg-primary-600"
                  aria-checked={!!formData[field.id]}
                />
                <span className="ml-2 text-sm text-gray-600">{field.placeholder}</span>
              </div>
            ) : (
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                value={formData[field.id] || ''}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={field.required}
                className="block w-full rounded-md border border-gray-300 p-2 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-500"
                aria-invalid={!!errors[field.id]}
              />
            )}
            
            {errors[field.id] && (
              <p className="mt-1 text-xs text-red-600">{errors[field.id]}</p>
            )}
          </div>
        ))}
        
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-70 aria-[disabled=true]:cursor-not-allowed aria-[disabled=true]:opacity-70"
          >
            {isSubmitting ? 'Submitting...' : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
} 