// accountField.tsx

import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface FieldsProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    FieldItems: Array<{ name: string; label: string; type?: string }>;
  }
  
  export const Fields = <T extends FieldValues>({ form, FieldItems }: FieldsProps<T>) => {
    return (
      <>
        {FieldItems.map(({ name, label, type = "text" }) => (
          <FormField
            key={name}
            control={form.control}
            name={name as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={label} type={type} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </>
    );
  };