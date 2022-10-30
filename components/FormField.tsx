import React from 'react';
import {TextField} from "@material-ui/core";
import {useFormContext} from "react-hook-form";

interface FormFieldProps {
    textFieldName: "email" | 'password' | 'nickname',
    label: string
}

export const FormField: React.FC<FormFieldProps> = ({textFieldName, label}) => {

    const form = useFormContext()

    return (
        <TextField
            {...form.register(textFieldName)}
            className="mb-20"
            size="small"
            label={label}
            variant="outlined"
            name={textFieldName}
            helperText={form.formState.errors[textFieldName]?.message}
            error={!!form.formState.errors[textFieldName]?.message}
            fullWidth
            required
        />
    );
};

